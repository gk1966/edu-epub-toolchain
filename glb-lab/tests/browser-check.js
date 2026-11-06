// Browser check of glb-lab.html with Playwright and axe-core (run from a folder where both are installed).
// usage: node tests/browser-check.js <path to glb-lab-v0.2> <path to axe.min.js> <output.json>
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const [ROOT, AXEPATH, OUT] = process.argv.slice(2); const AXE = fs.readFileSync(AXEPATH, 'utf8');
const exp = require(path.join(ROOT, 'tests/expected_fixtures.json'));
(async () => {
  const b = await chromium.launch(); const rec = { date: new Date().toISOString(), browser: 'Chromium ' + b.version() + ' (headless, Playwright)', axe: null, views: [], models: [] };
  for (const [name, opt] of [['light, 1280 px', { viewport: { width: 1280, height: 900 } }], ['dark, 1280 px', { viewport: { width: 1280, height: 900 }, colorScheme: 'dark' }], ['light, 390 px', { viewport: { width: 390, height: 844 } }]]) {
    const p = await b.newPage(opt); const errs = [], ext = [];
    p.on('pageerror', e => errs.push(String(e))); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    p.on('request', r => { if (!/^(file|blob|data):/.test(r.url())) ext.push(r.url()); });
    await p.goto('file://' + path.join(ROOT, 'glb-lab.html'));
    const v = { view: name, compatMode: await p.evaluate(() => document.compatMode), horizontalScroll: await p.evaluate(() => document.documentElement.scrollWidth > innerWidth) };
    if (name.startsWith('light, 1280')) {
      await p.click('#runTest'); v.selfTest = await p.textContent('#testStatus');
      for (const f of Object.keys(exp.files)) {
        await p.setInputFiles('#file', path.join(ROOT, 'tests/fixtures', f));
        await p.waitForFunction(n => document.getElementById('status').textContent.includes(n), f);
        const r = await p.evaluate(() => JSON.parse(document.getElementById('report').value)); const e = exp.files[f];
        const mn = t => r.closestPairs[t][0] ? +r.closestPairs[t][0].dE00.toFixed(1) : null;
        const got = { partsWithGeometry: r.counts.partsWithGeometry, softwareNames: r.counts.softwareNames, textAsGeometry: r.counts.textAsGeometry, distinctColours: r.roles.length, minDE00: { normal: mn('normal'), protan: mn('protan'), deutan: mn('deutan'), tritan: mn('tritan') }, coloursBelow3to1: r.roles.filter(x => !x.passes1411).length };
        const want = { partsWithGeometry: e.partsWithGeometry, softwareNames: e.softwareNames, textAsGeometry: e.textAsGeometry, distinctColours: e.distinctColours, minDE00: e.minDE00, coloursBelow3to1: e.coloursBelow3to1 };
        rec.models.push({ file: f, sha256: r.sha256, pass: JSON.stringify(got) === JSON.stringify(want), got });
      }
    }
    await p.addScriptTag({ content: AXE });
    const ax = await p.evaluate(async () => { const r = await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice'] }); return { version: axe.version, violations: r.violations.map(x => ({ id: x.id, nodes: x.nodes.length })), incomplete: r.incomplete.map(x => ({ id: x.id, nodes: x.nodes.length })) }; });
    rec.axe = 'axe-core ' + ax.version; v.axeViolations = ax.violations; v.axeIncomplete = ax.incomplete; v.pageErrors = errs; v.externalRequests = ext;
    rec.views.push(v); await p.close();
  }
  await b.close(); fs.writeFileSync(OUT, JSON.stringify(rec, null, 1)); console.log(JSON.stringify(rec, null, 1));
})();
