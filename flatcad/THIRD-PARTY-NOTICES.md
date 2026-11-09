# flatCAD hosted build — provenance and notices

This is a static, local-first Beta 1 build of [flatCAD](https://github.com/techrote/flatCAD).
Authoritative source: commit 50c2835f9b8eb6006fd7497c8b75d72085f9ecc0. The Vite bundle, dedicated
OpenCascade worker and local WASM file are copied from that source's
production build. See [BUILD-INFO.json](BUILD-INFO.json).

This distribution does not assign a license to flatCAD's own source code.
Third-party components include:

- **replicad 1.1.0** (MIT): see [license](licenses/replicad-MIT.txt)
  and [source](https://github.com/sgenoud/replicad).
- **replicad-opencascadejs 1.1.0** (LGPL-2.1-only), comprising the
  WebAssembly OpenCascade-based geometry runtime: see
  [full license text](licenses/LGPL-2.1.txt) and
  [source/build material](https://github.com/sgenoud/replicad).
  The WASM file is shipped as a separate local asset and can be
  replaced with a compatible rebuild of the same runtime.
- **Three.js 0.180.0** (MIT): see [license](licenses/three-MIT.txt)
  and [source](https://github.com/mrdoob/three.js).

Review upstream OpenCascade license/exception and exact transitive
dependencies when redistributing modified binaries. This Beta build
is not independently certified for manufacturing tolerances or STEP
interoperability. All geometry processing runs in the user's browser.
