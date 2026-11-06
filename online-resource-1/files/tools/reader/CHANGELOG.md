# Changelog

## 1.1.0 — 2026-11-01

### Rendering of EPUB 3 content
- Chapter documents keep the `lang`, `xml:lang`, `dir` and `class` of their root element; the
  publication language (`dc:language`) is used when a chapter has none.
- The reader theme is passed to the content as `data-theme` (`dark` for night and high contrast,
  `light` otherwise), `data-reader-theme`, `color-scheme` and, when reduced motion is on,
  `data-reduced-motion="true"`.
- Documents that contain a `canvas`, an element with `role="application"` or a `.stage` use the
  full width of the reading area instead of the text measure.
- On screens wider than 860 px the previous/next arrows sit in their own margin and no longer
  cover the content.
- Manifest fallback chains are honoured: when a spine item names an XHTML fallback, a "Text version"
  button switches between the interactive document and its text version; the choice persists across
  sections. Links to a fallback document (or to another non-spine document of the book) open in place
  instead of failing with "This link does not match an EPUB chapter".
- Links to a fragment of the same document scroll to the target and move focus to it, without
  reloading the section (quiz answers and 3D state are kept).
- Read aloud uses the language of the section on screen, and reads the text version when it is shown.

### Accessibility of the interface
- Skip link to the reading area; visually hidden `h1` with the book title while a book is open.
- Polite live announcements: "Section n of N: title" for EPUB, "Page n of N" for PDF and CBZ.
- The iframe title is the section title (plus "text version" when applicable).
- After choosing a section from the contents, a search result or a link, focus moves to the start
  of the new section (its `h1`, or the link target).
- The contents are a `nav` landmark; the current entry has `aria-current="page"`.
- The book-panel button has `aria-controls` and `aria-expanded`; on small screens focus moves into
  the panel when it opens, Esc closes it and returns focus to the button.
- ← and → change section when focus is in the toolbar or reading area (not in text fields, the
  sidebar or the book itself).
- "Accessibility of this book" panel generated from schema.org accessibility metadata, the
  conformance claim (`dcterms:conformsTo`, `a11y:certifiedBy`) and hazards, after the structure of the
  W3C Accessibility Metadata Display Guide; the raw metadata are listed under "All accessibility
  metadata".
- PDF: the canvas has `role="img"` and a page label; the page's own text layer is shown in an
  expandable "Text of this page" box.
- Interface language defaults to the browser language (Greek or English) when nothing is saved.
- Global visible focus outline; contrast fixes for the active contents entry and the feature chips
  in the night theme, and for buttons with a yellow background in the high-contrast theme.
- Removed the redundant `allowfullscreen` attribute (the `allow` attribute already grants fullscreen).

### Fixes
- XML files that start with a UTF-8 byte-order mark (for example some ODT `content.xml`) are parsed;
  the error message no longer says "EPUB" for non-EPUB files.

### Unchanged
- DRM scope: files with `rights.xml`, `license.lcpl` or non-font encryption in `encryption.xml` are
  still refused; font obfuscation is still allowed. No decryption code was added.
- Sandbox: book content still runs in an iframe without `allow-same-origin`, with a content security
  policy that blocks network access.
- No new third-party code.

### Package
- Added `demo-sp-hybridization-el-v3.0-accessible.epub` (Greek, CC BY-NC 4.0).
- Service-worker cache renamed to `edu-ebook-reader-v17-1.1.0` so installed copies update.
