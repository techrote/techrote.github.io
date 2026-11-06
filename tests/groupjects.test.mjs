import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile,stat,mkdir} from 'node:fs/promises';
import {resolve,sep,extname} from 'node:path';
import {chromium} from 'playwright';

const root=process.cwd(),types={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml'};
const server=createServer(async(req,res)=>{
  try{
    const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const target=resolve(root,'.'+path);
    if(target!==root&&!target.startsWith(root+sep)){res.writeHead(403).end();return;}
    const file=(await stat(target)).isDirectory()?resolve(target,'index.html'):target;
    const body=await readFile(file);
    res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream'}).end(body);
  }catch(_){res.writeHead(404).end('Not found');}
});
await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
const url='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const cases=[{width:1600,height:900},{width:1280,height:720},{width:960,height:740},{width:390,height:844},{width:320,height:560},{width:740,height:430}];
const galleryPaths=['shattered-art-stash/','signal-relics/','salvage-apparatus/','salvage-arcade/'];
await mkdir('screenshots/groupjects',{recursive:true});
try{
 for(const vp of cases){
  const page=await browser.newPage({viewport:vp,deviceScaleFactor:1});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  try{
   await page.goto(url+'/',{waitUntil:'load'});
   await page.waitForFunction(()=>document.querySelectorAll('.groupject').length===5);
   assert.deepEqual(errors,[],'Page JavaScript error: '+vp.width);
   const scene=await page.evaluate(()=>{
    const sr=document.querySelector('.scene').getBoundingClientRect();
    const stage=document.querySelector('.stage').getBoundingClientRect();
    return {scrollW:document.documentElement.scrollWidth,scrollH:document.documentElement.scrollHeight,
      docW:document.documentElement.clientWidth,docH:document.documentElement.clientHeight,
      sceneW:sr.width,sceneH:sr.height,stageW:stage.width,stageH:stage.height,
      assetStatus:[...document.querySelectorAll('.art-board img')].map(img=>({loaded:img.complete&&img.naturalWidth>0,src:img.getAttribute('src')})),
      groupCount:document.querySelectorAll('.groupject').length};
   });
   assert.equal(scene.groupCount,5);
   assert.ok(scene.scrollW<=scene.docW+1,'Horizontal scroll '+JSON.stringify({vp,scene}));
   assert.ok(scene.scrollH<=scene.docH+1,'Vertical scroll '+JSON.stringify({vp,scene}));
   assert.ok(scene.sceneW<=scene.stageW && scene.sceneH<=scene.stageH,'Scene exceeds stage '+JSON.stringify({vp,scene}));
   assert.ok(scene.assetStatus.every(x=>x.loaded),'Broken SVG asset '+JSON.stringify(scene.assetStatus));
   const mobile=vp.width<=740;
   assert.equal(await page.locator('.groupject:visible').count(),mobile?1:5,'Visible categories at '+vp.width);
   const count=await page.locator('.groupject a').count();
   assert.ok(count>=25,'Expected functional links, got '+count);
   assert.equal(await page.locator('a[href="relay_moth_beta/"]').count(),1);
   assert.equal(await page.locator('a[href="relay-moth-forest/"],a[href="relay-moth-forest-stable/"]').count(),0);
   assert.equal(await page.locator('.service-bolt').count(),4);
   if(mobile){
     assert.equal(await page.locator('.groupject.is-active').getAttribute('data-id'),'retro');
     for(const [i,group] of ['retro','gaming','cad','calculator','paper'].entries()){
       await page.getByRole('button',{name:'Show '+['Retro graphics','Games & simulations','CAD & design','Calculators & physics','Notes & reference'][i]+' group'}).click();
       assert.equal(await page.locator('.groupject:visible').count(),1);
       assert.equal(await page.locator('.groupject.is-active').getAttribute('data-id'),group);
       await page.screenshot({path:'screenshots/groupjects/'+vp.width+'x'+vp.height+'-'+group+'.png',animations:'disabled'});
     }
   }else{
     await page.screenshot({path:'screenshots/groupjects/'+vp.width+'x'+vp.height+'-scene.png',animations:'disabled'});
   }
   await page.getByRole('button',{name:'GRID'}).click();
   assert.equal(await page.locator('#debug-toggle').getAttribute('aria-pressed'),'true');
   assert.equal(await page.locator('.tile-mask:visible').count(),mobile?1:5);
   await page.getByRole('button',{name:'HINTS'}).click();
   assert.equal(await page.locator('#hints-toggle').getAttribute('aria-pressed'),'true');
   const urls=await page.locator('.service-bolt').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href')));
   assert.deepEqual(urls,galleryPaths);
   for(const path of urls)assert.equal((await page.request.get(url+'/'+path)).status(),200,'Missing linked gallery '+path);
   console.log('PASS viewport '+vp.width+'x'+vp.height+' mode='+await page.locator('.scene').getAttribute('data-mode'));
  }finally{await page.close();}
 }
 const page=await browser.newPage();
 try{
   await page.goto(url+'/directory.html');
   assert.equal(await page.locator('h2').count(),6);
   const all=await page.locator('li a').evaluateAll(links=>links.map(l=>l.getAttribute('href')));
   assert.ok(all.length>=25);
   for(const href of all.filter(h=>!h.startsWith('https:'))){
     assert.equal((await page.request.get(url+'/'+href)).status(),200,'Directory target missing: '+href);
   }
   console.log('PASS directory navigation and all local links');
 }finally{await page.close();}
}finally{
 await browser.close();
 await new Promise(ok=>server.close(ok));
}