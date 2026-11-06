# Changelog

## 0.2.0 (6 November 2026)

**Correction**
- Text as geometry: the command-line version now also checks the parent node’s name, like the browser version of 0.1. In the P4 model of the test set (`07-complete-sigma-pi-explorer.glb`), the 0.1 command line counted 4 text objects instead of 11. It missed seven labels (σ ×3, π ×4) whose meshes are named `PARTn_m` under `Text…` nodes. Over the six test models the total is 31, not 24.

**New**
- Panel 4: contrast between every pair of roles (WCAG 2.2 SC 1.4.11 concerns adjacent colours).
- Panel 6: what the colour figures do not cover in the loaded model (textures, vertex colours, emission, unlit, transmission, alpha mask, default material, extensions).
- Choice of blending space for transparent parts: on sRGB values (the WebGL default, as before) or in linear light.
- Self-test in the page: 34 CIEDE2000 reference pairs (Sharma et al. 2005), the 33 matrices published by Machado et al., row sums, WCAG contrast values and the sRGB round trip.
- JSON report with the file’s SHA-256, the date, all settings and rules, warnings, contrasts between roles and the list of parts; JSON and CSV download.
- Command-line version with the same core (`cli/`), tests (`tests/`), method (`METHOD.md`) and validation record (`VALIDATION.md`).
- Author, licence, method, references and citation in the page.

**Changed**
- A complete, standalone HTML document (doctype, viewport, language), so it renders in standards mode.
- No web fonts: the page loads nothing from the network and works offline.
- Generic-name pattern: also `Cube`, `Icosphere`, `UVSphere` (Blender defaults). No change for the test models.
- Contrast is shown with two decimals.

**Unchanged**
- The numerical core (CVD Lab 2.1; its file header says 2.0.0). The results on the six test models are the same as with 0.1, apart from the text count above.

## 0.1 (2026, research draft)

The version used for the model audit in the study. Kept in `previous/glb-lab-0.1.html`. In this archived copy, the link to Google Fonts was removed on 6 November 2026 so that the page makes no network request; nothing else was changed. Without the web fonts, the page falls back to system fonts.
