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
${box('keep','À retenir','<p>Ordre de travail : 1) valeur interdite, 2) numérateur = 0, 3) comparer, 4) conclure.</p>')}`
};
const T=[{n:'Identités remarquables',g:dev},{n:'Factoriser',g:fac},{n:'Produit nul',g:prod},{n:'Quotient nul',g:quot}];
let cur=0,mode='l';
const $=id=>document.getElementById(id),tabs=$('tabs');
function sq(){
  const a=+$('ra').value,b=+$('rb').value;$('va').textContent=a;$('vb').textContent=b;
  const A=`<span class="cA">${a}</span>`,B=`<span class="cB">${b}</span>`;
  $('sqt').innerHTML=`<p>(${A} + ${B})² = ${A}² + 2 × ${A} × ${B} + ${B}²</p><p>= ${a*a} + ${2*a*b} + ${b*b}</p><p>= ${(a+b)**2}</p><p><em>Vérification : (${a} + ${b})² = ${a+b}² = ${(a+b)**2} ✓</em></p>`;
}
function render(){
  tabs.querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-selected',i===cur));
  $('mode').querySelectorAll('button').forEach(b=>b.setAttribute('aria-selected',b.dataset.m===mode));
  $('lesson').hidden=mode!=='l';$('train').hidden=mode!=='e';
  if(mode==='l'){$('lesson').innerHTML=L[cur]();if(cur===0){$('ra').oninput=$('rb').oninput=sq;sq()}}
  else $('list').innerHTML=Array.from({length:5},()=>T[cur].g()).map(e=>`<article class="card"><p class="cons">${e.c}</p><div class="math">${e.q}</div><details><summary>Correction pas à pas</summary>${stepper(e.s)}</details></article>`).join('');
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
render();
