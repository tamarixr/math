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
let cur=+ls.g('mCur')||0,mode=ls.g('mMode')||'l';if(!(cur>=0&&cur<T.length))cur=0;if(!'lensrfo'.includes(mode))mode='l';
const $=id=>document.getElementById(id),tabs=$('tabs');
function sq(){
  const a=+$('ra').value,b=+$('rb').value;$('va').textContent=a;$('vb').textContent=b;
  const A=`<span class="cA">${a}</span>`,B=`<span class="cB">${b}</span>`;
  $('sqt').innerHTML=`<p>(${A} + ${B})² = ${A}² + 2 × ${A} × ${B} + ${B}²</p><p>= ${a*a} + ${2*a*b} + ${b*b}</p><p>= ${(a+b)**2}</p><p><em>Vérification : (${a} + ${b})² = ${a+b}² = ${(a+b)**2} ✓</em></p>`;
}
let curEx=[],chI=null,chS0=0;
function chrono(){clearInterval(chI);chS0=Date.now();const el=$('chr'),f=()=>{const t=Math.floor((Date.now()-chS0)/1000);el.textContent=String(Math.floor(t/60)).padStart(2,'0')+':'+String(t%60).padStart(2,'0')};f();chI=setInterval(f,1000)}
function render(){
  if(mode!=='e')clearInterval(chI);
  tabs.querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-selected',i===cur));
  $('mode').querySelectorAll('button').forEach(b=>b.setAttribute('aria-selected',b.dataset.m===mode));
  ['l:lesson','e:train','n:notes','s:stats','r:redo','f:forms','o:lab'].forEach(x=>{const[m,id]=x.split(':');$(id).hidden=mode!==m});
  tabs.hidden=mode!=='l'&&mode!=='e';ls.s('mCur',cur);ls.s('mMode',mode);
  if(mode==='l'){$('lesson').innerHTML=L[cur]()+'<div class="bar"><button id="rd"></button><button id="nx">Exercices de ce chapitre →</button></div>';rdb();if(cur===0){$('ra').oninput=$('rb').oninput=sq;sq()}}
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
const ansOf=e=>{const m=[...e.s.map(x=>x.h).join('').matchAll(/class="ans">(.*?)<\/p>/g)];return m.length?m[m.length-1][1].replace(/<[^>]+>/g,''):''};
const ansBox=e=>{const t=ansOf(e),k=cur===0?'d':cur===1?'f':'s';return `<div class="abox" data-k="${k}" data-a="${t.replace(/"/g,'&quot;')}"><div class="sym">${SYM.map(c=>`<button type="button" class="sy" data-s="${c}">${c.trim()}</button>`).join('')}<button type="button" class="sy clr" data-s="">Effacer</button></div><div class="arow"><input type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Écris ta réponse ici…" aria-label="Ta réponse"><button type="button" class="chk">Vérifier</button><button type="button" class="hint">Indice</button><button type="button" class="show">Réponse</button></div><p class="fb" role="status"></p></div>`};
const prep=s=>{s=s.replace(/[−–—]/g,'-').replace(/[×·]/g,'*').replace(/÷/g,'/').replace(/²/g,'^2').replace(/,/g,'.').replace(/\s+/g,'');
  s=s.replace(/(\d|x|\))(?=x|\()/g,'$1*').replace(/\)(?=\d)/g,')*').replace(/(\d)(?=x)/g,'$1*');
  let q;do{q=s;s=s.replace(/(x|\d+(?:\.\d+)?|\([^()]*\))\^(\d+)/g,'($1**$2)')}while(q!==s);
  return /^[0-9x+\-*/().]+$/.test(s)?s:null};
const mk=s=>{try{const p=prep(s);if(!p)return()=>NaN;const f=new Function('x','return '+p);return x=>{try{return f(x)}catch(_){return NaN}}}catch(_){return()=>NaN}};
const ev=(s,x)=>mk(s)(x);
const same=(u,v)=>[-2,-1,.5,1,2,3,7].every(x=>{const a=ev(u,x),b=ev(v,x);return isFinite(a)&&isFinite(b)&&Math.abs(a-b)<1e-6*(1+Math.abs(b))});
const setV=s=>{s=s.replace(/^\s*S\s*=/i,'').replace(/[{}]/g,'').trim();if(!s||/^(∅|ø|vide)$/i.test(s))return[];return s.split(/;|\bou\b/).map(i=>ev(i.replace(/^\s*x\s*=/,''),0)).sort((a,b)=>a-b)};
function verify(box,q){
  const inp=box.querySelector('input'),fb=box.querySelector('.fb'),k=box.dataset.k,ea=box.dataset.a;
  let v=inp.value.trim(),ok=false,msg='';
  if(!v){fb.className='fb bad';fb.textContent='Écris une réponse avant de vérifier.';return}
  if(k==='s'){const u=setV(v),w=setV(ea);ok=u.length===w.length&&u.every((a,i)=>Math.abs(a-w[i])<1e-9)}
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
$('nsym').innerHTML=['x','²','√','π','∞','≤','≥','≠','→','⇔','ℝ','∅','±','×','−','(',')','{','}'].map(c=>`<button type="button" class="sy" data-s="${c}">${c}</button>`).join('');
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
const FM=[['Identités remarquables',['(a+b)^2 = a^2 + 2ab + b^2','(a-b)^2 = a^2 - 2ab + b^2','(a+b)(a-b) = a^2 - b^2']],['Factorisation',['ka + kb = k(a + b)','a^2 - b^2 = (a+b)(a-b)']],['Produit nul',['A*B = 0 <=> A = 0 ou B = 0']],['Quotient nul',['A/B = 0 <=> A = 0 et B != 0']]];
function formsView(){$('forms').innerHTML='<h2>Formules à connaître</h2>'+FM.map(([t,a])=>`<div class="card"><h3>${t}</h3>${a.map(f=>`<div class="frm"><span class="f">${fmt(f)}</span><button data-f="${esc(f)}">Ajouter aux notes</button></div>`).join('')}</div>`).join('')}
$('forms').onclick=e=>{const b=e.target.closest('[data-f]');if(!b)return;nt.value+=(nt.value&&!nt.value.endsWith('\n')?'\n':'')+b.dataset.f+'\n';nt.oninput();b.textContent='Ajouté ✓';setTimeout(()=>b.textContent='Ajouter aux notes',1500)};
$('npage').value=pg;$('npage').onchange=()=>{pg=+$('npage').value;ls.s('mNp',pg);nt.value=ls.g(nkey(pg))||'';nt.oninput()};
$('lvl').value=lvl;$('lvl').onchange=()=>{lvl=+$('lvl').value;ls.s('mLvl',lvl);render()};
$('pex').onclick=()=>{document.body.classList.add('pe');print();document.body.classList.remove('pe')};
document.addEventListener('input',e=>{const i=e.target;if(!i.matches('.abox input'))return;const v=i.value,p=i.selectionStart,n=v.replace(/\^2/g,'²').replace(/\*/g,'×').replace(/<=>/g,'⇔').replace(/!=/g,'≠');if(n!==v){i.value=n;const c=p+n.length-v.length;i.setSelectionRange(c,c)}});
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
