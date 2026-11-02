const ls={g:k=>{try{return localStorage.getItem(k)}catch(_){return null}},s:(k,v)=>{try{localStorage.setItem(k,v)}catch(_){}}};
const R=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const P=a=>a[R(0,a.length-1)];
let lvl=ls.g('mLvl')===null?1:+ls.g('mLvl');
const nz=m=>{m=Math.max(2,Math.round(m*[.5,1,1.6][lvl]||m));let v=0;while(!v)v=R(-m,m);return v};
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
const S=n=>n<0?'−'+(-n):''+n;
const fr=(n,d)=>{const g=gcd(n,d)||1;n/=g;d/=g;if(d<0){n=-n;d=-d}return d===1?S(n):S(n)+'/'+d};
const cx=a=>a===1?'x':a===-1?'−x':S(a)+'x';
const lin=(a,b)=>cx(a)+(b>0?' + '+b:b<0?' − '+(-b):'');
const poly=t=>{let s='';t.forEach(([c,v])=>{if(!c)return;const a=Math.abs(c),co=(a===1&&v)?'':a;s+=s?` ${c<0?'−':'+'} ${co}${v}`:`${c<0?'−':''}${co}${v}`});return s||'0'};
const F=(n,d)=>`<span class="fr"><span>${n}</span><span>${d}</span></span>`;
const p=(t,c='')=>`<p class="${c}">${t}</p>`;
const st=(t,...l)=>({t,h:l.join('')});
const sl=(a,b)=>p(`${lin(a,b)} = 0`)+(b?p(`${cx(a)} = ${S(-b)} <em>(on ${b>0?'soustrait':'ajoute'} ${Math.abs(b)} des deux côtés)</em>`):'')+(a!==1?p(`x = ${fr(-b,a)} <em>(on divise par ${a})</em>`):'');
const chk=(a,b)=>p(`${a}×(${fr(-b,a)}) ${b>=0?'+':'−'} ${Math.abs(b)} = 0 ✓`);
const setS=r=>{const u=[...new Map(r.map(v=>[fr(v[0],v[1]),v])).values()].sort((x,y)=>x[0]/x[1]-y[0]/y[1]);return '{'+u.map(v=>fr(...v)).join(' ; ')+'}'};
const stepper=s=>`<div class="stp">${s.map((x,i)=>`<div class="s${i?'':' on'}"><span class="k">${i+1}</span><div><h4>${x.t}</h4>${x.h}</div></div>`).join('')}<div class="ctl"><button class="next">Étape suivante</button><button class="allb">Tout afficher</button></div></div>`;
const PT='Un produit est nul si et seulement si l\'un de ses facteurs est nul.';

function dev(){
  const a=R(1,5),b=nz(7),A=a===1?'x':a+'x',B=Math.abs(b);
  if(R(0,2)<2){
    const sg=b>0?'+':'−',e=`(${lin(a,b)})²`,res=poly([[a*a,'x²'],[2*a*b,'x'],[b*b,'']]),v=(a+b)**2;
    return{c:'Développer et réduire.',q:e,s:[
      st('Repérer la forme',p(`${e} est le carré d'une ${b>0?'somme':'différence'} : (A ${sg} B)² avec <b>A = ${A}</b> et <b>B = ${B}</b>.`)),
      st('Écrire la formule',p(`(A ${sg} B)² = A² ${sg} 2AB + B²`)),
      st('Remplacer A et B',p(`${e} = (${A})² ${sg} 2 × ${A} × ${B} + ${B}²`)),
      st('Calculer chaque terme',p(`(${A})² = ${poly([[a*a,'x²']])}`),p(`2 × ${A} × ${B} = ${poly([[2*a*B,'x']])}`),p(`${B}² = ${B*B}`)),
      st('Résultat',p(`${e} = ${res}`,'ans')),
      st('Vérifier avec x = 1',p(`Gauche : (${a} ${sg} ${B})² = ${v}`),p(`Droite : ${a*a} ${b>0?'+':'−'} ${2*a*B} + ${b*b} = ${a*a+2*a*b+b*b}`),p('Les deux valeurs sont égales ✓'))]};
  }
  const e=`(${lin(a,B)})(${lin(a,-B)})`;
  return{c:'Développer et réduire.',q:e,s:[
    st('Repérer la forme',p(`${e} est de la forme (A + B)(A − B) avec <b>A = ${A}</b> et <b>B = ${B}</b>.`)),
    st('Écrire la formule',p('(A + B)(A − B) = A² − B²')),
    st('Remplacer A et B',p(`${e} = (${A})² − ${B}²`)),
    st('Calculer',p(`(${A})² = ${poly([[a*a,'x²']])}`),p(`${B}² = ${B*B}`)),
    st('Résultat',p(`${e} = ${poly([[a*a,'x²'],[-B*B,'']])}`,'ans')),
    st('Vérifier avec x = 1',p(`Gauche : (${a} + ${B})(${a} − ${B}) = ${(a+B)*(a-B)}`),p(`Droite : ${a*a} − ${B*B} = ${a*a-B*B}`),p('Les deux valeurs sont égales ✓'))]};
}
function fac(){
  const a=R(1,5),b=nz(7),A=a===1?'x':a+'x',B=Math.abs(b),t=R(0,3);
  if(t===0){const sg=b>0?'+':'−',e=poly([[a*a,'x²'],[2*a*b,'x'],[b*b,'']]);
    return{c:'Factoriser.',q:e,s:[
      st('Compter les termes',p('Il y a 3 termes : on pense à un carré (A ± B)².')),
      st('Chercher les deux carrés',p(`${poly([[a*a,'x²']])} = (${A})²  donc A = ${A}`),p(`${b*b} = ${B}²  donc B = ${B}`)),
      st('Vérifier le double produit',p(`2 × ${A} × ${B} = ${poly([[2*a*B,'x']])}`),p(`C'est bien le terme du milieu (au signe près) ✓`)),
      st('Choisir le signe',p(`Le terme du milieu est ${b>0?'positif':'négatif'} : on écrit A ${sg} B.`)),
      st('Résultat',p(`${e} = (${lin(a,b)})²`,'ans'))]};}
  if(t===1){const e=poly([[a*a,'x²'],[-B*B,'']]);
    return{c:'Factoriser.',q:e,s:[
      st('Repérer la différence de deux carrés',p('Deux termes séparés par un signe « − » : on pense à A² − B².')),
      st('Trouver A et B',p(`${poly([[a*a,'x²']])} = (${A})²  donc A = ${A}`),p(`${B*B} = ${B}²  donc B = ${B}`)),
      st('Appliquer la formule',p('A² − B² = (A + B)(A − B)')),
      st('Résultat',p(`${e} = (${lin(a,B)})(${lin(a,-B)})`,'ans')),
      st('Vérifier avec x = 1',p(`${a*a} − ${B*B} = ${a*a-B*B} et (${a}+${B})(${a}−${B}) = ${(a+B)*(a-B)} ✓`))]};}
  let c,d,e2,f;do{c=nz(4);d=nz(6);e2=nz(4);f=nz(6)}while(c+e2===0);
  const K=`(${lin(a,b)})`,q=`${K}(${lin(c,d)}) + ${K}(${lin(e2,f)})`;
  return{c:'Factoriser (facteur commun).',q,s:[
    st('Chercher ce qui se répète',p(`Les deux termes contiennent ${K}.`)),
    st('Mettre en facteur',p(`= ${K}[(${lin(c,d)}) + (${lin(e2,f)})]`),p('<em>On écrit le facteur commun, puis ce qui reste de chaque terme.</em>')),
    st('Réduire le crochet',p(`(${lin(c,d)}) + (${lin(e2,f)}) = ${lin(c+e2,d+f)}`)),
    st('Résultat',p(`= ${K}(${lin(c+e2,d+f)})`,'ans')),
    st('Vérifier avec x = 1',p(`Avant : ${a+b}×${c+d} + ${a+b}×${e2+f} = ${(a+b)*(c+d)+(a+b)*(e2+f)}`),p(`Après : ${a+b}×${c+e2+d+f} = ${(a+b)*(c+e2+d+f)} ✓`))]};
}
function prod(){
  const t=R(0,2);
  if(t===0){const a=nz(4),b=nz(8),c=nz(4),d=nz(8);
    return{c:'Résoudre dans ℝ.',q:`(${lin(a,b)})(${lin(c,d)}) = 0`,s:[
      st('Utiliser la règle',p(PT)),
      st('Premier facteur nul',sl(a,b)),
      st('Second facteur nul',sl(c,d)),
      st('Conclure',p(`S = ${setS([[-b,a],[-d,c]])}`,'ans')),
      st('Vérifier',chk(a,b),chk(c,d))]};}
  if(t===1){const a=R(1,5),B=R(1,8),A=a===1?'x':a+'x';
    return{c:'Résoudre dans ℝ (factoriser d\'abord).',q:`${poly([[a*a,'x²'],[-B*B,'']])} = 0`,s:[
      st('Pourquoi factoriser ?',p('On ne sait pas résoudre directement. On transforme le membre de gauche en produit.')),
      st('Reconnaître A² − B²',p(`A = ${A} et B = ${B}`)),
      st('Factoriser',p(`(${lin(a,B)})(${lin(a,-B)}) = 0`)),
      st('Utiliser la règle',p(PT)),
      st('Premier facteur nul',sl(a,B)),
      st('Second facteur nul',sl(a,-B)),
      st('Conclure',p(`S = ${setS([[-B,a],[B,a]])}`,'ans'))]};}
  let a=nz(3),b=nz(6),c,d,e,f;do{c=nz(4);d=nz(6);e=nz(4);f=nz(6)}while(c+e===0);
  const K=`(${lin(a,b)})`;
  return{c:'Résoudre dans ℝ (factoriser d\'abord).',q:`${K}(${lin(c,d)}) + ${K}(${lin(e,f)}) = 0`,s:[
    st('Repérer le facteur commun',p(`${K} apparaît dans les deux termes.`)),
    st('Factoriser',p(`${K}(${lin(c+e,d+f)}) = 0`)),
    st('Utiliser la règle',p(PT)),
    st('Premier facteur nul',sl(a,b)),
    st('Second facteur nul',sl(c+e,d+f)),
    st('Conclure',p(`S = ${setS([[-b,a],[-(d+f),c+e]])}`,'ans'))]};
}
function quot(){
  const a=nz(4),b=nz(8);let c,d;
  if(R(0,3)===0){const k=P([2,3,-1,-2]);c=k*a;d=k*b}else{c=nz(4);d=nz(8)}
  const fb=fr(-d,c),rule='Un quotient est nul si et seulement si son numérateur est nul <b>et</b> son dénominateur est non nul.';
  const inter=st('Valeur interdite',p(`On ne peut pas diviser par 0 : ${lin(c,d)} ≠ 0`),p(`${lin(c,d)} = 0 ⇔ x = ${fb}, donc <b>x ≠ ${fb}</b>.`));
  if(R(0,1)===0){
    const bad=fr(-b,a)===fb;
    return{c:'Résoudre dans ℝ.',q:`${F(lin(a,b),lin(c,d))} = 0`,s:[st('Utiliser la règle',p(rule)),inter,st('Numérateur nul',sl(a,b)),
      st('Comparer avec la valeur interdite',p(`${fr(-b,a)} ${bad?'=':'≠'} ${fb}`),p(bad?'Cette valeur annule le dénominateur : on la rejette.':'Le dénominateur ne s\'annule pas : la valeur convient.')),
      st('Conclure',p(`S = ${bad?'∅':setS([[-b,a]])}`,'ans'))]};
  }
  const a2=nz(3),b2=nz(6),rs=[[-b,a],[-b2,a2]],ok=rs.filter(r=>fr(...r)!==fb);
  return{c:'Résoudre dans ℝ.',q:`${F(`(${lin(a,b)})(${lin(a2,b2)})`,lin(c,d))} = 0`,s:[st('Utiliser la règle',p(rule)),inter,
    st('Numérateur nul (produit nul)',p(PT),sl(a,b),p('ou'),sl(a2,b2)),
    st('Comparer avec la valeur interdite',p(`Valeurs trouvées : ${fr(-b,a)} et ${fr(-b2,a2)}`),p(`Valeur interdite : ${fb}`),p(ok.length<2?'Une valeur est interdite : on la rejette.':'Aucune n\'est interdite : on garde les deux.')),
    st('Conclure',p(`S = ${ok.length?setS(ok):'∅'}`,'ans'))]};
}

// ── Intervalles & inéquations ──
const INF=Infinity;
const iv=(a,ai,b,bi,as,bs)=>({a,ai:a>-INF&&!!ai,b,bi:b<INF&&!!bi,as:as??(a===-INF?'−∞':S(a)),bs:bs??(b===INF?'+∞':S(b))});
const ivS=o=>`${o.ai?'[':']'}${o.as} ; ${o.bs}${o.bi?']':'['}`;
const ivQ=o=>o.a===-INF&&o.b===INF?'x ∈ ℝ':o.a===-INF?`x ${o.bi?'≤':'&lt;'} ${o.bs}`:o.b===INF?`x ${o.ai?'≥':'&gt;'} ${o.as}`:`${o.as} ${o.ai?'≤':'&lt;'} x ${o.bi?'≤':'&lt;'} ${o.bs}`;
const ivW=o=>{const l=o.a===-INF?'':`${o.ai?'supérieurs ou égaux':'strictement supérieurs'} à ${o.as}`,r=o.b===INF?'':`${o.bi?'inférieurs ou égaux':'strictement inférieurs'} à ${o.bs}`;return 'Tous les réels '+(l&&r?l+' et '+r:l||r||'(c\'est ℝ tout entier)')+'.'};
// Droite graduée : rows = [{l:[intervalles], c:0|1|2}]
function nl(rows){
  const pts=new Map();rows.forEach(r=>r.l.forEach(o=>{if(o.a>-INF)pts.set(o.a,o.as);if(o.b<INF)pts.set(o.b,o.bs)}));
  const v=[...pts.keys()];let mn=v.length?Math.min(...v):-1,mx=v.length?Math.max(...v):1;if(mx-mn<2){mn-=1;mx+=1}
  const pd=(mx-mn)*.2+.5;mn-=pd;mx+=pd;
  const W=560,H=44+rows.length*24,yA=H-24,X=x=>x===-INF?8:x===INF?W-8:28+(x-mn)/(mx-mn)*(W-56);
  let s=`<svg class="nl" viewBox="0 0 ${W} ${H}" role="img" aria-label="Droite graduée">`;
  pts.forEach((t,x)=>{s+=`<line class="gd" x1="${X(x)}" y1="6" x2="${X(x)}" y2="${yA}"/><line class="ax" x1="${X(x)}" y1="${yA-5}" x2="${X(x)}" y2="${yA+5}"/><text class="lb" x="${X(x)}" y="${yA+19}">${t}</text>`});
  s+=`<line class="ax" x1="4" y1="${yA}" x2="${W-4}" y2="${yA}"/><path class="ax" d="M${W-12} ${yA-5}L${W-4} ${yA}L${W-12} ${yA+5}"/>`;
  rows.forEach((r,i)=>{const y=16+i*24;r.l.forEach(o=>{s+=`<line class="sg c${r.c}" x1="${X(o.a)}" y1="${y}" x2="${X(o.b)}" y2="${y}"/>`;
    const bk=(x,open)=>{const d=open?7:-7;s+=`<path class="br c${r.c}" d="M${x+d} ${y-10}H${x}V${y+10}H${x+d}"/>`};
    if(o.a>-INF)bk(X(o.a),o.ai);if(o.b<INF)bk(X(o.b),!o.bi)})});
  return s+'</svg>'}
const bnd=()=>Math.max(3,Math.round(6*[.7,1,1.6][lvl]));
function rIv(t){const m=bnd(),a=R(-m,m-2),b=R(a+1,m+2);return t===1?iv(a,R(0,1),INF,0):t===2?iv(-INF,0,b,R(0,1)):iv(a,R(0,1),b,R(0,1))}
const brk=o=>[o.a>-INF?p(`${o.as} : inégalité ${o.ai?'large (≤ ou ≥) → borne <b>incluse</b> → crochet fermé [':'stricte (&lt; ou &gt;) → borne <b>exclue</b> → crochet ouvert ]'}`):p('−∞ : crochet toujours ouvert ]'),
  o.b<INF?p(`${o.bs} : inégalité ${o.bi?'large → borne <b>incluse</b> → crochet fermé ]':'stricte → borne <b>exclue</b> → crochet ouvert ['}`):p('+∞ : crochet toujours ouvert [')].join('');
function itv(){
  const t=R(0,1);
  {const o=rIv(R(0,2)),dr=st('Représenter',nl([{l:[o],c:0}]),p(ivW(o)));
    if(t===0)return{c:'Écrire sous forme d\'intervalle l\'ensemble des réels x tels que :',q:ivQ(o),k:'i',f:'int',s:[
      st('Repérer les bornes',p(o.a>-INF?`À gauche : <b>${o.as}</b>`:'À gauche : aucune limite, x peut être aussi petit qu\'on veut → <b>−∞</b>'),p(o.b<INF?`À droite : <b>${o.bs}</b>`:'À droite : aucune limite → <b>+∞</b>')),
      st('Choisir les crochets',brk(o)),dr,st('Résultat',p(`x ∈ ${ivS(o)}`),p(ivS(o),'ans'))]};
    return{c:'Traduire par une inégalité (ou un encadrement).',q:`x ∈ ${ivS(o)}`,k:'i',f:'ineq',s:[
      st('Lire les bornes',p(`De ${o.as} à ${o.bs}.`),p('<em>Le plus petit nombre est à gauche, le plus grand à droite.</em>')),
      st('Lire les crochets',p(o.a>-INF?`${o.ai?'[':']'} devant ${o.as} : ${o.ai?'tourné vers le nombre → inclus → ≤ / ≥':'tourné vers l\'extérieur → exclu → &lt; / &gt;'}`:'−∞ : pas de limite à gauche, rien à écrire.'),p(o.b<INF?`${o.bi?']':'['} après ${o.bs} : ${o.bi?'tourné vers le nombre → inclus → ≤':'tourné vers l\'extérieur → exclu → &lt;'}`:'+∞ : pas de limite à droite, rien à écrire.')),
      dr,st('Résultat',p(ivQ(o),'ans'))]};}
}
const OPS=['&lt;','≤','&gt;','≥'],flip=o=>(o+2)%4,cmp=(o,l,r)=>[l<r,l<=r,l>r,l>=r][o];
const solIv=(o,n,d)=>{const v=n/d,s=fr(n,d);return o===0?iv(-INF,0,v,0,null,s):o===1?iv(-INF,0,v,1,null,s):o===2?iv(v,0,INF,0,s):iv(v,1,INF,0,s)};
function ineq(){
  const t=lvl===0?R(0,1):R(0,2),op=R(0,3),O=OPS[op],sd=[];let q,f,g,A,B,D;
  if(t===0){const a=nz(5),b=nz(9),c=R(-9,9);q=`${lin(a,b)} ${O} ${S(c)}`;f=x=>a*x+b;g=()=>c;A=a;B=b;D=c}
  else{let a,b,c,d,k,m;
    if(t===1){do{a=nz(5);c=nz(5)}while(a===c);b=nz(9);d=nz(9);q=`${lin(a,b)} ${O} ${lin(c,d)}`;f=x=>a*x+b}
    else{do{k=nz(4);c=nz(5)}while(k===c||Math.abs(k)===1);m=nz(6);d=nz(9);a=k;b=k*m;q=`${S(k)}(${lin(1,m)}) ${O} ${lin(c,d)}`;f=x=>k*(x+m);
      sd.push(st('Développer',p(`${lin(a,b)} ${O} ${lin(c,d)} <em>(on distribue ${S(k)})</em>`)))}
    g=x=>c*x+d;sd.push(st('Regrouper les x à gauche',p(`${lin(a-c,b)} ${O} ${S(d)} <em>(on ${c>0?'soustrait':'ajoute'} ${cx(Math.abs(c))} des deux côtés : le sens ne change pas)</em>`)));A=a-c;B=b;D=d}
  const r=D-B;sd.push(st('Isoler le terme en x',p(`${cx(A)} ${O} ${S(D)} ${B>0?'−':'+'} ${Math.abs(B)}`),p(`${cx(A)} ${O} ${S(r)} <em>(on ${B>0?'soustrait':'ajoute'} ${Math.abs(B)} des deux côtés : le sens ne change pas)</em>`)));
  const o2=A<0?flip(op):op;
  if(A!==1)sd.push(st(A<0?'Diviser par un négatif : on change le sens !':'Diviser par le coefficient de x',
    A===-1?p(`x ${OPS[o2]} ${S(-r)} <em>(on multiplie par −1, <b>négatif</b> : le sens change)</em>`):p(`x ${OPS[o2]} ${F(S(r),S(A))} <em>(on divise par ${S(A)}, ${A>0?'<b>positif</b> : le sens ne change pas':'<b>négatif</b> : le sens change'})</em>`),
    p(`x ${OPS[o2]} ${fr(r,A)}`)));
  const so=solIv(o2,r,A),v=r/A,x0=o2<2?Math.floor(v)-1:Math.ceil(v)+1;
  sd.push(st('Représenter',nl([{l:[so],c:2}]),p(`<em>${o2%2?'≤ ou ≥ : la borne est incluse, crochet fermé.':'&lt; ou &gt; : la borne est exclue, crochet ouvert.'}</em>`)));
  sd.push(st('Conclure',p(`S = ${ivS(so)}`,'ans')));
  if(cmp(op,f(x0),g(x0)))sd.push(st('Vérifier avec une valeur de S',p(`x = ${S(x0)} : à gauche ${S(f(x0))}, à droite ${S(g(x0))}`),p(`${S(f(x0))} ${O} ${S(g(x0))} est vrai ✓`)));
  return{c:'Résoudre dans ℝ l\'inéquation.',q,k:'i',f:'int',s:sd};
}

const box=(k,t,h)=>`<div class="${k}"><b>${t}</b> ${h}</div>`;
const ex=(t,s)=>`<div class="card"><h3>${t}</h3>${stepper(s)}</div>`;
const L={
0:()=>`<h2>L'idée en une phrase</h2><div class="card"><p>Une identité remarquable est une <b>formule toute prête</b> : tu repères A et B, tu les remplaces, et c'est terminé. Développer = enlever les parenthèses. Factoriser = les remettre.</p></div>
<h2>Essaie avec des nombres</h2><div class="card"><p>Change <span class="cA">A</span> et <span class="cB">B</span> : la formule (A + B)² marche toujours.</p><div class="viz"><div><label><span class="cA">A</span> = <b id="va"></b> <input type="range" id="ra" min="1" max="9" value="3"></label><label><span class="cB">B</span> = <b id="vb"></b> <input type="range" id="rb" min="1" max="9" value="2"></label></div><div id="sqt" class="f"></div></div></div>
<h2>Les trois identités</h2><div class="card"><div class="f">(a + b)² = a² + 2ab + b²</div><div class="f">(a − b)² = a² − 2ab + b²</div><div class="f">(a + b)(a − b) = a² − b²</div></div>
${ex('Exemple : développer (3x + 2)²',[st('Repérer',p('A = 3x et B = 2, on utilise (A + B)².')),st('Formule',p('A² + 2AB + B²')),st('Calcul',p('(3x)² + 2 × 3x × 2 + 2²')),st('Résultat',p('9x² + 12x + 4','ans'))])}
${ex('Exemple : développer (5x + 1)(5x − 1)',[st('Repérer',p('A = 5x et B = 1, on utilise (A + B)(A − B).')),st('Formule',p('A² − B²')),st('Résultat',p('25x² − 1','ans'))])}
${box('warn','Erreurs fréquentes','<p>(a + b)² n\'est <b>pas</b> a² + b² : il manque le double produit 2ab.</p><p>Dans (a − b)², le dernier terme est + b² (jamais − b²).</p>')}
${box('keep','À retenir','<p>Repère d\'abord la forme (somme, différence, ou somme × différence), puis nomme A et B avant de calculer.</p>')}`,
1:()=>`<h2>Méthode en 3 questions</h2><div class="card"><p><b>1.</b> Y a-t-il un facteur qui se répète ? → facteur commun.</p><p><b>2.</b> Deux termes séparés par « − », qui sont des carrés ? → A² − B².</p><p><b>3.</b> Trois termes dont deux sont des carrés ? → vérifier 2AB puis (A ± B)².</p></div>
<div class="card"><div class="f">ka + kb = k(a + b)</div><div class="f">a² + 2ab + b² = (a + b)²</div><div class="f">a² − 2ab + b² = (a − b)²</div><div class="f">a² − b² = (a + b)(a − b)</div></div>
${ex('Exemple : factoriser 16x² − 9',[st('Repérer',p('Deux carrés séparés par « − ».')),st('Trouver A et B',p('16x² = (4x)² et 9 = 3²')),st('Résultat',p('(4x + 3)(4x − 3)','ans'))])}
${ex('Exemple : factoriser (x + 2)(3x − 1) + (x + 2)(x + 5)',[st('Facteur commun',p('(x + 2)')),st('Mettre en facteur',p('(x + 2)[(3x − 1) + (x + 5)]')),st('Réduire',p('(x + 2)(4x + 4)','ans'))])}
${box('warn','Erreurs fréquentes','<p>Oublier de vérifier le terme du milieu : x² + 5x + 9 n\'est pas (x + 3)² car 2 × x × 3 = 6x.</p><p>Oublier les parenthèses en soustrayant : (A) − (B) change le signe de tout B.</p>')}
${box('keep','À retenir','<p>Pour vérifier, redéveloppe ton résultat : tu dois retrouver l\'expression de départ.</p>')}`,
2:()=>`<h2>La règle</h2><div class="card"><div class="f">A × B = 0 ⇔ A = 0 ou B = 0</div><p>Si on multiplie deux nombres et qu'on obtient 0, alors au moins l'un des deux vaut 0. On résout donc chaque facteur séparément.</p></div>
${ex('Exemple : (2x − 6)(x + 5) = 0',[st('Règle',p(PT)),st('Premier facteur',sl(2,-6)),st('Second facteur',sl(1,5)),st('Conclure',p('S = {−5 ; 3}','ans'))])}
${ex('Exemple : x² − 49 = 0',[st('Factoriser',p('x² − 49 = (x + 7)(x − 7)')),st('Règle',p('(x + 7)(x − 7) = 0')),st('Facteurs nuls',p('x = −7 ou x = 7')),st('Conclure',p('S = {−7 ; 7}','ans'))])}
${box('warn','Erreurs fréquentes','<p>(x − 2)(x + 3) = 5 ne se résout <b>pas</b> facteur par facteur : la règle exige un produit égal à <b>0</b>.</p><p>Il faut d\'abord factoriser pour faire apparaître un produit.</p>')}
${box('keep','À retenir','<p>Produit = 0 : chaque facteur peut donner une solution. Écris toujours S = { … }.</p>')}`,
3:()=>`<h2>La règle</h2><div class="card"><div class="f">A / B = 0 ⇔ A = 0 et B ≠ 0</div><p>Une fraction vaut 0 quand son numérateur vaut 0. Mais le dénominateur ne doit jamais être 0 : cette valeur est dite <b>interdite</b>.</p></div>
${ex('Exemple : (x − 3)(x + 1) / (x + 1) = 0',[st('Valeur interdite',p('x + 1 = 0 ⇔ x = −1, donc x ≠ −1')),st('Numérateur nul',p('x − 3 = 0 ⇔ x = 3'),p('ou x + 1 = 0 ⇔ x = −1')),st('Comparer',p('−1 est interdite : on la rejette. 3 convient.')),st('Conclure',p('S = {3}','ans'))])}
${box('warn','Erreurs fréquentes','<p>Oublier de chercher la valeur interdite avant de conclure.</p><p>Garder une solution qui annule le dénominateur : elle doit être rejetée.</p>')}
${box('keep','À retenir','<p>Ordre de travail : 1) valeur interdite, 2) numérateur = 0, 3) comparer, 4) conclure.</p>')}`,
4:()=>{const ab=[[0,1,1,1],[0,0,1,0],[0,1,1,0],[0,0,1,1],[0,1,INF,0],[0,0,INF,0],[-INF,0,1,1],[-INF,0,1,0]].map(([a,ai,b,bi])=>iv(a,ai,b,bi,a===-INF?null:'a',b===INF?null:'b'));
  const E1=iv(-1,0,4,1),E2=iv(2,1,INF,0);
  return `<h2>L'idée en une phrase</h2><div class="card"><p>Un <b>intervalle</b>, c'est un morceau de la droite des réels : tous les nombres compris entre deux bornes. Les <b>crochets</b> disent si les bornes font partie du morceau ou non.</p></div>
<h2>Essaie toi-même</h2><div class="card"><p>Choisis les bornes et les crochets : l'intervalle se dessine.</p><div class="viz"><div><label>Gauche <select id="il"><option value="c">[ incluse</option><option value="o">] exclue</option><option value="i">−∞</option></select></label><label>a = <b id="iva"></b> <input type="range" id="ia" min="-8" max="8" value="-2"></label></div><div><label>Droite <select id="ir"><option value="o">[ exclue</option><option value="c">] incluse</option><option value="i">+∞</option></select></label><label>b = <b id="ivb"></b> <input type="range" id="ib" min="-8" max="8" value="3"></label></div></div><div id="ivo"></div></div>
<h2>Lire un crochet</h2><div class="card"><p>Crochet <b>tourné vers le nombre</b> → la borne est <b>incluse</b> (inégalité large ≤ ou ≥).</p><p>Crochet <b>tourné vers l'extérieur</b> → la borne est <b>exclue</b> (inégalité stricte &lt; ou &gt;).</p><p>Du côté de l'infini (−∞ ou +∞), le crochet est <b>toujours ouvert</b> : l'infini n'est pas un nombre qu'on peut atteindre.</p></div>
<h2>Le tableau à connaître</h2><div class="card tw"><table class="tbl"><thead><tr><th>Les réels x tels que</th><th>Intervalle</th><th>Sur la droite</th></tr></thead><tbody>${ab.map(o=>`<tr><td>${ivQ(o)}</td><td>${ivS(o)}</td><td>${nl([{l:[o],c:0}])}</td></tr>`).join('')}</tbody></table><p><em>On écrit toujours le plus petit nombre à gauche, et on sépare les bornes par un point-virgule « ; ».</em></p></div>
${ex('Exemple : écrire −1 &lt; x ≤ 4 avec un intervalle',[st('Bornes',p('De −1 à 4.')),st('Crochets',p('−1 : &lt; donc exclue → ]'),p('4 : ≤ donc incluse → ]')),st('Dessin',nl([{l:[E1],c:0}])),st('Résultat',p('x ∈ ]−1 ; 4]','ans'))])}
${ex('Exemple : traduire x ∈ [2 ; +∞[ par une inégalité',[st('Bornes',p('À gauche 2, à droite +∞ : pas de limite à droite.')),st('Crochet',p('[ devant 2 : tourné vers le nombre → 2 est inclus → ≥')),st('Dessin',nl([{l:[E2],c:0}])),st('Résultat',p('x ≥ 2','ans'))])}
${box('warn','Erreurs fréquentes','<p>Écrire [−∞ ou +∞] : du côté de l\'infini, le crochet est <b>toujours ouvert</b>.</p><p>Écrire [5 ; 2] : le plus petit nombre va toujours à gauche.</p><p>Confondre le sens : ]−∞ ; 3] veut dire x ≤ 3, pas x ≥ 3.</p>')}
${box('keep','À retenir','<p>Large (≤, ≥) → crochet fermé, tourné vers le nombre. Stricte (&lt;, &gt;) → crochet ouvert. ∞ → toujours ouvert. En cas de doute : dessine !</p>')}`},
5:()=>`<h2>L'idée en une phrase</h2><div class="card"><p>Une inéquation se résout <b>presque</b> comme une équation : on isole x. Une seule différence : quand on <b>multiplie ou divise par un nombre négatif</b>, on <b>change le sens</b> du signe. Les solutions forment un intervalle.</p></div>
<h2>Pourquoi le sens change ?</h2><div class="card"><p>On part de 2 &lt; 5 et on multiplie les deux côtés par k. Bouge k et regarde le signe.</p><div class="viz"><div><label>k = <b id="vk"></b> <input type="range" id="rk" min="-5" max="5" value="-2"></label></div><div id="ko" class="f"></div></div></div>
<h2>Les règles</h2><div class="card"><p><b>Ajouter ou soustraire</b> le même nombre des deux côtés → le sens <b>ne change pas</b>.</p><p><b>Multiplier ou diviser</b> par un nombre <b>positif</b> → le sens <b>ne change pas</b>.</p><p><b>Multiplier ou diviser</b> par un nombre <b>négatif</b> → le sens <b>change</b> : &lt; devient &gt;, ≤ devient ≥ (et inversement).</p><div class="f">a &lt; b et k &gt; 0 ⇒ ka &lt; kb</div><div class="f">a &lt; b et k &lt; 0 ⇒ ka &gt; kb</div></div>
<h2>Écrire les solutions</h2><div class="card"><p>On termine en écrivant S sous forme d'intervalle (voir le chapitre Intervalles) :</p><div class="f">x ≤ 4 ⇔ S = ]−∞ ; 4]</div><div class="f">x &gt; −3 ⇔ S = ]−3 ; +∞[</div></div>
${ex('Exemple : 3x − 5 ≤ 7',[st('Isoler le terme en x',p('3x ≤ 7 + 5'),p('3x ≤ 12 <em>(on ajoute 5 : le sens ne change pas)</em>')),st('Diviser par 3',p('x ≤ 4 <em>(3 est positif : le sens ne change pas)</em>')),st('Représenter',nl([{l:[iv(-INF,0,4,1)],c:2}])),st('Conclure',p('S = ]−∞ ; 4]','ans'))])}
${ex('Exemple : −2x + 3 &gt; 9',[st('Isoler le terme en x',p('−2x &gt; 9 − 3'),p('−2x &gt; 6')),st('Diviser par −2',p(`x &lt; ${F('6','−2')} <em>(−2 est <b>négatif</b> : le sens change !)</em>`),p('x &lt; −3')),st('Représenter',nl([{l:[iv(-INF,0,-3,0)],c:2}])),st('Conclure',p('S = ]−∞ ; −3[','ans'))])}
${ex('Exemple : 5x − 1 ≥ 2x + 8',[st('Regrouper les x à gauche',p('5x − 2x − 1 ≥ 8'),p('3x − 1 ≥ 8')),st('Isoler',p('3x ≥ 9')),st('Diviser par 3',p('x ≥ 3')),st('Conclure',p('S = [3 ; +∞[','ans')),st('Vérifier avec x = 4',p('5 × 4 − 1 = 19 et 2 × 4 + 8 = 16 : 19 ≥ 16 ✓'))])}
${box('warn','Erreurs fréquentes','<p>Oublier de changer le sens en divisant par un nombre <b>négatif</b>.</p><p>Changer le sens alors qu\'on a seulement soustrait : x − 4 &lt; −2 donne x &lt; 2, sans changement.</p><p>Mettre un crochet fermé avec &lt; ou &gt; : la borne est alors exclue.</p>')}
${box('keep','À retenir','<p>1) Regrouper les x d\'un côté. 2) Isoler x. 3) Regarder le signe du nombre par lequel on divise. 4) Écrire S avec un intervalle, puis tester une valeur.</p>')}`
};
const T=[{n:'Identités remarquables',g:dev},{n:'Factoriser',g:fac},{n:'Produit nul',g:prod},{n:'Quotient nul',g:quot},{n:'Intervalles',g:itv},{n:'Inéquations',g:ineq}];
let cur=+ls.g('mCur')||0,mode=ls.g('mMode')||'l';if(!(cur>=0&&cur<T.length))cur=0;if(!'lensrfo'.includes(mode))mode='l';
const $=id=>document.getElementById(id),tabs=$('tabs');
function sq(){
  const a=+$('ra').value,b=+$('rb').value;$('va').textContent=a;$('vb').textContent=b;
  const A=`<span class="cA">${a}</span>`,B=`<span class="cB">${b}</span>`;
  $('sqt').innerHTML=`<p>(${A} + ${B})² = ${A}² + 2 × ${A} × ${B} + ${B}²</p><p>= ${a*a} + ${2*a*b} + ${b*b}</p><p>= ${(a+b)**2}</p><p><em>Vérification : (${a} + ${b})² = ${a+b}² = ${(a+b)**2} ✓</em></p>`;
}
function ivz(){
  const l=$('il').value,r=$('ir').value,a=+$('ia').value,b=+$('ib').value;$('iva').textContent=S(a);$('ivb').textContent=S(b);$('ia').disabled=l==='i';$('ib').disabled=r==='i';
  const A=l==='i'?-INF:a,B=r==='i'?INF:b;
  if(A>=B){$('ivo').innerHTML='<p class="fb bad">La borne de gauche doit être plus petite que celle de droite.</p>';return}
  const o=iv(A,l==='c',B,r==='c');$('ivo').innerHTML=`<div class="f">x ∈ ${ivS(o)}</div><div class="f">${ivQ(o)}</div><p>${ivW(o)}</p>${nl([{l:[o],c:0}])}`;
}
function kz(){
  const k=+$('rk').value,o=$('ko');$('vk').textContent=S(k);
  if(!k){o.innerHTML='<p>Avec k = 0, on obtient 0 et 0 : on perd toute l\'information. On ne multiplie jamais par 0.</p>';return}
  const a=2*k,b=5*k;o.innerHTML=`<p>2 &lt; 5</p><p>2 × (${S(k)}) … 5 × (${S(k)})</p><p>${S(a)} <b>${a<b?'&lt;':'&gt;'}</b> ${S(b)}</p><p><em>${k>0?'k est positif : le sens est conservé.':'k est négatif : le sens a changé !'}</em></p>`;
}
let curEx=[],chI=null,chS0=0;
function chrono(){clearInterval(chI);chS0=Date.now();const el=$('chr'),f=()=>{const t=Math.floor((Date.now()-chS0)/1000);el.textContent=String(Math.floor(t/60)).padStart(2,'0')+':'+String(t%60).padStart(2,'0')};f();chI=setInterval(f,1000)}
function render(){
  if(mode!=='e')clearInterval(chI);
  tabs.querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-selected',i===cur));
  $('mode').querySelectorAll('button').forEach(b=>b.setAttribute('aria-selected',b.dataset.m===mode));
  ['l:lesson','e:train','n:notes','s:stats','r:redo','f:forms','o:lab'].forEach(x=>{const[m,id]=x.split(':');$(id).hidden=mode!==m});
  tabs.hidden=mode!=='l'&&mode!=='e';ls.s('mCur',cur);ls.s('mMode',mode);
  if(mode==='l'){$('lesson').innerHTML=L[cur]()+'<div class="bar"><button id="rd"></button><button id="nx">Exercices de ce chapitre →</button></div>';rdb();if(cur===0){$('ra').oninput=$('rb').oninput=sq;sq()}if(cur===4){['il','ir','ia','ib'].forEach(i=>$(i).oninput=$(i).onchange=ivz);ivz()}if(cur===5){$('rk').oninput=kz;kz()}}
  else if(mode==='e'){curEx=Array.from({length:+$('cnt').value||5},()=>T[cur].g());$('list').innerHTML=curEx.map((e,i)=>`<article class="card" data-i="${i}"><p class="cons">${e.c}</p><div class="math">${e.q}</div>${ansBox(e)}<details><summary>Correction pas à pas</summary>${stepper(e.s)}</details></article>`).join('');chrono()}
  else if(mode==='s')statsView();else if(mode==='r')redoView();else if(mode==='f')formsView();
}
T.forEach((t,i)=>{const b=document.createElement('button');b.textContent=t.n;b.onclick=()=>{cur=i;render()};tabs.appendChild(b)});
$('mode').onclick=e=>{if(e.target.dataset.m){mode=e.target.dataset.m;render()}};
$('gen').onclick=render;
$('all').onclick=()=>{document.querySelectorAll('#list details').forEach(d=>d.open=true);document.querySelectorAll('#list .s').forEach(s=>s.classList.add('on'))};
document.addEventListener('click',e=>{
  const w=e.target.closest('.stp');if(!w)return;
  if(e.target.classList.contains('next')){const n=w.querySelector('.s:not(.on)');if(n)n.classList.add('on')}
  if(e.target.classList.contains('allb'))w.querySelectorAll('.s').forEach(s=>s.classList.add('on'));
});

const SYM=['x','²','(',')','+','−','×','/','=','≠','⇔',';','{','}','∅','S = ','ou'];
const SYMI=['x','[',']',' ; ','−','+∞','−∞','<','>','≤','≥','∅','/','S = '];
const ansOf=e=>{const m=[...e.s.map(x=>x.h).join('').matchAll(/class="ans">(.*?)<\/p>/g)];return m.length?m[m.length-1][1].replace(/<[^>]+>/g,'').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&'):''};
const ansBox=e=>{const t=ansOf(e),k=e.k||(cur===0?'d':cur===1?'f':'s');return `<div class="abox" data-k="${k}"${e.f?` data-f="${e.f}"`:''} data-a="${t.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;')}"><div class="sym">${(k==='i'?SYMI:SYM).map(c=>`<button type="button" class="sy" data-s="${c}">${c.trim()}</button>`).join('')}<button type="button" class="sy clr" data-s="">Effacer</button></div><div class="arow"><input type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${e.f==='ineq'?'ex : −2 < x ≤ 5':e.f==='int'?'ex : ]−∞ ; 3]':'Écris ta réponse ici…'}" aria-label="Ta réponse"><button type="button" class="chk">Vérifier</button><button type="button" class="hint">Indice</button><button type="button" class="show">Réponse</button></div><p class="fb" role="status"></p></div>`};
const prep=s=>{s=s.replace(/[−–—]/g,'-').replace(/[×·]/g,'*').replace(/÷/g,'/').replace(/²/g,'^2').replace(/,/g,'.').replace(/\s+/g,'');
  s=s.replace(/(\d|x|\))(?=x|\()/g,'$1*').replace(/\)(?=\d)/g,')*').replace(/(\d)(?=x)/g,'$1*');
  let q;do{q=s;s=s.replace(/(x|\d+(?:\.\d+)?|\([^()]*\))\^(\d+)/g,'($1**$2)')}while(q!==s);
  return /^[0-9x+\-*/().]+$/.test(s)?s:null};
const mk=s=>{try{const p=prep(s);if(!p)return()=>NaN;const f=new Function('x','return '+p);return x=>{try{return f(x)}catch(_){return NaN}}}catch(_){return()=>NaN}};
const ev=(s,x)=>mk(s)(x);
const same=(u,v)=>[-2,-1,.5,1,2,3,7].every(x=>{const a=ev(u,x),b=ev(v,x);return isFinite(a)&&isFinite(b)&&Math.abs(a-b)<1e-6*(1+Math.abs(b))});
const setV=s=>{s=s.replace(/^\s*S\s*=/i,'').replace(/[{}]/g,'').trim();if(!s||/^(∅|ø|vide)$/i.test(s))return[];return s.split(/;|\bou\b/).map(i=>ev(i.replace(/^\s*x\s*=/,''),0)).sort((a,b)=>a-b)};
const nv=t=>{if(/^\+?I$/.test(t))return INF;if(t==='-I')return -INF;if(/I/.test(t))return NaN;const v=ev(t,0);return isFinite(v)?v:NaN};
function norm(l){l=l.slice().sort((p,q)=>(p.a-q.a)||(q.ai-p.ai));const r=[];for(const o of l){const c=r[r.length-1];if(c&&(o.a<c.b||(o.a===c.b&&(c.bi||o.ai)))){if(o.b>c.b||(o.b===c.b&&o.bi))r[r.length-1]=iv(c.a,c.ai,o.b,o.bi)}else r.push(o)}return r}
function parseSet(s){
  s=s.replace(/^[^<>≤≥=]*=/,'').replace(/[−–—]/g,'-').replace(/≤/g,'<=').replace(/≥/g,'>=').replace(/infinity|infini|inf|∞/gi,'I').replace(/X/g,'x').replace(/\s+/g,'').replace(/^x(∈|\\in)/,'');
  if(/^(∅|ø|\{\}|vide)$/i.test(s))return{l:[],k:''};
  if(/^(ℝ|R|IR)$/.test(s))return{l:[iv(-INF,0,INF,0)],k:'int'};
  const out=[],ks=new Set();
  for(let q of s.split(/∪|ou|u/i)){
    if(!q)return null;
    if(/^[\[\]]/.test(q)){
      if(!q.includes(';')&&(q.match(/,/g)||[]).length===1)q=q.replace(',',';');
      const m=q.replace(/,/g,'.').match(/^([\[\]])([^;]+);([^;]+)([\[\]])$/);if(!m)return null;
      const a=nv(m[2]),b=nv(m[3]);if(isNaN(a)||isNaN(b))return null;
      if((a===-INF&&m[1]==='[')||(b===INF&&m[4]===']'))return{e:'Du côté de l\'infini, le crochet est toujours ouvert : on écrit ]−∞ et +∞[.'};
      if(a===INF||b===-INF||a>=b)return{e:'Dans un intervalle, le plus petit nombre s\'écrit à gauche : [petit ; grand].'};
      out.push(iv(a,m[1]==='[',b,m[4]===']'));ks.add('int');
    }else{
      const t=q.replace(/,/g,'.').split(/(<=|>=|<|>)/),lt=o=>o[0]==='<',inc=o=>o.length===2;let o;
      if(t.length===3&&(t[0]==='x')!==(t[2]==='x')){const x=t[0]==='x',v=nv(x?t[2]:t[0]);if(!isFinite(v))return null;o=lt(t[1])===x?iv(-INF,0,v,inc(t[1])):iv(v,inc(t[1]),INF,0)}
      else if(t.length===5&&t[2]==='x'&&lt(t[1])===lt(t[3])){const u=nv(t[0]),w=nv(t[4]);if(!isFinite(u)||!isFinite(w))return null;
        o=lt(t[1])?iv(u,inc(t[1]),w,inc(t[3])):iv(w,inc(t[3]),u,inc(t[1]));
        if(o.a>=o.b)return{e:'Cet encadrement est impossible : le plus petit nombre doit être à gauche.'}}
      else return null;
      out.push(o);ks.add('ineq')}
  }
  return{l:norm(out),k:ks.size===1?[...ks][0]:'mix'};
}
const eqv=(x,y)=>x===y||Math.abs(x-y)<1e-9;
function chkSet(v,ea,f){
  const u=parseSet(v),w=parseSet(ea);
  if(!u)return{ok:0,msg:'✗ Écriture non reconnue. Exemple : '+(f==='ineq'?'−2 < x ≤ 5':']−∞ ; 3] ou [1 ; 4[')};
  if(u.e)return{ok:0,msg:'✗ '+u.e};
  const A=u.l,B=w?w.l:[],n=A.length===B.length;
  if(!(n&&A.every((o,i)=>eqv(o.a,B[i].a)&&eqv(o.b,B[i].b)&&o.ai===B[i].ai&&o.bi===B[i].bi))){
    if(n&&A.every((o,i)=>eqv(o.a,B[i].a)&&eqv(o.b,B[i].b)))return{ok:0,msg:'✗ Les bornes sont bonnes, mais vérifie les crochets : borne incluse ou exclue ?'};
    if(A.length===1&&B.length===1){const a=A[0],b=B[0],fa=a.a>-INF?a.a:a.b,fb=b.a>-INF?b.a:b.b;if((a.a===-INF)!==(a.b===INF)&&(b.a===-INF)!==(b.b===INF)&&(a.a===-INF)!==(b.a===-INF)&&eqv(fa,fb))return{ok:0,msg:'✗ La borne est bonne mais le sens est inversé.'+(cur===5?' As-tu changé le sens en divisant par un nombre négatif ?':'')}}
    return{ok:0,msg:''};
  }
  if(f&&u.k&&u.k!==f)return{ok:0,msg:f==='int'?'C\'est juste, mais écris la réponse avec des intervalles (crochets).':'C\'est juste, mais écris la réponse sous forme d\'inégalité avec x.'};
  return{ok:1,msg:''};
}
function verify(box,q){
  const inp=box.querySelector('input'),fb=box.querySelector('.fb'),k=box.dataset.k,ea=box.dataset.a;
  let v=inp.value.trim(),ok=false,msg='';
  if(!v){fb.className='fb bad';fb.textContent='Écris une réponse avant de vérifier.';return}
  if(k==='i'){const r=chkSet(v,ea,box.dataset.f);ok=r.ok;msg=r.msg}
  else if(k==='s'){const u=setV(v),w=setV(ea);ok=u.length===w.length&&u.every((a,i)=>Math.abs(a-w[i])<1e-9)}
  else{const r=x=>x.slice(x.lastIndexOf('=')+1),u=r(v),w=ea.slice(ea.indexOf('=')+1);
    if(same(u,w)){if(k==='d'&&/[()]/.test(u))msg='Le résultat est juste mais pas encore développé et réduit.';else if(k==='f'&&!/\)/.test(u))msg='Le résultat est juste mais pas encore factorisé.';else ok=true}}
  fb.className='fb '+(ok?'good':'bad');
  const first=tally(box,ok);
  if(ok&&!q){const n=box.closest('article').nextElementSibling,ni=n&&n.querySelector('.abox input');if(ni)setTimeout(()=>{ni.focus();ni.scrollIntoView({block:'center',behavior:'smooth'})},700)}
  fb.textContent=ok?'✓ Bravo, c\'est correct !'+(first&&sc.s%5===0?` Série de ${sc.s} !`:''):(msg||'✗ Ce n\'est pas la bonne réponse. Ouvre la correction pas à pas.');
}
document.addEventListener('click',e=>{
  const sy=e.target.closest('.sy'),ck=e.target.closest('.chk');
  if(sy){const i=sy.closest('.abox,.nbox').querySelector('input,textarea'),t=sy.dataset.s;
    if(!t){i.value='';i.focus();return}
    const a=i.selectionStart??i.value.length,b=i.selectionEnd??a;i.value=i.value.slice(0,a)+t+i.value.slice(b);i.focus();i.setSelectionRange(a+t.length,a+t.length);i.dispatchEvent(new Event('input'))}
  if(ck)verify(ck.closest('.abox'));
});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('.abox input'))verify(e.target.closest('.abox'))});

let rd=[];try{rd=JSON.parse(ls.g('mRead'))||[]}catch(_){}
let sc={c:0,t:0};try{sc=JSON.parse(ls.g('mScore'))||sc}catch(_){}
function showScore(){$('score').textContent=sc.t?`Score : ${sc.c} / ${sc.t}${sc.s>1?` · Série ${sc.s}`:''}`:'';T.forEach((t,i)=>{const k=sc.k&&sc.k[i];tabs.children[i].textContent=(rd[i]?'✓ ':'')+t.n+(k?` · ${k.c}/${k.t}`:'')})}
$('rz').onclick=()=>{sc={c:0,t:0,k:{}};ls.s('mScore',JSON.stringify(sc));showScore()};
showScore();
const th=$('theme'),setTh=d=>{document.documentElement.dataset.theme=d?'dark':'light';ls.s('mDark',d?1:0)};
setTh(ls.g('mDark')!==null?ls.g('mDark')==='1':matchMedia('(prefers-color-scheme:dark)').matches);
th.onclick=()=>setTh(document.documentElement.dataset.theme!=='dark');
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'),strip=t=>t.replace(/^\((.*)\)$/,'$1');
const tk='(\\([^()]*\\)|\\d[\\d.]*[a-zA-Z]?|[a-zA-Z])',fracRe=new RegExp('(?<![\\w.)²])'+tk+'/'+tk+'(?![\\w.(])','g');
function fmt(l){
  let s=l.replace(/<=>/g,'⇔').replace(/=>/g,'⇒').replace(/<=/g,'≤').replace(/>=/g,'≥').replace(/!=/g,'≠').replace(/->/g,'→').replace(/\+-/g,'±')
   .replace(/sqrt/gi,'√').replace(/\bpi\b/gi,'π').replace(/\binf(ini)?\b/gi,'∞').replace(/\bRR\b/g,'ℝ').replace(/\bvide\b/gi,'∅')
   .replace(/\*/g,'×').replace(/(^|[\s(=;{])-(?=[\dx(√])/g,'$1−').replace(/(?<=[\dx)²])-(?=[\dx(])/g,'−').replace(/ - /g,' − ');
  s=esc(s).replace(/\^(-?\w+|\([^()]*\))/g,(m,a)=>'<sup>'+strip(a)+'</sup>');
  return s.replace(fracRe,(m,a,b)=>F(strip(a),strip(b)));
}
const fmtAll=t=>t.split('\n').map(l=>!l.trim()?'<br>':l.startsWith('# ')?'<h3>'+fmt(l.slice(2))+'</h3>':l.startsWith('> ')?'<div class="keep">'+fmt(l.slice(2))+'</div>':'<p>'+fmt(l)+'</p>').join('');
const nt=$('ntxt'),np=$('nprev');
$('nsym').innerHTML=['x','²','√','π','∞','≤','≥','≠','→','⇔','ℝ','∅','±','×','−','(',')','{','}','[',']','∈'].map(c=>`<button type="button" class="sy" data-s="${c}">${c}</button>`).join('');
let pg=+ls.g('mNp')||0;if(!(pg>=0&&pg<3))pg=0;const nkey=i=>i?'mNotes'+i:'mNotes';nt.value=ls.g(nkey(pg))||'';
nt.oninput=()=>{ls.s(nkey(pg),nt.value);np.innerHTML=fmtAll(nt.value);$('ncount').textContent=nt.value.length+' caractères'};
nt.oninput();
$('ncopy').onclick=async()=>{try{await navigator.clipboard.writeText(np.innerText);$('ncopy').textContent='Copié ✓';setTimeout(()=>$('ncopy').textContent='Copier',1500)}catch(_){}};
$('ndl').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([np.innerText],{type:'text/plain'}));a.download='notes-maths.txt';a.click();URL.revokeObjectURL(a.href)};
$('nclr').onclick=()=>{if(nt.value&&confirm('Effacer toutes les notes ?')){nt.value='';nt.oninput()}};

document.addEventListener('click',e=>{
  const hb=e.target.closest('.hint');if(!hb)return;
  const box=hb.closest('.abox'),fb=box.querySelector('.fb'),t=box.closest('article').querySelector('.s h4');
  fb.className='fb hint';fb.textContent='Indice : '+(t?t.textContent:'relis la leçon')+'.';
});
$('vall').onclick=()=>document.querySelectorAll('#list .abox').forEach(b=>b.querySelector('input').value.trim()&&verify(b,1));
$('cnt').value=ls.g('mCnt')||'5';
$('cnt').onchange=()=>{ls.s('mCnt',$('cnt').value);render()};
let fs=+ls.g('mFs')||100;
const setFs=v=>{fs=Math.max(85,Math.min(140,v));document.documentElement.style.fontSize=fs+'%';ls.s('mFs',fs)};
setFs(fs);$('fm').onclick=()=>setFs(fs-10);$('fp').onclick=()=>setFs(fs+10);

function tally(box,ok){if(box.dataset.t)return 0;box.dataset.t=1;sc.t++;if(ok)sc.c++;sc.s=ok?(sc.s||0)+1:0;sc.b=Math.max(sc.b||0,sc.s);sc.k=sc.k||{};const kk=sc.k[cur]=sc.k[cur]||{c:0,t:0};kk.t++;if(ok)kk.c++;ls.s('mScore',JSON.stringify(sc));const g=gDay();g.n++;ls.s('mDay',JSON.stringify(g));if(!ok){const e=curEx[+box.closest('article').dataset.i];if(e)addWrong(e)}showScore();goalUp();return 1}
function rdb(){const b=$('rd');if(!b)return;$('nx').onclick=()=>{mode='e';render();scrollTo(0,0)};const f=()=>{b.textContent=rd[cur]?'✓ Chapitre lu (annuler)':'Marquer comme lu'};f();b.onclick=()=>{rd[cur]=!rd[cur];ls.s('mRead',JSON.stringify(rd));f();showScore()}}
document.addEventListener('click',e=>{
  const b=e.target.closest('.show');if(!b)return;
  const box=b.closest('.abox'),fb=box.querySelector('.fb');tally(box,false);fb.className='fb hint';fb.textContent='Réponse : '+box.dataset.a;
});
document.addEventListener('keydown',e=>{
  if(!e.altKey)return;const m={Digit1:'l',Digit2:'e',Digit3:'n',Digit4:'s',Digit5:'r',Digit6:'f',Digit7:'o'}[e.code];
  if(m){mode=m;render();e.preventDefault()}else if(e.code==='KeyN'&&mode==='e'){render();e.preventDefault()}
});
$('nfm').onchange=()=>{const v=$('nfm').value;if(!v)return;const a=nt.selectionStart,b=nt.selectionEnd;nt.value=nt.value.slice(0,a)+v+'\n'+nt.value.slice(b);$('nfm').selectedIndex=0;nt.oninput();nt.focus()};
$('nprint').onclick=()=>{document.body.classList.add('pn');print();document.body.classList.remove('pn')};
showScore();

const GOAL=10,today=()=>new Date().toISOString().slice(0,10);
const gDay=()=>{let g;try{g=JSON.parse(ls.g('mDay'))}catch(_){}return g&&g.d===today()?g:{d:today(),n:0}};
function goalUp(){const g=$('goal');g.max=GOAL;g.value=Math.min(gDay().n,GOAL)}
let wr=[];try{wr=JSON.parse(ls.g('mWrong'))||[]}catch(_){}
function addWrong(e){wr.unshift({ch:cur,c:e.c,q:e.q,s:stepper(e.s)});wr=wr.slice(0,30);ls.s('mWrong',JSON.stringify(wr))}
function redoView(){
  $('redo').innerHTML='<h2>À revoir</h2>'+(wr.length?'<div class="bar"><button id="wclr">Tout vider</button></div>'+wr.map((w,i)=>`<article class="card"><p class="cons">${T[w.ch].n} · ${w.c}</p><div class="math">${w.q}</div><details><summary>Correction pas à pas</summary>${w.s}</details><button class="wdel" data-i="${i}">Retirer</button></article>`).join(''):'<div class="card"><p>Rien à revoir pour l\'instant : tes erreurs apparaîtront ici.</p></div>');
}
$('redo').onclick=e=>{const d=e.target.closest('.wdel');if(d){wr.splice(+d.dataset.i,1);ls.s('mWrong',JSON.stringify(wr));redoView()}if(e.target.id==='wclr'){wr=[];ls.s('mWrong','[]');redoView()}};
function statsView(){
  const k=sc.k||{},pc=sc.t?Math.round(100*sc.c/sc.t):0,gd=gDay();
  $('stats').innerHTML=`<h2>Ta progression</h2><div class="card"><div class="kpis"><div><b>${sc.t}</b><span>exercices faits</span></div><div><b>${pc}%</b><span>réussite du 1er coup</span></div><div><b>${sc.b||0}</b><span>meilleure série</span></div><div><b>${rd.filter(Boolean).length}/${T.length}</b><span>leçons lues</span></div></div></div><h2>Par chapitre</h2><div class="card">${T.map((t,i)=>{const c=k[i]||{c:0,t:0},p=c.t?Math.round(100*c.c/c.t):0;return `<p class="cbar"><span>${t.n} <em>${c.c}/${c.t}</em></span><i><u style="width:${p}%"></u></i></p>`}).join('')}</div><h2>Objectif du jour</h2><div class="card"><p>${gd.n} / ${GOAL} exercices aujourd'hui</p><progress max="${GOAL}" value="${Math.min(gd.n,GOAL)}"></progress></div><h2>Sauvegarde</h2><div class="card bar"><button id="exp">Exporter ma progression</button><button id="imp">Importer</button><input type="file" id="impf" accept=".json" hidden><button id="rall">Tout réinitialiser</button></div>`;
  $('exp').onclick=()=>{const o={};['mScore','mRead','mWrong','mDay','mNotes','mNotes1','mNotes2','mLvl','mCnt','mFs','mDark'].forEach(k=>{const v=ls.g(k);if(v!==null)o[k]=v});const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(o)],{type:'application/json'}));a.download='progression-maths.json';a.click();URL.revokeObjectURL(a.href)};
  $('imp').onclick=()=>$('impf').click();
  $('impf').onchange=e=>{const f=e.target.files[0];if(!f)return;f.text().then(t=>{try{const o=JSON.parse(t);Object.keys(o).forEach(k=>/^m[A-Za-z0-9]+$/.test(k)&&ls.s(k,String(o[k])));location.reload()}catch(_){alert('Fichier invalide.')}})};
  $('rall').onclick=()=>{if(confirm('Tout réinitialiser (score, notes, erreurs) ?')){['mScore','mRead','mWrong','mDay','mNotes','mNotes1','mNotes2'].forEach(k=>{try{localStorage.removeItem(k)}catch(_){}});location.reload()}};
}
const FM=[['Identités remarquables',['(a+b)^2 = a^2 + 2ab + b^2','(a-b)^2 = a^2 - 2ab + b^2','(a+b)(a-b) = a^2 - b^2']],['Factorisation',['ka + kb = k(a + b)','a^2 - b^2 = (a+b)(a-b)']],['Produit nul',['A*B = 0 <=> A = 0 ou B = 0']],['Quotient nul',['A/B = 0 <=> A = 0 et B != 0']],['Intervalles',['a <= x <= b <=> x ∈ [a ; b]','a < x < b <=> x ∈ ]a ; b[','x >= a <=> x ∈ [a ; +inf[','x < b <=> x ∈ ]−inf ; b[']],['Inéquations',['a < b et k > 0 => ka < kb','a < b et k < 0 => ka > kb']]];
function formsView(){$('forms').innerHTML='<h2>Formules à connaître</h2>'+FM.map(([t,a])=>`<div class="card"><h3>${t}</h3>${a.map(f=>`<div class="frm"><span class="f">${fmt(f)}</span><button data-f="${esc(f)}">Ajouter aux notes</button></div>`).join('')}</div>`).join('')}
$('forms').onclick=e=>{const b=e.target.closest('[data-f]');if(!b)return;nt.value+=(nt.value&&!nt.value.endsWith('\n')?'\n':'')+b.dataset.f+'\n';nt.oninput();b.textContent='Ajouté ✓';setTimeout(()=>b.textContent='Ajouter aux notes',1500)};
$('npage').value=pg;$('npage').onchange=()=>{pg=+$('npage').value;ls.s('mNp',pg);nt.value=ls.g(nkey(pg))||'';nt.oninput()};
$('lvl').value=lvl;$('lvl').onchange=()=>{lvl=+$('lvl').value;ls.s('mLvl',lvl);render()};
$('pex').onclick=()=>{document.body.classList.add('pe');print();document.body.classList.remove('pe')};
document.addEventListener('input',e=>{const i=e.target;if(!i.matches('.abox input'))return;const v=i.value,p=i.selectionStart;let n=v.replace(/\^2/g,'²').replace(/\*/g,'×').replace(/<=>/g,'⇔').replace(/!=/g,'≠');if(i.closest('.abox').dataset.k==='i')n=n.replace(/<=/g,'≤').replace(/>=/g,'≥');if(n!==v){i.value=n;const c=p+n.length-v.length;i.setSelectionRange(c,c)}});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('.tl input'))e.target.closest('.tl').querySelector('button').click()});
const outp=(id,t,ok)=>{const o=$(id);o.className='fb '+(ok?'good':'bad');o.textContent=t};
const fmtN=v=>{for(let d=1;d<=12;d++){const n=Math.round(v*d);if(Math.abs(v*d-n)<1e-6)return fr(n,d)}return String(+v.toFixed(6)).replace('-','−')};
$('t1').onclick=()=>{const a=$('t1a').value,b=$('t1b').value;if(!a.trim()||!b.trim())return outp('t1o','Écris les deux expressions.',0);
  if(same(a,b))outp('t1o','✓ Les deux expressions sont égales pour toutes les valeurs de x testées.',1);
  else{const x=[-2,-1,.5,1,2,3,7].find(x=>!(Math.abs(ev(a,x)-ev(b,x))<1e-6)),va=ev(a,x),vb=ev(b,x);outp('t1o',isFinite(va)&&isFinite(vb)?`✗ Différentes : pour x = ${fmtN(x)}, on obtient ${fmtN(va)} et ${fmtN(vb)}.`:'✗ Expression non reconnue. Vérifie les parenthèses et les signes.',0)}};
$('t2').onclick=()=>{const x=ev($('t2b').value.replace(/^\s*x\s*=/,''),0),v=ev($('t2a').value,x);outp('t2o',isFinite(v)?`f(${fmtN(x)}) = ${fmtN(v)}`:'Expression ou valeur non reconnue.',isFinite(v))};
function roots(e){const f=mk(e),r=[],h=.01,add=v=>{if(!r.some(u=>Math.abs(u-v)<1e-4))r.push(v)};
  let px=-50,pv=f(px);
  for(let i=1;i<=10000;i++){const x=-50+i*h,v=f(x);
    if(isFinite(pv)&&isFinite(v)){
      if(pv===0)add(px);
      else if(pv*v<0){let a=px,b=x;for(let k=0;k<60;k++){const m=(a+b)/2;if(f(a)*f(m)<=0)b=m;else a=m}const m=(a+b)/2;if(Math.abs(f(m))<1e-6)add(m)}
      else{const nv=f(x+h);if(isFinite(nv)&&Math.abs(v)<Math.abs(pv)&&Math.abs(v)<=Math.abs(nv)&&Math.abs(v)<.5){let a=px,b=x+h;for(let k=0;k<80;k++){const m1=a+(b-a)/3,m2=b-(b-a)/3;if(Math.abs(f(m1))<Math.abs(f(m2)))b=m2;else a=m1}const m=(a+b)/2;if(Math.abs(f(m))<1e-6)add(m)}}
    }
    px=x;pv=v}
  return r.sort((a,b)=>a-b)}
$('t3').onclick=()=>{const e=$('t3a').value;if(!e.trim())return outp('t3o','Écris une expression.',0);if(!isFinite(mk(e)(1))&&!isFinite(mk(e)(2)))return outp('t3o','Expression non reconnue.',0);const r=roots(e);outp('t3o',r.length?`S = {${r.map(fmtN).join(' ; ')}}`:'Aucune solution trouvée entre −50 et 50 : S = ∅',1)};
goalUp();
render();
