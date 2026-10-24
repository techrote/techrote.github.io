# Connection lab

Live page: https://techrote.github.io/connection-lab/

A small, buildless browser workload for investigating intermittent connection stalls. It runs on GitHub Pages and needs no software on the test device or local PC server. Designed for Firefox on Android, including older devices: XMLHttpRequest progress events, bounded response Blobs, a reused 1 MB upload body, system fonts, and a history graph drawn once per second.

Version 1.1 adds two analogue needle gauges and live numbers updated at 10 Hz from a rolling half-second payload window. Values fall to zero after 0.5 seconds without progress; an amber waiting label shows the gap, changing to a red PAUSED indicator at two seconds. The display does not add artificial jitter or smooth away stalls. Browse's intentional two-second reading breaks and upload server-response waits have separate labels. A Stop test button stays alongside the gauges, and the page scrolls to the live view when the workload begins. The gauge starts with a 10 Mbps scale and increases the range if necessary, keeping that scale for the rest of the run.

## Workloads

Version 1.2 adds **Run traffic suite**: fixed suite `traffic-v1`, eight stages of 60 seconds each, in this order: Browse (4 requests), Download (1), Upload (1), Both ways (1 each), Download (4), Upload (4), Both ways (4 each), and Browse (4) alongside Upload (1). There are five idle seconds between stages, outside the measured windows. The existing countdown applies once to the whole suite. Each stage with upload checks the receiver first, outside its 60-second window. This is approximately nine minutes, with a fixed 500 MB aggregate requested-payload cap. Standalone duration/concurrency/budget selectors do not change the suite. No synthetic idle traffic, streaming-service simulation, or latency probe is implied; these are repeatable HTTP workload patterns.

The suite keeps the existing per-run measurements and timeout behavior. Requests are cancelled at each stage boundary and workers settle before advancing, so traffic does not leak into the next stage. Three consecutive worker failures or a failed receiver check ends that stage, records the error and continues after the gap. Hitting the aggregate budget ends the suite early. Stop and leaving the page cancel the whole sequence, including countdown and gaps. A partial suite is explicitly labelled incomplete.

**Save results** exports one JSON object (`type: traffic-suite`, `suite_version: traffic-v1`) with the ordered plan, aggregate requested bytes, completed full-duration count, and a `stages` array. Every stage retains its own UTC bounds, duration, actual concurrency, samples, requests, errors and events; `browse-upload` additionally records `upload_parallel_requests: 1`. Stage result rows show download and HTTP-confirmed upload averages. No browser-only test can measure ESP drops, temperature or power; align the stage timestamps with the separate firmware log. A foreground tab and unchanged cooling/placement are needed for useful comparisons. Keep this suite version/order fixed when comparing firmware; changing them requires a new suite identifier.

- **Browse:** load four original 800×500 JPEG illustrations and four short JSON articles, then wait two seconds. Default four parallel requests, about 0.62 MB per page. The gallery displays the received image data through object URLs; it does not fetch the images twice. Old object URLs are revoked.
- **Download:** repeatedly fetch a 2,000,000-byte incompressible fixture from this site, with 1, 4, or 8 parallel HTTP requests.
- **Upload:** POST a reusable, randomly generated 1,000,000-byte Blob to `https://speed.cloudflare.com/__up`.
- **Both ways:** run download and upload workers together, with the selected concurrency in each direction. A single shared payload budget covers both directions.

Every transfer URL on GitHub has a unique run/request query, preventing browser-cache hits from masquerading as downloads. JPEG and binary data do not benefit appreciably from HTTP compression. The small articles may be compressed; rates count decoded application payload rather than precise on-wire bytes. Parallel HTTP requests may share a single HTTP/2 connection, so this does not replicate Speedtest's multiple-server TCP workload exactly.

GitHub Pages cannot receive uploads or run a receiver. Upload availability is checked with a 1 KB POST before the countdown. It has a 12-second timeout; ordinary transfers time out after 45 seconds. A blocked or unavailable external endpoint produces a visible failure, never a fabricated upload measurement. Browse and Download are independent of Cloudflare. No personal file picker, credentials, telemetry upload, tracking scripts, service workers, or firmware access are included.

## Measurement and stop behavior

The test starts only on a click. A five-second countdown is enabled by default. Each run has a selected 1–10 minute time limit and a 100/250/500 MB requested-payload budget. The budget reserves full requests before sending, including retries, so actual payload can be slightly below the cap. HTTP/TLS overhead, initial page assets, and the availability check are additional. Stop, page exit, deadline, and three consecutive failures in a worker cancel outstanding requests. Planned reading breaks do not count as pauses.

The history graph and exported samples use one-second intervals; the faster gauges use the same counters without changing the request schedule or creating network traffic. A pause is at least two seconds without progress while a data transfer is pending. Progress events are browser-buffered, and hidden tabs can throttle execution, so this indicates a symptom rather than packet loss. Upload progress is explicitly **browser reported**. The JSON separately records payload in uploads whose HTTP requests succeeded; unfinished or failed uploads may have transmitted partially. A receiver acknowledging an HTTP request does not prove end-to-end application persistence.

Save results exports JSON with UTC start/end times, per-second payload counters/rates, pause/resume events, manual freeze markers, request status/duration, hidden-tab events, browser version, and the test settings. Results are held in memory until saved; nothing is sent to an analytics collector. Use the UTC timestamps to align the report with separate firmware diagnostics.

For a repeatable S3 test, keep the device stationary, screen on, and this page in the foreground. Begin with Download, 1 stream; compare 4 streams, then Browse and Both ways. Announce the start in chat before pressing Start if a bounded PC packet capture is needed. The PC monitor remains separate; the public page cannot read local serial/temperature counters.

## Development

No build or dependencies are needed to serve the page. `make-assets.py` rebuilds the original procedural artwork and fixed transfer fixture (Python, NumPy, Pillow). Fixture SHA-256 is in `assets/manifest.js`. `node --check lab.js` checks syntax. `node test-lab.cjs` runs network-lifecycle checks using the actual page script and a simulated browser transport.

Cloudflare documents its public download/upload endpoint defaults in [cloudflare/speedtest](https://github.com/cloudflare/speedtest). GitHub Pages has a [soft 100 GB/month bandwidth limit](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits); avoid leaving tests running repeatedly on a fast connection.
