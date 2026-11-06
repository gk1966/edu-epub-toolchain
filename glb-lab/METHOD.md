# GLB Lab 0.2: method

All formulas are implemented in `src/cvd-core.js` (CVD Lab 2.1 numerical core, unchanged) and `src/glb-core.js`.

## 1. Reading the model

GLB (binary glTF 2.0) and `.gltf` (JSON) are accepted. Only the JSON part is read: node and mesh names, the node hierarchy, materials, primitive attributes and extensions. Geometry is not drawn.

A *part* is a node with a mesh. Its colours are the colours of the materials of its primitives. A primitive without a material uses the glTF default material (white, opaque).

## 2. Colours

- **Material colour.** `baseColorFactor` is linear in glTF 2.0. It is converted to 8-bit sRGB with the sRGB transfer function (IEC 61966-2-1): c ≤ 0.0031308 → 12.92c, otherwise 1.055c^(1/2.4) − 0.055.
- **Opacity.** It is used only when `alphaMode` is `BLEND`. `OPAQUE` and `MASK` are drawn opaque (with `MASK`, invisible below `alphaCutoff`).
- **Blending.** The result is α·C + (1 − α)·B, with B the background, computed either
  - on 8-bit sRGB values. WebGL does this when it draws into its default, sRGB-encoded drawing buffer, for example three.js with `outputColorSpace = SRGBColorSpace`, the default since r152. This is the default here; or
  - in linear light, as with a linear (floating-point) render target that is converted to sRGB afterwards.

  The two can differ a lot. White at α = 0.2 over black is #333333 on sRGB values and #7C7C7C in linear light. Choose the one your viewer uses.
- **Not modelled:** lighting, shadows, specular highlights, image-based lighting, tone mapping, textures, vertex colours (`COLOR_0`), emission, transmission and other material extensions. Panel 6 lists those found in the model.

## 3. Contrast

The relative luminance is L = 0.2126 R + 0.7152 G + 0.0722 B on linearised sRGB, and the contrast ratio is (L₁ + 0.05)/(L₂ + 0.05), as in WCAG 2.2. Success criterion 1.4.11 (Non-text Contrast) asks for at least 3:1 between parts of graphics needed to understand the content and the *adjacent* colours. GLB Lab reports:

- each role against the background, and
- every pair of active roles. The tool does not know which roles touch on screen; the user checks the pairs below 3:1 that are adjacent.

## 4. Colour vision deficiency

The simulation uses the matrices of Machado, Oliveira & Fernandes (2009) for protanomaly, deuteranomaly and tritanomaly at severities 0, 0.1, … 1.0. A severity between two of those values is interpolated linearly, element by element. The matrix is applied to linear sRGB, and the result is clipped to [0, 1] and encoded to sRGB; a clipped result is marked. At 100% the matrices model dichromacy (protanopia, deuteranopia, tritanopia).

The authors’ page does not state whether the matrices apply to linear or to gamma-encoded RGB. GLB Lab uses linear RGB, in line with the physiological model on which the matrices are based.

## 5. Colour difference

CIEDE2000 (kL = kC = kH = 1), on CIELAB computed from sRGB with the D65 white point (Xn = 0.95047, Zn = 1.08883) and the 2° observer. The implementation follows the notes of Sharma, Wu & Dalal (2005), including the hue-angle conventions. For each type of vision, the role pairs are ordered by ΔE₀₀ after simulation. The threshold (default 10) only orders the pairs to inspect; it is not a validated limit for a classroom or for a person.

## 6. Roles

Each distinct material colour is a row. Rows given the same role name are one role, and the row that colours the most parts represents it. Rows can be excluded, for example auxiliary objects that the viewer hides.

## 7. Names and text

- **Software-generated name:** the node name is empty or matches a pattern of generated names (e.g. `Cone002`, `Circle09-FACES001`, `VMtl003`, `PART1_5`, `Object 12`). See `GENERIC` in `src/glb-core.js`.
- **Text as geometry:** a part whose own name, mesh name *or parent node name* starts with `Text`. 3ds Max exports text shapes as nodes named `Text…`. The Babylon exporter may name their meshes otherwise (e.g. `PART1_3`) under a `Text…` parent, so the parent is checked too. GLB Lab 0.1 in the browser did this; its command-line version did not (see `CHANGELOG.md`).
- **Described:** the node or mesh has `extras.a11y.label` or `extras.a11y.description`.

These are heuristics. A model from other software, or with renamed parts, can produce false results, so check the list of parts.

## References

- Machado, G.M., Oliveira, M.M., Fernandes, L.A.F.: A physiologically-based model for simulation of color vision deficiency. IEEE Trans. Vis. Comput. Graph. 15(6), 1291–1298 (2009). https://doi.org/10.1109/TVCG.2009.113. Matrices: https://www.inf.ufrgs.br/~oliveira/pubs_files/CVD_Simulation/CVD_Simulation.html
- Sharma, G., Wu, W., Dalal, E.N.: The CIEDE2000 color-difference formula: implementation notes, supplementary test data, and mathematical observations. Color Res. Appl. 30(1), 21–30 (2005). https://doi.org/10.1002/col.20070
- W3C: Web Content Accessibility Guidelines (WCAG) 2.2. W3C Recommendation (2023). https://www.w3.org/TR/WCAG22/
- Khronos Group: glTF 2.0 Specification. https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html
- IEC 61966-2-1:1999, Multimedia systems and equipment — Colour measurement and management — Part 2-1: Default RGB colour space — sRGB.
