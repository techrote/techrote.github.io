import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile,stat,mkdir} from 'node:fs/promises';
import {resolve,sep,extname} from 'node:path';
import {chromium} from 'playwright';

const root=process.cwd(),types={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml'};
const server=createServer(async(req,res)=>{
 try{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=resolve(root,'.'+pathname);
  if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403).end();return;}
  const target=(await stat(file)).isDirectory()?resolve(file,'index.html'):file;
  res.writeHead(200,{'Content-Type':types[extname(target)]||'application/octet-stream'}).end(await readFile(target));
 }catch{res.writeHead(404).end('Not found');}
});
await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const viewports=[{width:2560,height:1440},{width:1672,height:941},{width:1280,height:720},{width:768,height:1024},{width:390,height:844},{width:320,height:568}];
const ids=['retro','gaming','cad','curiosity','calculator','paper'];
await mkdir('screenshots/groupjects',{recursive:true});
try{
 for(const vp of viewports){
  const page=await browser.newPage({viewport:vp,deviceScaleFactor:1});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  try{
   await page.goto(origin+'/',{waitUntil:'domcontentloaded'});
   await page.waitForFunction(()=>document.querySelectorAll('.group').length===6 && document.querySelector('#loading')?.hidden,{timeout:20000});
   assert.deepEqual(errors,[],'Unexpected page error at '+JSON.stringify(vp));
   assert.deepEqual(await page.locator('.group').evaluateAll(els=>els.map(x=>x.dataset.id)),ids);
   assert.equal(await page.locator('.group .target').count(),36);
   const metrics=await page.evaluate(()=>({
     vw:innerWidth,vh:innerHeight,dw:document.documentElement.scrollWidth,dh:document.documentElement.scrollHeight,
     cw:document.documentElement.clientWidth,ch:document.documentElement.clientHeight,
     loaded:[...document.querySelectorAll('.group img')].every(x=>x.complete&&x.naturalWidth>0),
     sprites:document.querySelectorAll('.group img.body-image').length,screens:document.querySelectorAll('.group img.screen-image').length,
     reference:document.querySelector('.reference-layer')?.complete && document.querySelector('.reference-layer')?.naturalWidth>0,
     backdrop:document.querySelector('#backdrop')?.complete && document.querySelector('#backdrop')?.naturalWidth>0
   }));
   assert.ok(metrics.dw<=metrics.cw+1 && metrics.dh<=metrics.ch+1,'Unexpected page scrollbar: '+JSON.stringify(metrics));
   assert.ok(metrics.loaded && metrics.backdrop && metrics.reference,'Image load failure: '+JSON.stringify(metrics));
   assert.equal(metrics.sprites,6);assert.equal(metrics.screens,4);

   const picker=page.locator('#theme-select');
   assert.equal(await picker.isVisible(),true,'Theme control must be visible at '+vp.width);
   assert.deepEqual(await picker.locator('option').evaluateAll(opts=>opts.map(o=>o.value)),['industrial','photographic','cutout','lineart','inkblank','inktextured']);
   assert.equal(await picker.inputValue(),'inktextured','New visitors should receive the textured technical theme by default');
   assert.equal(await page.locator('#app').getAttribute('data-theme'),'inktextured');
   const box=await picker.boundingBox();
   assert.ok(box&&box.x>=0&&box.x+box.width<=vp.width+1,'Theme selector outside viewport: '+JSON.stringify({vp,box}));
   const beforeLinks=await page.locator('.group .target').evaluateAll(els=>els.map(x=>[x.getAttribute('href'),x.style.left,x.style.top,x.style.width,x.style.height]));
   const beforeTransform=await page.locator('#world').evaluate(x=>x.style.transform);
   await picker.selectOption('photographic');
   await page.waitForFunction(()=>[...document.querySelectorAll('.group img,#backdrop')].every(img=>img.complete&&img.naturalWidth>0));
   assert.equal(await page.locator('#app').getAttribute('data-theme'),'photographic');
   const photography=await page.evaluate(()=>({
     backdrop:document.querySelector('#backdrop').getAttribute('src'),
     parts:[...document.querySelectorAll('.group .body-image')].map(x=>x.getAttribute('src')),
     screens:[...document.querySelectorAll('.group .screen-image')].map(x=>x.getAttribute('src'))
   }));
   assert.equal(photography.backdrop,'scene/themes/photographic/backdrop.webp');
   assert.equal(photography.parts.length,6);
   assert.equal(photography.screens.length,4);
   assert.ok(photography.parts.every(x=>x.startsWith('scene/themes/photographic/parts/')));
   assert.ok(photography.screens.every(x=>x.startsWith('scene/themes/photographic/screens/')));
   assert.deepEqual(await page.locator('.group .target').evaluateAll(els=>els.map(x=>[x.getAttribute('href'),x.style.left,x.style.top,x.style.width,x.style.height])),beforeLinks);
   assert.equal(await page.locator('#world').evaluate(x=>x.style.transform),beforeTransform);
   await page.screenshot({path:'screenshots/groupjects/'+vp.width+'x'+vp.height+'-photographic.png',animations:'disabled'});
   if(vp.width===2560||vp.width===390){
     await page.reload({waitUntil:'domcontentloaded'});
     await page.waitForFunction(()=>document.querySelector('#loading')?.hidden&&document.querySelector('#app')?.dataset.theme==='photographic');
     assert.equal(await picker.inputValue(),'photographic','Theme should persist across reload');
     await page.waitForFunction(()=>[...document.querySelectorAll('.group img,#backdrop')].every(img=>img.complete&&img.naturalWidth>0));
   }
   await picker.selectOption('cutout');
   await page.waitForFunction(()=>document.querySelector('#app')?.dataset.theme==='cutout'&&[...document.querySelectorAll('.group img,#backdrop')].every(img=>img.complete&&img.naturalWidth>0));
   const clean=await page.evaluate(()=>({
      backdrop:document.querySelector('#backdrop').getAttribute('src'),
      parts:[...document.querySelectorAll('.group .body-image')].map(x=>({src:x.getAttribute('src'),width:x.naturalWidth,height:x.naturalHeight})),
      calculatorScreen:document.querySelector('.group[data-id="calculator"] .screen-image').getAttribute('src'),
      calculatorRect:[...['left','top','width','height'].map(k=>document.querySelector('.group[data-id="calculator"] .screen-image').style[k])],
      links:[...document.querySelectorAll('.group .target')].map(x=>[x.getAttribute('href'),x.style.left,x.style.top,x.style.width,x.style.height])
   }));
   assert.equal(clean.backdrop,'scene/themes/cutout/backdrop.webp');
   assert.equal(clean.parts.length,6);
   assert.ok(clean.parts.every(x=>x.src.startsWith('scene/themes/cutout/parts/')&&x.width>0&&x.height>0));
   assert.equal(clean.calculatorScreen,'scene/themes/photographic/screens/calculator.webp');
   assert.deepEqual(clean.calculatorRect,['86px','42px','264px','110px']);
   assert.deepEqual(clean.links,beforeLinks,'The new theme must not shift project/gallery hotspots');
   assert.equal(await page.locator('#world').evaluate(x=>x.style.transform),beforeTransform);
   await page.screenshot({path:'screenshots/groupjects/'+vp.width+'x'+vp.height+'-cutout.png',animations:'disabled'});
   if(vp.width===2560||vp.width===390){
     await page.reload({waitUntil:'domcontentloaded'});
     await page.waitForFunction(()=>document.querySelector('#loading')?.hidden&&document.querySelector('#app')?.dataset.theme==='cutout');
     assert.equal(await picker.inputValue(),'cutout','Third theme should persist across reload');
   }

   await picker.selectOption('lineart');
   await page.waitForFunction(()=>document.querySelector('#app')?.dataset.theme==='lineart'&&[...document.querySelectorAll('.group img,#backdrop')].every(img=>img.complete&&img.naturalWidth>0));
   const ink=await page.evaluate(()=>({
     backdrop:document.querySelector('#backdrop').getAttribute('src'),
     parts:[...document.querySelectorAll('.group .body-image')].map(x=>({src:x.getAttribute('src'),width:x.naturalWidth,height:x.naturalHeight})),
     screens:[...document.querySelectorAll('.group .screen-image')].map(x=>x.getAttribute('src')),
     calculatorRect:['left','top','width','height'].map(k=>document.querySelector('.group[data-id="calculator"] .screen-image').style[k]),
     links:[...document.querySelectorAll('.group .target')].map(x=>[x.getAttribute('href'),x.style.left,x.style.top,x.style.width,x.style.height])
   }));
   assert.equal(ink.backdrop,'scene/themes/lineart/backdrop.svg');
   assert.equal(ink.parts.length,6);
   assert.ok(ink.parts.every(x=>x.src.startsWith('scene/themes/lineart/parts/')&&x.src.endsWith('.svg')&&x.width>0&&x.height>0),'All six component assets must be real SVG images');
   assert.equal(ink.screens.length,4);
   assert.ok(ink.screens.every(x=>x.startsWith('scene/themes/lineart/screens/')&&x.endsWith('.svg')));
   assert.deepEqual(ink.calculatorRect,['83px','44px','272px','115px']);
   assert.deepEqual(ink.links,beforeLinks,'Line art must preserve all 36 project/gallery destinations and coordinates');
   // Regression: line-art SVGs must contain transparent interior spaces, not opaque
   // black cutout silhouettes. A broken all-black SVG can load and still pass image checks.
   if(vp.width===1672){
     const alphaCoverage=await page.evaluate(()=>{
       return [...document.querySelectorAll('.group')].map(group=>{
         const img=group.querySelector('.body-image');
         const canvas=document.createElement('canvas');
         canvas.width=192;canvas.height=192;
         const context=canvas.getContext('2d',{willReadFrequently:true});
         context.drawImage(img,0,0,192,192);
         const rgba=context.getImageData(0,0,192,192).data;
         let opaque=0;
         for(let i=3;i<rgba.length;i+=4)if(rgba[i]>=128)opaque++;
         return {id:group.dataset.id,coverage:opaque/(192*192)};
       });
     });
     assert.equal(alphaCoverage.length,6);
     for(const {id,coverage} of alphaCoverage)
       assert.ok(coverage>0.025&&coverage<0.40,
         'Technical Ink asset '+id+' has opaque silhouette or missing linework (coverage '+coverage+')');
     console.log('PASS Technical Ink alpha transparency: '+alphaCoverage.map(x=>x.id+' '+Math.round(100*x.coverage)+'%').join(', '));
   }
   assert.equal(await page.locator('#world').evaluate(x=>x.style.transform),beforeTransform);
   await page.screenshot({path:'screenshots/groupjects/'+vp.width+'x'+vp.height+'-lineart.png',animations:'disabled'});
   if(vp.width===2560||vp.width===390){
     await page.reload({waitUntil:'domcontentloaded'});
     await page.waitForFunction(()=>document.querySelector('#loading')?.hidden&&document.querySelector('#app')?.dataset.theme==='lineart');
     assert.equal(await picker.inputValue(),'lineart','Technical Ink selection must persist across reload');
     await page.waitForFunction(()=>[...document.querySelectorAll('.group img,#backdrop')].every(img=>img.complete&&img.naturalWidth>0));
   }
   // Blank-panel ink: six independently replaceable SVG hardware drawings with
   // black outlines, no textual or diagrammatic content in any artwork or screen.
   await picker.selectOption('inkblank');
   await page.waitForFunction(()=>document.querySelector('#app')?.dataset.theme==='inkblank'&&
     [...document.querySelectorAll('.group img,#backdrop')].every(img=>img.complete&&img.naturalWidth>0));
   const blanks=await page.evaluate(()=>({
     backdrop:document.querySelector('#backdrop').getAttribute('src'),
     parts:[...document.querySelectorAll('.group .body-image')].map(img=>img.getAttribute('src')),
     screens:[...document.querySelectorAll('.group .screen-image')].map(img=>img.getAttribute('src')),
     links:[...document.querySelectorAll('.group .target')].map(x=>[x.getAttribute('href'),x.style.left,x.style.top,x.style.width,x.style.height])
   }));
   assert.equal(blanks.backdrop,'scene/themes/inkblank/backdrop.svg');
   assert.equal(blanks.parts.length,6);
   assert.ok(blanks.parts.every(x=>x.startsWith('scene/themes/inkblank/parts/')&&x.endsWith('.svg')));
   assert.equal(blanks.screens.length,4);
   assert.ok(blanks.screens.every(x=>x.startsWith('scene/themes/inkblank/screens/')&&x.endsWith('.svg')));
   // The blank artwork has different panel geometry: URLs must be identical,
   // but all 36 hitboxes must resolve to their specific Blank Panels overrides.
   assert.deepEqual(blanks.links.map(x=>x[0]),beforeLinks.map(x=>x[0]),
     'Blank Panels must preserve the project and gallery destinations');
   const expectedBlank=JSON.parse((await (await page.request.get(origin+'/scene/scene.json')).text())).themes.inkblank.hotspotRects;
   const actualBlank=await page.locator('.group').evaluateAll(groups=>Object.fromEntries(groups.map(group=>[
     group.dataset.id,Object.fromEntries([...group.querySelectorAll('.target')].map(link=>[
       link.dataset.id,['left','top','width','height'].map(prop=>link.style[prop])
     ]))
   ])));
   for(const [group,links] of Object.entries(expectedBlank))
     for(const [id,rect] of Object.entries(links))
       assert.deepEqual(actualBlank[group]?.[id],rect.map(x=>x+'px'),
         'Wrong blank panel link geometry: '+group+'/'+id);
   assert.equal(Object.values(expectedBlank).reduce((n,m)=>n+Object.keys(m).length,0),36);
   assert.notDeepEqual(blanks.links,beforeLinks,
     'Blank Panels geometry must differ from the source photographs');
   if(vp.width===1672){
     // Confirm actual browser hit-testing: a pointer placed at every link centre
     // must resolve to that link, not an overlapping piece of invisible art.
     const hitResults=await page.evaluate(()=>[...document.querySelectorAll('.group .target')].map(link=>{
       const b=link.getBoundingClientRect(),x=b.left+b.width/2,y=b.top+b.height/2;
       const hit=document.elementFromPoint(x,y)?.closest('a.target');
       return {id:link.dataset.id,expected:link.dataset.id,got:hit?.dataset.id,
         bounds:[x,y,b.width,b.height],inside:x>=0&&y>=0&&x<=innerWidth&&y<=innerHeight};
     }));
     const unreachable=hitResults.filter(x=>!x.inside||x.got!==x.expected);
     assert.deepEqual(unreachable,[],'Blank Panels pointers blocked by artwork or misplaced');
     await page.locator('[data-command="hints"]').click();
     await page.screenshot({path:'screenshots/groupjects/1672x941-inkblank-hitboxes.png',animations:'disabled'});
     await page.locator('[data-command="hints"]').click();
     console.log('PASS Blank Panels: 36 clickable centres hit, no blocked hotspots');
   }
   assert.equal(await page.locator('#world').evaluate(x=>x.style.transform),beforeTransform);
   if(vp.width===1672){
     const opacity=await page.evaluate(()=>[...document.querySelectorAll('.group')].map(g=>{
       const img=g.querySelector('.body-image'),c=document.createElement('canvas');
       c.width=192;c.height=192;const ctx=c.getContext('2d',{willReadFrequently:true});
       ctx.drawImage(img,0,0,192,192);
       const bytes=ctx.getImageData(0,0,192,192).data;let count=0;
       for(let i=3;i<bytes.length;i+=4)if(bytes[i]>=128)count++;
       return {id:g.dataset.id,coverage:count/(192*192)};
     }));
     for(const {id,coverage} of opacity)
       assert.ok(coverage>0.015 && coverage<0.35,
         'Blank Technical Ink drawing '+id+' is empty or opaque silhouette: '+coverage);
     for(const asset of [...blanks.parts,...blanks.screens]){
       const response=await page.request.get(origin+'/'+asset);
       assert.equal(response.status(),200,'Missing vector layer: '+asset);
       const source=await response.text();
       assert.match(source,/<svg\b/,'Not SVG: '+asset);
       assert.doesNotMatch(source,/<(?:text|image|foreignObject)\b/i,'Artwork embeds content rather than vector linework: '+asset);
       if(asset.includes('/screens/'))assert.doesNotMatch(source,/<(?:path|rect|polygon|circle|line|polyline)\b/i,
         'Screen overlay must be empty and not cover blank panel: '+asset);
     }
     console.log('PASS blank ink vector alpha & empty panel tests: '+
       opacity.map(x=>x.id+' '+Math.round(x.coverage*100)+'%').join(', '));
   }
   await page.screenshot({path:'screenshots/groupjects/'+vp.width+'x'+vp.height+'-inkblank.png',animations:'disabled'});
   if(vp.width===2560||vp.width===390){
     await page.reload({waitUntil:'domcontentloaded'});
     await page.waitForFunction(()=>document.querySelector('#loading')?.hidden&&document.querySelector('#app')?.dataset.theme==='inkblank');
     assert.equal(await picker.inputValue(),'inkblank','Blank theme should persist across reload');
     await page.waitForFunction(()=>[...document.querySelectorAll('.group img,#backdrop')].every(img=>img.complete&&img.naturalWidth>0));
   }
   // Sixth appearance: new textured vector equipment is the default for visitors
   // without a saved preference. All Blank Panels hitboxes carry forward unmodified.
   await picker.selectOption('inktextured');
   await page.waitForFunction(()=>document.querySelector('#app')?.dataset.theme==='inktextured' &&
     [...document.querySelectorAll('.group img,#backdrop')].every(img=>img.complete&&img.naturalWidth>0));
   const textured=await page.evaluate(()=>({
     backdrop:document.querySelector('#backdrop').getAttribute('src'),
     parts:[...document.querySelectorAll('.group .body-image')].map(x=>({src:x.getAttribute('src'),w:x.naturalWidth,h:x.naturalHeight})),
     screens:[...document.querySelectorAll('.group .screen-image')].map(x=>x.getAttribute('src')),
     links:[...document.querySelectorAll('.group .target')].map(x=>[x.getAttribute('href'),x.style.left,x.style.top,x.style.width,x.style.height]),
     world:document.querySelector('#world').style.transform
   }));
   assert.equal(textured.backdrop,'scene/themes/inktextured/backdrop.svg');
   assert.equal(textured.parts.length,6);
   assert.ok(textured.parts.every(x=>x.src.startsWith('scene/themes/inktextured/parts/')&&x.src.endsWith('.svg')&&x.w>0&&x.h>0));
   assert.deepEqual(textured.screens,blanks.screens,'Keep the exact empty interface overlays');
   assert.deepEqual(textured.links,blanks.links,'Textured theme must inherit all Blank Panels hitboxes');
   assert.equal(textured.world,beforeTransform);
   if(vp.width===1672){
     const samples=await page.evaluate(()=>[...document.querySelectorAll('.group .body-image')].map(img=>{
       const canvas=document.createElement('canvas');canvas.width=192;canvas.height=192;
       const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(img,0,0,192,192);
       const pixel=ctx.getImageData(0,0,192,192).data;
       let opaque=0,filled=0,uncolored=0;
       for(let i=0;i<pixel.length;i+=4){if(pixel[i+3]>200){opaque++;if(pixel[i]>35&&pixel[i+1]>35&&pixel[i+2]>35)filled++;if(pixel[i]>230&&pixel[i+1]>230&&pixel[i+2]>230)uncolored++;}}
       return {opaque,filled,uncolored};
     }));
     assert.ok(samples.every(x=>x.opaque>2000&&x.filled>500),
       'Textured bodies must be opaque material-filled vectors, not empty lines or solid black silhouettes');
     const blocked=await page.evaluate(()=>[...document.querySelectorAll('.group .target')].filter(link=>{
       const b=link.getBoundingClientRect(),x=b.left+b.width/2,y=b.top+b.height/2;
       const target=document.elementFromPoint(x,y)?.closest('a.target');
       return target!==link;
     }).map(link=>link.dataset.id));
     assert.deepEqual(blocked,[],'All textured-theme links must remain pointer reachable');
     console.log('PASS new textured vector theme with material fill and 36 reachable links');
   }
   await page.screenshot({path:'screenshots/groupjects/'+vp.width+'x'+vp.height+'-inktextured.png',animations:'disabled'});
   if(vp.width===2560||vp.width===390){
     await page.reload({waitUntil:'domcontentloaded'});
     await page.waitForFunction(()=>document.querySelector('#loading')?.hidden &&
       document.querySelector('#app')?.dataset.theme==='inktextured');
     assert.equal(await picker.inputValue(),'inktextured','Textured theme should persist across reload');
   }
   // Switching themes must not leave a previous theme's pixels or hotspot geometry active.
   await picker.selectOption('industrial');
   await page.waitForFunction(()=>document.querySelector('#app')?.dataset.theme==='industrial'&&[...document.querySelectorAll('.group img,#backdrop')].every(img=>img.complete&&img.naturalWidth>0));
   assert.equal(await page.locator('#backdrop').getAttribute('src'),'scene/backdrop/cleanplate.webp');
   assert.ok((await page.locator('.group .body-image').evaluateAll(imgs=>imgs.map(x=>x.getAttribute('src')))).every(x=>x.startsWith('scene/parts/')));
   assert.deepEqual(await page.locator('.group .target').evaluateAll(els=>els.map(x=>[x.getAttribute('href'),x.style.left,x.style.top,x.style.width,x.style.height])),beforeLinks);

   const paths=await page.locator('.target').evaluateAll(els=>els.map(x=>x.getAttribute('href')));
   for(const target of ['relay_moth_beta/','xenofield/','shattered-art-stash/','signal-relics/','salvage-apparatus/','salvage-arcade/','thermopipe_parameter_suite.html','directory.html'])assert.ok(paths.includes(target),'Missing hotspot '+target);
   assert.ok(!paths.includes('relay-moth-forest/')&&!paths.includes('relay-moth-forest-stable/'));
   await page.screenshot({path:`screenshots/groupjects/${vp.width}x${vp.height}-workshop.png`,animations:'disabled'});
   await page.locator('[data-command="hints"]').click();assert.equal(await page.locator('#hints').getAttribute('aria-pressed'),'true');
   await page.locator('[data-command="grid"]').click();assert.equal(await page.locator('#grid').getAttribute('aria-pressed'),'true');
   const compare=page.locator('[data-command="reference"]');
   if(vp.width<=420){
     assert.equal(await compare.isVisible(),false,'COMPARE should be hidden on narrow screens');
     await page.keyboard.press('r');
     assert.equal(await compare.getAttribute('aria-pressed'),'true','R shortcut should enable comparison');
     assert.equal(await page.locator('.reference-layer').isVisible(),true);
     await page.keyboard.press('r');
     assert.equal(await compare.getAttribute('aria-pressed'),'false','R shortcut should disable comparison');
     assert.equal(await page.locator('.reference-layer').isVisible(),false);
   }else{
     assert.equal(await compare.isVisible(),true);
     await compare.click();
     assert.equal(await compare.getAttribute('aria-pressed'),'true');
     assert.equal(await page.locator('.reference-layer').isVisible(),true);
     await compare.click();
     assert.equal(await compare.getAttribute('aria-pressed'),'false');
     assert.equal(await page.locator('.reference-layer').isVisible(),false);
   }
   await page.locator('[data-command="edit"]').click();assert.equal(await page.locator('#edit').getAttribute('aria-pressed'),'true');
   assert.equal(await page.locator('#inspector').isVisible(),true);
   await page.locator('#object-picker').selectOption('cad');
   await page.locator('#obj-x').fill('449');await page.locator('#obj-x').dispatchEvent('change');
   assert.equal(await page.locator('.group[data-id="cad"]').evaluate(x=>x.style.left),'449px');
   assert.ok((await page.evaluate(()=>localStorage.getItem('techrote-io:workshop-layout-v2')))?.includes('449'));
   await page.locator('[data-command="edit"]').click({force:true});
   console.log('PASS '+vp.width+'x'+vp.height+' — six image layers, links, controls and editor');
  }finally{await page.close();}
 }
 const page=await browser.newPage();
 try{
  await page.goto(origin+'/directory.html');
  assert.ok(await page.getByText('Hidden galleries').count());
  const links=await page.locator('main li a').evaluateAll(els=>els.map(x=>x.getAttribute('href')));
  for(const target of links.filter(x=>!/^https:/.test(x)))assert.equal((await page.request.get(origin+'/'+target)).status(),200,'Broken local directory target '+target);
  console.log('PASS direct text directory');
 }finally{await page.close();}
}finally{await browser.close();await new Promise(ok=>server.close(ok));}
