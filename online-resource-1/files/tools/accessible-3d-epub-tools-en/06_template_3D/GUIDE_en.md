# Generating the English interactive 3D pages

This revised guide accompanies the English review derivative. It describes the supplied implementation and its limits. The original Greek guide is retained with the original records. The learning materials include interactive controls, static views and separate linked text alternatives; complete accessibility of the English derivative has not been certified.

## Source and operation

The original geometry was authored by Georgios Korakakis in Autodesk 3ds Max. Model meaning is mapped to exported objects through `02_tools/a11y3d/configs.py`. Each role has a name, a description, a selection of GLB objects and colour settings. These data feed the page's controls and descriptions. They require checking by a chemistry subject expert.

The supplied interface supports component visibility and highlighting, arrow-key rotation, +/− zoom, preset views with 1/2/3, reset with 0 and a view description with D. Live messages describe supported changes. Their actual delivery depends on the browser, reading system and assistive technology and requires runtime testing. Static descriptions and images remain in the document without scripting; a direct text alternative should also be reachable.

## Reproducing the supplied pages

From the source-tools root, run:

```text
python 02_tools/a11y3d/gen.py web generated-pages --images 02_tools/a11y3d/views
python 02_tools/a11y3d/gen.py fallback generated-fallbacks --images 02_tools/a11y3d/views
node 02_tools/glb_lab/verify_pal.js palette_recheck.json
node 02_tools/glb_lab/check_numerical_core.cjs numerical_core_validation.json
```

`gen.py epub` generates the interactive HTML resources for EPUB integration, with relative image references. These generated resources are not a complete EPUB by themselves: the publication also needs its chapters, navigation, manifest, spine, resources and fallback links. Validate the assembled EPUB and test it in the named reading systems. The included final EPUB and its expanded source are at the supplementary root under `epub/`.

The English model maps have been synchronised with the final web and EPUB maps. Generation does not establish semantic correctness, contrast conformance or usability. Check generated text, links, model readiness and the actual controls after any change.

## Adding a new model

Give original objects meaningful names and organise materials by scientific role. Use a glTF/GLB export pipeline supported by the available authoring tools. The legacy conversion scripts are supplied for the original pipeline, but their input files, dependencies and path settings must be configured; they are not a universal converter for every authoring format.

Inspect the export in GLB Lab, then add a page/model configuration based on an existing entry. Verify each `match` selection against the actual exported objects. Describe the representation accurately: ball-and-stick rods encode bond order, whereas orbital lobes depict a different explanatory model. Do not infer missing parts or treat schematic angles as measured molecular geometry.

Choose colour and non-colour cues for meaningful roles, and inspect both themes. The supplied palette calculation compares specified identifying colours with a stage background and computes pairwise colour differences. It distinguishes outlined-plane fills from their outlines and excludes quiet auxiliary roles. A transparent fill can remain below 3:1 even when an outline contrasts with the stage. Evaluate the actual adjacent surfaces and rendered scene; do not interpret a numerical minimum or a CVD simulation as an accessibility certificate.

## Requesting help with a semantic map

```text
Given the exported GLB object inventory and a subject-expert description of what the model represents, propose an entry for configs.py following an existing entry. Give each meaningful role an id, English label, concise description and exact object selection. Describe what the side, axial and top views actually show. Identify uncertainty and any role that cannot be mapped. Do not invent objects or assert accessibility compliance. Preserve the distinction between schematic geometry, bond-order rods and orbital representations. Suggest colour and additional cues for both themes, then list the manual and runtime checks required.
```

The study's actual Greek prompts and their separate English reference translations are provided elsewhere in the supplementary package. The example above is an authoring aid, not an additional experimental condition or result.

## Verification scope

Use `05_protocol/protocol_and_prompts_en.md` for the current task types and a future recording template. The translated historical proposed plan is explicitly labelled separately. Original Greek runtime records are not results for the English derivative. See `REPRODUCIBILITY.md` and the package verification report for exact checks and remaining limits.
