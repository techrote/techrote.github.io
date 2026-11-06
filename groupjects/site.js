/* Groupject renderer: layout/hotspots in data.js, artwork in independent SVG files. */
(() => {
  'use strict';
  const groups = window.GROUPJECTS;
  const scene = document.getElementById('scene');
  const mobileNav = document.getElementById('mobile-nav');
  if (!Array.isArray(groups) || groups.length !== 5) throw new Error('Expected five groupjects');
  const sizes = {wide:[24,14], compact:[20,14], mobile:[12,14]};
  const entries = [];
  let mode = '', current = 0, debug = false, hints = false;
  const external = url => /^https:\/\//.test(url);
  function bounds(node, values) {
    const x=values[0],y=values[1],w=values[2],h=values[3];
    Object.assign(node.style, {left:x+'%',top:y+'%',width:w+'%',height:h+'%'});
  }
  function anchor(label,url,description) {
    const link = document.createElement('a');
    link.href = url;
    link.textContent = label;
    link.title = description || label;
    link.setAttribute('aria-label',description ? label + ' — ' + description : label);
    if (external(url)) { link.target='_blank';link.rel='noopener noreferrer'; }
    return link;
  }
  function addMask(host,g) {
    const grid=document.createElement('div');
    grid.className='tile-mask';
    grid.style.gridTemplateColumns='repeat('+g.mask[0].length+',1fr)';
    grid.style.gridTemplateRows='repeat('+g.mask.length+',1fr)';
    for (const row of g.mask) for (const cell of row) {
      const c=document.createElement('span');
      if (cell!=='#') c.style.visibility='hidden';
      else c.className='occupied';
      grid.appendChild(c);
    }
    host.appendChild(grid);
  }
  function build(g) {
    const host=document.createElement('section');
    host.className='groupject';host.dataset.id=g.id;
    host.setAttribute('aria-label',g.title+' projects');
    const board=document.createElement('div');board.className='art-board';
    const img=document.createElement('img');
    img.src=g.asset;img.alt='';img.decoding='async';img.loading='eager';
    board.appendChild(img);
    if (g.screen) {
      const screen=document.createElement('div');
      screen.className='display '+g.screen.kind;
      bounds(screen,g.screen.bounds);
      screen.style.setProperty('--link-cols',String(g.screen.cols));
      const heading=document.createElement('div');
      heading.className='display-head';heading.textContent=g.screen.heading;
      const links=document.createElement('div');links.className='display-links';
      for(const tuple of g.projects)links.appendChild(anchor(tuple[0],tuple[1],tuple[2]));
      screen.append(heading,links);board.appendChild(screen);
    }
    if (g.paperLinks) for (const tuple of g.paperLinks) {
      const link=anchor(tuple[0],tuple[1],tuple[3]);link.className='paper-link';
      bounds(link,tuple[2]);board.appendChild(link);
    }
    if (g.hatch) {
      const hatch=document.createElement('nav');hatch.className='service-hatch';
      hatch.setAttribute('aria-label','Unmarked service plate');
      bounds(hatch,g.hatch.bounds);
      g.hatch.links.forEach((tuple,i)=>{
        const bolt=anchor('−',tuple[1],'Hidden gallery: '+tuple[0]);
        bolt.className='service-bolt';bolt.title=tuple[0];
        bolt.setAttribute('aria-label','Open hidden '+tuple[0]+' gallery via '+['upper left','upper right','lower left','lower right'][i]+' fastener');
        hatch.appendChild(bolt);
      });
      board.appendChild(hatch);
    }
    host.appendChild(board);
    addMask(host,g);
    const identifier=document.createElement('span');identifier.className='debug-label';host.appendChild(identifier);
    const label=document.createElement('span');label.className='group-title';
    label.textContent=g.title.toUpperCase();host.appendChild(label);
    scene.appendChild(host);
    return {g,host,board,identifier};
  }
  for (const g of groups)entries.push(build(g));
  groups.forEach((g,i)=>{
    const btn=document.createElement('button');btn.type='button';
    btn.textContent=['RETRO','GAMES','CAD','LAB','NOTES'][i];
    btn.title=g.title;btn.setAttribute('aria-label','Show '+g.title+' group');
    btn.addEventListener('click',()=>select(i));mobileNav.appendChild(btn);
  });
  function updateSelection() {
    entries.forEach((item,i)=>item.host.classList.toggle('is-active',i===current));
    Array.from(mobileNav.children).forEach((btn,i)=>btn.setAttribute('aria-current',String(i===current)));
  }
  function select(index) { current=(index+groups.length)%groups.length;updateSelection(); }
  function resize() {
    const next=window.innerWidth<=740?'mobile':window.innerWidth<=1100?'compact':'wide';
    mode=next;
    const cols=sizes[next][0],rows=sizes[next][1];
    const available=scene.parentElement.getBoundingClientRect();
    const width=Math.max(1,Math.min(available.width-10,(available.height-10)*cols/rows));
    const height=width*rows/cols;
    scene.style.width=width+'px';scene.style.height=height+'px';
    scene.style.setProperty('--cols',String(cols));
    scene.style.setProperty('--rows',String(rows));
    scene.dataset.mode=next;
    for (const item of entries) {
      const g=item.g,host=item.host,board=item.board,identifier=item.identifier;
      const rect=g[next],x=rect[0],y=rect[1],w=rect[2],h=rect[3];
      Object.assign(host.style,{left:(x/cols*100)+'%',top:(y/rows*100)+'%',width:(w/cols*100)+'%',height:(h/rows*100)+'%'});
      const cw=width*w/cols,ch=height*h/rows;
      const dw=Math.min(cw,ch*g.aspect),dh=dw/g.aspect;
      board.style.width=Math.max(0,dw)+'px';
      board.style.height=Math.max(0,dh)+'px';
      identifier.textContent=g.id+' / '+x+','+y+' '+w+'×'+h;
    }
    updateSelection();
  }
  const debugBtn=document.getElementById('debug-toggle');
  const hintsBtn=document.getElementById('hints-toggle');
  function setDebug(value) {
    debug=value;document.body.classList.toggle('debug',value);
    debugBtn.setAttribute('aria-pressed',String(value));
  }
  function setHints(value) {
    hints=value;document.body.classList.toggle('hints',value);
    hintsBtn.setAttribute('aria-pressed',String(value));
  }
  debugBtn.addEventListener('click',()=>setDebug(!debug));
  hintsBtn.addEventListener('click',()=>setHints(!hints));
  document.addEventListener('keydown',event=>{
    if(event.altKey||event.ctrlKey||event.metaKey||event.defaultPrevented)return;
    const tag=event.target && event.target.tagName;
    if(tag==='INPUT'||tag==='TEXTAREA'||tag==='SELECT'||tag==='BUTTON')return;
    const key=event.key.toLowerCase();
    if(key==='g'){setDebug(!debug);return;}
    if(key==='h'){setHints(!hints);return;}
    if(mode==='mobile'&&(event.key==='ArrowRight'||event.key==='ArrowLeft')){
      select(current+(event.key==='ArrowRight'?1:-1));event.preventDefault();
    }
  });
  if(new URLSearchParams(location.search).get('layout-debug')==='1')setDebug(true);
  window.addEventListener('resize',resize,{passive:true});
  if(window.ResizeObserver)new ResizeObserver(resize).observe(scene.parentElement);
  resize();
})();