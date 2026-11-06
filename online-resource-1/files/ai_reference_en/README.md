# English reference translations of the AI output variants — untested derivatives

**Status.** These folders are English *reference* translations, made for readers who do not read Greek. They are **untested translated derivatives**.
The empirical evidence is the set of Greek originals in `../original_ai_outputs/`, which were not changed.
**All results reported for the AI variants apply only to the Greek originals.** That includes axe, GLB Lab, contrast figures, keyboard tasks, rounds and timings. None of these checks were re-run on these copies.

The prompts that produced the variants are translated separately in `../ai_prompts_en/` (`prompt_A_en.txt`, `prompt_B_en.txt`). The Greek prompts are the ones that were actually used.

## Folders

Each folder is a complete copy of the original folder, so that relative resources remain intact.

| Folder | Origin | Translated files |
| --- | --- | --- |
| `chatgpt-a/` | ChatGPT, prompt A | `ethyne.xhtml`, `ChatGPT_A.html` (identical to `ethyne.xhtml` in the original), `nav.xhtml`, `package.opf`, `viewer.js` |
| `chatgpt-b/` | ChatGPT, prompt B | `index.xhtml`, `ChatGPT_B.html` (identical to `index.xhtml` in the original), `package.opf`, `viewer.js`, `semantic-map.json` |
| `gemini-a-as-delivered/` | Gemini, prompt A, as delivered | `Gemini_A.html` |
| `gemini-a-with-libraries/` | the same Gemini A page with libraries inlined | `index.html` |
| `gemini-b-pro/` | Gemini Pro, prompt B | `index.html` (`correction-from-gemini.js` contains only Greek comments, so it is unchanged) |

## What was translated

Only human-facing text was translated:
- headings, paragraphs, buttons, labels, list items and footers;
- `title`, `alt` and `aria-label` text;
- live-region and status announcements, and error messages shown on the page;
- model part names and descriptions (including `semantic-map.json` in chatgpt-b and the inline part data in gemini-b-pro);
- OPF/nav titles.

`lang`/`xml:lang` and `dc:language` were changed from `el` to `en-GB` to match the new text. The `dc:identifier` values were left unchanged.

## What was deliberately left as delivered

- **No accessibility or code repairs.** JS identifiers, ids, classes, `data-*` values, numbers, colours, file names, GLB part names, control logic and event handling are unchanged.
  - A line-level comparison confirms that only lines containing Greek were changed in each file.
  - The checks below give the same results as on the originals:
    - `node --check` on every JS file and inline script;
    - JSON parsing;
    - XML parsing (in XHTML/OPF and the XML-declared HTML pages).
- **Original defects are preserved.** For example:
  - `gemini-a-as-delivered/Gemini_A.html` still loads `../js/three.min.js`, `../js/OrbitControls.js` and `../js/GLTFLoader.js`, which are not supplied.
  - `gemini-a-with-libraries/index.html` is still not well-formed XML (parser error at line 177, column 40), exactly as in the original.
  - The LaTeX-style markup in the Gemini A text (`$sp$`, `$\sigma_{\text{C-C}}$`, …) is kept unrendered, as delivered.
  - Wording that describes accessibility features (for example the “Accessibility” note in chatgpt-b) is translated faithfully as the AI system’s own statement. It has not been checked against the behaviour of the page.
- **Code comments and developer console messages** (`console.error(...)`) in the Gemini files remain in Greek. They are not shown on the page. An English gloss is given below.
- **Raster and binary content is unchanged:** GLB models, `chatgpt-a/data.js`, `chatgpt-b/world-transforms.json` and `contrast-ratios.json` (which contain no Greek), and the embedded base64 static image in `gemini-b-pro/index.html`.
- **Images not translated:** the small caption text drawn inside `chatgpt-b/view-side.png`, `view-axis.png` and `view-top.png` renders in the originals as missing-glyph boxes. It cannot be read or translated without editing the images, so the images are unchanged.
- **Register:** gemini-b-pro uses non-standard Greek terms (“ορβιταλικά”, “υβριδοποιημένα”). The translation renders them in standard English (“orbitals”, “unhybridised”), so this feature of the original is not reproduced.
- **View labels:** “Πλάγια όψη” is rendered as “Side view” in the ChatGPT variants and as “Oblique view” in gemini-b-pro. In gemini-b-pro this follows the model’s own code comment (“Oblique”).

## English gloss of the Greek code comments (not inserted into the files)

`gemini-a-as-delivered/Gemini_A.html` and `gemini-a-with-libraries/index.html` (identical comments):
- `Πλαϊνό UI Ελέγχου`: side control UI
- `Πάνελ Θεωρίας (Χημεία Γ΄ Λυκείου)`: theory panel (Chemistry, Greek Lyceum Year 3)
- `Τοπικά scripts για ασφαλή λειτουργία εντός EPUB 3`: local scripts for safe operation inside EPUB 3
- `Αρχικοποίηση Σκηνής`: scene initialisation
- `Φωτισμός`: lighting
- `Διαχείριση Ομάδων Μοντέλου`: model group management
- `Εάν το μοντέλο βρίσκεται στον ίδιο κατάλογο με όνομα 'ethyne.glb'`: if the model is in the same directory, named 'ethyne.glb'
- `Κεντράρισμα του μοντέλου`: centring the model
- `Ταξινόμηση meshes με βάση τα IDs του GLB`: sorting meshes by the GLB IDs
- `PART1_*, Circle*, Cone*, Cylinder* κλπ.`: PART1_*, Circle*, Cone*, Cylinder*, etc.
- Console message `Σφάλμα φόρτωσης GLB:`: GLB loading error

`gemini-b-pro/index.html` (lines 5546–5585 also appear in `correction-from-gemini.js`):
- `Το περιεχόμενο θα μπορούσε να δημιουργηθεί στατικά, αλλά αφήνεται δομικά έτοιμο`: the content could be generated statically, but is left structurally ready
- `Διόρθωση θεμάτων διαφάνειας`: fixing transparency issues
- `1. Υδρογόνα (H)`: 1. Hydrogen atoms (H)
- `Αντιστοίχιση των στοιχείων που ζητήθηκαν (συμπεριλαμβανομένων των Sphere για ασφάλεια)`: mapping of the requested elements (including the Sphere objects, to be safe)
- `2. Επίπεδο 1 (π.χ. xy)`, `3. Επίπεδο 2 (π.χ. xz)`: 2. Plane 1 (e.g. xy); 3. Plane 2 (e.g. xz)
- `4. Δεσμοί π`, `5. Άξονες`, `6. Περιοχή σ και Λοβοί sp`: 4. π bonds; 5. Axes; 6. σ region and sp lobes
- The five-line note: “The file has no strict geometric separation between the sp lobes and the central σ bond through the PART1_ names. Therefore the PART1_ objects are shared between both entities (so that the region is highlighted), while the cones and cylinders are not arbitrarily ‘named’ but complete the picture.”
- `Πλάγια (Oblique)`, `Κατά μήκος (Along Axis)`, `Από πάνω (Top Down)`: Oblique; Along the axis; From above
- Console message `Σφάλμα φόρτωσης μοντέλου:`: model loading error

## Not performed

No browser rendering, axe, EPUBCheck, GLB Lab, keyboard or screen-reader testing was carried out on these copies. No software was installed.
