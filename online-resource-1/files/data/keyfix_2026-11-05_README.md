# Arrow-key fix for the 3D viewer (5 November 2026)

## Problem

In Thorium Reader 3.5.1 (paginated layout), an arrow key pressed on a focused 3D model did two things: it rotated the model, and Thorium also turned the page. With NVDA, the reading position therefore left the model (NVDA run of 5 Nov 2026, finding 1).

## Change

The change is in the keyboard handler of the a11y3d viewer only. The handler now listens on `window` in the capture phase and acts only when the event target is the model's canvas. For the keys it handles (arrows, + −, 1 2 3, 0/Home, D), it calls `preventDefault()` and `stopImmediatePropagation()`.

All other keys are untouched; Tab still leaves the model. Geometry, colours, texts, alt texts, static views and the semantic maps are unchanged.

A first attempt, `stopPropagation()` in the canvas handler, was **not** enough: in Thorium, one → still turned the page (`keyfix_2026-11-05_thorium_evidence/A1–A2`). This shows that Thorium handles the key before the event bubbles.

## Files (replace the same paths in the supplementary package)

| File | SHA-256 before → after |
| --- | --- |
| `supplementary/epub/sp-hybridisation-en.epub` | `113c257e…` → `10a6b363…` |
| `supplementary/tools/reader/demo-sp-hybridization-v3.0.epub` (was identical to the EPUB, still identical) | `113c257e…` → `10a6b363…` |
| `supplementary/pages/p1…p5*.html` (inline copy of the same viewer) | see `SHA256_changed_files.txt` |
| `supplementary/tools/accessible-3d-epub-tools-en/02_tools/a11y3d/a11y3d.src.js`, `a11y3d.min.js` and `accessible-3d-epub-tools-en.zip` | see `SHA256_changed_files.txt` |

New files: `supplementary/data/nvda_thorium_run.md` (record of the NVDA check), `supplementary/data/nvda_thorium_run_evidence/` (Speech Viewer text and screenshots; areas showing unrelated windows are masked) and `supplementary/data/nvda_log_sheet_for_author_EL.md`.

The package's root `SHA256SUMS.txt` must be updated with the new values.

## Checks

| Check | Result |
| --- | --- |
| EPUBCheck 5.3.0, both EPUB files | 0 fatals / 0 errors / 0 warnings / 0 infos |
| Headless Chromium (container, software WebGL), the 5 EPUB pages and the 5 web pages | Focus on the canvas. → ×3 gave "Rotated 15° right…"; 2 gave "Along C–C…"; 0 gave "Side view…"; Tab moved focus to "1 Side view". Handled keys no longer reached document-level listeners (capture or bubble); Tab did. No page errors. |
| Thorium 3.5.1 on the author's computer, keyboard only after focusing (P1) | Focus via "1 Side view" + Shift+Tab. → ×3 rotated the model with **no page turn**; status "Rotated 15° right…". 0 restored the side view and its description. Tab moved focus to "1 Side view". (`keyfix_2026-11-05_thorium_evidence/B1–B5`) |
| Thorium, P5 (ethene selected) | → ×3 rotated, no page turn (`B6`) |
| With NVDA (after the fix) | T4 done on P1 (author at the keyboard) and on P4 (AI-operated): three "Rotated 15° right" announcements, reset with 0, no page turn. See `supplementary/data/nvda_thorium_run.md`, sections 6–7. Readers other than Thorium and Chromium were not tested. |

The Thorium checks above did not use NVDA (the NVDA Speech Viewer was not on screen) and are not assistive-technology results.
