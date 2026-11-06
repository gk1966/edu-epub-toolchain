#!/usr/bin/env python3
"""Assemble the single-file glb-lab.html from src/. usage: python3 build.py [DOI]"""
import json, re, sys, pathlib
R = pathlib.Path(__file__).resolve().parent
doi = sys.argv[1] if len(sys.argv) > 1 else ""
ver = re.search(r"VERSION = '([^']+)'", (R/'src/glb-core.js').read_text()).group(1)
t = (R/'src/template.html').read_text(encoding='utf-8')
sample = (R/'src/sample.js').read_text(encoding='utf-8')
cite = f'Zenodo (2026). <a href="https://doi.org/{doi}">https://doi.org/{doi}</a>' if doi else 'Zenodo (2026).'
rep = {
 '/*@CVD_CORE@*/': (R/'src/cvd-core.js').read_text(encoding='utf-8'),
 '/*@GLB_CORE@*/': (R/'src/glb-core.js').read_text(encoding='utf-8'),
 '/*@SHARMA@*/': json.dumps((R/'tests/data/ciede2000testdata.txt').read_text()),
 '/*@MACHADO@*/': json.dumps({k: v for k, v in json.loads((R/'tests/data/machado2009_matrices_reference.json').read_text()).items() if k in ('protan','deutan','tritan')}, separators=(',', ':')),
 '/*@SAMPLE@*/': sample, '@VERSION@': ver, '@CITE_DOI@': cite,
}
for k, v in rep.items():
    assert k in t, k
    t = t.replace(k, v)
assert '@' + 'VERSION' not in t and '/*@' not in t
(R/'glb-lab.html').write_text(t, encoding='utf-8')
print('glb-lab.html', ver, len(t), 'bytes', 'DOI' if doi else 'no DOI')
