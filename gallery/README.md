# Compact gallery system

Four curated galleries share `gallery/shared.css` and `gallery/shared.js`. Their entire selection and information UI sits in a 33–36px top rail, leaving the remaining viewport to the isolated artwork iframe. Both page axes are explicitly non-scrolling; the artwork iframe is sandboxed without same-origin access.

## Entries and source custody

Source: [techrote/tokensplurge](https://github.com/techrote/tokensplurge), pinned to `f9deae20ded26e959f2096ba9fed9a0e3b61a6ed` for the new curated HTML snapshots.

- [Shattered Art Stash](../shattered-art-stash/): existing eight pieces, retained unchanged.
- [Signal Relics](../signal-relics/): eight selected signal-lineage works.
- [Salvage Apparatus](../salvage-apparatus/): eight generative salvage works.
- [Salvage Arcade](../salvage-arcade/): eight playable salvage works.

Each collection contains its own `works/` snapshots; the salvage collections also carry the upstream `kit.js`. Original gallery HTML filenames are intentionally preserved. To curate more works, copy the exact upstream source files, add their metadata to the folder's `index.html` JSON manifest, then qualify across the browser viewport matrix. Do not replace the iframe with unsandboxed same-origin HTML.

## Navigation

The homepage's unmarked service plate has four fasteners. Each leads to one collection, respectively upper-left / upper-right / lower-left / lower-right. Fasteners retain informative accessible names and hover titles. The collection chooser and previous/next buttons control artwork; the MAX control uses the Fullscreen API, which keeps the hosted artwork sandboxed. Info occupies an optional overlay rather than permanently reducing the artwork area.

The `?work=FILENAME` query parameter permits direct selection without inventing separate pages. Publication is deliberately manual to preserve curation; the ordinary Relay Moth Forest mirror is independent.
