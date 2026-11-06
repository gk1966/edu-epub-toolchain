
(function () { 'use strict';
function boot(){
 const $=s=>document.querySelector(s), all=s=>Array.from(document.querySelectorAll(s));
 const canvas=$('#gl'), announce=$('#announcer'); if(!canvas||!announce)return;
 const ctx=canvas.getContext('2d',{alpha:false,willReadFrequently:true});
 if(!ctx){$('#error').textContent='Canvas display is not available. Use the static images.';return;}
 const roles=['sigma','sp','pi','plane1','plane2','hydrogen','axes'];
 const colors={light:{sigma:'#006678',sp:'#874400',pi:'#653A9C',plane1:'#176C44',plane2:'#2058A3',hydrogen:'#344054',axes:'#913564'},dark:{sigma:'#00D6EA',sp:'#FFB454',pi:'#C5A3FF',plane1:'#82E6A0',plane2:'#FFD76C',hydrogen:'#F5F7FC',axes:'#FF88B4'}};
 const views={side:'Side view: the sideways overlaps of the π orbitals, the linear axis and the two planes are visible.',axis:'Along the C–C axis: the two perpendicular directions of the p orbitals can be distinguished.',top:'View from above: the molecule is linear, and the overlaps can be distinguished relative to the planes.'};
 let yaw=.5,pitch=.3,zoom=1,selected=null,ready=false,groups=[],descriptions={},center=[0,0,0],radius=1,drag=null;
 let states=Object.fromEntries(roles.map(r=>[r,true]));
 function notify(s){announce.textContent=s;}
 function faceView(v){selected=null;all('.highlight').forEach(b=>b.setAttribute('aria-pressed','false'));if(v==='side'){yaw=.5;pitch=.3;}else if(v==='axis'){yaw=Math.PI/2;pitch=0;}else{yaw=.5;pitch=1.40;}render();notify(views[v]);}
 function changeRot(dx,dy){yaw+=dx;pitch=Math.min(1.55,Math.max(-1.55,pitch+dy));render();notify('Rotation: horizontal '+Math.round(yaw*180/Math.PI)+'°, vertical '+Math.round(pitch*180/Math.PI)+'°.');}
 function magnify(f){zoom=Math.max(.45,Math.min(3,zoom*f));render();notify('Zoom '+Math.round(zoom*100)+'%.');}
 function matPt(m,x,y,z){return [m[0]*x+m[4]*y+m[8]*z+m[12],m[1]*x+m[5]*y+m[9]*z+m[13],m[2]*x+m[6]*y+m[10]*z+m[14]];}
 function project(x,y,z){let X=x-center[0],Y=y-center[1],Z=z-center[2];let c=Math.cos(yaw),s=Math.sin(yaw);let a=c*X+s*Z,b=-s*X+c*Z;let d=Math.cos(pitch),e=Math.sin(pitch);let yy=d*Y-e*b,zz=e*Y+d*b;let k=Math.min(canvas.width,canvas.height)*.40*zoom/radius;return [canvas.width/2+a*k,canvas.height/2-yy*k,zz];}
 function rgb(hex){return [parseInt(hex.slice(1,3),16),parseInt(hex.slice(3,5),16),parseInt(hex.slice(5,7),16)];}
 function render(){if(!ready)return;
  const dark=$('#theme').value==='dark',pal=colors[dark?'dark':'light'];document.body.setAttribute('data-theme',dark?'dark':'light');
  ctx.fillStyle=dark?'#101827':'#F7F9FD';ctx.fillRect(0,0,canvas.width,canvas.height);
  // The GLB vertex coordinates and all hierarchy transforms are applied on the CPU.
  // Perspective-independent orthographic projection makes clipping/near-plane failures impossible.
  const polys=[];
  for(const group of groups){if(!states[group.role] || (selected && group.role!==selected))continue;
   const projected=group.vertices.map(v=>project(v[0],v[1],v[2]));const indices=group.indices;
   for(let i=0;i+2<indices.length;i+=3){const A=projected[indices[i]],B=projected[indices[i+1]],C=projected[indices[i+2]];if(!A||!B||!C)continue;
    const area=(B[0]-A[0])*(C[1]-A[1])-(B[1]-A[1])*(C[0]-A[0]);if(Math.abs(area)<.08)continue;
    if(Math.max(A[0],B[0],C[0])<0||Math.min(A[0],B[0],C[0])>canvas.width||Math.max(A[1],B[1],C[1])<0||Math.min(A[1],B[1],C[1])>canvas.height)continue;
    polys.push({A,B,C,depth:(A[2]+B[2]+C[2])/3,role:group.role,orientation:area});
   }
  }
  polys.sort((a,b)=>a.depth-b.depth);
  for(const t of polys){const plane=t.role==='plane1'||t.role==='plane2';const base=rgb(pal[t.role]);let shade=(t.orientation>0?.87:1.0);const c=base.map(v=>Math.round(Math.min(255,v*shade)));ctx.fillStyle=`rgba(${c[0]},${c[1]},${c[2]},${plane?.88:1})`;
   ctx.beginPath();ctx.moveTo(t.A[0],t.A[1]);ctx.lineTo(t.B[0],t.B[1]);ctx.lineTo(t.C[0],t.C[1]);ctx.closePath();ctx.fill();
   if(plane){ctx.save();ctx.clip();ctx.strokeStyle=dark?'#FFFFFF':'#091829';ctx.lineWidth=1.1;const minX=Math.min(t.A[0],t.B[0],t.C[0]),maxX=Math.max(t.A[0],t.B[0],t.C[0]),minY=Math.min(t.A[1],t.B[1],t.C[1]),maxY=Math.max(t.A[1],t.B[1],t.C[1]);for(let d=-1200;d<1600;d+=17){ctx.beginPath();if(t.role==='plane1'){ctx.moveTo(d,minY-10);ctx.lineTo(d+(maxY-minY)+20,maxY+10);}else{ctx.moveTo(d,maxY+10);ctx.lineTo(d+(maxY-minY)+20,minY-10);}ctx.stroke();}ctx.restore();ctx.strokeStyle=dark?'#FFFFFF':'#091829';ctx.lineWidth=1.4;ctx.stroke();}
  }
  // A persistent geometric orientation indicator makes keyboard rotation plainly visible.
  const origin=[68,canvas.height-64],directions=[[1,0,0],[0,1,0],[0,0,1]];
  ctx.font='bold 17px sans-serif';ctx.lineWidth=2;directions.forEach((v,i)=>{const p=project(center[0]+v[0]*radius*.3,center[1]+v[1]*radius*.3,center[2]+v[2]*radius*.3);const base=project(...center);const dx=(p[0]-base[0])*.55,dy=(p[1]-base[1])*.55;ctx.strokeStyle=dark?'#F5F7FC':'#233147';ctx.fillStyle=ctx.strokeStyle;ctx.beginPath();ctx.moveTo(...origin);ctx.lineTo(origin[0]+dx,origin[1]+dy);ctx.stroke();ctx.fillText(['X','Y','Z'][i],origin[0]+dx+3,origin[1]+dy-3);});
  // Verify actual raster output, not only status text. This check is safe under XHTML MIME.
  const sample=ctx.getImageData(0,0,canvas.width,canvas.height).data;let changed=0;const bg=dark?[16,24,39]:[247,249,253];for(let i=0;i<sample.length;i+=40){if(Math.abs(sample[i]-bg[0])+Math.abs(sample[i+1]-bg[1])+Math.abs(sample[i+2]-bg[2])>45)changed++;}
  canvas.setAttribute('data-rendered-pixels',String(changed));if(changed<20){$('#error').textContent='Warning: very few visible pixels. Check Canvas compatibility.';}else{$('#error').textContent='';}
 }
 function parseGLB(ab){const dv=new DataView(ab);if(dv.getUint32(0,true)!==0x46546c67)throw Error('Invalid GLB file');let off=12,json=null,bin=null;while(off+8<=ab.byteLength){const size=dv.getUint32(off,true),type=dv.getUint32(off+4,true);if(type===0x4e4f534a)json=JSON.parse(new TextDecoder().decode(new Uint8Array(ab,off+8,size)));if(type===0x004e4942)bin=off+8;off+=8+size;}if(!json||bin===null)throw Error('JSON or BIN missing in GLB');return {json,dv,bin};}
 async function init(){try{
  const [map,worlds,ab]=await Promise.all([fetch('semantic-map.json').then(r=>{if(!r.ok)throw Error('semantic-map.json');return r.json()}),fetch('world-transforms.json').then(r=>{if(!r.ok)throw Error('world-transforms.json');return r.json()}),fetch('montelo_aithinio.glb').then(r=>{if(!r.ok)throw Error('montelo_aithinio.glb');return r.arrayBuffer()})]);
  const {json:j,dv,bin}=parseGLB(ab),roleById={};for(const part of map.parts){descriptions[part.id]=part;for(const id of part.nodeIds)roleById[id]=part.id;}
  const boundsMin=[Infinity,Infinity,Infinity],boundsMax=[-Infinity,-Infinity,-Infinity];
  j.nodes.forEach((node,id)=>{if(node.mesh===undefined||!worlds[id])return;const m=worlds[id],role=roleById[id]||'axes';for(const primitive of j.meshes[node.mesh].primitives){const ac=j.accessors[primitive.attributes.POSITION],bv=j.bufferViews[ac.bufferView],stride=bv.byteStride||12,start=bin+(bv.byteOffset||0)+(ac.byteOffset||0),verts=[];
    for(let k=0;k<ac.count;k++){let o=start+k*stride;let v=matPt(m,dv.getFloat32(o,true),dv.getFloat32(o+4,true),dv.getFloat32(o+8,true));verts.push(v);for(let d=0;d<3;d++){boundsMin[d]=Math.min(boundsMin[d],v[d]);boundsMax[d]=Math.max(boundsMax[d],v[d]);}}
    const ix=j.accessors[primitive.indices],iv=j.bufferViews[ix.bufferView],istart=bin+(iv.byteOffset||0)+(ix.byteOffset||0);let indices=[];for(let k=0;k<ix.count;k++){indices.push(ix.componentType===5123?dv.getUint16(istart+2*k,true):ix.componentType===5125?dv.getUint32(istart+4*k,true):dv.getUint8(istart+k));}groups.push({role,vertices:verts,indices});
  }});
  if(!groups.length)throw Error('No meshes found');center=boundsMin.map((v,i)=>(v+boundsMax[i])/2);radius=Math.max(...boundsMax.map((v,i)=>(v-boundsMin[i])/2),.001);
  ready=true;document.documentElement.classList.add('js');render();notify('The model was loaded and drawn. '+views.side);
 }catch(e){console.error(e);$('#error').textContent='The three-dimensional view is not available: '+e.message+'. Use the static images.';document.documentElement.classList.remove('js');notify('The view did not load. The static images remain available.');}}
 all('[data-view]').forEach(b=>b.addEventListener('click',()=>faceView(b.getAttribute('data-view'))));
 [['left',()=>changeRot(-.18,0)],['right',()=>changeRot(.18,0)],['up',()=>changeRot(0,.18)],['down',()=>changeRot(0,-.18)],['plus',()=>magnify(1.14)],['minus',()=>magnify(1/1.14)]].forEach(([id,cb])=>{const b=$('#'+id);if(b)b.addEventListener('click',cb)});
 canvas.addEventListener('keydown',e=>{let hit=true;switch(e.key){case'ArrowLeft':changeRot(-.14,0);break;case'ArrowRight':changeRot(.14,0);break;case'ArrowUp':changeRot(0,.14);break;case'ArrowDown':changeRot(0,-.14);break;case'+':case'=':magnify(1.12);break;case'-':case'_':magnify(1/1.12);break;default:hit=false;}if(hit)e.preventDefault();});
 canvas.addEventListener('pointerdown',e=>{drag=[e.clientX,e.clientY];canvas.setPointerCapture(e.pointerId)});canvas.addEventListener('pointermove',e=>{if(!drag)return;let dx=e.clientX-drag[0],dy=e.clientY-drag[1];drag=[e.clientX,e.clientY];changeRot(dx*.009,dy*.009)});canvas.addEventListener('pointerup',()=>drag=null);canvas.addEventListener('pointercancel',()=>drag=null);
 $('#theme').addEventListener('change',()=>{render();notify('Activated the '+($('#theme').value==='dark'?'dark':'light')+' theme.');});
 all('.toggle').forEach(x=>x.addEventListener('change',()=>{const el=x.closest('.part'),id=el.getAttribute('data-part');states[id]=x.checked;render();notify((x.checked?'Shown: ':'Hidden: ')+el.querySelector('strong').textContent+'.');}));
 all('.highlight').forEach(b=>{b.setAttribute('aria-pressed','false');b.addEventListener('click',()=>{const id=b.getAttribute('data-id');selected=selected===id?null:id;all('.highlight').forEach(x=>x.setAttribute('aria-pressed',String(x.getAttribute('data-id')===selected)));if(selected){states[id]=true;$('#toggle-'+id).checked=true;}render();notify(selected?'Highlighted: '+descriptions[id].name+'. '+descriptions[id].description:'Highlighting turned off.');});});
 init();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
