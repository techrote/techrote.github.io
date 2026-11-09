# flatCAD on the IO site

The homepage's **flatCAD** card opens [`/flatcad/`](https://techrote.github.io/flatcad/); its project information is at `/projects/flatcad.html`.

## Distribution model

- flatCAD source remains canonical in [techrote/flatCAD](https://github.com/techrote/flatCAD).
- The `.github/workflows/sync-flatcad.yml` action checks out **accepted source commit `50c2835f9b8eb6006fd7497c8b75d72085f9ecc0`**, runs TypeScript, unit tests and a Vite production build, copies compiled JS/CSS/worker/WASM to `flatcad/`, and includes third-party licensing and provenance.
- A Chromium smoke test loads the **actual IO homepage**, follows the `WEBAPP` tile to `/flatcad/`, calculates the golden solid through the deployed OpenCascade WASM worker and downloads an exact STEP file. External runtime requests are rejected.
- The workflow stages assets **on a review branch only**. Merge that PR after checks pass; GitHub Pages' existing branch-based production publisher serves the committed assets. **Do not use an Actions bot commit directly to main as the publication step**: GitHub Pages does not initiate a build for a commit made using `GITHUB_TOKEN`.

## Updating flatCAD

1. Inspect the latest accepted `techrote/flatCAD` main commit and its CI/Firefox acceptance status.
2. Change the pinned source SHA in `.github/workflows/sync-flatcad.yml` on a new IO review branch and open a PR. The PR builds and commits the resulting `flatcad/` assets to that branch.
3. Check build/browser results and changed assets. Merge the PR; native Pages publishes the updated snapshot.

No changes to flatCAD's source architecture or the IO homepage's restored styling are required. The hosted build is a static SPA page with relative asset paths (Vite `base: './'`); there is no backend, login, remote CAD service or analytics requirement.

## Licensing

The original project has not chosen an overarching source license; mirroring the build does not relicense it. The published `flatcad/licenses/` directory includes package license texts for LGPL-2.1-only `replicad-opencascadejs` and MIT `replicad`/`three`, with a build manifest and notices adjacent to the app. Assess LGPL replacement/relink and source availability obligations when upgrading the WASM runtime.
