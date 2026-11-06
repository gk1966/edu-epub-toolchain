const { chromium } = require('playwright'); const fs=require('fs'); const path=require('path');
const O=process.argv[2], OUT=process.argv[3]; const axeSrc=fs.readFileSync('/root/scripts/node_modules/axe-core/axe.min.js','utf8');
const RULES={runOnly:['wcag2a','wcag2aa','wcag21aa','wcag22aa','best-practice']};
const files=[...fs.readdirSync(O+'/chapters').map(f=>'chapters/'+f),...fs.readdirSync(O+'/interactive').map(f=>'interactive/'+f)].filter(f=>/\.x?html$/.test(f));
(async()=>{const b=await chromium.launch({args:['--enable-unsafe-swiftshader','--use-gl=angle','--use-angle=swiftshader']});
const summary={method:{js:'page as published, scripts running, after the viewer reports ready',nojs:'scripts removed and <noscript> content shown, i.e. what a reading system without JavaScript renders; axe injected afterwards'},js:{},nojs:{}}; const total={js:0,nojs:0};
for(const mode of ['js','nojs']){
  const ctx=await b.newContext({viewport:{width:1200,height:900}});
  for(const f of files){
    if(mode==='nojs' && !f.startsWith('interactive')) continue;
    const p=await ctx.newPage();
    await p.route('**/*',async r=>{const u=r.request().url(); if(!u.startsWith('file:')) return r.abort();
      if(mode==='nojs' && /\.x?html$/.test(u.split('?')[0])){ let s=fs.readFileSync(decodeURIComponent(new URL(u).pathname),'utf8');
        s=s.replace(/<script\b[^>]*\/>/g,'').replace(/<script\b[\s\S]*?<\/script>/g,'').replace(/<noscript\b([^>]*)>/g,'<div data-was-noscript="1"$1>').replace(/<\/noscript>/g,'</div>');
        return r.fulfill({status:200,contentType:u.endsWith('.xhtml')?'application/xhtml+xml':'text/html',body:s}); }
      return r.continue();});
    await p.goto('file://'+path.join(O,f));
    if(mode==='js' && f.startsWith('interactive')) await p.waitForFunction(()=>window.__ready===true,{timeout:120000}).catch(()=>{});
    await p.waitForTimeout(400);
    const scripts=await p.evaluate(()=>document.scripts.length);
    await p.evaluate(axeSrc);
    const res=await p.evaluate(async(R)=>{const r=await axe.run(document,R);return {violations:r.violations.map(v=>v.id+':'+v.nodes.length),passes:r.passes.length,incomplete:r.incomplete.map(v=>v.id)};},RULES);
    if(mode==='nojs') res.scriptsLeft=scripts;
    summary[mode][f]=res; total[mode]+=res.violations.reduce((a,x)=>a+ +x.split(':')[1],0);
    await p.close();
  }
  await ctx.close();
}
summary.totals={documents_js:Object.keys(summary.js).length,documents_nojs:Object.keys(summary.nojs).length,violation_nodes:total};
fs.writeFileSync(OUT,JSON.stringify(summary,null,1)); console.log(JSON.stringify(summary.totals)); 
for(const m of ['js','nojs']) for(const [k,v] of Object.entries(summary[m])) if(v.violations.length||m==='nojs') console.log(m,k,JSON.stringify(v.violations),'passes',v.passes,'left',v.scriptsLeft);
await b.close();})();
