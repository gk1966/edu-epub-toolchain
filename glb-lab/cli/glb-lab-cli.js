#!/usr/bin/env node
// GLB Lab command line: the same core and rules as glb-lab.html.
// Copyright (c) 2026 Georgios Korakakis. MIT License, see LICENSE.
// usage: node cli/glb-lab-cli.js [--bg #RRGGBB] [--severity 100] [--out report] model.glb [...]
'use strict';
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const CVD = require('../src/cvd-core.js'), G = require('../src/glb-core.js');
const args = process.argv.slice(2); const opt = { bg: '#070810', severity: 100, out: null }; const files = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--bg') opt.bg = args[++i]; else if (args[i] === '--severity') opt.severity = +args[++i];
  else if (args[i] === '--out') opt.out = args[++i]; else if (args[i] === '-h' || args[i] === '--help') { console.log('usage: glb-lab-cli.js [--bg #RRGGBB] [--severity 0-100] [--out name] model.glb ...'); process.exit(0); }
  else files.push(args[i]);
}
if (!files.length) { console.error('No model given. Try --help.'); process.exit(2); }
const rows = [];
for (const f of files) {
  const buf = fs.readFileSync(f), a = G.analyse(G.parse(buf));
  const cols = a.colours.map(c => ({ hex: c.blend ? G.blend(c.hex, c.alpha, opt.bg, 'srgb') : c.hex }));
  const minDE = {}; for (const t of ['normal', 'protan', 'deutan', 'tritan']) { const p = cols.length > 1 ? CVD.pairs(cols, t, opt.severity) : []; minDE[t] = p.length ? +p[0].simulated.toFixed(1) : null; }
  const low = cols.filter(c => CVD.contrast(CVD.fromHex(c.hex), CVD.fromHex(opt.bg)) < 3).length;
  rows.push({ file: path.basename(f), sha256: crypto.createHash('sha256').update(buf).digest('hex'), ...a.counts, minDE00: minDE, coloursBelow3to1: low,
    colours: a.colours.map(c => c.hex), warnings: a.warnings.map(w => `${w.code}:${w.count}`) });
}
const report = { tool: 'GLB Lab ' + G.VERSION + ' CLI', date: new Date().toISOString(), settings: { background: opt.bg, severityPercent: opt.severity, blending: 'srgb' }, rules: G.RULES, rows };
if (opt.out) {
  fs.writeFileSync(opt.out + '.json', JSON.stringify(report, null, 1));
  const keys = ['file', 'partsWithGeometry', 'softwareNames', 'textAsGeometry', 'described', 'materials', 'distinctColours', 'coloursBelow3to1'];
  fs.writeFileSync(opt.out + '.csv', [keys.concat(['minDE00_normal', 'minDE00_protan', 'minDE00_deutan', 'minDE00_tritan']).join(',')].concat(rows.map(r => keys.map(k => r[k]).concat(['normal', 'protan', 'deutan', 'tritan'].map(t => r.minDE00[t])).join(','))).join('\n') + '\n');
}
for (const r of rows) console.log(r.file.padEnd(40), 'parts', r.partsWithGeometry, 'software names', r.softwareNames, 'text', r.textAsGeometry, 'colours', r.distinctColours, 'ΔE00 n/p/d/t', Object.values(r.minDE00).join('/'), '<3:1', r.coloursBelow3to1, r.warnings.join(' '));
