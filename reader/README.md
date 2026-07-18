# Edu Ebook Reader

Open-source, DRM-free **Progressive Web App (PWA)** for reading interactive
educational ebook content on phones, tablets and desktop computers. Built with
HTML, CSS and JavaScript; runs locally in the browser and can be hosted on any
HTTPS server.

## Features
- Opens files **locally** via browser APIs (no upload of books or notes).
- Supports EPUB / EPUB 3, PDF, TXT, Markdown, HTML/XHTML, DOCX, ODT, FB2, CBZ.
- Renders EPUB 3 learning material: XHTML chapters, media, quizzes, embedded
  interactive HTML and **WebGL/Babylon.js 3D** scenes.
- Installable PWA (service worker + web app manifest), works offline.
- Reading customization: font size, theme, font, line spacing, width, letter
  spacing, reduced motion; basic read-aloud where the browser supports it.
- Bilingual UI (English / Greek); remembers last reading position per file.
- Local learning tools: bookmarks, private page notes and an exportable notes JSON file. No account or cloud sync is used.
- **Does not bypass DRM**: encrypted / rights-protected EPUBs are refused.
- No accounts, no analytics, no server-side data collection.

## Run locally
Serve the folder over HTTPS in deployment, or from localhost during development, e.g.:
```
node server.js
```
then open the printed `http://127.0.0.1` address. PWA installation requires an
HTTPS host (or `127.0.0.1`); opening via `file://` is not sufficient.

## Demonstration module
An interactive **sp hybridization in ethyne** EPUB (explanatory chapters, MP4
videos, WebGL/Babylon.js 3D viewers and original comprehension questions) is
provided with the public repository package, ready to open in this reader.

## Companion authoring tool
EPUBs like the demo can be produced with **Edu EPUB Creator**, included in the
public repository package. Repository identifiers and citation metadata are included in this public release.

## Testing
Functional behaviour can be verified with the manual procedure in
`MANUAL_TEST_CHECKLIST.md` (run it in a browser and tick each step).

## License
Code: **MIT** (see `LICENSE`). Third-party libraries: see `THIRD-PARTY-NOTICES.md`.

## Legal note
Created for educational/research use; does not circumvent DRM and refuses
DRM-protected EPUBs. See `LEGAL_NOTE.md`.

## Citation
See `CITATION.cff`.

The public Reader interface also includes a discreet **About / Σχετικά** dialog
with the developer's academic affiliation, ORCID and a link to the MIT License. This attribution is omitted
from anonymous peer-review builds.

## Version 1.0.1

Clarifies that PWA installation requires HTTPS or localhost, improves install-state handling, and bundles the corrected public demonstration EPUB.
