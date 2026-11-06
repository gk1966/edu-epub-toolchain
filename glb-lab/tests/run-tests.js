#!/usr/bin/env node
// GLB Lab tests: numerical core against published reference data, and regression on six real models.
// Copyright (c) 2026 Georgios Korakakis. MIT License. usage: node tests/run-tests.js [results.json]
'use strict';
const fs = require('fs'), path = require('path');
const CVD = require('../src/cvd-core.js'), G = require('../src/glb-core.js');
const D = p => path.join(__dirname, p);
const results = [];
for (const r of G.selfTest(fs.readFileSync(D('data/ciede2000testdata.txt'), 'utf8'), require(D('data/machado2009_matrices_reference.json')))) results.push({ group: 'numerical core', ...r });
// glTF colour conversion: linear 0.5 -> sRGB 188 (0xBC); 0.21404114 -> 128 (0x80).
results.push({ group: 'glTF', test: 'linear baseColorFactor to sRGB: 0.5→#BCBCBC, 0.2158605→#808080', pass: G.linToHex([0.5, 0.5, 0.5]) === '#BCBCBC' && G.linToHex([0.2158605, 0.2158605, 0.2158605]) === '#808080', detail: G.linToHex([0.5, 0.5, 0.5]) + ' ' + G.linToHex([0.2158605, 0.2158605, 0.2158605]) });
results.push({ group: 'glTF', test: 'blending: white at 0.2 over black = #333333 (sRGB) and #7C7C7C (linear)', pass: G.blend('#FFFFFF', 0.2, '#000000', 'srgb') === '#333333' && G.blend('#FFFFFF', 0.2, '#000000', 'linear') === '#7C7C7C', detail: G.blend('#FFFFFF', 0.2, '#000000', 'srgb') + ' ' + G.blend('#FFFFFF', 0.2, '#000000', 'linear') });
// Rules on a synthetic model.
const synth = { asset: { version: '2.0' }, materials: [{ name: 'Sigma bond', pbrMetallicRoughness: { baseColorFactor: [1, 0, 0, 1] } }, { name: 'VMtl003', alphaMode: 'BLEND', pbrMetallicRoughness: { baseColorFactor: [0, 0, 1, 0.3] }, extensions: { KHR_materials_unlit: {} } }],
  meshes: [{ name: 'Cone01-FACES001', primitives: [{ material: 0, attributes: { POSITION: 0 } }] }, { name: 'PART1_3', primitives: [{ material: 1, attributes: { POSITION: 0, COLOR_0: 1 } }] }, { name: 'm', primitives: [{ attributes: { POSITION: 0 } }] }],
  nodes: [{ name: 'Cone002', mesh: 0 }, { name: 'Text008', children: [2] }, { name: 'PART1_3', mesh: 1 }, { name: 'C–C σ bond', mesh: 2, extras: { a11y: { label: 'C–C σ bond' } } }] };
const s = G.analyse(synth);
const sOk = s.counts.partsWithGeometry === 3 && s.counts.softwareNames === 2 && s.counts.textAsGeometry === 1 && s.counts.described === 1 && s.warnings.some(w => w.code === 'vertexColours') && s.warnings.some(w => w.code === 'unlit') && s.warnings.some(w => w.code === 'defaultMaterial') && s.colours.find(c => c.hex === '#0000FF').blend === true;
results.push({ group: 'rules', test: 'synthetic model: names, text under Text… parent, a11y label, vertex colours, unlit, default material, BLEND', pass: sOk, detail: JSON.stringify(s.counts) });
// Regression on six real models (Online Resource 1 of the article).
const exp = require(D('expected_fixtures.json'));
for (const [f, e] of Object.entries(exp.files)) {
  const a = G.analyse(G.parse(fs.readFileSync(D('fixtures/' + f))));
  const cols = a.colours.map(c => ({ hex: c.blend ? G.blend(c.hex, c.alpha, exp.background, 'srgb') : c.hex }));
  const m = {}; for (const t of ['normal', 'protan', 'deutan', 'tritan']) { const p = CVD.pairs(cols, t, 100); m[t] = p.length ? +p[0].simulated.toFixed(1) : null; }
  const low = cols.filter(c => CVD.contrast(CVD.fromHex(c.hex), CVD.fromHex(exp.background)) < 3).length;
  const got = { partsWithGeometry: a.counts.partsWithGeometry, softwareNames: a.counts.softwareNames, textAsGeometry: a.counts.textAsGeometry, materials: a.counts.materials, distinctColours: a.counts.distinctColours, minDE00: m, coloursBelow3to1: low };
  const pass = JSON.stringify(got) === JSON.stringify(e);
  results.push({ group: 'regression', test: f, pass, detail: pass ? `parts ${got.partsWithGeometry}, text ${got.textAsGeometry}, colours ${got.distinctColours}, ΔE00 ${Object.values(m).join('/')}` : 'expected ' + JSON.stringify(e) + ' got ' + JSON.stringify(got) });
}
const ok = results.filter(r => r.pass).length;
for (const r of results) console.log((r.pass ? 'PASS ' : 'FAIL ') + `[${r.group}] ${r.test} — ${r.detail}`);
console.log(`${ok} of ${results.length} passed`);
if (process.argv[2]) fs.writeFileSync(process.argv[2], JSON.stringify({ tool: 'GLB Lab ' + G.VERSION, node: process.version, date: new Date().toISOString(), passed: ok, total: results.length, results }, null, 1));
process.exit(ok === results.length ? 0 : 1);
