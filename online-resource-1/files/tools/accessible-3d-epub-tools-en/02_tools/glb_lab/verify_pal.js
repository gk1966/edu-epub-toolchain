// Copyright (c) 2026 Georgios Korakakis. MIT License, see LICENSE.txt.
const fs=require('fs');
const C=require('./cvd-core.js');
const P=require('./palettes.json');
const rows=[];
for(const m of P)for(const mode of ['dark','light']){
 const bg=mode==='dark'?'#0E1318':'#F4F6F8';
 const gs=m.groups.filter(g=>!g.quiet);
 const cols=gs.map(g=>{const h=g.safe[mode],a=g.safeAlpha?.[mode]??g.origAlpha??1;const fill=C.hex(C.fromHex(h).map((v,i)=>a*v+(1-a)*C.fromHex(bg)[i]));return {g,hex:g.outline?h:fill,fill};});
 let all={value:Infinity},filtered={value:Infinity};
 for(const t of ['normal','protan','deutan','tritan'])for(const p of C.pairs(cols.map(c=>({hex:c.hex})),t,100)){
  const r={value:p.simulated,type:t,pair:[cols[p.i].g.id,cols[p.j].g.id]};
  if(r.value<all.value)all=r;
  if(!(cols[p.i].g.pattern||cols[p.j].g.pattern)&&r.value<filtered.value)filtered=r;
 }
 rows.push({page:m.page,model:m.model,mode,minimum_all_pairs:all,minimum_excluding_pattern_pairs:filtered,fill_contrast_below3:cols.map(c=>({id:c.g.id,ratio:C.contrast(C.fromHex(c.fill),C.fromHex(bg)),outline:!!c.g.outline})).filter(c=>c.ratio<3)});
}
fs.writeFileSync(process.argv[2] || 'palette_recheck.json',JSON.stringify(rows,null,2));
console.log(JSON.stringify(rows,null,2));
