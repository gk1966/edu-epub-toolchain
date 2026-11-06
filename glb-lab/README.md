# GLB Lab 0.2

An accessibility check for 3D glTF/GLB models, in one HTML file that works offline.

Accessibility checkers for web pages and documents, such as axe-core or PAC, examine the page or the document. A 3D model inside it reaches them as one element, and they are not designed to examine the model itself. GLB Lab reads the model and reports:

- **Part names.** How many geometry-bearing parts carry names that modelling software generated, such as `Cone002` or `Circle09-FACES001`. A screen reader can announce only names that mean something.
- **Text drawn as geometry.** Letters such as “σ”, “π” or “H” modelled as shapes. Assistive technology cannot read them, so they need a text equivalent.
- **Descriptions.** Which parts have `extras.a11y.label` or `extras.a11y.description`.
- **Contrast.** Each role colour against the viewer background, and every pair of roles against each other. The criterion is 3:1, as in WCAG 2.2, success criterion 1.4.11.
- **Colour vision deficiency.** The role pairs that come closest (CIEDE2000) under simulated protanopia, deuteranopia and tritanopia (Machado et al., 2009), at a severity you choose.
- **What the figures do not cover.** Textures, vertex colours, emission, unlit or transmission materials, alpha masks, primitives without a material, and the glTF extensions used.

The model is read in the browser and is not uploaded. The page loads nothing from the network.

## Use

1. Open `glb-lab.html` in a current web browser. It was tested in Chromium (see `VALIDATION.md`).
2. Choose a `.glb` or `.gltf` file, or drag it onto the page. “Load the sample” opens an example model.
3. Set the viewer background. For each material colour, write what it represents (e.g. “π bond”), the colour your viewer really shows, and its opacity.
4. Read panels 2 to 6. Download the JSON report: it records the version, the file’s SHA-256, every setting and rule, and all results, so the check can be repeated.
5. Panel 8 runs the self-test of the calculations.

Command line (Node.js 18 or later), with the same core and rules:

```
node cli/glb-lab-cli.js --bg "#070810" --out report model.glb
node tests/run-tests.js tests/test-results.json
```

## Contents

| Path | What it is |
| --- | --- |
| `glb-lab.html` | The tool: one self-contained file, built from `src/` with `build.py` |
| `src/cvd-core.js` | CVD Lab 2.1 numerical core (simulation, CIEDE2000, contrast), unchanged |
| `src/glb-core.js` | Model analysis: parsing, rules, warnings, blending, self-test |
| `src/template.html`, `src/sample.js`, `build.py` | Page source, sample model, build script |
| `cli/glb-lab-cli.js` | Command-line version |
| `tests/` | Tests, reference data, six test models and their expected values, last test results |
| `previous/glb-lab-0.1.html` | Version 0.1, as used in the study described below |
| `METHOD.md`, `VALIDATION.md`, `CHANGELOG.md` | Method and formulas, what was checked and how, changes |

## Limits

- The colours are material colours. Lighting, shadows, specular highlights, tone mapping, textures and vertex colours change what is on screen and are not modelled. Panel 6 says when a model contains any of them.
- The tool cannot know which colours are adjacent on screen. It lists every role pair below 3:1; the user decides which are adjacent.
- Names and text are found with heuristics tuned for 3ds Max exports. Check the list of parts.
- Simulations model average colour vision deficiency, not a particular person. The ΔE₀₀ threshold is exploratory, not a validated limit.
- GLB Lab supports inspection by a person. It does not diagnose, and it does not show that a model is understandable or accessible.

## Author, licence and citation

Georgios Korakakis, Department of Graphic Design and Visual Communication, School of Applied Arts and Culture, University of West Attica, Egaleo, Athens, Greece. ORCID [0009-0005-0042-6348](https://orcid.org/0009-0005-0042-6348). Contact: gkorakakis@uniwa.gr.

Code: MIT License (`LICENSE`). The test models and the sample are © Georgios Korakakis, CC BY-NC 4.0. The code was written with the assistance of Claude (Anthropic), an AI system, under the author’s direction; the author checked it and is responsible for it.

Cite as: Korakakis, G.: GLB Lab: an accessibility check for 3D glTF/GLB models, version 0.2.0. Zenodo (2026). https://doi.org/10.5281/zenodo.24002735. See `CITATION.cff`.

GLB Lab was developed for the accessibility audit of an interactive EPUB on sp hybridisation (manuscript in preparation). That audit used version 0.1.

glTF and WebGL are trademarks of the Khronos Group; 3ds Max is a trademark of Autodesk; other names are trademarks of their owners. Their use here only identifies the formats and software concerned.
