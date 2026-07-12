# Edu EPUB Creator

A local-first, browser-based **authoring tool** for building interactive,
accessible educational **EPUB 3** books — visually or in XHTML source — and
exporting a structured EPUB package (mimetype, container.xml, package.opf,
nav.xhtml, NCX, accessibility metadata, organized assets, optional cover).

## Features
- Visual editor + XHTML source + live preview.
- Toolbar: headings, bold/italic, lists, links, alt text, **text alignment**,
  two-column layouts.
- Searchable **block library** (~40 reusable snippets: callouts, definitions,
  quizzes, tables, media blocks, buttons, layout blocks, etc.).
- A ready-to-edit **3D lesson** block with learning goal, interaction guidance,
  text alternative and a self-check prompt.
- A non-destructive **pre-export EPUB check** that reports missing local assets,
  image alternative text, interactive-frame titles and oversized assets; authors
  can review warnings or export anyway.
- **Import Markdown / plain text / existing EPUB:** bring in a `.md` or `.txt`
  file as a chapter, or import the chapters and images of an existing `.epub`
  (DRM-protected EPUBs are refused).
- **Import Word (.docx):** convert a Word document into an EPUB chapter, keeping
  its structure/formatting (headings, bold/italic, lists, tables, links) and
  embedding its images as assets (via mammoth.js).
- Import images / video / audio / CSS / HTML; **HTML package import** rewrites
  local references and supports embedded interactive HTML / 3D (WebGL) chapters.
- Cover image, autosave, save/open project JSON, bilingual UI (English / Greek).
- Exports EPUB 3 with Dublin Core + accessibility metadata and EPUB 2 NCX.

## Run locally
Open `index.html` directly, or run the static server:
```
npm start
```
then open `http://127.0.0.1:4184/`.

## Test
```
npm test
```
runs the static smoke-test suite.

## Install as an app (PWA)
When served over HTTP(S), open `install.html` (or the **Install** button in the
top bar) to install Edu EPUB Creator as an offline-capable app.

## Companion reader
EPUBs are designed to open in **Edu Ebook Reader**:
<../reader/>

## License
Code: **MIT** (see `LICENSE`). Third-party: see `THIRD-PARTY-NOTICES.md`.

## Citation
See `CITATION.cff`.

## Author

**Georgios Korakakis** — Assistant Professor, Department of Graphic Design and Visual Communication, School of Applied Arts and Culture, University of West Attica.

If you use this software, please cite it using the metadata in `CITATION.cff` (or the Zenodo DOI of the release).
