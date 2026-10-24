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
  class SimulatedDate extends Date { constructor(...args) { super(...(args.length ? args : [1700000000000 + now])); } static now() { return 1700000000000 + now; } }
  const context = vm.createContext({ document, window, navigator: { userAgent: 'simulated-test-browser' }, performance: { now: () => now }, XMLHttpRequest: XHR, Blob, Uint8Array, crypto: crypto.webcrypto, URL: { createObjectURL: blob => { const url = 'blob:' + (++next); blobs.set(url, blob); return url; }, revokeObjectURL: url => blobs.delete(url) }, setTimeout: (fn, ms) => schedule(fn, ms), clearTimeout: id => timers.delete(id), setInterval: (fn, ms) => schedule(fn, ms, ms), clearInterval: id => timers.delete(id), console });
  context.Date = SimulatedDate;
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
  return { get, requests, tick, startSuite() { return get('start-suite').click(); }, start(mode) { modes.find(el => el.dataset.mode === mode).click(); return get('start').click(); }, stop() { get('stop').click(); }, async report() { get('save').click(); return JSON.parse(await downloads[downloads.length - 1].text()); } };
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
    const h = harness(() => ({ pending: true, partial: 2000 })), done = h.start('download');
    await h.tick(100); assert(parseFloat(h.get('down').innerHTML) > 0);
    await h.tick(600); assert.equal(parseFloat(h.get('down').innerHTML), 0);
    assert(h.get('down-state').textContent.startsWith('Waiting'));
    await h.tick(1500); assert(h.get('down-state').textContent.startsWith('PAUSED'));
    h.stop(); await done; const r = await h.report();
    assert(r.samples.length <= 4, '10 Hz display must not multiply saved 1 Hz samples');
    assert.equal(r.pauses, 1); assert.equal(h.get('down-state').textContent, 'Finished');
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
  {
    const h = harness(xhr => ({ delay: xhr.body && xhr.body.size === 1024 ? 20 : 10000 }));
    const done = h.startSuite(); await h.tick(600000); await done;
    const s = await h.report(); assert.equal(s.type, 'traffic-suite'); assert.equal(s.suite_version, 'traffic-v1');
    assert.equal(s.reason, 'Suite complete'); assert.equal(s.completed_stages, 8); assert.equal(s.stages.length, 8);
    assert.deepEqual(s.stages.map(r => r.mode), ['browse', 'download', 'upload', 'duplex', 'download', 'upload', 'duplex', 'browse-upload']);
    assert.deepEqual(s.stages.map(r => r.parallel_requests_per_direction), [4, 1, 1, 1, 4, 4, 4, 4]);
    assert.equal(s.stages[7].upload_parallel_requests, 1);
    assert.equal(s.reserved_bytes, s.stages.reduce((sum, r) => sum + r.reserved_bytes, 0)); assert(s.reserved_bytes <= s.budget_bytes);
    s.stages.forEach((r, index) => {
      assert.equal(r.stage_index, index + 1); assert.equal(r.duration_s, 60); assert.equal(r.request_errors, 0);
      assert(r.samples.length >= 60 && r.samples.length <= 62);
      if (index) assert(Date.parse(r.started_utc) - Date.parse(s.stages[index - 1].ended_utc) >= 5000);
    });
    assert(h.requests.every(r => r.done), 'No request may leak beyond its stage');
    assert.equal(h.get('start-suite').disabled, false);
  }
  {
    const h = harness(() => ({ pending: true })), done = h.startSuite();
    await h.tick(61000); h.stop(); await h.tick(6000); await done;
    const s = await h.report(); assert.equal(s.reason, 'Stopped by you'); assert.equal(s.stages.length, 1);
    assert.equal(s.completed_stages, 1); assert(h.requests.every(r => r.done));
  }
  {
    const h = harness(); h.get('countdown').checked = true; const done = h.startSuite();
    await h.tick(1500); h.stop(); await h.tick(2000); await done;
    const s = await h.report(); assert.equal(s.stages.length, 0); assert.equal(s.reason, 'Stopped by you'); assert.equal(h.requests.length, 0);
  }
  {
    const h = harness(xhr => xhr.body ? { networkError: true } : { delay: 10000 });
    const done = h.startSuite(); await h.tick(600000); await done;
    const s = await h.report(); assert.equal(s.stages.length, 8); assert.equal(s.completed_stages, 3);
    assert(s.stages[2].reason.includes('could not continue')); assert.equal(s.stages[4].reason, 'Time limit reached');
    assert(s.reason.includes('incomplete'));
  }
  {
    const h = harness(), done = h.startSuite(); await h.tick(200000);
    assert.equal(h.get('start-suite').disabled, false, 'Budget-limited suite must finish'); await done;
    const s = await h.report(); assert(s.reason.includes('budget reached')); assert(s.stages.length < 8);
    assert(s.reserved_bytes <= 500000000); assert(h.requests.every(r => r.done));
  }
  console.log('PASS: standalone lifecycle plus full eight-stage suite, fixed settings/durations, isolated stages, aggregate budget/export, cancellation during gap/countdown, endpoint failure continuation and early budget stop.');
})().catch(error => { console.error(error); process.exitCode = 1; });
