# Groupject workbench — v0.1 structural prototype

Five transparent illustrated hardware objects form the interactive homepage, instead of rectangular project cards. Artwork is **provisional**. This implementation prioritises grid placement and object proportions, project navigation and replaceability.

## Edit layout and art

- `groupjects/data.js` defines objects, source assets, project links, viewBox hotspot bounds, grid coordinates and debug occupancy masks.
- Wide desktop grid: **24×14**. Compact grid: **20×14**. Mobile grid: **12×14**, showing one object at a time with accessible category controls.
- `wide`, `compact`, `mobile` positions: **zero-based** `[x,y,width,height]` grid cells. This determines the item's allocated logical footprint.
- `screen.bounds`, `hatch.bounds` and `paperLinks[].bounds`: **[left,top,width,height] in percent of the illustration's viewBox**, not percent of the viewport.
- `groupjects/assets/*.svg` each contain one self-contained illustrated object with a transparent canvas. These are deliberately replaceable with standalone transparent PNG/WebP/SVG files or composites of photographs.
- The JS keeps every object's native aspect ratio within its grid footprint. SVG artwork and interactive HTML layers resize together, without stretching.
- `mask` strings are only an **approximation** of occupied cells for debug visualisation. They do **not** clip the art. Objects can have irregular silhouettes and visual overhang.
- Links are separate HTML anchors and have keyboard focus outlines, titles and accessible names. The source-only projects open GitHub; actual hosted tools open directly.
- The visible Relay Moth game destination is **only Relay Moth Beta**. Standard and stable snapshots remain stored but are not promoted.

## Controls

- `INDEX` leads to `directory.html`, a full text directory and JavaScript-disabled fallback.
- `HINTS` / **H** outlines project links.
- `GRID` / **G**, or `?layout-debug=1`, shows logical cell lines, mask occupancy, object rectangles and hotspot outlines.
- On narrow screens select **RETRO / GAMES / CAD / LAB / NOTES**. Left/Right arrows cycle when focus is not inside a control.
- Four inconspicuous fasteners on the gaming PC link to the existing hidden art galleries.
- No page scrolling; viewport and aspect-ratio aware. Interactions do not rely on external assets or frameworks.

## Next iteration

Replace and improve illustrations independently, including with photos of physical computer setups. Recheck corresponding overlay bounds when composition shifts. Use the debug view and responsive visual QA to tune precise placement and interaction geometry.
