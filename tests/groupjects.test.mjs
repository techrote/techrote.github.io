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
   const paths=await page.locator('.target').evaluateAll(els=>els.map(x=>x.getAttribute('href')));
   for(const target of ['relay_moth_beta/','xenofield/','shattered-art-stash/','signal-relics/','salvage-apparatus/','salvage-arcade/','thermopipe_parameter_suite.html','directory.html'])assert.ok(paths.includes(target),'Missing hotspot '+target);
   assert.ok(!paths.includes('relay-moth-forest/')&&!paths.includes('relay-moth-forest-stable/'));
   await page.screenshot({path:`screenshots/groupjects/${vp.width}x${vp.height}-workshop.png`,animations:'disabled'});
   await page.locator('[data-command="hints"]').click();assert.equal(await page.locator('#hints').getAttribute('aria-pressed'),'true');
   await page.locator('[data-command="grid"]').click();assert.equal(await page.locator('#grid').getAttribute('aria-pressed'),'true');
   await page.locator('[data-command="reference"]').click({force:true});assert.equal(await page.locator('#reference').getAttribute('aria-pressed'),'true');
   await page.locator('[data-command="reference"]').click({force:true});assert.equal(await page.locator('#reference').getAttribute('aria-pressed'),'false');
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
