// SALVAGE shell: the apparatus every specimen from S004 onward is mounted in.
// A work passes {id,title,parent,help,aria,reset,step,draw} and optionally {resize,key,keyup,down,readout,bg,scanlines}.
(()=>{'use strict';
const CSS='*{box-sizing:border-box}html,body{margin:0;height:100%;overflow:hidden;color:#d9e6ed;font-family:monospace}canvas{position:absolute;inset:0;width:100%;height:100%;touch-action:none;cursor:crosshair}header,footer{position:fixed;left:22px;right:22px;display:flex;justify-content:space-between;gap:12px;z-index:2;pointer-events:none;font-size:10px;line-height:1.5;letter-spacing:1.1px;text-transform:uppercase;mix-blend-mode:exclusion}header{top:19px}footer{bottom:19px;align-items:flex-end}.name{font-size:12px;letter-spacing:2px}.subtitle{opacity:.6}.readout{text-align:right}nav{display:flex;gap:6px;pointer-events:auto}button{font:10px monospace;letter-spacing:.7px;color:#d9e6ed;background:#07111ccc;border:1px solid #a8c5d855;padding:10px 12px;cursor:pointer}button:hover{color:#07111c;background:#d9e6ed}button:focus-visible{outline:2px solid #fef669;outline-offset:4px}kbd{font:inherit;border:1px solid currentColor;padding:0 3px;margin-right:2px}#help{opacity:.75}#live{position:absolute;clip-path:inset(50%);width:1px;height:1px;overflow:hidden}@media(max-width:600px){header,footer{left:12px;right:12px;font-size:8px}.name{font-size:10px}.subtitle{max-width:200px}footer{flex-wrap:wrap}button{padding:9px;font-size:9px}.readout{max-width:120px}}';
window.Salvage=art=>{
 const style=document.createElement('style');style.textContent=CSS;document.head.appendChild(style);
 document.documentElement.style.background=document.body.style.background=art.bg||'#05070e';
 document.body.insertAdjacentHTML('beforeend','<canvas id="surface" role="img"></canvas><header><div><div class="name">'+art.id+' / '+art.title+'</div><div class="subtitle">SALVAGE / PARENT '+art.parent+'</div></div><div class="readout"><span id="meter"></span><br><span id="clock"></span></div></header><footer><div id="help"></div><nav aria-label="Artwork controls"><button id="pause" type="button" aria-pressed="false">Pause</button><button id="reset" type="button">Reseed ↗</button><button id="export" type="button">Collect ↓</button></nav></footer><div id="live" role="status" aria-live="polite"></div>');
 const canvas=document.getElementById('surface'),ctx=canvas.getContext('2d',{alpha:false});if(!ctx)return;
 canvas.setAttribute('aria-label',art.aria);
 try{const sk='salvage-seen',sv=JSON.parse(localStorage.getItem(sk)||'{}');sv[art.id]=(sv[art.id]||0)+1;localStorage.setItem(sk,JSON.stringify(sv))}catch(e){}
 const $=id=>document.getElementById(id),reduced=matchMedia('(prefers-reduced-motion: reduce)'),seedBuffer=new Uint32Array(1);
 let state=1,frame=0,last=0,readout=-1,pointerId=null,moved=0;
 const K={canvas,ctx,w:1,h:1,dpr:1,time:0,seed:1,paused:reduced.matches,keys:new Set(),notes:[],TAU:Math.PI*2,
  pointer:{x:-999,y:-999,vx:0,vy:0,speed:0,inside:false,held:false},
  DAMAGE:['#10f4cf','#196fff','#f4d84e','#ed4e8c','#8d78ff','#b7f6ff'],SPECTRUM:['#102cfa','#28e3f4','#e4f2bf','#fe6741','#f1118b','#5920ab']};
 K.rand=()=>{state^=state<<13;state^=state>>>17;state^=state<<5;return(state>>>0)/4294967296};
 K.hash=n=>{const v=Math.sin(n*127.17+K.seed*.00017)*43758.54;return v-Math.floor(v)};
 K.clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
 K.lerp=(a,b,t)=>a+(b-a)*t;
 K.wrap=a=>{a%=K.TAU;return a>Math.PI?a-K.TAU:a<-Math.PI?a+K.TAU:a};
 K.pad=(n,l=3)=>String(Math.max(0,Math.floor(n))).padStart(l,'0');
 K.live=t=>{$('live').textContent=t};
 K.help=html=>{$('help').innerHTML=html};
 K.note=text=>{K.notes.push({text,t:K.time});if(K.notes.length>3)K.notes.shift();K.live(text)};
 // Smoothly interpolated lattice noise, for works that need terrain or weather.
 K.noise=(x,y)=>{const xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi,u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf),c=(i,j)=>K.hash(i*57.1+j*311.7);return K.lerp(K.lerp(c(xi,yi),c(xi+1,yi),u),K.lerp(c(xi,yi+1),c(xi+1,yi+1),u),v)};
 K.help(art.help);
 function seedIt(){crypto.getRandomValues(seedBuffer);K.seed=seedBuffer[0]||1;state=K.seed}
 function render(){
  ctx.setTransform(K.dpr,0,0,K.dpr,0,0);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';ctx.textAlign='left';ctx.textBaseline='alphabetic';ctx.lineWidth=1;
  art.draw(K,ctx);
  ctx.setTransform(K.dpr,0,0,K.dpr,0,0);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';ctx.font='10px monospace';ctx.textAlign='center';ctx.textBaseline='alphabetic';ctx.fillStyle=art.ink||'#faffdb';
  K.notes.forEach((n,k)=>{const age=K.time-n.t;ctx.globalAlpha=K.clamp(Math.min(age*2,(4.5-age)*.8))*.9;ctx.fillText(n.text,K.w/2,K.h*.13+k*16)});
  ctx.textAlign='left';ctx.globalAlpha=1;
  if(art.scanlines!==false){ctx.fillStyle='#01040e22';for(let y=0;y<K.h;y+=4)ctx.fillRect(0,y,K.w,1)}
  if((K.time-readout>.15||K.paused)&&art.readout){readout=K.time;const r=art.readout(K);$('meter').textContent=r[0];$('clock').textContent=r[1]+' / '+new Date(K.time*1000).toISOString().slice(14,21)}
 }
 K.render=render;
 function measure(){K.w=innerWidth;K.h=innerHeight;K.dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(K.w*K.dpr);canvas.height=Math.round(K.h*K.dpr)}
 function resize(){measure();(art.resize||art.reset)(K);render()}
 function queue(){if(!frame&&!K.paused&&!document.hidden)frame=requestAnimationFrame(tick)}
 function tick(now){
  frame=0;const dt=Math.min(Math.max((now-last)||16,0),40)/1000;last=now;K.time+=dt;
  const p=K.pointer,decay=Math.exp(-dt*5);p.speed*=Math.exp(-dt*4);p.vx*=decay;p.vy*=decay;
  art.step(K,dt);while(K.notes.length&&K.time-K.notes[0].t>4.5)K.notes.shift();render();queue();
 }
 function setPaused(v){K.paused=v;const b=$('pause');b.textContent=v?'Resume':'Pause';b.setAttribute('aria-pressed',String(v));K.keys.clear();if(v){cancelAnimationFrame(frame);frame=0;render()}else{last=performance.now();queue()}}
 function reseed(){seedIt();K.time=0;K.notes.length=0;readout=-1;art.reset(K);K.live('New specimen '+K.seed.toString(16));render()}
 function move(e){
  if(!e.isPrimary||(pointerId!==null&&e.pointerId!==pointerId))return;
  const p=K.pointer,now=performance.now(),dt=Math.max(8,now-moved)/1000;moved=now;
  if(p.inside){const dx=e.clientX-p.x,dy=e.clientY-p.y;p.vx=p.vx*.5+dx/dt*.5;p.vy=p.vy*.5+dy/dt*.5;p.speed=Math.min(5,p.speed+Math.hypot(dx,dy)/Math.max(K.w,K.h)*12)}
  p.x=e.clientX;p.y=e.clientY;p.inside=true;if(K.paused)render();
 }
 canvas.addEventListener('pointermove',move,{passive:true});
 canvas.addEventListener('pointerdown',e=>{
  if(!e.isPrimary||e.button!==0||pointerId!==null)return;move(e);
  if(!K.paused&&art.down&&art.down(K,e.clientX,e.clientY)===true)return;
  pointerId=e.pointerId;K.pointer.held=true;canvas.setPointerCapture(e.pointerId);
 });
 function release(e){if(pointerId!==e.pointerId)return;K.pointer.held=false;pointerId=null;if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);if(e.pointerType!=='mouse')K.pointer.inside=false;if(art.up)art.up(K)}
 canvas.addEventListener('pointerup',release);canvas.addEventListener('pointercancel',release);
 canvas.addEventListener('pointerleave',()=>{if(pointerId===null){K.pointer.inside=false;if(K.paused)render()}});
 window.addEventListener('blur',()=>{K.pointer.held=false;pointerId=null;K.keys.clear()});
 $('pause').onclick=()=>setPaused(!K.paused);$('reset').onclick=reseed;
 $('export').onclick=()=>canvas.toBlob(b=>{if(!b)return;const u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download=art.id.toLowerCase()+'-'+K.seed.toString(16)+'.png';a.click();setTimeout(()=>URL.revokeObjectURL(u),30000)},'image/png');
 window.addEventListener('keydown',e=>{
  if(e.ctrlKey||e.metaKey||e.altKey)return;
  if(e.code==='Escape'){setPaused(!K.paused);return}
  const onButton=e.target instanceof Element&&e.target.closest('button');
  if(onButton&&(e.code==='Space'||e.code==='Enter'))return;
  if(/^Arrow/.test(e.code)||e.code==='Space')e.preventDefault();
  if(K.paused){if(e.code==='KeyR'&&!art.letters)reseed();return}
  const fresh=!K.keys.has(e.code);K.keys.add(e.code);
  if(art.key&&art.key(K,e,fresh)===true){e.preventDefault();return}
  if(e.code==='KeyR'&&!e.repeat&&!art.letters)reseed();
 });
 window.addEventListener('keyup',e=>{K.keys.delete(e.code);if(art.keyup)art.keyup(K,e)});
 reduced.addEventListener('change',e=>setPaused(e.matches));
 document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;K.keys.clear()}else{last=performance.now();queue()}});
 seedIt();measure();art.reset(K);window.addEventListener('resize',resize);render();setPaused(K.paused);window.focus();
 return K;
};
})();
