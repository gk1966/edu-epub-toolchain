# Third-party notices

Edu Ebook Reader is distributed under the MIT License (see `LICENSE`). It bundles
or uses the following third-party components, each under its own license.

## PDF.js
- Purpose: PDF rendering (`vendor/pdf.min.mjs`, `vendor/pdf.worker.min.mjs`).
- Repository: https://github.com/mozilla/pdf.js
- License: Apache License 2.0 (© Mozilla Foundation and contributors).
- Full text: https://www.apache.org/licenses/LICENSE-2.0 (copy in `licenses/Apache-2.0.txt`).

## JSZip
- Purpose: reading ZIP-based formats such as EPUB and CBZ (`vendor/jszip.min.js`).
- Repository: https://github.com/Stuk/jszip
- License: MIT (dual MIT/GPLv3; used here under MIT) (© 2009-2016 Stuart Knightley and contributors).
- Full text in `licenses/MIT-JSZip.txt`.

## Browser platform APIs
File API, localStorage, Service Workers, Web App Manifest and the Web Speech
`speechSynthesis` API are provided by the host browser and are not redistributed.
