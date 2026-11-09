import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { chromium } from 'playwright';

const root = process.cwd();
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8'};
const server = createServer(async (req, res) => {
  try {
    const raw = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const candidate = resolve(root, '.' + raw);
    if (candidate !== root && !candidate.startsWith(root + sep)) { res.writeHead(403).end(); return; }
    const file = (await stat(candidate)).isDirectory() ? resolve(candidate, 'index.html') : candidate;
    const data = await readFile(file);
    const ext = file.slice(file.lastIndexOf('.'));
    res.writeHead(200, {'Content-Type':types[ext] || 'application/octet-stream'});
    res.end(data);
  } catch (_) { res.writeHead(404).end('Missing'); }
});
await new Promise(ok => server.listen(0, '127.0.0.1', ok));
const origin = 'http://127.0.0.1:' + server.address().port;
const browser = await chromium.launch({headless:true,args:['--no-sandbox']});
const paths = ['shattered-art-stash','signal-relics','salvage-apparatus','salvage-arcade'];
const viewports = [
  {width:320,height:240},
  {width:320,height:480},
  {width:390,height:844},
  {width:768,height:500},
  {width:1440,height:900}
];
try {
  for (const name of paths) {
    for (const viewport of viewports) {
      const page = await browser.newPage({viewport});
      try {
        await page.goto(origin + '/' + name + '/', {waitUntil:'domcontentloaded'});
        await page.waitForFunction(() => document.getElementById('frame')?.getAttribute('src')?.endsWith('.html'));
        const result = await page.evaluate(() => {
          const rail = document.querySelector('.rail').getBoundingClientRect();
          const stage = document.querySelector('.stage').getBoundingClientRect();
          const frame = document.querySelector('iframe').getBoundingClientRect();
          return {documentWidth:document.documentElement.scrollWidth,documentHeight:document.documentElement.scrollHeight,
            clientWidth:document.documentElement.clientWidth,clientHeight:document.documentElement.clientHeight,
            railHeight:rail.height,frameTop:frame.top,frameBottom:frame.bottom,frameWidth:frame.width,
            stageHeight:stage.height,selectWidth:document.querySelector('select').getBoundingClientRect().width,
            railOverflow:document.querySelector('.rail').scrollWidth-document.querySelector('.rail').clientWidth};
        });
        assert.ok(result.documentWidth <= result.clientWidth + 1, name + ' horizontal document scroll at ' + JSON.stringify(viewport) + ': ' + JSON.stringify(result));
        assert.ok(result.documentHeight <= result.clientHeight + 1, name + ' vertical document scroll at ' + JSON.stringify(viewport) + ': ' + JSON.stringify(result));
        assert.ok(result.railOverflow <= 1, name + ' clipped toolbar at ' + JSON.stringify(viewport) + ': ' + JSON.stringify(result));
        assert.ok(result.selectWidth >= 45 && result.frameWidth >= viewport.width - 2, name + ' controls/artwork clipped at ' + JSON.stringify(viewport));
        assert.ok(result.frameBottom >= viewport.height - 2 && result.frameTop <= 37 && result.stageHeight > viewport.height - 39, name + ' artwork is not viewport-filling');
        assert.equal(await page.locator('#work-select option').count(), 8);
        await page.selectOption('#work-select', '7');
        assert.match(await page.locator('#frame').getAttribute('src'), /works\/.+\.html$/);
        assert.equal(await page.locator('#count').textContent(), '08 / 08');
        await page.getByRole('button', {name:'Next artwork'}).click();
        assert.equal(await page.locator('#count').textContent(), '01 / 08');
        await page.getByRole('button', {name:'Artwork information'}).click();
        assert.equal(await page.locator('#information').getAttribute('aria-expanded'), 'true');
        assert.equal(await page.locator('#info-panel').isVisible(), true);
      } finally { await page.close(); }
    }
    console.log('PASS ' + name + ' across ' + viewports.length + ' viewport sizes');
  }
  const page = await browser.newPage({viewport:{width:1366,height:768}});
  try {
    await page.goto(origin + '/', {waitUntil:'domcontentloaded'});
    const cards = await page.locator('article.card h3').allTextContents();
    assert.equal(cards.length, 14);
    assert.deepEqual(cards.filter(t => /Relay Moth/i.test(t)), ['Relay Moth Beta']);
    const flatcad = page.locator('article.card').filter({has: page.locator('h3', {hasText: 'flatCAD'})});
    assert.equal(await flatcad.count(), 1, 'flatCAD appears once in the original card layout');
    assert.deepEqual(await flatcad.locator('.actions a').evaluateAll(links => links.map(link => [link.textContent.trim(), link.getAttribute('href')])), [
      ['WEBAPP', 'flatcad/'], ['INFO', 'projects/flatcad.html'], ['GITHUB', 'https://github.com/techrote/flatCAD']
    ]);
    const bolts = await page.locator('.stash-bolt').evaluateAll(nodes => nodes.map(n => ({href:n.getAttribute('href'),label:n.getAttribute('aria-label')})));
    assert.deepEqual(bolts.map(x => x.href), paths.map(p => p + '/'));
    assert.ok(bolts.every(x => x.label?.includes('gallery')));
    for (const link of bolts) {
      const response = await page.request.get(origin + '/' + link.href);
      assert.equal(response.status(), 200, 'Hidden gallery is reachable: ' + link.href);
    }
  } finally { await page.close(); }
  console.log('PASS homepage beta-only cards and 4 discrete hidden gallery entries');
} finally {
  await browser.close();
  await new Promise(ok => server.close(ok));
}
