(() => {
  'use strict';
  const dataElement = document.getElementById('gallery-data');
  const data = JSON.parse(dataElement.textContent);
  const works = data.works;
  if (!Array.isArray(works) || !works.length || works.some(w => !/^[a-z0-9][a-z0-9-]*\.html$/.test(w.file))) {
    throw new Error('Invalid gallery manifest');
  }
  const $ = id => document.getElementById(id);
  const picker = $('work-select'), frame = $('frame'), count = $('count');
  const info = $('info-panel'), infoButton = $('information'), fullButton = $('fullscreen');
  $('collection').textContent = data.title;
  document.title = data.title + ' // techrote';
  const options = works.map((work, i) => {
    const option = document.createElement('option');
    option.value = String(i);
    option.textContent = String(i + 1).padStart(2, '0') + ' / ' + work.title;
    picker.appendChild(option);
    return option;
  });
  let current = -1;
  const sourceRoot = 'https://github.com/techrote/tokensplurge/blob/' + data.sourceRevision + '/';
  function show(index) {
    const next = (index + works.length) % works.length;
    if (next === current) return;
    current = next;
    const work = works[next];
    picker.value = String(next);
    count.textContent = String(next + 1).padStart(2, '0') + ' / ' + String(works.length).padStart(2, '0');
    frame.title = work.title + ' — interactive artwork';
    frame.src = 'works/' + encodeURIComponent(work.file);
    $('info-name').textContent = work.title;
    $('info-description').textContent = work.description;
    $('source-link').href = sourceRoot + work.source.split('/').map(encodeURIComponent).join('/');
    $('source-path').textContent = work.source;
    $('live').textContent = work.title + ', artwork ' + (next + 1) + ' of ' + works.length;
    try {
      const url = new URL(location.href);
      url.searchParams.set('work', work.file.slice(0, -5));
      history.replaceState(null, '', url);
    } catch (_) { /* Local files and restricted history contexts retain normal navigation. */ }
  }
  picker.addEventListener('change', () => show(Number(picker.value)));
  $('previous').addEventListener('click', () => show(current - 1));
  $('next').addEventListener('click', () => show(current + 1));
  infoButton.addEventListener('click', () => {
    const visible = info.hidden;
    info.hidden = !visible;
    infoButton.setAttribute('aria-expanded', String(visible));
  });
  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.defaultPrevented) return;
    const tag = event.target && event.target.tagName;
    if (tag === 'BUTTON' || tag === 'SELECT' || tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      show(current + (event.key === 'ArrowLeft' ? -1 : 1));
      event.preventDefault();
    } else if (event.key === 'Escape' && !info.hidden) {
      info.hidden = true;
      infoButton.setAttribute('aria-expanded', 'false');
    }
  });
  fullButton.addEventListener('click', async () => {
    const stage = $('stage');
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (stage.requestFullscreen) await stage.requestFullscreen();
      else throw new Error('Fullscreen unavailable');
    } catch (_) { $('live').textContent = 'Fullscreen not available in this browser'; }
  });
  document.addEventListener('fullscreenchange', () => {
    const active = Boolean(document.fullscreenElement);
    fullButton.setAttribute('aria-pressed', String(active));
    fullButton.title = active ? 'Exit fullscreen' : 'Fullscreen artwork';
  });
  const query = new URLSearchParams(location.search).get('work');
  const initial = works.findIndex(w => w.file.slice(0, -5) === query);
  show(initial >= 0 ? initial : 0);
})();
