const R=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const P=a=>a[R(0,a.length-1)];
const nz=m=>{let v=0;while(!v)v=R(-m,m);return v};
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
const S=n=>n<0?'−'+(-n):''+n;
const fr=(n,d)=>{const g=gcd(n,d)||1;n/=g;d/=g;if(d<0){n=-n;d=-d}return d===1?S(n):S(n)+'/'+d};
const cx=a=>a===1?'x':a===-1?'−x':S(a)+'x';
const lin=(a,b)=>cx(a)+(b>0?' + '+b:b<0?' − '+(-b):'');
const poly=t=>{let s='';t.forEach(([c,v])=>{if(!c)return;const a=Math.abs(c),co=(a===1&&v)?'':a;s+=s?` ${c<0?'−':'+'} ${co}${v}`:`${c<0?'−':''}${co}${v}`});return s||'0'};
const F=(n,d)=>`<span class="fr"><span>${n}</span><span>${d}</span></span>`;
const p=(t,c='')=>`<p class="${c}">${t}</p>`;
const solveLin=(a,b)=>`${lin(a,b)} = 0 ⇔ ${cx(a)} = ${S(-b)} ⇔ x = ${fr(-b,a)}`;
const setS=r=>{const u=[...new Map(r.map(v=>[fr(v[0],v[1]),v])).values()].sort((x,y)=>x[0]/x[1]-y[0]/y[1]);return '{'+u.map(v=>fr(...v)).join(' ; ')+'}'};

function dev(){
  const a=R(1,5),b=nz(7),A=a===1?'x':a+'x',t=R(0,2);
  if(t<2){
    const B=Math.abs(b),plus=b>0,e=`(${lin(a,b)})²`,sg=plus?'+':'−';
    return{c:'Développer et réduire.',q:e,s:p(`${e} = (${A})² ${sg} 2 × ${A} × ${B} + ${B}²`)+p(`= ${poly([[a*a,'x²'],[2*a*b,'x'],[b*b,'']])}`,'ans')+p(`On utilise (A ${sg} B)² = A² ${sg} 2AB + B².`)};
  }
  const B=Math.abs(b),e=`(${lin(a,B)})(${lin(a,-B)})`;
  return{c:'Développer et réduire.',q:e,s:p(`${e} = (${A})² − ${B}²`)+p(`= ${poly([[a*a,'x²'],[0,'x'],[-B*B,'']])}`,'ans')+p('On utilise (A + B)(A − B) = A² − B².')};
}
function fac(){
  const a=R(1,5),b=nz(7),A=a===1?'x':a+'x',B=Math.abs(b),t=R(0,3);
  if(t===0){const sg=b>0?'+':'−',e=poly([[a*a,'x²'],[2*a*b,'x'],[b*b,'']]);
    return{c:'Factoriser.',q:e,s:p(`On reconnaît A² ${sg} 2AB + B² avec A = ${A} et B = ${B} :`)+p(`(${A})² ${sg} 2 × ${A} × ${B} + ${B}²`)+p(`= (${lin(a,b)})²`,'ans')};}
  if(t===1){const e=poly([[a*a,'x²'],[0,'x'],[-B*B,'']]);
    return{c:'Factoriser.',q:e,s:p(`On reconnaît A² − B² avec A = ${A} et B = ${B} :`)+p(`(${A})² − ${B}²`)+p(`= (${lin(a,B)})(${lin(a,-B)})`,'ans')};}
  let c,d,e2,f;do{c=nz(4);d=nz(6);e2=nz(4);f=nz(6)}while(c+e2===0);
  const K=`(${lin(a,b)})`,q=`${K}(${lin(c,d)}) + ${K}(${lin(e2,f)})`;
  return{c:'Factoriser (facteur commun).',q,s:p(`Le facteur commun est ${K}.`)+p(`= ${K}[(${lin(c,d)}) + (${lin(e2,f)})]`)+p(`= ${K}(${lin(c+e2,d+f)})`,'ans')};
}
function prod(){
  const t=R(0,2);
  if(t===0){const a=nz(4),b=nz(8),c=nz(4),d=nz(8);
    return{c:'Résoudre dans ℝ.',q:`(${lin(a,b)})(${lin(c,d)}) = 0`,s:p('Un produit de facteurs est nul si et seulement si l\'un des facteurs est nul.')+p(solveLin(a,b))+p('ou')+p(solveLin(c,d))+p(`S = ${setS([[-b,a],[-d,c]])}`,'ans')};}
  if(t===1){const a=R(1,5),B=R(1,8),A=a===1?'x':a+'x';
    return{c:'Résoudre dans ℝ (factoriser d\'abord).',q:`${poly([[a*a,'x²'],[0,'x'],[-B*B,'']])} = 0`,s:p(`A² − B² avec A = ${A} et B = ${B} :`)+p(`(${lin(a,B)})(${lin(a,-B)}) = 0`)+p(solveLin(a,B))+p('ou')+p(solveLin(a,-B))+p(`S = ${setS([[-B,a],[B,a]])}`,'ans')};}
  let a=nz(3),b=nz(6),c,d,e,f;do{c=nz(4);d=nz(6);e=nz(4);f=nz(6)}while(c+e===0);
  const K=`(${lin(a,b)})`;
  return{c:'Résoudre dans ℝ (factoriser d\'abord).',q:`${K}(${lin(c,d)}) + ${K}(${lin(e,f)}) = 0`,s:p(`Facteur commun ${K} :`)+p(`${K}(${lin(c+e,d+f)}) = 0`)+p(solveLin(a,b))+p('ou')+p(solveLin(c+e,d+f))+p(`S = ${setS([[-b,a],[-(d+f),c+e]])}`,'ans')};
}
function quot(){
  const a=nz(4),b=nz(8);let c,d;
  if(R(0,3)===0){const k=P([2,3,-1,-2]);c=k*a;d=k*b}else{c=nz(4);d=nz(8)}
  const forb=[-d,c],sol=[[-b,a]],simple=R(0,1)===0;
  let num,steps;
  if(simple){num=lin(a,b);
    const bad=fr(-b,a)===fr(-d,c);
    steps=p('Un quotient est nul si et seulement si son numérateur est nul et son dénominateur non nul.')+p(`Valeur interdite : ${lin(c,d)} = 0 ⇔ x = ${fr(-d,c)}.`)+p(`Numérateur : ${solveLin(a,b)}`)+(bad?p(`Or ${fr(-b,a)} est la valeur interdite : on la rejette.`)+p('S = ∅','ans'):p(`${fr(-b,a)} ≠ ${fr(-d,c)}, donc la solution convient.`)+p(`S = ${setS(sol)}`,'ans'));
  }else{
    const a2=nz(3),b2=nz(6);num=`(${lin(a,b)})(${lin(a2,b2)})`;
    const rs=[[-b,a],[-b2,a2]],ok=rs.filter(r=>fr(...r)!==fr(-d,c));
    steps=p('Un quotient est nul si et seulement si son numérateur est nul et son dénominateur non nul.')+p(`Valeur interdite : ${lin(c,d)} = 0 ⇔ x = ${fr(-d,c)}.`)+p(`Numérateur nul : ${solveLin(a,b)}`)+p('ou')+p(solveLin(a2,b2))+(ok.length<2?p(`On rejette ${fr(-d,c)} car c'est la valeur interdite.`):'')+p(`S = ${ok.length?setS(ok):'∅'}`,'ans');
  }
  return{c:'Résoudre dans ℝ (donner la valeur interdite).',q:`${F(num,lin(c,d))} = 0`,s:steps};
}
const T=[
 {n:'Identités remarquables',g:dev,r:'<b>Rappels</b><div>(a + b)² = a² + 2ab + b²</div><div>(a − b)² = a² − 2ab + b²</div><div>(a + b)(a − b) = a² − b²</div>'},
 {n:'Factoriser',g:fac,r:'<b>Rappels</b><div>a² + 2ab + b² = (a + b)²</div><div>a² − 2ab + b² = (a − b)²</div><div>a² − b² = (a + b)(a − b)</div><div>ka + kb = k(a + b)</div>'},
 {n:'Produit nul',g:prod,r:'<b>Rappel</b><div>A × B = 0 ⇔ A = 0 ou B = 0</div>'},
 {n:'Quotient nul',g:quot,r:'<b>Rappel</b><div>A / B = 0 ⇔ A = 0 et B ≠ 0</div>'}
];
let cur=0;
const tabs=document.getElementById('tabs'),list=document.getElementById('list'),rap=document.getElementById('rappel');
function render(){
  tabs.querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-selected',i===cur));
  rap.innerHTML=T[cur].r;
  list.innerHTML=Array.from({length:5},()=>T[cur].g()).map(e=>`<article class="ex"><p class="cons">${e.c}</p><div class="math">${e.q}</div><details><summary>Correction</summary><div class="corr">${e.s}</div></details></article>`).join('');
}
T.forEach((t,i)=>{const b=document.createElement('button');b.textContent=t.n;b.onclick=()=>{cur=i;render()};tabs.appendChild(b)});
document.getElementById('gen').onclick=render;
document.getElementById('all').onclick=()=>{const d=list.querySelectorAll('details'),open=![...d].every(x=>x.open);d.forEach(x=>x.open=open)};
render();
