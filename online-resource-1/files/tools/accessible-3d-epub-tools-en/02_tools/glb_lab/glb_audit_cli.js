// Copyright (c) 2026 Georgios Korakakis. MIT License, see LICENSE.txt.
// GLB Lab CLI: same rules and numerical core as GLB Lab 0.1 (CVD Lab 2.1 core).
const fs=require('fs'),path=require('path'),C=require('./cvd-core.js');
const GENERIC=/^(?:\d*\s*-\s*)?(?:V\d*)?(?:Cone|Cyl|Cylinder|Sph|Sphere|Box|Circle|Torus|Plane|Mesh|Object|Group|Grp|Xfm|Mtl|Text|Line|Omni|Default|Material|Node|PART\d*|TRANSPARENT_PARTS|INITIAL_TRANSPARENT|Teapot|Geosphere|Capsule|Tube|Shape)[\s_#.\-]*\d*(?:[_\-]?FACES\d*)?(?:_\d+)?$/i;
const TEXTGEO=/^(?:V\d*)?Text\d*/i;
const enc=x=>x<=0.0031308?12.92*x:1.055*x**(1/2.4)-0.055;
const hex=c=>C.hex(c.slice(0,3).map(v=>255*enc(Math.max(0,Math.min(1,v)))));
function parse(p){const b=fs.readFileSync(p);const jl=b.readUInt32LE(12);return JSON.parse(b.slice(20,20+jl).toString('utf8'));}
const bg=process.env.BG||'#070810'; const rows=[];
for(const f of process.argv.slice(2)){
  const j=parse(f); const mats=(j.materials||[]).map(m=>({name:m.name||'',hex:hex((m.pbrMetallicRoughness||{}).baseColorFactor||[1,1,1,1]),tex:!!(m.pbrMetallicRoughness||{}).baseColorTexture}));
  const nodes=(j.nodes||[]).map((n,i)=>({n,i})).filter(x=>x.n.mesh!==undefined);
  const named=nodes.filter(x=>x.n.name&&!GENERIC.test(x.n.name)).length;
  const text=nodes.filter(x=>TEXTGEO.test(x.n.name||'')||TEXTGEO.test(((j.meshes||[])[x.n.mesh]||{}).name||'')).length;
  const desc=nodes.filter(x=>x.n.extras&&x.n.extras.a11y).length;
  const genericMat=mats.filter(m=>GENERIC.test(m.name)||/^\d+\s*-\s*Default$/i.test(m.name)).length;
  const used=new Set(); (j.meshes||[]).forEach(m=>m.primitives.forEach(p=>{if(p.material!==undefined)used.add(mats[p.material].hex);}));
  const cols=[...used]; const uv=(j.meshes||[]).every(m=>m.primitives.every(p=>'TEXCOORD_0' in p.attributes));
  const worst={}; for(const t of ['normal','protan','deutan','tritan']){const pr=cols.length>1?C.pairs(cols.map(h=>({hex:h})),t,100):[];worst[t]=pr.length?+pr[0].simulated.toFixed(1):null;}
  const lowC=cols.filter(h=>C.contrast(C.fromHex(h),C.fromHex(bg))<3);
  rows.push({file:path.basename(f),partsWithGeometry:nodes.length,meaningfulNames:named,softwareNames:nodes.length-named,textAsGeometry:text,withA11yExtras:desc,
    materials:mats.length,softwareMaterialNames:genericMat,distinctColours:cols.length,materialsPerColour:+(mats.length/Math.max(1,cols.length)).toFixed(1),texture:mats.some(m=>m.tex),uvOnAll:uv,
    minDE00_normal:worst.normal,minDE00_protan:worst.protan,minDE00_deutan:worst.deutan,minDE00_tritan:worst.tritan,coloursBelow3to1_vsViewerBg:lowC.length,colours:cols.join(' ')});
}
const keys=Object.keys(rows[0]);
fs.writeFileSync((process.env.OUT||'glb_audit')+'.json',JSON.stringify({tool:'GLB Lab 0.1 CLI',background:bg,rows},null,1));
fs.writeFileSync((process.env.OUT||'glb_audit')+'.csv',[keys.join(',')].concat(rows.map(r=>keys.map(k=>JSON.stringify(r[k]??'')).join(','))).join('\n'));
for(const r of rows) console.log(r.file.padEnd(48),'parts',r.partsWithGeometry,'named',r.meaningfulNames,'text',r.textAsGeometry,'mats',r.materials,'cols',r.distinctColours,'uv',r.uvOnAll,'ΔE n/p/d/t',r.minDE00_normal,r.minDE00_protan,r.minDE00_deutan,r.minDE00_tritan,'<3:1',r.coloursBelow3to1_vsViewerBg);
