# Reproducing the English derivative

The semantic maps in `02_tools/a11y3d/configs.py` match the final English embedded maps. Run the generator from this directory, for example:

    python 02_tools/a11y3d/gen.py web generated-pages --images 02_tools/a11y3d/views

Palette calculations:

    node 02_tools/glb_lab/verify_pal.js palette_recheck.json

The palette input is included. All pairs among non-quiet roles are retained; an additional field shows the historical pattern-pair exclusion for comparison. Fill contrast is reported separately from the identifying outline. These are specified-colour calculations, not full rendered-scene validation.

Numerical reference check:

    node 02_tools/glb_lab/check_numerical_core.cjs numerical_core_validation.json

The included 34 reference pairs originate from the primary Sharma CIEDE2000 supplementary dataset; its source URL is recorded in the output.

The original historical dataset, including the source algorithm and its results, remains in the unmodified original ZIP. The six GLB audit inputs are included in `models/audit_inputs/` at the supplementary root. The two auxiliary models were recovered from the author-provided source folders and their checks were repeated. See `data/six_model_audit_recheck.json` at the supplementary root. Reproduction of geometry conversion additionally requires the original 3ds Max export inputs and path configuration; the final GLB geometry is included for inspection.

The supplied audit script has a platform-specific axe path and suppresses a viewer-ready timeout. The historical results are retained, but a future runtime re-audit must use an explicit local axe dependency, assert viewer readiness and record incomplete/manual items. No new axe results for the English derivative are claimed here.
