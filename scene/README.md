# Techrote IO — photographic modular workshop

The homepage is an editable layered reconstruction of the **6 November 2026** industrial-workshop reference rendering. It intentionally preserves the rendering's physical atmosphere and layout, rather than recreating it in CSS or SVG.

## Scene anatomy

- `scene/backdrop/cleanplate.webp` is the **scenery**. It is a cleanplate approximated by inpainting areas occupied by the moveable foreground; this remains visible when objects are dragged. The inpaint is less detailed than the original scene, so improve it during subsequent artistic passes.
- `scene/backdrop/exact-reference.webp` is the **original flattened image for comparison**, never the normal page background. The `COMPARE` control overlays it temporarily.
- `scene/parts/*.webp` are **six independent physical groupjects with true transparency**: `retro`, `gaming`, `cad`, `curiosity` (loose props), `calculator`, and `paper`. They can overlap and are independently movable/scalable.
- `scene/screens/*.webp` are **four separate display images**; their content is punched out of the corresponding physical sprite so the screen is genuinely replaceable without editing the bezel or case.
- `scene/scene.json` records each object's physical location, scale, Z order, link regions, art paths, and the internal screen's crop. The object and its hotspots move together.
- `scene/workshop.js` and `scene/workshop.css` provide the engine and presentation, independent of the images and layout.
- `directory.html` is the optional accessible text index and fallback.

The repository uses lightweight **transparent WebP at runtime** for performance. The complete **transparent PNG source parts**, per-component **alpha mask PNGs**, and independent PNG screen layers are committed alongside the optimized WebP runtime assets. To use the PNGs at runtime, change each `.webp` asset path to its `.png` sibling in `scene/scene.json`; subsequent photographic edits can replace just one PNG without altering any other component.

## Coordinates

The reference composition is **1672 × 941 pixels**, proportionally fitted into fullscreen desktop windows. All object and hotspot positions are measured in *reference pixels*. The grid defaults to **16 × 16 reference pixels**, but supports pixel-perfect adjustment.

`scene/scene.json` example:

```json
{
  "id": "cad",
  "x": 433, "y": 89, "width": 838, "height": 510,
  "z": 30, "scale": 1,
  "art": {"file":"scene/parts/cad.webp","sourcePng":"scene/parts/cad.png"},
  "screen": {"file":"scene/screens/cad-screen.webp","rect":[64,60,563,267]},
  "hotspots": [
    {"id":"cad-01","label":"INTUIT3D","url":"https://github.com/techrote/INTUIT3D","rect":[105,67,238,48]}
  ]
}
```

Each `hotspots[].rect` is relative to its parent object's top-left in **unscaled source pixels**. Screen `rect` is relative to the same origin. Changing group `x`, `y`, or `scale` moves the independent screen and all hotspots together.

## How to refine the site

1. Open `https://techrote.github.io/` and press **E** (or **EDIT**) to select any piece. Drag it around the grid, edit X/Y/scale/Z in the right inspector, or use arrow keys. Hold **Shift** while dragging for 1px precision.
2. Press **G** for the placement grid, **H** to outline hotspots. `MOVE LINK TARGETS` makes the exact link regions draggable for readjusting to new screens.
3. Use **REPLACE ART** or **REPLACE SCREEN** to preview a photo, PNG or WebP locally, without modifying the repository. PNG artwork should have transparency and the same native pixel dimensions or be given a new box size in the JSON manifest. You can incorporate photomontage and 3D-renders without changing the rendering engine.
4. Press **EXPORT JSON**. Commit the downloaded `scene.json` back to `scene/` and add any replacement image files at their final manifest locations. The edit session's `blob:` previews are intentionally *not* exportable/publishable asset URLs.
5. **RESET** clears local coordinate overrides; normal browsing never changes site contents.

**Navigation:** drag a blank area to pan; Ctrl+wheel or the +/- toolbar buttons zoom, FIT/0 reframes. On mobile, the scene zooms to its natural height and can be panned horizontally; there are no page scrollbars. Project links are on the CRT, CAD interface, game display, calculator and notebook. Four hidden art galleries are still accessible through the small service-panel links under the gaming screen.

## Source integrity and maintenance

- The default scene is assembled from the supplied original artwork and its individual image layers. Using `COMPARE` verifies alignment with the flattened artistic reference.
- The background has deliberately been inpainted. This is a *structural* first pass, not finished photography. When repositioning groupjects substantially, replace or retouch the background to avoid blurry revealed regions.
- The cutouts intentionally include some desk shadow and neighboring details; revisit the alpha masks as physical props are improved. Screen pixels are separate, but the source picture is still a raster display snapshot. For fully live interfaces, swap a screen layer for an HTML/CSS/iframe renderer inside the existing screen bounds.
- Do not replace the entire workshop with a single linked hero image. `COMPARE` is reference-only. Preserve the individual `part` and `screen` layers and their independent links.
- All site assets are served locally. No third-party scripts, tracking, remote artwork or runtime framework required.
- Project links are real `<a>` elements with keyboard focus, ARIA labels and tooltips, not opaque image-map coordinates.

## Testing

`tests/groupjects.test.mjs` runs in GitHub Actions with Playwright Chromium and verifies six device layers, four screens, real image loading, page no-scroll across desktop/mobile viewports, link targets, editor and comparison functionality. Gallery QA continues to test all four existing galleries.

## Selectable visual themes

The IO workbench now has a **THEME** selector (shortcut **T**) with two complete local art sets:

- **Industrial Original:** the existing `scene/backdrop/`, `scene/parts/` and `scene/screens/` files, unmodified.
- **Pristine Lo-fi Photo:** eleven locally hosted files under `scene/themes/photographic/` (one subdued film-style backdrop, six pieces of equipment, and four screens). Foreground images are source-pixel registered with their published counterparts: canvas dimensions and alpha masks match exactly, including screen holes. The visual content is newly generated and graded; internal detail is not identical.

Theme definitions live in `scene/scene.json` under `themes`. Original image paths remain in `groups` as fallback values. To replace an individual image, edit its corresponding theme path without changing group coordinates, screen placement or hotspots. If a photographic file fails to load, the original asset is used. **COMPARE** still overlays the original flattened artwork.

The preference is stored independently as `techrote-io:workshop-theme-v1`; direct links can use `?theme=photographic`. Theme changes never overwrite layout edits or hotspot locations. Temporary editor asset previews are isolated by theme.


## Clean Cutout — third visual theme

The **Clean Cutout** theme is selected from the existing THEME menu, through `?theme=cutout`, or by cycling themes with **T**. The two original themes are unchanged.

- `scene/themes/cutout/backdrop.webp` is a newly authored, quieter photographic workshop without equipment baked into the background.
- `scene/themes/cutout/parts/*.webp` contains six independently movable transparent photographic cutouts. Each is rendered at twice the reference object's pixel dimensions for sharpness at desktop resolutions.
- The screen details are present in the new retro, gaming and CAD photographs. The calculator retains its separately rendered menu: `themes.cutout.screenRects.calculator` adjusts its independent screen placement, which renders above its photographic LCD under this theme.
- All original `groups[].hotspots` and page placement coordinates remain unchanged. These newly generated photographic silhouettes are close visual replacements, **not pixel-identical reskins** of the old pieces; use EDIT/HINTS to refine hotspot alignment as needed.
- Replacing any cutout requires only the corresponding WebP file; the existing gallery routes, themes, and source configuration remain intact.
