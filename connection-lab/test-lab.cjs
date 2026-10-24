/* Exercise the real controller with a deterministic clock and fake network. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const crypto = require('node:crypto');

function harness(plan = () => ({})) {
  let now = 100, next = 0, downloads = [], requests = [], blobs = new Map(), timers = new Map();
  class Element {
    constructor(id) { this.id = id; this.handlers = {}; this.children = []; this.value = ''; this.checked = false; this.dataset = {}; this.clientWidth = 600; this.classList = { add() {}, remove() {}, toggle() {} }; }
    addEventListener(name, fn) { this.handlers[name] = fn; }
    appendChild(el) { this.children.push(el); return el; }
    removeChild(el) { this.children.splice(this.children.indexOf(el), 1); }
    setAttribute() {}
    click() { if (this.download) downloads.push(blobs.get(this.href)); return this.handlers.click && this.handlers.click(); }
    remove() {}
    get firstChild() { return this.children[0]; }
    getContext() { return new Proxy({}, { get: () => () => {} }); }
    set textContent(value) { this.text = value; this.children = []; }
    get textContent() { return this.text; }
  }
  const elements = new Map(), get = id => { if (!elements.has(id)) elements.set(id, new Element(id)); return elements.get(id); };
  get('duration').value = '60'; get('streams').value = '4'; get('budget').value = '100';
  const modes = ['browse', 'download', 'upload', 'duplex'].map(mode => { const el = new Element(mode); el.dataset.mode = mode; return el; });
  function schedule(fn, ms, interval = 0) { const id = ++next; timers.set(id, { fn, due: now + ms, interval }); return id; }
  class XHR {
    constructor() { this.upload = {}; this.status = 0; this.done = false; this.tasks = []; }
    open(method, url) { this.method = method; this.url = url; }
    send(body) {
      this.body = body; requests.push(this);
      const cfg = plan(this, requests.length), expected = body ? body.size : this.url.includes('block.bin') ? 2000000 : 100;
      const target = body ? this.upload : this;
      const later = (fn, ms) => this.tasks.push(schedule(() => { if (!this.done) fn(); }, ms));
      if (cfg.partial) later(() => target.onprogress && target.onprogress({ loaded: cfg.partial }), 10);
      if (!cfg.pending) later(() => {
        this.status = cfg.status || 200;
        const size = cfg.size === undefined ? expected : cfg.size;
        if (cfg.networkError) { this.done = true; this.onerror(); return; }
        if (target.onprogress) target.onprogress({ loaded: size });
        if (body && this.upload.onload) this.upload.onload();
        this.response = new Blob([new Uint8Array(body ? 2 : size)]); this.done = true; this.onload();
      }, cfg.delay || 20);
    }
    abort() { if (this.done) return; this.done = true; this.tasks.forEach(id => timers.delete(id)); if (this.onabort) this.onabort(); }
  }
  const document = { getElementById: get, querySelectorAll: selector => selector === '.mode' ? modes : modes.concat([get('duration'), get('streams'), get('budget'), get('countdown')]), createElement: id => new Element(id), body: new Element('body'), addEventListener() {}, hidden: false };
  const window = { devicePixelRatio: 1, addEventListener() {}, connectionLabAssets: { images: [{ file: 'art.jpg', size: 100, title: 'Art', text: 'Example' }], articles: [{ file: 'article.json', size: 100 }] } };
  const context = vm.createContext({ document, window, navigator: { userAgent: 'simulated-test-browser' }, performance: { now: () => now }, XMLHttpRequest: XHR, Blob, Uint8Array, crypto: crypto.webcrypto, URL: { createObjectURL: blob => { const url = 'blob:' + (++next); blobs.set(url, blob); return url; }, revokeObjectURL: url => blobs.delete(url) }, setTimeout: (fn, ms) => schedule(fn, ms), clearTimeout: id => timers.delete(id), setInterval: (fn, ms) => schedule(fn, ms, ms), clearInterval: id => timers.delete(id), console });
  vm.runInContext(fs.readFileSync(__dirname + '/lab.js', 'utf8'), context);
  async function flush() { for (let i = 0; i < 12; i++) await Promise.resolve(); }
  async function tick(ms) {
    const end = now + ms; await flush();
    for (let guard = 0; guard < 10000; guard++) {
      const item = [...timers].filter(([, t]) => t.due <= end).sort((a, b) => a[1].due - b[1].due)[0];
      if (!item) { now = end; await flush(); return; }
      const [id, timer] = item; now = timer.due;
      if (timer.interval) timer.due += timer.interval; else timers.delete(id);
      timer.fn(); await flush();
    }
    throw Error('Clock did not settle');
  }
  return { get, requests, tick, start(mode) { modes.find(el => el.dataset.mode === mode).click(); return get('start').click(); }, stop() { get('stop').click(); }, async report() { get('save').click(); return JSON.parse(await downloads[downloads.length - 1].text()); } };
}

(async () => {
  {
    const h = harness(), done = h.start('download'); await h.tick(1000); await done;
    const r = await h.report(); assert.equal(r.reason, 'Data budget reached'); assert.equal(r.download_bytes, 100000000);
    assert.equal(h.requests.length, 50); assert.equal(new Set(h.requests.map(r => r.url)).size, 50);
    assert.equal(r.request_errors, 0); assert.equal(r.reserved_bytes, 100000000);
  }
  {
    const h = harness(), done = h.start('duplex'); await h.tick(2000); await done;
    const r = await h.report(); assert(r.download_bytes > 0 && r.upload_browser_bytes > 0);
    assert.equal(r.upload_browser_bytes, r.upload_server_confirmed_bytes);
    assert(r.reserved_bytes <= 100000000); assert.equal(r.download_bytes + r.upload_browser_bytes, r.reserved_bytes);
  }
  {
    const h = harness(() => ({ pending: true, partial: 2000 })), done = h.start('download');
    await h.tick(50); h.stop(); await done; const r = await h.report();
    assert.equal(r.reason, 'Stopped by you'); assert.equal(r.download_bytes, 8000); assert.equal(r.request_errors, 0);
    assert(h.requests.every(r => r.done)); assert(r.requests.every(r => r.outcome === 'cancelled'));
  }
  {
    const h = harness(() => ({ delay: 3200, partial: 1000 })); h.get('budget').value = '2'; h.get('streams').value = '1';
    const done = h.start('download'); await h.tick(4000); await done; const r = await h.report();
    assert.equal(r.pauses, 1); assert(r.longest_pause_s >= 3); assert.equal(r.request_errors, 0);
  }
  {
    const h = harness(), done = h.start('browse'); await h.tick(7000); h.stop(); await h.tick(2000); await done;
    const r = await h.report(); assert.equal(r.pauses, 0); assert(r.pages >= 3);
  }
  {
    const h = harness(() => ({ pending: true })); h.get('duration').value = '2'; const done = h.start('download');
    await h.tick(3000); await done; const r = await h.report();
    assert.equal(r.reason, 'Time limit reached'); assert.equal(r.duration_s, 2); assert(h.requests.every(r => r.done));
  }
  {
    const h = harness(() => ({ networkError: true })), done = h.start('upload'); await h.tick(100); await done;
    const r = await h.report(); assert(r.reason.includes('could not continue')); assert.equal(r.upload_browser_bytes, 0); assert.equal(r.started_utc, null);
  }
  {
    const h = harness(); h.get('countdown').checked = true; const done = h.start('download');
    await h.tick(1500); h.stop(); await h.tick(1000); await done; assert.equal(h.requests.length, 0);
  }
  {
    const h = harness(() => ({ status: 503 })); h.get('streams').value = '1';
    const done = h.start('download'); await h.tick(6000); await done; const r = await h.report();
    assert.equal(r.request_errors, 3); assert(r.reason.includes('three times')); assert.equal(h.requests.length, 3);
  }
  console.log('PASS: shared budgets, fresh URLs, confirmed upload accounting, cancellation/partial progress, pauses, reading breaks, deadlines, endpoint failure, countdown stop, bounded retries.');
})().catch(error => { console.error(error); process.exitCode = 1; });
