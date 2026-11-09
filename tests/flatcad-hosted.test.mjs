import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const require = createRequire(new URL('../.flatcad-source/package.json', import.meta.url));
const { chromium } = require('@playwright/test');
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.wasm': 'application/wasm', '.svg': 'image/svg+xml', '.png': 'image/png'
};
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const candidate = resolve(root, '.' + pathname);
    if (candidate !== root && !candidate.startsWith(root + sep)) {
      response.writeHead(403).end(); return;
    }
    const file = (await stat(candidate)).isDirectory() ? resolve(candidate, 'index.html') : candidate;
    response.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' })
      .end(await readFile(file));
  } catch {
    response.writeHead(404).end('Not found');
  }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));

const origin = 'http://127.0.0.1:' + server.address().port;
const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--enable-unsafe-swiftshader', '--use-angle=swiftshader']
});
try {
  const page = await browser.newPage({ acceptDownloads: true, viewport: {width: 1440, height: 900} });
  const pageErrors = [], failedAssets = [], externalRequests = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  page.on('response', response => {
    const url = new URL(response.url());
    if (url.pathname.startsWith('/flatcad/assets/') && response.status() >= 400)
      failedAssets.push(url.pathname + ': ' + response.status());
  });
  page.on('request', request => {
    const url = new URL(request.url());
    if (url.origin !== origin) externalRequests.push(request.url());
  });

  await page.goto(origin + '/', { waitUntil: 'domcontentloaded' });
  const cards = page.locator('article.card');
  assert.equal(await cards.count(), 14);
  const cad = cards.filter({has: page.locator('h3', {hasText: 'flatCAD'})});
  assert.equal(await cad.count(), 1, 'There must be exactly one flatCAD tile');
  await cad.locator('a[href="flatcad/"]').click();
  await page.waitForURL('**/flatcad/');
  await page.waitForFunction(() =>
    document.querySelector('#status')?.textContent?.includes('Exact solid generated'),
    null, {timeout: 120_000});

  const volume = Number(await page.locator('#status').getAttribute('data-volume-mm3'));
  const golden = (100 * 60 - 2 * Math.PI * 5 * 5) * 8;
  assert.ok(Number.isFinite(volume) && Math.abs(volume - golden) < 0.0001,
    'Hosted OpenCascade WASM solid volume must match golden test: ' + volume);

  const downloadPromise = page.waitForEvent('download', {timeout: 120_000});
  await page.locator('[data-menu="file"]').click();
  await page.locator('[data-command="file.step"]').click();
  const download = await downloadPromise;
  assert.match(download.suggestedFilename(), /\.step$/i);
  const step = await readFile(await download.path());
  assert.ok(step.length > 500 && step.subarray(0, 300).toString('utf8').includes('ISO-10303-21'),
    'STEP output must be produced by the actual hosted browser app');

  assert.deepEqual(failedAssets, [], 'All bundled JS/WASM/CSS assets must load under /flatcad/');
  assert.deepEqual(externalRequests, [], 'Local-first app must not fetch third-party resources');
  assert.deepEqual(pageErrors, [], 'Hosted app must not throw browser runtime errors');
  console.log('PASS: IO tile → /flatcad/ → golden OpenCascade solid → STEP export; local assets only');
  await page.close();
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
