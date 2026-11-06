// Copyright (c) 2026 Georgios Korakakis. MIT License, see LICENSE.txt.
const fs=require('fs');const C=require('./cvd-core.js');
const pairs=fs.readFileSync(require('path').join(__dirname,'ciede2000testdata.txt'),'utf8').trim().split(/\r?\n/).map(s=>s.trim().split(/\s+/).map(Number));
const checks=pairs.map((x,i)=>({case:i+1,expected:x[6],actual:C.deltaE(x.slice(0,3),x.slice(3,6))}));
const failed=checks.filter(c=>Math.abs(c.expected-c.actual)>0.000051);
const r={source:'https://hajim.rochester.edu/ece/sites/gsharma/ciede2000/dataNprograms/ciede2000testdata.txt',cases:checks.length,failed,max_abs_error:Math.max(...checks.map(c=>Math.abs(c.expected-c.actual))),black_white_contrast:C.contrast([0,0,0],[255,255,255]),orange_white_contrast:C.contrast(C.fromHex('#D55E00'),[255,255,255])};
fs.writeFileSync(process.argv[2] || 'numerical_core_validation.json',JSON.stringify(r,null,2));console.log(JSON.stringify(r));if(failed.length)process.exit(1);
