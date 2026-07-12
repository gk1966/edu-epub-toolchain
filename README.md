# Edu EPUB Toolchain

**Creator** [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.21322782.svg)](https://doi.org/10.5281/zenodo.21322782) · **Reader** [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.21322912.svg)](https://doi.org/10.5281/zenodo.21322912) · **Demo** [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.21322985.svg)](https://doi.org/10.5281/zenodo.21322985)

A local-first, DRM-free EPUB 3 toolchain for authoring and reading interactive,
accessible educational publications with embedded WebGL/Babylon.js 3D content.

| Component | Folder | Version | License | What it is |
|---|---|---|---|---|
| Edu EPUB Creator | [`creator/`](creator/) | 0.5.2 | MIT | Browser-based authoring tool: visual/XHTML/preview editing, ~40 reusable learning blocks, Word/Markdown/EPUB/HTML import, EPUB 3 export with accessibility metadata and an advisory pre-export check |
| Edu Ebook Reader | [`reader/`](reader/) | 1.0.0 | MIT | Installable PWA reader for EPUB 3 with scripting/WebGL support, plus PDF, TXT, MD, HTML, CBZ, DOCX, ODT, FB2 display; refuses DRM-protected files |
| Demo module | [`demo/`](demo/) | 1.0.0 | CC BY 4.0 | Interactive chemistry EPUB 3 on sp hybridization in ethyne: 3D molecular/orbital viewers, video, self-check quiz |

Everything runs locally in the browser: no accounts, no analytics, no uploads.
The Reader does not remove or bypass DRM; it is intended for original, open, or
otherwise permitted educational materials.

## Author

**Georgios Korakakis** — Assistant Professor, Department of Graphic Design and
Visual Communication, School of Applied Arts and Culture, University of West Attica.
ORCID: [0009-0005-0042-6348](https://orcid.org/0009-0005-0042-6348)

## Citation

Each component carries its own `CITATION.cff` and an archived release with DOI on
Zenodo. Please cite the component you use.

## License

Application code is released under the MIT License (see each component's LICENSE).
The demo module's educational content is CC BY 4.0 (see `demo/LICENSE`).
