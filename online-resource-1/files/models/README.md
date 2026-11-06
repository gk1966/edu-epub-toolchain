# Original GLB audit inputs

These six exported files reproduce the model audit in the article. The original models were authored by Georgios Korakakis in Autodesk 3ds Max. This audit describes the exported GLB structures, rather than the authorship or organisation of the original proprietary scenes.

| File | Geometry-bearing components | Text objects represented as geometry |
| --- | --- | --- |
| [02-ethyne-structure-3d.glb](audit_inputs/02-ethyne-structure-3d.glb) | 14 | 0 |
| [04-sp-orbital-viewer.glb](audit_inputs/04-sp-orbital-viewer.glb) | 39 | 4 |
| [06-axes-pi-symmetry.glb](audit_inputs/06-axes-pi-symmetry.glb) | 11 | 0 |
| [07-complete-sigma-pi-explorer.glb](audit_inputs/07-complete-sigma-pi-explorer.glb) | 53 | 4 |
| [sigma_me_ss.glb](audit_inputs/sigma_me_ss.glb) | 5 | 0 |
| [ener_sp3.glb](audit_inputs/ener_sp3.glb) | 35 | 16 |

Totals: 157 components and 31 geometric text objects (corrected on 6 November 2026: the command-line audit counted 4 instead of 11 in `07-complete-sigma-pi-explorer.glb`, because it ignored text objects whose mesh is named `PARTn_m` under a `Text…` node; see `../data/text_geometry_check_2026-11-06.json` and `../data/text_geometry_P4_glyphs_2026-11-06.png`). Under the supplied naming heuristic, none has a meaningful exported component name. The auxiliary overlap and energy models were recovered from the additional source folders supplied by the corresponding author. Their audit was rerun and included with the other four in `data/six_model_audit_recheck.json` at the supplementary root.

The models displayed in the remediated pages use semantic maps. The three comparison models in P5 also have edited geometry and descriptive names; these are in the source tools under `02_tools/a11y3d/models/` and are identified separately in the article.
