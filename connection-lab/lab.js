/* Buildless and deliberately uses XHR progress for older Firefox on Android. */
(function () {
  'use strict';
  var VERSION = '1.2.0', MB = 1000000, UP_URL = 'https://speed.cloudflare.com/__up';
  var $ = function (id) { return document.getElementById(id); };
  var mode = 'browse', run = null, suite = null, galleryURLs = [], requestSequence = 0;
  // Fixed order and settings make firmware comparisons reproducible.
  var SUITE = [
    { name: 'Browsing', mode: 'browse', streams: 4 },
    { name: 'Download · 1 request', mode: 'download', streams: 1 },
    { name: 'Upload · 1 request', mode: 'upload', streams: 1 },
    { name: 'Both ways · 1 each', mode: 'duplex', streams: 1 },
    { name: 'Download · 4 requests', mode: 'download', streams: 4 },
    { name: 'Upload · 4 requests', mode: 'upload', streams: 4 },
    { name: 'Both ways · 4 each', mode: 'duplex', streams: 4 },
    { name: 'Browsing during upload', mode: 'browse-upload', streams: 4, uploadStreams: 1 }
  ];
  function hasUpload(r) { return r.mode === 'upload' || r.mode === 'duplex' || r.mode === 'browse-upload'; }
  function stageText() { return suite && suite.live ? 'Stage ' + (suite.index + 1) + '/' + SUITE.length + ' · ' + SUITE[suite.index].name + ' · ' : ''; }
  var notes = {
    browse: 'Browse loads a fresh gallery and short article data, then pauses for 2 seconds between pages. All downloads come from this GitHub site.',
    download: 'Continuously download 2 MB blocks from this GitHub site. Parallel requests may share an HTTP/2 connection.',
    upload: 'Send random 1 MB blocks to Cloudflare’s public speed-test receiver. Availability is checked before the countdown. This mode depends on that external service.',
    duplex: 'Download from GitHub and upload to Cloudflare simultaneously, with the selected request count in each direction. The data budget covers both directions together.'
  };
  function sleep(ms) { return new Promise(function (resolve) { setTimeout(resolve, ms); }); }
  function iso() { return new Date().toISOString(); }
  function event(r, text, warning) {
    var entry = { utc: iso(), elapsed_s: r.startedMono ? +( (performance.now() - r.startedMono) / 1000).toFixed(3) : null, message: text };
    r.events.push(entry);
    var li = document.createElement('li');
    li.textContent = entry.utc.slice(11, 19) + ' UTC · ' + text;
    if (warning) li.className = 'warning';
    $('events').appendChild(li);
    while ($('events').children.length > 120) $('events').removeChild($('events').firstChild);
    $('events').scrollTop = $('events').scrollHeight;
  }
  function busy(value) {
    document.querySelectorAll('.mode, select, #countdown').forEach(function (el) { el.disabled = value; });
    $('start').disabled = value; $('stop').disabled = !value; $('stop-live').disabled = !value;
    $('start-suite').disabled = value;
    $('save').disabled = value || (!run && !suite); $('copy').disabled = value || (!run && !suite);
    $('mark').disabled = !value;
  }
  function stop(r, reason) {
    if (!r.live) return;
    r.live = false; r.reason = reason; r.stopMono = performance.now(); r.endedUTC = iso();
    Array.from(r.active).forEach(function (xhr) { xhr.abort(); });
    $('status').textContent = 'Finishing…';
  }
  function reserve(r, bytes) {
    if (!r.live) return false;
    if (r.reserved + bytes > r.budget) return false;
    r.reserved += bytes; return true;
  }
  function progress(r, direction, amount) {
    if (!amount || !r.live) return;
    var d = r[direction], now = performance.now();
    d.bytes += amount;
    if (d.pauseStart !== null) {
      var gap = (now - d.pauseStart) / 1000;
      r.longestPause = Math.max(r.longestPause, gap);
      event(r, direction + ' resumed after ' + gap.toFixed(1) + ' s without progress.');
      d.pauseStart = null;
    }
    d.lastProgress = now;
  }
  function request(r, options) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest(), loaded = 0, settled = false, sending = true;
      var direction = options.direction, d = r[direction], began = performance.now();
      var record = { direction: direction, kind: options.kind, start_utc: iso(), expected_bytes: options.size, received_or_sent_bytes: 0, status: 0 };
      if (d.pending++ === 0) d.lastProgress = began;
      r.active.add(xhr);
      function finish(error) {
        if (settled) return; settled = true;
        r.active.delete(xhr); d.pending--;
        if (d.pending === 0 && d.pauseStart !== null) {
          var gap = (performance.now() - d.pauseStart) / 1000;
          r.longestPause = Math.max(r.longestPause, gap); d.pauseStart = null;
          event(r, direction + ' pending transfer ended after a ' + gap.toFixed(1) + ' s progress gap.', true);
        }
        record.duration_ms = Math.round(performance.now() - began); record.status = xhr.status;
        record.received_or_sent_bytes = loaded; record.outcome = error ? error.message : 'complete';
        r.requests.push(record);
        if (error) reject(error); else resolve(xhr.response);
      }
      xhr.open(options.body ? 'POST' : 'GET', options.url, true);
      xhr.responseType = 'blob'; xhr.timeout = options.check ? 12000 : 45000;
      var target = options.body ? xhr.upload : xhr;
      target.onprogress = function (e) {
        var amount = Math.max(0, e.loaded - loaded); loaded = e.loaded;
        progress(r, direction, options.check ? 0 : amount);
      };
      if (options.body) xhr.upload.onload = function () { sending = false; };
      xhr.onload = function () {
        if (xhr.status < 200 || xhr.status >= 300) { finish(new Error('HTTP ' + xhr.status)); return; }
        if (options.body) {
          if (!options.check) { progress(r, direction, Math.max(0, options.size - loaded)); d.confirmed += options.size; }
          loaded = options.size;
        } else {
          var size = xhr.response ? xhr.response.size : loaded;
          if (!options.check) progress(r, direction, Math.max(0, size - loaded));
          loaded = size;
          if (size !== options.size) { finish(new Error('Unexpected response size: ' + size + ' bytes (expected ' + options.size + ')')); return; }
          d.confirmed += size;
        }
        finish(null);
      };
      xhr.onerror = function () { finish(new Error('Network or CORS error')); };
      xhr.ontimeout = function () { finish(new Error((xhr.timeout / 1000) + '-second request timeout')); };
      xhr.onabort = function () { finish(new Error('cancelled')); };
      xhr._isSending = function () { return direction === 'down' || sending; };
      xhr._direction = direction;
      try { xhr.send(options.body || null); } catch (error) { finish(error); }
    });
  }
  function fresh(path, r) { return path + '?run=' + r.id + '&request=' + (++requestSequence); }
  function sample(r) {
    if (!r.startedMono) return;
    var now = r.stopMono || performance.now(), dt = (now - r.lastSample) / 1000;
    if (dt <= 0) return;
    var point = { utc: iso(), elapsed_s: +((now - r.startedMono) / 1000).toFixed(3) };
    ['down', 'up'].forEach(function (direction) {
      var d = r[direction];
      point[direction + '_mbps'] = +((d.bytes - d.sampleBytes) * 8 / MB / dt).toFixed(4);
      point[direction + '_bytes'] = d.bytes; d.sampleBytes = d.bytes;
      var moving = Array.from(r.active).some(function (xhr) { return xhr._direction === direction && xhr._isSending(); });
      if (r.live && moving && now - d.lastProgress >= 2000 && d.pauseStart === null) {
        d.pauseStart = d.lastProgress; r.pauses++;
        event(r, direction + ': at least 2 s without browser progress.', true);
      }
    });
    point.hidden = document.hidden; r.samples.push(point); r.lastSample = now;
    $('data').innerHTML = ((r.down.bytes + r.up.bytes) / MB).toFixed(1) + ' <small>MB</small>';
    $('pauses').textContent = r.pauses;
    var elapsed = (now - r.startedMono) / 1000;
    $('progress').value = Math.min(100, elapsed / r.duration * 100);
    if (r.live) $('status').textContent = stageText() + Math.max(0, Math.ceil(r.duration - elapsed)) + ' s remaining · ' + r.errors + ' request errors';
    draw(r);
    if (r.live && elapsed >= r.duration) stop(r, 'Time limit reached');
  }
  function gauge(direction, speed, maximum) {
    var canvas = $(direction + '-gauge'), width = Math.max(130, canvas.clientWidth), height = width * .58;
    var scale = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== Math.round(width * scale) || canvas.height !== Math.round(height * scale)) {
      canvas.width = Math.round(width * scale); canvas.height = Math.round(height * scale);
    }
    var c = canvas.getContext('2d'); c.setTransform(scale, 0, 0, scale, 0, 0); c.clearRect(0, 0, width, height);
    var x = width / 2, y = height - 12, radius = width * .39;
    c.strokeStyle = '#35494e'; c.lineWidth = 9; c.beginPath(); c.arc(x, y, radius, Math.PI, 2 * Math.PI); c.stroke();
    c.strokeStyle = direction === 'down' ? '#b7efb1' : '#7bc9e7'; c.lineWidth = 4;
    var angle = Math.PI + Math.min(1, Math.max(0, speed / maximum)) * Math.PI;
    c.beginPath(); c.arc(x, y, radius, Math.PI, angle); c.stroke();
    c.fillStyle = '#a9b8b8'; c.font = Math.max(9, width * .035) + 'px system-ui'; c.textAlign = 'center';
    for (var i = 0; i <= 4; i++) {
      var a = Math.PI + i * Math.PI / 4;
      c.fillText((maximum * i / 4).toFixed(maximum <= 10 ? 1 : 0), x + Math.cos(a) * (radius - 19), y + Math.sin(a) * (radius - 19) + 4);
    }
    c.lineWidth = 3; c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.cos(angle) * (radius - 5), y + Math.sin(angle) * (radius - 5)); c.stroke();
    c.fillStyle = direction === 'down' ? '#b7efb1' : '#7bc9e7'; c.beginPath(); c.arc(x, y, 5, 0, 2 * Math.PI); c.fill();
  }
  function liveDisplay(r) {
    var now = r && r.stopMono ? r.stopMono : performance.now();
    ['down', 'up'].forEach(function (direction) {
      var speed = 0, text = 'Ready', severity = '';
      if (r && r.startedMono) {
        var d = r[direction], points = d.visual;
        points.push({ at: now, bytes: d.bytes });
        // Retain the sample immediately before the rolling half-second boundary.
        while (points.length > 2 && points[1].at <= now - 500) points.shift();
        var first = points[0], elapsed = now - first.at;
        if (elapsed > 0) speed = (d.bytes - first.bytes) * 8 / MB / (elapsed / 1000);
        if (now - d.lastProgress >= 500) speed = 0;
        if (speed > r.gaugeMax) r.gaugeMax = Math.pow(10, Math.ceil(Math.log10(speed)));
        var enabled = direction === 'down' ? r.mode !== 'upload' : hasUpload(r);
        var moving = Array.from(r.active).some(function (xhr) { return xhr._direction === direction && xhr._isSending(); });
        if (!r.live) { text = 'Finished'; speed = 0; }
        else if (!enabled) text = 'Not active in this mode';
        else if (r.reading && direction === 'down') text = 'Reading break · intentional';
        else if (!moving && d.pending > 0) text = 'Waiting for server reply';
        else if (!moving) text = 'Between requests';
        else {
          var gap = Math.max(0, (now - d.lastProgress) / 1000);
          if (gap >= 2) {
            text = 'PAUSED · ' + gap.toFixed(1) + ' s without progress'; severity = 'stalled';
            if (d.pauseStart === null) {
              d.pauseStart = d.lastProgress; r.pauses++;
              event(r, direction + ': at least 2 s without browser progress.', true);
              $('pauses').textContent = r.pauses;
            }
          }
          else if (gap >= .5) { text = 'Waiting · ' + gap.toFixed(1) + ' s without progress'; severity = 'waiting'; }
          else text = 'Transferring';
        }
      } else if (r && r.live) text = 'Preparing';
      $(direction).innerHTML = speed.toFixed(2) + ' <small>Mbps</small>';
      $(direction + '-state').textContent = text;
      $(direction + '-state').classList.toggle('stalled', severity === 'stalled');
      $(direction + '-state').classList.toggle('waiting', severity === 'waiting');
      gauge(direction, speed, r ? r.gaugeMax : 10);
    });
  }
  function draw(r) {
    var canvas = $('chart'), width = Math.max(240, canvas.clientWidth), height = 210;
    var scale = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * scale; canvas.height = height * scale;
    var c = canvas.getContext('2d'); c.scale(scale, scale);
    var points = r ? r.samples : [], max = 8;
    points.forEach(function (p) { max = Math.max(max, p.down_mbps, p.up_mbps); });
    max = Math.ceil(max); var left = 37, top = 16, w = width - left - 10, h = height - top - 30;
    c.font = '10px system-ui'; c.strokeStyle = '#35494e'; c.fillStyle = '#a9b8b8';
    for (var i = 0; i <= 4; i++) {
      var y = top + h * i / 4; c.beginPath(); c.moveTo(left, y); c.lineTo(left + w, y); c.stroke();
      c.fillText((max * (4 - i) / 4).toFixed(1), 2, y + 4);
    }
    var end = Math.max(60, points.length ? points[points.length - 1].elapsed_s : 60);
    c.fillText('Mbps', 0, 9); c.fillText('0 s', left, height - 5); c.fillText(Math.ceil(end) + ' s', width - 38, height - 5);
    ['down', 'up'].forEach(function (direction) {
      c.strokeStyle = direction === 'down' ? '#b7efb1' : '#7bc9e7'; c.lineWidth = 2; c.beginPath();
      points.forEach(function (p, index) { var x = left + w * p.elapsed_s / end, y = top + h * (1 - p[direction + '_mbps'] / max); if (index) c.lineTo(x, y); else c.moveTo(x, y); }); c.stroke();
    });
  }
  async function worker(r, direction) {
    var failures = 0, size = direction === 'down' ? 2 * MB : MB;
    while (r.live && reserve(r, size)) {
      try {
        await request(r, { direction: direction, size: size, kind: 'sustained', url: direction === 'down' ? fresh('assets/block.bin', r) : UP_URL, body: direction === 'up' ? r.uploadBody : null });
        failures = 0;
      } catch (error) {
        if (!r.live) break;
        r.errors++; event(r, direction + ' request failed: ' + error.message, true);
        if (++failures >= 3) { stop(r, direction + ' failed three times in succession'); break; }
        await sleep(1000 * failures);
      }
    }
  }
  async function browse(r) {
    var manifest = window.connectionLabAssets;
    if (!manifest || !manifest.images || !manifest.articles) throw new Error('Gallery manifest did not load. Reload this page and try again.');
    var failures = 0;
    while (r.live) {
      var batch = [], index = 0, failed = false, budgetEnd = false;
      var jobs = manifest.images.concat(manifest.articles);
      async function lane() {
        while (r.live && index < jobs.length) {
          var job = jobs[index++];
          if (!reserve(r, job.size)) { budgetEnd = true; return; }
          try {
            var blob = await request(r, { direction: 'down', kind: 'page-asset', url: fresh('assets/' + job.file, r), size: job.size });
            if (job.title) batch.push({ blob: blob, title: job.title, text: job.text });
          } catch (error) { if (r.live) { failed = true; r.errors++; event(r, 'Page asset failed: ' + error.message, true); } }
        }
      }
      var lanes = []; for (var n = 0; n < r.streams; n++) lanes.push(lane());
      await Promise.all(lanes);
      if (!r.live) break;
      if (budgetEnd) { stop(r, 'Data budget reached'); break; }
      if (failed) { if (++failures >= 3) { stop(r, 'Three page loads failed in succession'); break; } }
      else { failures = 0; r.pages++; renderGallery(batch); $('pages').textContent = 'Page ' + r.pages + ' loaded'; }
      r.reading = true;
      await sleep(2000);
      r.reading = false;
    }
  }
  function renderGallery(items) {
    galleryURLs.forEach(function (url) { URL.revokeObjectURL(url); }); galleryURLs = [];
    $('gallery').textContent = '';
    items.forEach(function (item) {
      var figure = document.createElement('figure'), img = document.createElement('img'), caption = document.createElement('figcaption'), text = document.createElement('span');
      img.src = URL.createObjectURL(item.blob); galleryURLs.push(img.src); img.alt = item.title;
      caption.textContent = item.title; text.textContent = item.text; caption.appendChild(text);
      figure.appendChild(img); figure.appendChild(caption); $('gallery').appendChild(figure);
    });
  }
  function directionState() { return { bytes: 0, confirmed: 0, pending: 0, sampleBytes: 0, lastProgress: performance.now(), pauseStart: null, visual: [] }; }
  function report(r) {
    return { version: VERSION, run_id: r.id, mode: r.mode, started_utc: r.startedUTC, ended_utc: r.endedUTC, reason: r.reason, duration_s: r.elapsed, parallel_requests_per_direction: r.streams, upload_parallel_requests: r.uploadStreams, budget_bytes: r.budget, reserved_bytes: r.reserved, download_bytes: r.down.bytes, upload_browser_bytes: r.up.bytes, upload_server_confirmed_bytes: r.up.confirmed, pauses: r.pauses, longest_pause_s: r.longestPause, request_errors: r.errors, pages: r.pages, user_agent: navigator.userAgent, samples: r.samples, events: r.events, requests: r.requests, interpretation: 'Application payload, not wire rate. Upload progress is browser-reported; HTTP success confirms complete upload requests. Pauses are progress gaps, not proof of packet loss. Hidden tabs may throttle timers. Failed and cancelled requests can contain partial traffic.' };
  }
  function summaryText(r) {
    var seconds = r.elapsed || 1;
    return 'Connection lab ' + VERSION + ' · ' + r.mode + '\n' + (r.startedUTC || 'Not started') + '\n' + r.reason + '\n' + seconds.toFixed(1) + ' s, ' + r.streams + ' parallel requests/direction\nDownload average: ' + (r.down.bytes * 8 / MB / seconds).toFixed(2) + ' Mbps\nUpload average (browser): ' + (r.up.bytes * 8 / MB / seconds).toFixed(2) + ' Mbps\nUpload confirmed: ' + (r.up.confirmed / MB).toFixed(2) + ' MB\n' + r.pauses + ' progress pauses ≥2 s, ' + r.errors + ' request errors, ' + r.pages + ' pages\nRun: ' + r.id;
  }
  async function start(options) {
    options = options || {};
    if (run && run.live) return;
    if (!options.suite) { if (suite && suite.live) return; suite = null; $('suite-progress').textContent = ''; $('suite-results').textContent = ''; }
    var r = run = { id: Date.now().toString(36), mode: options.mode || mode, live: true, active: new Set(), startedMono: null, startedUTC: null, endedUTC: null, elapsed: 0, reason: '', duration: options.duration || +$('duration').value, streams: options.streams || +$('streams').value, uploadStreams: options.uploadStreams || options.streams || +$('streams').value, budget: options.budget === undefined ? +$('budget').value * MB : options.budget, reserved: 0, down: directionState(), up: directionState(), samples: [], requests: [], events: [], pauses: 0, longestPause: 0, errors: 0, pages: 0, gaugeMax: 10, reading: false };
    busy(true); $('events').textContent = ''; $('status').classList.remove('error'); $('progress').value = 0; draw(r);
    $('down').innerHTML = '0.00 <small>Mbps</small>'; $('up').innerHTML = '0.00 <small>Mbps</small>';
    $('data').innerHTML = '0.0 <small>MB</small>'; $('pauses').textContent = '0';
    $('summary').textContent = 'Preparing this run. Keep the tab visible and the screen on.';
    var timer, visualTimer;
    liveDisplay(r);
    try {
      if (hasUpload(r)) {
        $('status').textContent = 'Checking upload receiver…'; event(r, 'Checking Cloudflare upload availability (1 KB).');
        var data = new Uint8Array(MB); for (var offset = 0; offset < data.length; offset += 65536) crypto.getRandomValues(data.subarray(offset, Math.min(offset + 65536, data.length)));
        r.uploadBody = new Blob([data], { type: 'application/octet-stream' });
        await request(r, { direction: 'up', size: 1024, kind: 'availability-check', check: true, url: UP_URL, body: r.uploadBody.slice(0, 1024) });
        event(r, 'Upload receiver accepted the check.');
      }
      if (!options.suite && $('countdown').checked) for (var i = 5; i > 0 && r.live; i--) { $('status').textContent = 'Starting in ' + i + '…'; await sleep(1000); }
      if (!r.live) return;
      r.startedMono = performance.now(); r.lastSample = r.startedMono; r.startedUTC = iso();
      r.down.visual.push({at: r.startedMono, bytes: 0}); r.up.visual.push({at: r.startedMono, bytes: 0});
      $('status').textContent = 'Loading…';
      if (typeof $('live-measurements').scrollIntoView === 'function') $('live-measurements').scrollIntoView({ block: 'start' });
      event(r, 'START ' + r.mode + ' · ' + r.streams + ' parallel requests/direction · ' + r.duration + ' s · ' + r.budget / MB + ' MB budget.');
      timer = setInterval(function () { sample(r); }, 1000);
      visualTimer = setInterval(function () { liveDisplay(r); }, 100);
      var deadline = setTimeout(function () { stop(r, 'Time limit reached'); }, r.duration * 1000);
      try {
        if (r.mode === 'browse') await browse(r);
        else if (r.mode === 'browse-upload') {
          var mixedJobs = [browse(r)];
          for (var u = 0; u < r.uploadStreams; u++) mixedJobs.push(worker(r, 'up'));
          await Promise.all(mixedJobs);
        }
        else {
          var jobs = []; for (var n = 0; n < r.streams; n++) { if (r.mode !== 'upload') jobs.push(worker(r, 'down')); if (r.mode !== 'download') jobs.push(worker(r, 'up')); }
          await Promise.all(jobs);
        }
        if (r.live) stop(r, 'Data budget reached');
      } finally { clearTimeout(deadline); }
    } catch (error) {
      if (r.live) { r.errors++; event(r, error.message + (hasUpload(r) ? '. External upload receiver unavailable; Browse and Download do not need it.' : ''), true); stop(r, 'Test could not continue: ' + error.message); $('status').classList.add('error'); }
    } finally {
      clearInterval(timer); clearInterval(visualTimer); r.live = false;
      if (r.startedMono) { sample(r); r.elapsed = ((r.stopMono || performance.now()) - r.startedMono) / 1000; }
      r.endedUTC = r.endedUTC || iso(); r.uploadBody = null;
      event(r, 'END · ' + r.reason); $('status').textContent = r.reason;
      $('summary').textContent = summaryText(r).replace(/\n/g, ' · '); if (!options.suite) busy(false);
      liveDisplay(r);
    }
  }
  function suiteSummary(s) {
    return 'Connection lab ' + VERSION + ' · Traffic suite ' + s.suite_version + '\n' + s.reason + '\n' +
      s.stages.length + '/' + SUITE.length + ' stages recorded; ' + s.completed_stages + ' ran for the full 60 seconds.\n' +
      s.stages.map(function (r) { var seconds = r.duration_s || 1; return r.stage_name + ': ↓ ' + (r.download_bytes * 8 / MB / seconds).toFixed(2) + ' Mbps, ↑ ' + (r.upload_server_confirmed_bytes * 8 / MB / seconds).toFixed(2) + ' Mbps confirmed, ' + r.pauses + ' pauses, ' + r.request_errors + ' errors · ' + r.reason; }).join('\n');
  }
  function stageResult(r, config, index) {
    var row = document.createElement('li');
    var seconds = r.duration_s || 1;
    row.textContent = config.name + ' · ↓ ' + (r.download_bytes * 8 / MB / seconds).toFixed(2) + ' / ↑ ' + (r.upload_server_confirmed_bytes * 8 / MB / seconds).toFixed(2) + ' Mbps confirmed · ' + r.pauses + ' pauses · ' + r.reason;
    $('suite-results').appendChild(row);
  }
  async function startSuite() {
    if ((run && run.live) || (suite && suite.live)) return;
    var s = suite = { version: VERSION, suite_version: 'traffic-v1', type: 'traffic-suite', run_id: Date.now().toString(36), live: true, index: 0, started_utc: iso(), ended_utc: null, reason: '', stage_duration_s: 60, settling_gap_s: 5, budget_bytes: 500 * MB, reserved_bytes: 0, completed_stages: 0, plan: SUITE, stages: [], user_agent: navigator.userAgent };
    run = null; busy(true); $('suite-results').textContent = ''; $('suite-progress').textContent = 'Preparing traffic suite…';
    try {
      if ($('countdown').checked) for (var i = 5; i > 0 && s.live; i--) { $('status').textContent = 'Suite starting in ' + i + '…'; await sleep(1000); }
      for (var index = 0; index < SUITE.length && s.live; index++) {
        s.index = index;
        var config = SUITE[index];
        $('suite-progress').textContent = stageText() + '60 seconds';
        await start({ suite: true, mode: config.mode, streams: config.streams, uploadStreams: config.uploadStreams, duration: 60, budget: s.budget_bytes - s.reserved_bytes });
        var result = report(run); result.stage_name = config.name; result.stage_index = index + 1;
        s.stages.push(result); s.reserved_bytes += result.reserved_bytes;
        if (result.reason === 'Time limit reached') s.completed_stages++;
        stageResult(result, config, index);
        if (!s.live) break;
        if (result.reason === 'Data budget reached') { s.reason = '500 MB suite budget reached; remaining stages not run'; break; }
        if (index < SUITE.length - 1) for (var gap = 5; gap > 0 && s.live; gap--) {
          $('status').textContent = 'Settling · ' + gap + ' s · next: ' + SUITE[index + 1].name;
          $('suite-progress').textContent = 'Between stages · no test traffic';
          await sleep(1000);
        }
      }
      if (!s.reason) s.reason = s.completed_stages === SUITE.length ? 'Suite complete' : 'Suite finished with incomplete stages; inspect individual results';
    } catch (error) { s.reason = 'Suite stopped: ' + error.message; }
    finally {
      s.live = false; s.ended_utc = iso();
      $('suite-progress').textContent = s.reason + ' · ' + s.completed_stages + '/' + SUITE.length + ' full-duration stages';
      $('status').textContent = s.reason; $('summary').textContent = suiteSummary(s).replace(/\n/g, ' · '); busy(false);
    }
  }
  function stopAll(reason) {
    if (suite && suite.live) { suite.live = false; suite.reason = reason; }
    if (run && run.live) stop(run, reason);
  }
  document.querySelectorAll('.mode').forEach(function (button) { button.addEventListener('click', function () {
    mode = button.dataset.mode;
    document.querySelectorAll('.mode').forEach(function (b) { var chosen = b === button; b.classList.toggle('selected', chosen); b.setAttribute('aria-pressed', String(chosen)); });
    $('mode-note').textContent = notes[mode];
  }); });
  $('start').addEventListener('click', function () { return start(); });
  $('start-suite').addEventListener('click', startSuite);
  $('stop').addEventListener('click', function () { stopAll('Stopped by you'); });
  $('stop-live').addEventListener('click', function () { stopAll('Stopped by you'); });
  $('mark').addEventListener('click', function () { if (run && run.live) event(run, 'USER MARKER: I saw a freeze.', true); });
  $('save').addEventListener('click', function () {
    if (!run && !suite) return; var result = suite || report(run); var url = URL.createObjectURL(new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' }));
    var a = document.createElement('a'); a.href = url; a.download = 'connection-lab-' + result.run_id + '.json'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(url); }, 10000);
  });
  $('copy').addEventListener('click', async function () { try { await navigator.clipboard.writeText(suite ? suiteSummary(suite) : summaryText(run)); $('status').textContent = 'Summary copied.'; } catch (_) { $('status').textContent = 'Copy unavailable. Use Save results instead.'; } });
  document.addEventListener('visibilitychange', function () { if (run && run.live) event(run, document.hidden ? 'Tab hidden: browser timers and traffic may be throttled.' : 'Tab visible again.', document.hidden); });
  window.addEventListener('pagehide', function () { stopAll('Page left'); });
  window.addEventListener('resize', function () { draw(run); liveDisplay(run); });
  draw(null);
  liveDisplay(null);
}());
