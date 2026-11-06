/* CVD Lab 2.0.0 — numerical core. Matrices: Machado et al., 2009, author supplement. */
const MATRICES = {"protan":[[1,0,0,0,1,0,0,0,1],[0.856167,0.182038,-0.038205,0.029342,0.955115,0.015544,-0.00288,-0.001563,1.004443],[0.734766,0.334872,-0.069637,0.05184,0.919198,0.028963,-0.004928,-0.004209,1.009137],[0.630323,0.465641,-0.095964,0.069181,0.890046,0.040773,-0.006308,-0.007724,1.014032],[0.539009,0.579343,-0.118352,0.082546,0.866121,0.051332,-0.007136,-0.011959,1.019095],[0.458064,0.679578,-0.137642,0.092785,0.846313,0.060902,-0.007494,-0.016807,1.024301],[0.38545,0.769005,-0.154455,0.100526,0.829802,0.069673,-0.007442,-0.02219,1.029632],[0.319627,0.849633,-0.169261,0.106241,0.815969,0.07779,-0.007025,-0.028051,1.035076],[0.259411,0.923008,-0.18242,0.110296,0.80434,0.085364,-0.006276,-0.034346,1.040622],[0.203876,0.990338,-0.194214,0.112975,0.794542,0.092483,-0.005222,-0.041043,1.046265],[0.152286,1.052583,-0.204868,0.114503,0.786281,0.099216,-0.003882,-0.048116,1.051998]],"deutan":[[1,0,0,0,1,0,0,0,1],[0.866435,0.177704,-0.044139,0.049567,0.939063,0.01137,-0.003453,0.007233,0.99622],[0.760729,0.319078,-0.079807,0.090568,0.889315,0.020117,-0.006027,0.013325,0.992702],[0.675425,0.43385,-0.109275,0.125303,0.847755,0.026942,-0.00795,0.018572,0.989378],[0.605511,0.52856,-0.134071,0.155318,0.812366,0.032316,-0.009376,0.023176,0.9862],[0.547494,0.607765,-0.155259,0.181692,0.781742,0.036566,-0.01041,0.027275,0.983136],[0.498864,0.674741,-0.173604,0.205199,0.754872,0.039929,-0.011131,0.030969,0.980162],[0.457771,0.731899,-0.18967,0.226409,0.731012,0.042579,-0.011595,0.034333,0.977261],[0.422823,0.781057,-0.203881,0.245752,0.709602,0.044646,-0.011843,0.037423,0.974421],[0.392952,0.82361,-0.216562,0.263559,0.69021,0.046232,-0.01191,0.040281,0.97163],[0.367322,0.860646,-0.227968,0.280085,0.672501,0.047413,-0.01182,0.04294,0.968881]],"tritan":[[1,0,0,0,1,0,0,0,1],[0.92667,0.092514,-0.019184,0.021191,0.964503,0.014306,0.008437,0.054813,0.93675],[0.89572,0.13333,-0.02905,0.029997,0.9454,0.024603,0.013027,0.104707,0.882266],[0.905871,0.127791,-0.033662,0.026856,0.941251,0.031893,0.01341,0.148296,0.838294],[0.948035,0.08949,-0.037526,0.014364,0.946792,0.038844,0.010853,0.193991,0.795156],[1.017277,0.027029,-0.044306,-0.006113,0.958479,0.047634,0.006379,0.248708,0.744913],[1.104996,-0.046633,-0.058363,-0.032137,0.971635,0.060503,0.001336,0.317922,0.680742],[1.193214,-0.109812,-0.083402,-0.058496,0.97941,0.079086,-0.002346,0.403492,0.598854],[1.257728,-0.139648,-0.118081,-0.078003,0.975409,0.102594,-0.003316,0.501214,0.502102],[1.278864,-0.125333,-0.153531,-0.084748,0.957674,0.127074,-0.000989,0.601151,0.399838],[1.255528,-0.076749,-0.178779,-0.078411,0.930809,0.147602,0.004733,0.691367,0.3039]]};
const CVD = (() => {
 const clamp=x=>Math.max(0,Math.min(1,x));
 const decode=x=>x<=0.04045?x/12.92:((x+0.055)/1.055)**2.4;
 const encode=x=>{x=clamp(x);return x<=0.0031308?12.92*x:1.055*x**(1/2.4)-0.055;};
 const lut=Array.from({length:256},(_,i)=>decode(i/255));
 function matrix(type,severity=100){
  if(!Object.hasOwn(MATRICES,type)||!Number.isFinite(severity)||severity<0||severity>100)throw Error('Invalid simulation');
  const v=severity/10,a=Math.floor(v),b=Math.min(10,a+1),t=v-a;
  return MATRICES[type][a].map((x,i)=>x+(MATRICES[type][b][i]-x)*t);
 }
 function transform(rgb,type='deutan',severity=100){
  const [r,g,b]=rgb.map(x=>decode(x/255));
  if(type==='normal'||(severity===0&&type!=='gray'))return {rgb:[...rgb],clipped:false};
  const m=type==='gray'?[.2126,.7152,.0722,.2126,.7152,.0722,.2126,.7152,.0722]:matrix(type,severity);
  const v=[m[0]*r+m[1]*g+m[2]*b,m[3]*r+m[4]*g+m[5]*b,m[6]*r+m[7]*g+m[8]*b];
  return {rgb:v.map(x=>255*encode(x)),clipped:v.some(x=>x< -1e-6||x>1.000001)};
 }
 function pixels(data,type,severity){
  const out=new Uint8ClampedArray(data.length);let clipped=0;
  if(type==='normal'||(severity===0&&type!=='gray'))return {data:new Uint8ClampedArray(data),clipped:0};
  const m=type==='gray'?[.2126,.7152,.0722,.2126,.7152,.0722,.2126,.7152,.0722]:matrix(type,severity);
  for(let i=0;i<data.length;i+=4){
   const r=lut[data[i]],g=lut[data[i+1]],b=lut[data[i+2]];
   const x=m[0]*r+m[1]*g+m[2]*b,y=m[3]*r+m[4]*g+m[5]*b,z=m[6]*r+m[7]*g+m[8]*b;
   if(x< -1e-6||y< -1e-6||z< -1e-6||x>1.000001||y>1.000001||z>1.000001)clipped++;
   out[i]=Math.round(255*encode(x));out[i+1]=Math.round(255*encode(y));out[i+2]=Math.round(255*encode(z));out[i+3]=data[i+3];
  }return {data:out,clipped};
 }
 function lab(rgb){
  const [r,g,b]=rgb.map(x=>decode(x/255));
  const f=t=>t>216/24389?Math.cbrt(t):(24389/27*t+16)/116;
  const x=f((.4124564*r+.3575761*g+.1804375*b)/.95047),y=f(.2126729*r+.7151522*g+.072175*b),z=f((.0193339*r+.119192*g+.9503041*b)/1.08883);
  return [116*y-16,500*(x-y),200*(y-z)];
 }
 // CIEDE2000, kL=kC=kH=1. Hue wrap follows Sharma, Wu & Dalal (2005).
 function deltaE(a,b){
  const [L1,a1,b1]=a,[L2,a2,b2]=b,rad=Math.PI/180;
  const c1=Math.hypot(a1,b1),c2=Math.hypot(a2,b2),cb=(c1+c2)/2;
  const G=.5*(1-Math.sqrt(cb**7/(cb**7+25**7))),ap1=(1+G)*a1,ap2=(1+G)*a2;
  const C1=Math.hypot(ap1,b1),C2=Math.hypot(ap2,b2);
  const hue=(x,y)=>(Math.atan2(y,x)/rad+360)%360;
  const h1=C1===0?0:hue(ap1,b1),h2=C2===0?0:hue(ap2,b2);
  const dL=L2-L1,dC=C2-C1;let dh=h2-h1;
  if(C1*C2===0)dh=0;else if(dh>180)dh-=360;else if(dh< -180)dh+=360;
  const dH=2*Math.sqrt(C1*C2)*Math.sin(dh*rad/2),Lm=(L1+L2)/2,Cm=(C1+C2)/2;
  let hm;if(C1*C2===0)hm=h1+h2;else if(Math.abs(h1-h2)<=180)hm=(h1+h2)/2;else hm=(h1+h2+(h1+h2<360?360:-360))/2;
  const T=1-.17*Math.cos((hm-30)*rad)+.24*Math.cos(2*hm*rad)+.32*Math.cos((3*hm+6)*rad)-.20*Math.cos((4*hm-63)*rad);
  const Sl=1+.015*(Lm-50)**2/Math.sqrt(20+(Lm-50)**2),Sc=1+.045*Cm,Sh=1+.015*Cm*T;
  const Rt=-2*Math.sqrt(Cm**7/(Cm**7+25**7))*Math.sin(60*Math.exp(-(((hm-275)/25)**2))*rad);
  const vL=dL/Sl,vC=dC/Sc,vH=dH/Sh;
  return Math.sqrt(Math.max(0,vL*vL+vC*vC+vH*vH+Rt*vC*vH));
 }
 const luminance=rgb=>rgb.map(x=>decode(x/255)).reduce((s,x,i)=>s+x*[.2126,.7152,.0722][i],0);
 const contrast=(a,b)=>{const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
 const fromHex=s=>{if(!/^#[0-9a-f]{6}$/i.test(s))throw Error('Invalid hex');return [1,3,5].map(i=>parseInt(s.slice(i,i+2),16));};
 const hex=rgb=>'#'+rgb.map(x=>Math.round(Math.max(0,Math.min(255,x))).toString(16).padStart(2,'0')).join('').toUpperCase();
 function pairs(colors,type,severity){
  const out=[];
  for(let i=0;i<colors.length;i++)for(let j=i+1;j<colors.length;j++){
   const a=fromHex(colors[i].hex),b=fromHex(colors[j].hex),sa=transform(a,type,severity),sb=transform(b,type,severity);
   const original=deltaE(lab(a),lab(b)),simulated=deltaE(lab(sa.rgb),lab(sb.rgb));
   out.push({i,j,original,simulated,retention:original<1?null:100*simulated/original,contrast:contrast(a,b),simulatedContrast:contrast(sa.rgb,sb.rgb),clipped:sa.clipped||sb.clipped});
  }return out.sort((a,b)=>a.simulated-b.simulated);
 }
 return {decode,encode,matrix,transform,pixels,lab,deltaE,luminance,contrast,fromHex,hex,pairs};
})();
if(typeof module!=='undefined')module.exports=CVD;
