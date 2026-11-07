/** Techrote IO v2: image layers, project interaction, grid editing and mobile panning.
 *  Every position is measured in the reference art's 1672x941 scene coordinates.
 *  The layer manifest is editable without touching this renderer.
 */
(() => {
 'use strict';
 const $=id=>document.getElementById(id);
 const app=$('app'),world=$('world'),viewport=$('viewport'),loading=$('loading'),status=$('status');
 const storageKey='techrote-io:workshop-layout-v2';
 const themeKey='techrote-io:workshop-theme-v1';
 const state={manifest:null,items:[],selected:null,hotspot:null,edit:false,hints:false,grid:false,reference:false,
   view:{scale:1,x:0,y:0},gesture:null,localFiles:new Map(),resizeQueued:false,theme:'industrial'};
 const numeric=(v,min,max,def)=>Number.isFinite(Number(v))?Math.max(min,Math.min(max,Number(v))):def;
 const setStatus=(msg)=>{status.textContent=msg;};
 const worldPoint=(clientX,clientY)=>{const r=viewport.getBoundingClientRect();return [(clientX-r.left-state.view.x)/state.view.scale,(clientY-r.top-state.view.y)/state.view.scale];};
 function viewTransform(){
   world.style.transform=`translate3d(${state.view.x}px,${state.view.y}px,0) scale(${state.view.scale})`;
   $('zoom-level').textContent=Math.round(state.view.scale*100)+'%';
 }
 function clampView(){
   const r=viewport.getBoundingClientRect();const cw=state.manifest.canvas.width*state.view.scale,ch=state.manifest.canvas.height*state.view.scale;
   const margin=90;
   if(cw<=r.width)state.view.x=(r.width-cw)/2;else state.view.x=Math.min(margin,Math.max(r.width-cw-margin,state.view.x));
   if(ch<=r.height)state.view.y=(r.height-ch)/2;else state.view.y=Math.min(margin,Math.max(r.height-ch-margin,state.view.y));
   viewTransform();
 }
 function fitScene(reset=true){
   if(!state.manifest)return;
   const r=viewport.getBoundingClientRect(),w=state.manifest.canvas.width,h=state.manifest.canvas.height;
   const mobile=r.width<700;
   const fit=Math.min(r.width/w,r.height/h);
   state.view.scale=mobile?Math.min(1.3,r.height/h):fit;
   state.view.y=(r.height-h*state.view.scale)/2;
   state.view.x=mobile?r.width/2-825*state.view.scale:(r.width-w*state.view.scale)/2;
   clampView();
 }
 function zoom(factor,centerX,centerY){
   const r=viewport.getBoundingClientRect(),cx=centerX==null?r.width/2:centerX-r.left,cy=centerY==null?r.height/2:centerY-r.top;
   const old=state.view.scale,next=numeric(old*factor,.22,4,old);
   state.view.x=cx-(cx-state.view.x)*next/old;
   state.view.y=cy-(cy-state.view.y)*next/old;
   state.view.scale=next;clampView();
 }
 function relRect(rect){return {left:rect[0]+'px',top:rect[1]+'px',width:rect[2]+'px',height:rect[3]+'px'};}
 /** A theme may relocate link hitboxes without moving the group or modifying
  * its canonical locations in other visual themes. */
 function hotspotRect(group,hotspot){
   const override=state.manifest?.themes?.[state.theme]?.hotspotRects?.[group.id]?.[hotspot.id];
   return Array.isArray(override)&&override.length===4&&override.every(Number.isFinite)?override:hotspot.rect;
 }
 function editableHotspotRect(group,hotspot){
   const groupOverrides=state.manifest?.themes?.[state.theme]?.hotspotRects?.[group.id];
   if(!groupOverrides)return hotspot.rect;
   if(!Array.isArray(groupOverrides[hotspot.id]))groupOverrides[hotspot.id]=[...hotspot.rect];
   return groupOverrides[hotspot.id];
 }
 function renderGroup(item){
   const g=item.data,el=item.el;
   el.style.left=g.x+'px';el.style.top=g.y+'px';el.style.width=g.width+'px';el.style.height=g.height+'px';
   el.style.transform=`scale(${g.scale})`;el.style.zIndex=g.z;
 }

 /** Swap pixels without changing coordinates, punched screen openings or hotspots. */
 function imageFor(kind,id,fallback){
   const config=state.manifest.themes?.[state.theme];
   const candidate=kind==='background'?config?.background:config?.[kind]?.[id];
   return typeof candidate==='string'&&candidate.startsWith('scene/')?candidate:fallback;
 }
 function assignImage(image,src,fallback){
   if(!image)return;
   image.onerror=()=>{
     if(image.getAttribute('src')!==src||src===fallback)return;
     image.onerror=null;
     image.src=fallback;
     setStatus('THEME ASSET UNAVAILABLE · showing original asset instead');
   };
   if(image.getAttribute('src')!==src)image.src=src;
 }
 function setTheme(id,remember=true){
   const available=state.manifest.themes||{};
   if(!Object.hasOwn(available,id))id='industrial';
   state.theme=id;
   const picker=$('theme-select');
   if(picker)picker.value=id;
   app.dataset.theme=id;
   assignImage($('backdrop'),imageFor('background',null,state.manifest.background.file),state.manifest.background.file);
   for(const item of state.items){
     const g=item.data;
     const artKey=id+':'+g.id+':art';
     const screenKey=id+':'+g.id+':screen';
     assignImage(item.art,state.localFiles.get(artKey)||imageFor('art',g.id,g.art.file),g.art.file);
     if(g.screen){
      const rect=available[id]?.screenRects?.[g.id]||g.screen.rect;
      Object.assign(item.screen.style,relRect(rect));
      assignImage(item.screen,state.localFiles.get(screenKey)||imageFor('screens',g.id,g.screen.file),g.screen.file);
    }
    // Theme switches move only the invisible link regions, never their URLs,
    // object placements or the original theme's rectangles.
    for(const link of item.links)Object.assign(link.el.style,relRect(hotspotRect(g,link.data)));
   }
   if(remember){
     try{localStorage.setItem(themeKey,id);}catch(_){/* Private browsing remains supported. */}
     try{
       const url=new URL(location.href);
       url.searchParams.set('theme',id);
       history.replaceState(null,'',url);
     }catch(_){/* file:// and embedded browsers may reject history edits. */}
   }
   setStatus('VISUAL THEME · '+(available[id]?.label||id).toUpperCase()+' · THEME LINK REGIONS ACTIVE · OBJECT POSITIONS PRESERVED');
 }

 function buildGroup(g){
   const host=document.createElement('section');host.className='group';host.dataset.id=g.id;
   host.setAttribute('aria-label',g.name+' interactive groupject');
   if(g.screen){
     const screen=document.createElement('img');screen.className='screen-image';screen.src=g.screen.file;screen.alt='';screen.draggable=false;
     Object.assign(screen.style,relRect(g.screen.rect));host.appendChild(screen);
   }
   const art=document.createElement('img');art.className='body-image';art.src=g.art.file;art.alt='';art.draggable=false;
   host.appendChild(art);
   const links=[];
   g.hotspots.forEach(h=>{
     const a=document.createElement('a');a.className='target';a.href=h.url;a.dataset.id=h.id;
     a.dataset.label=h.label;a.title=h.label;a.setAttribute('aria-label',h.label);
     Object.assign(a.style,relRect(h.rect));
     if(/^https:\/\//.test(h.url)){a.target='_blank';a.rel='noopener noreferrer';}
     a.addEventListener('click',e=>{if(state.edit){e.preventDefault();select(g.id,h.id);}});
     host.appendChild(a);links.push({data:h,el:a});
   });
   world.appendChild(host);
   const item={data:g,el:host,art,screen:host.querySelector('.screen-image'),links};renderGroup(item);
   return item;
 }
 function select(id,hotspot=null){
   state.selected=state.items.find(it=>it.data.id===id)||null;
   state.hotspot=hotspot;
   state.items.forEach(it=>{
     it.el.classList.toggle('selected',it===state.selected);
     it.links.forEach(link=>link.el.classList.toggle('selected',it===state.selected && link.data.id===hotspot));
   });
   if(state.selected){$('object-picker').value=id;updateInspector();setStatus('SELECTED '+state.selected.data.name+' · '+Math.round(state.selected.data.x)+','+Math.round(state.selected.data.y));}
 }
 function updateInspector(){
   if(!state.selected)return;
   const g=state.selected.data;
   $('obj-x').value=Math.round(g.x);$('obj-y').value=Math.round(g.y);
   $('obj-scale').value=Number(g.scale.toFixed(3));$('obj-z').value=g.z;
   $('replace-screen').disabled=!g.screen;
 }
 function persist(){
   try{localStorage.setItem(storageKey,JSON.stringify(state.items.map(it=>({
     id:it.data.id,x:it.data.x,y:it.data.y,scale:it.data.scale,z:it.data.z,
     hotspots:it.data.hotspots.map(h=>({id:h.id,rect:h.rect})),
     themeHotspots:Object.fromEntries(Object.entries(state.manifest.themes||{})
       .filter(([,theme])=>theme.hotspotRects?.[it.data.id])
       .map(([id,theme])=>[id,theme.hotspotRects[it.data.id]]))
   }))));}
   catch(e){setStatus('LOCAL SAVE DISABLED · EXPORT JSON TO KEEP CHANGES');}
 }
 function loadLocal(){
   try{
     const saved=JSON.parse(localStorage.getItem(storageKey)||'null');if(!Array.isArray(saved))return;
     for(const edit of saved){const g=state.manifest.groups.find(x=>x.id===edit.id);if(!g)continue;
       for(const k of ['x','y','scale','z'])if(Number.isFinite(edit[k]))g[k]=edit[k];
       if(Array.isArray(edit.hotspots))for(const hs of edit.hotspots){const original=g.hotspots.find(h=>h.id===hs.id);if(original&&Array.isArray(hs.rect)&&hs.rect.length===4&&hs.rect.every(Number.isFinite))original.rect=hs.rect;}
       // Restore user edits to theme-specific hitboxes without touching the
       // shared coordinates used by other themes (older saved layouts still work).
       if(edit.themeHotspots&&typeof edit.themeHotspots==='object')
         for(const [themeId,rects] of Object.entries(edit.themeHotspots)){
           const theme=state.manifest.themes?.[themeId];
           if(!theme?.hotspotRects?.[g.id]||!rects||typeof rects!=='object')continue;
           for(const [id,rect] of Object.entries(rects))
             if(g.hotspots.some(h=>h.id===id)&&Array.isArray(rect)&&rect.length===4&&
                 rect.every(Number.isFinite)&&rect[0]>=0&&rect[1]>=0&&
                 rect[2]>0&&rect[3]>0&&rect[0]+rect[2]<=g.width&&rect[1]+rect[3]<=g.height)
               theme.hotspotRects[g.id][id]=rect;
         }
     }
   }catch(e){setStatus('INVALID SAVED LAYOUT IGNORED');}
 }
 function applyInput(){if(!state.selected)return;
   const g=state.selected.data;
   g.x=numeric($('obj-x').value,-2000,4000,g.x);g.y=numeric($('obj-y').value,-2000,3000,g.y);
   g.scale=numeric($('obj-scale').value,.25,4,g.scale);g.z=numeric($('obj-z').value,1,1000,g.z);
   renderGroup(state.selected);persist();
 }
 function setMode(which,value){
   state[which]=value;app.classList.toggle(which==='edit'?'editing':which,value);
   const button=$(which);if(button)button.setAttribute('aria-pressed',String(value));
   if(which==='edit'){$('inspector').hidden=!value;if(value){select(state.selected?.data.id||'cad');}
     else {state.hotspot=null;state.items.forEach(it=>it.el.classList.remove('selected'));}}
   if(which==='reference'){$('reference').setAttribute('aria-pressed',String(value));setStatus(value?'COMPARISON MODE · ORIGINAL FLATTENED REFERENCE':'MODULAR COMPONENTS · LIVE');}
 }
 function saveManifest(){
   const result=structuredClone(state.manifest);
   const json=JSON.stringify(result,null,2);const url=URL.createObjectURL(new Blob([json],{type:'application/json'}));
   const a=document.createElement('a');a.href=url;a.download='scene.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
   setStatus('EXPORTED scene.json · COPY REPLACEMENT IMAGES INTO scene/parts/ OR scene/screens/');
 }
 function replaceImage(input,screen){
   if(!state.selected||!input.files?.length)return;
   const file=input.files[0];if(!/^image\//.test(file.type)||file.size>25_000_000){setStatus('REPLACEMENT MUST BE IMAGE UNDER 25 MB');return;}
   const url=URL.createObjectURL(file),item=state.selected;
   const key=state.theme+':'+item.data.id+':'+(screen?'screen':'art');
   const old=state.localFiles.get(key);if(old)URL.revokeObjectURL(old);
   state.localFiles.set(key,url);
   if(screen&&item.screen)item.screen.src=url;
   if(!screen)item.art.src=url;
   setStatus('LOCAL PREVIEW: '+file.name+' · TO PUBLISH, ADD ASSET TO REPO AND UPDATE scene.json');
 }
 function pointerDown(e){
   if(e.button!==0)return;if(e.target.closest('.toolbar,.inspector'))return;
   const target=e.target.closest('.target'),group=e.target.closest('.group');
   if(state.edit&&group){
     e.preventDefault();select(group.dataset.id,target?.dataset.id||null);
     const moveHotspot=Boolean(target&&$('move-hotspots').checked);
     state.gesture={type:moveHotspot?'hotspot':'object',startX:e.clientX,startY:e.clientY,
       x:state.selected.data.x,y:state.selected.data.y,hotspot:target?.dataset.id,
       rect:moveHotspot?[...hotspotRect(state.selected.data,state.selected.data.hotspots.find(h=>h.id===target.dataset.id))]:null};
   }else if(!target){state.gesture={type:'pan',startX:e.clientX,startY:e.clientY,x:state.view.x,y:state.view.y};viewport.classList.add('dragging');}
   else return;
   viewport.setPointerCapture(e.pointerId);
 }
 function pointerMove(e){
   const gs=state.gesture;if(!gs)return;
   const dx=e.clientX-gs.startX,dy=e.clientY-gs.startY;
   if(gs.type==='pan'){
     state.view.x=gs.x+dx;state.view.y=gs.y+dy;clampView();
   }else if(state.selected){
     const step=e.shiftKey?1:state.manifest.canvas.grid;
     const deltaX=Math.round((dx/state.view.scale)/step)*step,deltaY=Math.round((dy/state.view.scale)/step)*step;
     if(gs.type==='object'){
       state.selected.data.x=gs.x+deltaX;state.selected.data.y=gs.y+deltaY;renderGroup(state.selected);updateInspector();
     }else{
       const h=state.selected.data.hotspots.find(x=>x.id===gs.hotspot);
       if(h){const rect=editableHotspotRect(state.selected.data,h);
         rect[0]=gs.rect[0]+deltaX/state.selected.data.scale;
         rect[1]=gs.rect[1]+deltaY/state.selected.data.scale;
         const el=state.selected.links.find(x=>x.data.id===h.id)?.el;if(el)Object.assign(el.style,relRect(rect));}
     }
   }
 }
 function pointerUp(){if(!state.gesture)return;
   if(state.edit&&state.gesture.type!=='pan')persist();state.gesture=null;viewport.classList.remove('dragging');
 }
 async function boot(){
   const res=await fetch('scene/scene.json',{cache:'no-store'});if(!res.ok)throw Error('Scene manifest unavailable: '+res.status);
   state.manifest=await res.json();const c=state.manifest.canvas;
   let savedTheme=null;try{savedTheme=localStorage.getItem(themeKey);}catch(_){}
   const requestedTheme=new URLSearchParams(location.search).get('theme');
   const defaultTheme=state.manifest.defaultTheme||'industrial';
   state.theme=[requestedTheme,savedTheme,defaultTheme,'industrial'].find(id=>id&&Object.hasOwn(state.manifest.themes||{},id))||'industrial';
   if(c.width!==1672||c.height!==941||!Array.isArray(state.manifest.groups))throw Error('Unexpected canvas/manifest');
   world.style.width=c.width+'px';world.style.height=c.height+'px';
   $('backdrop').src=state.manifest.background.file;
   loadLocal();
   for(const g of state.manifest.groups)state.items.push(buildGroup(g));
   // Keep THEME options consistent with the editable scene manifest.
   const select=$('theme-select');
   select.replaceChildren();
   for(const [id,config] of Object.entries(state.manifest.themes||{})){
     const option=document.createElement('option');
     option.value=id;option.textContent=config.label||id.toUpperCase();
     select.appendChild(option);
   }
   setTheme(state.theme,false);
   $('theme-select').addEventListener('change',event=>setTheme(event.target.value));
   const reference=document.createElement('img');reference.className='reference-layer';reference.alt='';reference.src=state.manifest.background.reference;reference.draggable=false;
   world.appendChild(reference);
   const grid=document.createElement('div');grid.className='world-grid';world.appendChild(grid);
   for(const item of state.items){const opt=document.createElement('option');opt.value=item.data.id;opt.textContent=item.data.name;$('object-picker').appendChild(opt);}
   $('object-picker').addEventListener('change',e=>select(e.target.value));
   for(const id of ['obj-x','obj-y','obj-scale','obj-z'])$(id).addEventListener('change',applyInput);
   $('replace-art').addEventListener('change',e=>replaceImage(e.target,false));
   $('replace-screen').addEventListener('change',e=>replaceImage(e.target,true));
   $('save-json').addEventListener('click',saveManifest);
   $('reset-layout').addEventListener('click',()=>{if(confirm('Reset all locally saved object and hotspot placements?')){localStorage.removeItem(storageKey);location.reload();}});
   $('inspector-close').addEventListener('click',()=>setMode('edit',false));
   for(const btn of document.querySelectorAll('[data-command]'))btn.addEventListener('click',()=>{
     const cmd=btn.dataset.command;
     if(cmd==='fit')fitScene();
     else if(cmd==='zoom-in')zoom(1.2);
     else if(cmd==='zoom-out')zoom(1/1.2);
     else if(['hints','grid','edit','reference'].includes(cmd))setMode(cmd,!state[cmd]);
   });
   viewport.addEventListener('pointerdown',pointerDown);
   viewport.addEventListener('pointermove',pointerMove);
   viewport.addEventListener('pointerup',pointerUp);viewport.addEventListener('pointercancel',pointerUp);
   viewport.addEventListener('wheel',e=>{
     if(e.ctrlKey||e.metaKey){e.preventDefault();zoom(Math.exp(-e.deltaY*.0015),e.clientX,e.clientY);}
   },{passive:false});
   window.addEventListener('keydown',e=>{
     if(e.ctrlKey||e.metaKey||e.altKey||e.defaultPrevented)return;
     if(['INPUT','TEXTAREA','SELECT'].includes(e.target?.tagName))return;
     const key=e.key.toLowerCase();
     if(key==='h')setMode('hints',!state.hints);
     else if(key==='g')setMode('grid',!state.grid);
     else if(key==='e')setMode('edit',!state.edit);
     else if(key==='r')setMode('reference',!state.reference);
     else if(key==='t'){const choices=Object.keys(state.manifest.themes);setTheme(choices[(choices.indexOf(state.theme)+1)%choices.length]);}
     else if(key==='0')fitScene();
     else if(key==='f'){if(document.fullscreenElement)document.exitFullscreen?.();else app.requestFullscreen?.();}
     else if(state.edit&&state.selected){
       const g=state.selected.data,step=e.shiftKey?1:state.manifest.canvas.grid;
       if(key==='arrowleft')g.x-=step;
       else if(key==='arrowright')g.x+=step;
       else if(key==='arrowup')g.y-=step;
       else if(key==='arrowdown')g.y+=step;
       else if(key==='[')g.z=Math.max(1,g.z-1);
       else if(key===']')g.z+=1;
       else return;
       renderGroup(state.selected);updateInspector();persist();e.preventDefault();
     }else if(key.startsWith('arrow')){
       if(key==='arrowleft')state.view.x+=85;
       else if(key==='arrowright')state.view.x-=85;
       else if(key==='arrowup')state.view.y+=85;
       else if(key==='arrowdown')state.view.y-=85;
       clampView();e.preventDefault();
     }
   });
   window.addEventListener('resize',()=>{if(state.resizeQueued)return;state.resizeQueued=true;requestAnimationFrame(()=>{state.resizeQueued=false;fitScene();});});
   fitScene();loading.hidden=true;
   setStatus('MODULAR WORKBENCH · 6 INDEPENDENT PARTS · 4 SEPARATE SCREENS · '+state.manifest.themes[state.theme].label.toUpperCase()+' · H FOR HINTS');
 }
 boot().catch(e=>{loading.textContent='WORKBENCH UNAVAILABLE · '+e.message;loading.hidden=false;console.error(e);});
})();
