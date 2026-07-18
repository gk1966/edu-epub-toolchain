# Manual test checklist — Edu Ebook Reader

This is the manual verification procedure for the reader. Serve the folder over
HTTPS in deployment, or localhost during development (for example `node server.js`), and run each step in a modern browser.
**Tick a box only after you have confirmed the expected result yourself.**
This file is a verification procedure, not a record of guaranteed results.

Tested environment — browser: __________  OS: __________  date: __________

## File opening
- [ ] Open an **EPUB 3** file → chapters, images and navigation display correctly.
- [ ] Open a **PDF** → pages render.
- [ ] Open a **TXT** file → text displays.
- [ ] Open a **Markdown** (.md) file → basic formatting displays; raw HTML is escaped.
- [ ] Open an **HTML/XHTML** file → renders inside the sandbox.
- [ ] Open a **CBZ** comic → images display page by page.
- [ ] Open a **DOCX** and an **ODT** → text content displays.
- [ ] Open an **FB2** → text content displays.

## Security / privacy
- [ ] Open an EPUB that references an **external URL** → the request is blocked.
- [ ] Confirm **iframe / object / embed / form submission** inside EPUB content do not execute.
- [ ] Open an EPUB with **DRM / encryption markers** (rights.xml, encryption.xml, license.lcpl) → it is **refused** with the DRM message.
- [ ] Watch the browser **Network tab** during normal reading → no analytics/telemetry requests.

## Reading experience
- [ ] Change **font size, theme, font family, line spacing, text width, letter spacing, reduced motion** → each applies.
- [ ] Close and reopen a file → the **last reading position** is restored.
- [ ] Switch the interface **English ↔ Greek**.
- [ ] (Where the browser supports it) start **read-aloud** → speech plays.

- [ ] Add a **bookmark** and a **private note**, reopen the same local file and confirm both remain on the device.
- [ ] Export notes → a local JSON file contains the bookmarks and notes; no network request is made.

## PWA installation (where supported)
- [ ] Over HTTPS (or 127.0.0.1), **install** via the browser prompt (Android / desktop Chromium / Edge).
- [ ] On **iOS / iPadOS Safari**, install via Share → Add to Home Screen.
- [ ] Launch the installed app and confirm it still **opens files offline**.

## Interactive 3D demonstration module
- [ ] Open the sp hybridization demo EPUB → chapters, MP4 videos and **3D viewers** load.
- [ ] Rotate / zoom a 3D model and use **fullscreen** inspection.
- [ ] Answer the quiz questions → feedback and score update.

## EPUB validation (recommended)
- [ ] Run **EPUBCheck** on the demonstration EPUB and record the result.
