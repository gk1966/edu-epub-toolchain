# NVDA + Thorium check of the English EPUB: record (4–5 November 2026)

**Summary.** The check has three parts:

1. A first AI-operated run on P1, on 4–5 November, sections 1–5. It found an arrow-key conflict between the 3D viewer and Thorium.
2. After the fix (`README_keyfix_EN.md`), the corresponding author's own keyboard session on P1, section 6.
3. An AI-operated session on P4, section 7.

In every part, NVDA's Speech Viewer recorded what NVDA spoke; the evidence is Speech Viewer text and screenshots. This is a technical inspection with assistive technology, **not a usability study**. No participants took part, the operators are not habitual screen-reader users, nobody judged how understandable the speech was, and no timings were taken. Where an unrelated application window overlapped a screenshot, that area is masked in the published copy.

Sections 1–5 below are the record of the first run, kept unchanged.

## 1 Environment

| Item | Value | Evidence |
| --- | --- | --- |
| EPUB | `sp-hybridisation-en.epub`, SHA-256 `113c257e…2957`. The copy on the author's computer and the package copy have the same hash. | — |
| Reader | Thorium Reader 3.5.1 (version shown in the library window), Windows | `00_…` |
| Screen reader | NVDA, installed on 4 Nov 2026. Version 2026.3 (2026.3.0.58174), read by the corresponding author from Help > About on 6 Nov 2026 (the version could not be read from the remote session; see section 4). | `24_…` |
| NVDA voice | OneCore "Stefanos" (Greek). On English text, NVDA reported "Αγγλικά (δεν υποστηρίζονται)" ("English, not supported"): there was no English voice, so English text was spoken with the Greek voice. The Speech Viewer text is unaffected. | `02_…` |
| NVDA settings | Defaults, except **Show Speech Viewer on startup**, which Claude turned on in `nvda.ini` with the author's approval (backup: `nvda.ini.before_claude_2026-11-05`). | `01_…` |
| Thorium layout | Paginated (default). Scrolled layout for part of T4, then paginated restored. | `20_…` |
| Input | Key presses sent by the computer-use tool. NVDA processed them as keyboard commands (browse-mode keys H, B and the arrows worked). | — |

## 2 Results on P1 ("3D: the structure of ethyne")

| Task | Keys used | NVDA output (Speech Viewer) | Outcome |
| --- | --- | --- | --- |
| Open P1 | Ctrl+N (Thorium navigation), Tab, ↓×4, Enter | TOC items announced as "heading level 1 link"; on load, the live region read "Side view. The molecular axis is horizontal: H–C≡C–H in a straight line, with an angle of 180°…" | done (`03`, `05`) |
| Page structure | H | "The structure of ethyne in 3D, heading level 1"; "What you see now, region, heading level 2"; "Parts: Ethyne C₂H₂ (ball-and-stick), region, heading level 2" | done (`06`, `07`) |
| Parts list | ↓ | "list with 4 items, checkbox checked, Carbon atoms, toggle button not pressed, Highlight" … "C–H bonds". The per-part descriptions are not in the reading order; by design they are read via Highlight. | done (`08`, `09`) |
| **T1** Description | ↓ to "Model description, button collapsed", Enter, ↓ | "expanded. Linear ethyne molecule, H–C≡C–H, with a bond angle of 180° (sp hybridisation). In total, the molecule has 3 σ bonds (1 C–C and 2 C–H) and 2 π bonds. The C≡C triple bond consists of 1 σ + 2 π; the two pairs of p orbitals … mutually perpendicular axes." | **done** (`10`) |
| **T5** σ/π count and angle | (same text) | 3 σ, 2 π, 180° | **done** (`10`) |
| **T3** View along the axis | B to "2 Along C–C, toggle button not pressed", Enter | "Along C–C. You are looking along the axis: all the atoms lie one behind another, because the molecule is linear. Visible: Carbon atoms, Hydrogen atoms, C≡C triple bond, C–H bonds." then "pressed" | **done** (`12`, `13`) |
| **T4** Rotate 45° and reset, paginated | Shift+Tab onto the canvas ("interactive 3D model … Keyboard, with the model selected: ← → ↑ ↓ rotate in 15° steps …"), → ×3 | First →: "Rotated 15° right. Press D for a description of the view." The page then moved (Thorium page turn), and NVDA was back in browse mode at "Parts of the model:". Later → keys were read as single characters ("a", "r"). Reproduced in a second attempt. | **not completed** (`14`–`19`) |
| **T4**, scrolled layout | ↑ onto the canvas, Enter, → | The canvas was announced, but NVDA stayed in browse mode: → read the character "t". The NVDA+Space toggle could not be sent (section 4). Afterwards Tab produced no speech. | **not completed** (`20`–`23`) |
| T2, T6, P2–P5, T7 (P4) | — | — | **not run** |

## 3 Findings

1. **Candidate defect, Thorium paginated layout.** The model's keydown handler calls `preventDefault()` but not `stopPropagation()` (`scripts/a11y3d.min.js`). In Thorium the first arrow key rotated the model and also turned the page, which took NVDA's reading position out of the model. This did not appear in the stored Chrome and Edu Ebook Reader runs. **Proposed fix:** stop propagation of the handled keys (and test whether Thorium listens in the capture phase). Then repeat T4 in Thorium without a screen reader, and with NVDA. **Not yet fixed or retested.**
2. Browse-mode reading of the description, the parts list and the view buttons worked, and the live region was spoken after a view change. The per-part descriptions are reachable only via Highlight. That is intended, but a screen-reader user may not discover it.
3. There was no English voice on this computer. A recorded run of the English edition needs an English synthesiser voice (for example, Windows OneCore English) to judge speech quality.

## 4 Limits of this run

- **Elevated NVDA window.** NVDA runs with elevated Windows privileges (UIAccess). The remote session's clicks and keys could not operate NVDA's own menu or welcome dialog; the author had to press OK. The tool also refuses Insert as a modifier. As a result, NVDA+N, NVDA+Space (browse/focus toggle) and NVDA+F1 were unavailable. Part of the T4 failure in the scrolled layout may therefore come from this setup rather than from the publication; a person at the keyboard would press NVDA+Space.
- One reader and one page; the run was stopped at the author's request because of the late hour.
- No timings were measured. Nothing in this record is a human judgement.

## 5 What can be claimed in the manuscript now

Nothing beyond the existing text, until finding 1 is fixed and T4 is repeated. After that, a full run (T1–T7 on P1–P5) by the author, or a repeated AI-operated run, can be reported as "NVDA [version] with Thorium 3.5.1". The log sheet `NVDA_log_sheet_for_author.md` is ready for that run.

## 6 Author's own session, 5 November 2026 (after the arrow-key fix)

The corresponding author operated NVDA himself at the keyboard (NVDA key: Caps Lock), using the fixed EPUB (`Article01_EPUB_keyfix_2026-11-05`). He pasted the Speech Viewer text into the chat. It was saved as `nvda_thorium_run_evidence/author_P1_T4_speechviewer_2026-11-05.txt`. An earlier paste from the same session was not saved, because it contained unrelated personal content; only its findings are summarised here.

| Page | Task | Speech Viewer evidence | Outcome |
| --- | --- | --- | --- |
| P1 | T1 | "Model description, button collapsed" → "expanded"; Highlight on Carbon atoms read "Highlighted: Carbon atoms. The two carbon atoms, which are sp-hybridised…" | done |
| P1 | T3 | "Along C–C. You are looking along the axis: all the atoms lie one behind another, because the molecule is linear…" | done |
| P1 | T4 | Keys: B to "1 Side view", Enter, Shift+Tab, then → ×3 and 0. Spoken: "interactive 3D model…"; three times "Rotated 15° right. Press D for a description of the view."; after 0, "Side view. The molecular axis is horizontal…" | **done** |

The first attempts with → turned the page. The author then used the focus route above (or the fixed file; which of the two mattered was not isolated), and the rotation worked.
| P1 | T6 | "Static views, button collapsed" → "expanded"; "figure, graphic: Side view: The molecular axis is horizontal: H–C≡C–H in a straight line, with an angle of 180°…" (extract lines 117–199 of the second paste, `nvda_thorium_run_evidence/author_P1_T6_speechviewer_extract_2026-11-05.txt`; the rest of that paste was other windows and was not kept) | done (first static view read; the other static views were not read in this log) |
| P1 | T5 | The model description read for T1 states "3 σ bonds (1 C–C and 2 C–H) and 2 π bonds" and "180°" (first paste) | done |

Observation: while the pointer was over the model, NVDA also spoke the 3D label "Carbon atoms". The labels are `aria-hidden="true"` in the DOM (checked in headless Chromium). The likely source is NVDA's mouse tracking, but this was not confirmed.

## 7 Page P4, AI-operated with NVDA, 5 November 2026 (fixed EPUB)

Claude sent the key presses through the remote session. NVDA ran with default settings, with Caps Lock as an extra NVDA key; the voice was Greek; the Speech Viewer was on. No mouse was used inside the publication. The mouse was used only to switch Thorium's layout, which also opened the settings dialog by mistake once. Evidence: `nvda_thorium_run_evidence/P4_*.jpg`.

| Task | Keys | Speech Viewer evidence | Outcome |
| --- | --- | --- | --- |
| Open P4 | Ctrl+N, Tab, ↓×10, Enter | "… 3D: exploring σ and π in full" → "INTERACTIVE 3D LESSON" | done (`P4_01–02`) |
| T3 | B to "2 Along C–C", Enter | "Along C–C. You are looking along the C–C axis. The two planes appear as a cross: they are perpendicular to each other, as are the two π bonds. Visible: …" | done (`P4_03`) |
| T4 | Shift+B to "1 Side view", Enter, Shift+Tab, → ×3, 0 | "… interactive 3D model Keyboard, with the model selected …"; three times "Rotated 15° right…"; then "Side view. The C–C axis is horizontal…". The page did not turn. | done (`P4_04–06`) |
| T2 | Tab, then X and Space on each part except π bonds | "σ-bond regions: hidden…", "sp hybrid orbitals: hidden…", "Plane 1: hidden…", "Plane 2 (stripes): hidden…", "Hydrogen atoms: hidden. Visible: π bonds." The screen showed only the π lobes, plus the axes and the 3D letters, which the "Visible" list does not count. | done (`P4_07–08`, `P4_10`) |
| T1, T5 | X to the last checkbox, B, B to "Model description", Enter, ↓ | "Linear ethyne molecule, H–C≡C–H, with a bond angle of 180° (sp hybridisation). In total, the molecule has 3 σ bonds (1 C–C and 2 C–H) and 2 π bonds. The C≡C triple bond consists of 1 σ + 2 π…" | done (`P4_11`) |
| T7 (non-visual form) | ↓ through the parts list in the description | "Plane 1 … Perpendicular to Plane 2. Shown with a solid outline." / "Plane 2 (stripes) … Perpendicular to Plane 1. Shown with stripes and an outline." | done: the planes are distinguished by name and by the stated cue (`P4_12`). Not a visual CVD check. |
| T6 | B to "Static views", Enter, ↓ | "figure, graphic: Side view: The C–C axis is horizontal…"; "Along C–C: You are looking along the C–C axis. The two planes appear as a cross…" | done (`P4_13`) |

**Layout note.** In the paginated layout, moving NVDA's browse cursor to "Model description" (at a column boundary) made Thorium change column. NVDA's position then jumped to the top of the new column ("Auto-rotate"), twice (`P4_09`). T1, T5, T6 and T7 were therefore done in the scrolled layout; T2–T4 were done in the paginated layout. The paginated layout was restored afterwards.

**Version.** The NVDA version was not read in this session (Help > About is not reachable remotely). It must be confirmed by the author before it is reported. **Confirmed on 6 November 2026** by the corresponding author from Help > About: NVDA 2026.3 (2026.3.0.58174) (screenshot `nvda_thorium_run_evidence/24_NVDA_about_version_2026.3.png`).

**Note of 6 November 2026.** In screenshots `00_Thorium_library_version_3.5.1.jpg` (other publications in the library) and `01_NVDA_SpeechViewer_open.jpg` (desktop), areas unrelated to the check were masked for publication. The Speech Viewer window and the version number are unchanged.
