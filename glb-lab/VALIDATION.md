# GLB Lab 0.2: what was checked

Checked on 6 November 2026 by running the scripts in `tests/`. The records are `tests/test-results.json` and `tests/browser-check-results.json`. Nothing here is a test with users or with assistive technology.

## 1. Numerical core and rules (Node.js 22, `node tests/run-tests.js`): 14 of 14 passed

| Test | Reference | Result |
| --- | --- | --- |
| CIEDE2000 | The 34 test pairs published with Sharma, Wu & Dalal (2005) | All 34 within 5·10⁻⁵, the rounding of the published values (largest error 4.95·10⁻⁵) |
| Simulation matrices | The table of Machado et al. on the authors’ page: 3 types × 11 severities | All 33 matrices identical (largest difference 0) |
| Grey axis | Every matrix row sums to 1, so white and greys are kept | Largest deviation 1·10⁻⁶, the rounding of the table |
| WCAG contrast | Black/white 21:1; #767676/white 4.54:1; #777777/white 4.48:1 | 21.000, 4.542, 4.478 |
| sRGB transfer function | Decode and encode all 256 values | All returned unchanged |
| glTF colour conversion | Linear 0.5 → #BCBCBC; 0.2158605 → #808080 | Equal |
| Blending | White at α 0.2 over black: #333333 on sRGB values, #7C7C7C in linear light | Equal |
| Rules | A synthetic model: generated names, text under a `Text…` parent, `extras.a11y.label`, vertex colours, unlit material, primitive without material, BLEND | All detected |
| Regression | The six models in `tests/fixtures` against `tests/expected_fixtures.json` | All six equal (parts, generated names, text as geometry, colours, smallest ΔE₀₀ for four types of vision, colours below 3:1) |

The expected values come from GLB Lab 0.1, as recorded in the study. Text as geometry was recounted on 6 November 2026; see `CHANGELOG.md`. Apart from that count, version 0.2 gives the same results as 0.1.

## 2. The page in a browser (`tests/browser-check.js`)

Chromium 153 (headless, Playwright) with axe-core 4.10.2, file opened from disk:

- The page renders in standards mode, with no page errors and **no network requests**. It works offline.
- The self-test in panel 8 passes 5 of 5.
- The six test models give the same values as the command line.
- axe-core (WCAG 2.0–2.2 A/AA and best practices) reported **no violations** in light and dark themes at 1280 px, or at 390 px. Its “incomplete” items are colour-contrast checks it could not complete: at 1280 px the report text box, which scrolls; at 390 px also cells of the wide tables that lie partly outside their scrolling frame, and short numeric cells. These were not checked by hand.
- There is no horizontal scrolling of the page at 390 px; only the wide tables scroll inside their frames.

## Not checked

- Browsers other than Chromium, and screen readers.
- Use by teachers or authors.
- Models from software other than 3ds Max beyond the synthetic test. The name and text rules are heuristics.
- Whether the ΔE₀₀ threshold or the simulation predicts what a particular person can tell apart.
