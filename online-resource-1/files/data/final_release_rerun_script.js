// Scripted re-run of T1-T7 on the five interactive pages of the final English EPUB (key fix of 5 Nov 2026),
// plus axe-core 4.10.2 (WCAG 2.2 A/AA + best practice) on all XHTML/HTML content documents.
const {chromium}=require('playwright'); const fs=require('fs'); const path=require('path');
const ROOT=process.argv[2]; const OUT=process.argv[3];
const AXE=fs.readFileSync('/tmp/claude-0/axe/node_modules/axe-core/axe.min.js','utf8');
const pages=[['P1','02-ethyne-structure-3d.html'],['P2','04-sp-orbital-viewer.html'],['P3','06-axes-pi-symmetry.html'],['P4','07-complete-sigma-pi-explorer.html'],['P5','12-compare-3d.html']];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--allow-file-access-from-files']});
 const res={tool:'Playwright Chromium (headless, software WebGL)', chromium:b.version(), axe:'4.10.2', date:new Date().toISOString(), pages:[], axe_runs:[]};
 for(const [id,f] of pages){
  const p=await b.newPage({viewport:{width:1280,height:900}}); const errs=[]; p.on('pageerror',e=>errs.push(String(e)));
  await p.goto('file://'+path.join(ROOT,'OEBPS/interactive',f)); await sleep(9000);
  const live=async()=>p.evaluate(()=>document.getElementById('live').textContent.trim());
  const r={page:id,file:f,tasks:{}};
  // choose model for P5 (ethene for T2), else single model
  const panels=await p.evaluate(()=>[...document.querySelectorAll('[data-model-panel]')].map(e=>e.getAttribute('data-model-panel')));
  r.models=panels;
  // T1 + T5: description text of each model panel
  const desc=await p.evaluate(()=>[...document.querySelectorAll('details.desc')].map(d=>d.textContent.replace(/\s+/g,' ').trim()));
  r.tasks.T1={pass: desc.length>0 && desc.every(t=>t.length>150), n:desc.length, lengths:desc.map(t=>t.length)};
  const counts=desc.map(t=>({sigma:(t.match(/(\d+)\s*σ bonds?/)||[])[1]||null, pi:(t.match(/(\d+)\s*π bonds?/)||[])[1]||null, angle:(t.match(/(109\.5|109\.47|120|180)\s*°/)||[])[1]||null}));
  r.tasks.T5={counts, zeroPi: desc.map(t=>/\b(no|0)\s*π/.test(t))};
  // T6 static views
  const st=await p.evaluate(()=>[...document.querySelectorAll('details.static img')].map(i=>(i.getAttribute('alt')||'').trim().length));
  r.tasks.T6={pass: st.length>=3 && st.every(n=>n>20), images:st.length, minAltLength: st.length?Math.min(...st):0};
  // P5: pick ethene for T2/T3/T4 if present
  if(panels.length>1){ await p.evaluate(()=>{const b=[...document.querySelectorAll('button')].find(x=>/^Ethene/.test(x.textContent.trim())); if(b) b.click();}); await sleep(1500); }
  const model = panels.length>1 ? 'c2h4' : panels[0];
  // T3 along axis via key 2 on canvas
  await p.focus('#c'); await p.keyboard.press('2'); await sleep(700); const t3=await live();
  r.tasks.T3={pass:/^Along/.test(t3), live:t3.slice(0,140)};
  // T4 rotate 3x15 and reset; check no document-level listeners get the keys
  await p.evaluate(()=>{window.__doc=0;document.addEventListener('keydown',()=>window.__doc++,true)});
  for(let i=0;i<3;i++){await p.keyboard.press('ArrowRight'); await sleep(1200);} const t4a=await live();
  await p.keyboard.press('0'); await sleep(700); const t4b=await live(); const leaked=await p.evaluate(()=>window.__doc);
  r.tasks.T4={pass:/Rotated 15° right/.test(t4a)&&/^Side view/.test(t4b)&&leaked===0, afterRotate:t4a.slice(0,80), afterReset:t4b.slice(0,80), keysReachingDocument:leaked};
  // T2: hide all parts except pi bonds (via checkboxes of the active model)
  const t2=await p.evaluate(async(model)=>{
    const boxes=[...document.querySelectorAll(`input[type=checkbox][id^="chk-${model}-"]`)];
    const lab=b=>{const l=document.querySelector(`label[for="${b.id}"]`)||b.closest('label'); if(l) return l.textContent.replace(/\s+/g,' ').trim(); const li=b.closest('li'); const n=li&&li.querySelector('.pname,.name,strong,span'); return n? n.textContent.trim():'';};
    const isPi=b=>/π bond/i.test(lab(b));
    const piBoxes=boxes.filter(isPi);
    if(!piBoxes.length) return {applicable:false, parts:boxes.map(lab).map(s=>s.slice(0,30))};
    for(const bx of boxes){ if(!isPi(bx) && bx.checked){ bx.click(); await new Promise(r=>setTimeout(r,250)); } }
    return {applicable:true, live:document.getElementById('live').textContent.trim().slice(0,160), checkedNow:boxes.filter(b=>b.checked).map(lab).map(s=>s.slice(0,30))};
  }, model);
  if(t2.applicable) t2.pass=/Visible: [^.]*π/.test(t2.live) && t2.checkedNow.every(s=>/π bond/i.test(s));
  r.tasks.T2=t2;
  // T7 (P4): non-visual cue in descriptions
  if(id==='P4'){ const all=desc.join(' '); r.tasks.T7_nonvisual={pass:/Plane 2 \(stripes\)/.test(all)&&/solid outline/.test(all)&&/stripes and an outline/.test(all)}; }
  r.pageErrors=errs; res.pages.push(r); await p.close();
 }
 // axe-core on every content document of the EPUB
 const files=[]; (function walk(d){for(const n of fs.readdirSync(d)){const q=path.join(d,n); if(fs.statSync(q).isDirectory()) walk(q); else if(/\.(x?html)$/.test(n)) files.push(q);}})(path.join(ROOT,'OEBPS'));
 for(const f of (process.env.SKIPAXE?[]:files.sort())){
  const p=await b.newPage(); try{ await p.goto('file://'+f); await sleep(/interactive/.test(f)?8000:800);
   await p.addScriptTag({content:AXE});
   const a=await p.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']}}); return {v:r.violations.map(x=>x.id+':'+x.nodes.length), inc:r.incomplete.map(x=>x.id+':'+x.nodes.length)}});
   res.axe_runs.push({file:path.relative(ROOT,f), violations:a.v, incomplete:a.inc});
  }catch(e){ res.axe_runs.push({file:path.relative(ROOT,f), error:String(e).slice(0,120)}); }
  await p.close();
 }
 await b.close(); fs.writeFileSync(OUT, JSON.stringify(res,null,1)); console.log('written');
})();
