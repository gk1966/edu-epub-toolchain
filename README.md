# Edu EPUB Toolchain

**Creator** [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.21322782.svg)](https://doi.org/10.5281/zenodo.21322782) · **Reader** [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.21322912.svg)](https://doi.org/10.5281/zenodo.21322912) · **Demo** [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.21322985.svg)](https://doi.org/10.5281/zenodo.21322985)

A local-first, DRM-free EPUB 3 toolchain for authoring and reading interactive,
accessible educational publications with embedded WebGL/Babylon.js 3D content.

| Component | Folder | Version | License | What it is |
|---|---|---|---|---|
| Edu EPUB Creator | [`creator/`](creator/) | 0.5.4 | MIT | Browser-based authoring tool: visual/XHTML/preview editing, reusable learning blocks, Word/Markdown/EPUB/HTML import, and structured EPUB 3 export with navigation and accessibility metadata |
| Edu Ebook Reader | [`reader/`](reader/) | 1.0.2 | MIT | Installable PWA reader for EPUB 3 with scripting/WebGL support, plus PDF, TXT, MD, HTML, CBZ, DOCX, ODT and FB2 display; refuses DRM-protected files |
| Demo module | [`demo/`](demo/) | 1.0.2 | CC BY-NC 4.0 | Interactive chemistry EPUB 3 on sp hybridization in ethyne: 3D molecular/orbital viewers, video and self-check quiz |

The applications use no app accounts, analytics, or book-upload service; local files remain in the browser. The hosting provider may retain ordinary server logs. PWA
installation requires HTTPS, or localhost during development; opening the apps from
`file://` does not install them. The Reader does not remove or bypass DRM and is
intended for original, open or otherwise permitted educational materials.

## Verification and conformance

The Creator includes 57 static smoke checks and eight focused preview-security
checks. The revised demonstration package contains an EPUB navigation document,
an NCX fallback, Dublin Core rights information, schema.org accessibility metadata
and scripted-item declarations. These checks support technical verification of the
artifact; they are not evidence of learning effectiveness. Run the exported book
through the official EPUBCheck tool before claiming formal EPUB conformance.

## Author

**Georgios Korakakis** — Assistant Professor, Department of Graphic Design and
Visual Communication, School of Applied Arts and Culture, University of West Attica.
ORCID: [0009-0005-0042-6348](https://orcid.org/0009-0005-0042-6348)

## Citation

Each component carries its own `CITATION.cff` and an archived release with DOI on
Zenodo. Please cite the component you use.

## License

Application code is released under the MIT License (see each component's LICENSE).
The demo module's educational content is CC BY-NC 4.0 (see `demo/LICENSE`).
