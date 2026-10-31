import { SENTENCES, VERBS, EXTRA_VERBS, PC_VERBS, PC_SUBJECTS, PS_VERBS, CODS, NATURES, HOMOPHONES,
  SCIENCES, SCIENCES2, CULTURE, CULTURE2, DICTEE_CM1, DICTEE_CM2 } from './banks.js';
import { PHRASES, NEGATIONS, DETERMINANTS, PRONOMS, ACCORDS_GN, ACCORDS_VERBE, PP_ETRE, FAMILLES, INVARIABLES, CERGER, ELETER, COIS,
  TEMPS_RACONTER, LECTURES, SYNONYMES, CONTRAIRES, GEOM, SCIENCES3, HISTOIRE, GEO, ANGLAIS, ANG_WORDS } from './banks2.js';

export const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
export const pick = (a) => a[rnd(0, a.length - 1)];
export const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = rnd(0, i); [a[i], a[j]] = [a[j], a[i]]; } return a; };
export const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
// nombre -> texte français (virgule décimale, espaces entre les milliers)
export const dec = (x) => { const [i, d] = String(x).split('.'); return fmt(i) + (d ? ',' + d : ''); };

export const LEVELS = ['CM1', 'CM2'];

export const SUBJECTS = {
  maths:   { name: 'Arithmancie',          emoji: '🔢', desc: 'Maths' },
  francais:{ name: 'Sortilèges',           emoji: '✨', desc: 'Français' },
  sciences:{ name: 'Botanique & Cosmos',   emoji: '🌿', desc: 'Sciences' },
  culture: { name: 'Histoire de la magie', emoji: '📜', desc: 'Histoire, géo, culture' },
  anglais: { name: 'Magie des langues',    emoji: '🇬🇧', desc: 'Anglais' },
};

// level : niveau « de base » de la compétence (CE2 = révision). lv : niveaux où elle est proposée.
const K = (subject, label, level = 'CM1', lv = ['CM1', 'CM2']) => ({ subject, label, level, lv });
export const SKILLS = {
  tables:      K('maths', 'Tables de multiplication', 'CE2'),
  doublemoitie:K('maths', 'Double et moitié'),
  mult10:      K('maths', 'Multiplier / diviser par 10, 100, 1 000'),
  decomp:      K('maths', 'Décomposer un nombre'),
  demidroite:  K('maths', 'Se repérer sur une demi-droite'),
  proportion:  K('maths', 'Proportionnalité'),
  perimetre:   K('maths', 'Périmètre'),
  perpendiculaires: K('maths', 'Perpendiculaires'),
  symetrie:    K('maths', 'Symétrie axiale'),
  fractions:   K('maths', 'Fractions et décimaux', 'CM2', ['CM2']),
  calcul:      K('maths', 'Calcul posé et mental', 'CM2', ['CM2']),
  conversions: K('maths', 'Conversions de mesures', 'CM2', ['CM2']),
  aire:        K('maths', 'Aires', 'CM2', ['CM2']),
  angles:      K('maths', 'Angles', 'CM2', ['CM2']),
  paralleles:  K('maths', 'Droites parallèles', 'CM2', ['CM2']),
  verbe:       K('francais', 'Trouver le verbe'),
  sujet:       K('francais', 'Trouver le sujet'),
  infinitif:   K('francais', "Trouver l'infinitif"),
  conjPresent: K('francais', 'Conjugaison : présent', 'CE2'),
  conjImparfait:K('francais', 'Conjugaison : imparfait'),
  conjFutur:   K('francais', 'Conjugaison : futur'),
  cod:         K('francais', "Complément d'objet direct"),
  nature:      K('francais', 'Nature des mots'),
  homophones:  K('francais', 'Homophones (a/à, et/est…)', 'CM2', ['CM2']),
  passeCompose:K('francais', 'Passé composé'),
  passeSimple: K('francais', 'Passé simple (3e personne)', 'CM2', ['CM2']),
  dictee:      K('francais', 'Dictée de mots'),
  sciences:    K('sciences', 'Sciences'),
  culture:     K('culture', 'Culture générale'),
  // ---- v4 : programme CM1 ----
  multiples:   K('maths', 'Multiples et diviseurs'),
  fraccm1:     K('maths', 'Fractions : comprendre et comparer'),
  compdec:     K('maths', 'Comparer des décimaux'),
  arrondi:     K('maths', 'Arrondir'),
  division:    K('maths', 'Quotient et reste'),
  durees:      K('maths', 'Durées et heures'),
  unites:      K('maths', 'Unités de mesure'),
  egalite:     K('maths', "Égalités et nombre inconnu"),
  probas:      K('maths', 'Les chances'),
  programme:   K('maths', 'Programmes de calcul'),
  problemes:   K('maths', 'Problèmes à étapes'),
  geom:        K('maths', 'Figures et solides'),
  cercle:      K('maths', 'Cercle : rayon et diamètre'),
  diagramme:   K('maths', 'Lire un diagramme'),
  phrasetype:  K('francais', 'Types de phrases'),
  negation:    K('francais', 'La phrase négative'),
  determinants:K('francais', 'Les déterminants'),
  pronoms:     K('francais', 'Les pronoms'),
  accordgn:    K('francais', 'Accords dans le groupe nominal'),
  accordverbe: K('francais', 'Accord du verbe (sujet éloigné)'),
  ppetre:      K('francais', 'Participe passé avec être'),
  familles:    K('francais', 'Famille de mots'),
  invariables: K('francais', 'Mots invariables'),
  cerger:      K('francais', 'Verbes en -cer, -ger, -yer'),
  eleter:      K('francais', 'Verbes en -eler, -eter'),
  coi:         K('francais', "COI (à qui ? de quoi ?)"),
  temps:       K('francais', 'Choisir le temps pour raconter'),
  lecture:     K('francais', 'Comprendre un texte'),
  vocab:       K('francais', 'Synonymes et contraires'),
  histoire:    K('culture', 'Histoire (Moyen Âge → 1789)'),
  geo:         K('culture', 'Géographie'),
  sciences3:   K('sciences', 'Matière, vivant, Lune, météo'),
  anglais:     K('anglais', 'Anglais : comprendre'),
  angecoute:   K('anglais', 'Anglais : écouter un mot'),
};
// Compétences ajoutées en v4 (bouton « Nouveautés »)
export const NEW_SKILLS = ['multiples', 'fraccm1', 'compdec', 'arrondi', 'division', 'durees', 'unites', 'egalite', 'probas', 'programme', 'problemes',
  'geom', 'cercle', 'diagramme', 'phrasetype', 'negation', 'determinants', 'pronoms', 'accordgn', 'accordverbe', 'ppetre', 'familles',
  'invariables', 'cerger', 'eleter', 'coi', 'temps', 'lecture', 'vocab', 'histoire', 'geo', 'sciences3', 'anglais', 'angecoute',
  'cod', 'nature', 'passeCompose'];

const num = (prompt, answer, extra = {}) => ({ kind: 'input', numeric: true, prompt, answer: String(answer), ...extra });

// ---------- MATHS ----------
function tables(lv) {
  if (lv === 'CM2') {
    const m = rnd(0, 2);
    if (m === 0) { const a = rnd(6, 12), b = rnd(6, 12); return num(`${a} × ${b} = ?`, a * b, { hint: 'Décompose : par exemple × 10 puis ajoute le reste.', explain: `${a} × ${b} = ${a * b}` }); }
    if (m === 1) { const a = rnd(3, 12), b = rnd(3, 12); return num(`${a * b} ÷ ${a} = ?`, b, { hint: `Cherche ? tel que ${a} × ? = ${a * b}.`, explain: `${a} × ${b} = ${a * b}, donc ${a * b} ÷ ${a} = ${b}` }); }
    const a = rnd(3, 9), b = rnd(11, 19);
    return num(`${a} × ${b} = ?`, a * b, { hint: `${a} × ${b} = ${a} × 10 + ${a} × ${b - 10}.`, explain: `${a * 10} + ${a * (b - 10)} = ${a * b}` });
  }
  const a = rnd(2, 9), b = rnd(2, 9), m = rnd(0, 2);
  if (m === 0) return num(`${a} × ${b} = ?`, a * b, { hint: `Pense à la table de ${a}.`, explain: `${a} × ${b} = ${a * b}` });
  if (m === 1) return num(`Combien de fois ${a} dans ${a * b} ?`, b, { hint: `Cherche ? tel que ${a} × ? = ${a * b}.`, explain: `${a} × ${b} = ${a * b}` });
  return num(`${a} × ? = ${a * b}`, b, { hint: `C'est une division : ${a * b} ÷ ${a}.`, explain: `${a} × ${b} = ${a * b}` });
}

function doublemoitie(lv) {
  if (lv === 'CM2') {
    const m = rnd(0, 3);
    if (m === 0) { const n = pick([rnd(101, 999), rnd(1001, 5000), 2500, 1250, 375]); return num(`Quel est le double de ${fmt(n)} ?`, n * 2, { hint: 'Double = × 2. Découpe le nombre.', explain: `${fmt(n)} × 2 = ${fmt(n * 2)}` }); }
    if (m === 1) { const n = rnd(51, 4500) * 2; return num(`Quelle est la moitié de ${fmt(n)} ?`, n / 2, { hint: 'Moitié = ÷ 2.', explain: `${fmt(n)} ÷ 2 = ${fmt(n / 2)}` }); }
    if (m === 2) { const n = rnd(5, 100) * 4; return num(`Quel est le quart de ${fmt(n)} ?`, n / 4, { hint: 'Le quart, c\'est la moitié de la moitié.', explain: `${fmt(n)} ÷ 2 ÷ 2 = ${fmt(n / 4)}` }); }
    const n = rnd(12, 150); return num(`Quel est le triple de ${n} ?`, n * 3, { hint: 'Triple = × 3 (double + le nombre).', explain: `${n} × 3 = ${n * 3}` });
  }
  const m = rnd(0, 1);
  if (m === 0) {
    const n = pick([12, 25, 40, 75, 80, 125, 150, 300, 350, 400, 1400, 2500, rnd(11, 99), rnd(101, 499)]);
    return num(`Quel est le double de ${fmt(n)} ?`, n * 2, { hint: 'Double = × 2. Découpe le nombre si besoin.', explain: `${fmt(n)} × 2 = ${fmt(n * 2)}` });
  }
  const n = pick([16, 48, 120, 360, 480, 800, 1000, 2000, rnd(5, 49) * 2, rnd(51, 249) * 2]);
  return num(`Quelle est la moitié de ${fmt(n)} ?`, n / 2, { hint: 'Moitié = ÷ 2.', explain: `${fmt(n)} ÷ 2 = ${fmt(n / 2)}` });
}

function mult10(lv) {
  const f = pick([10, 100, 1000]);
  const hint = 'Multiplier par 10, 100, 1 000 : chaque chiffre avance de 1, 2, 3 rangs.';
  if (lv === 'CM2') {
    const m = rnd(0, 2);
    if (m === 0) { const ai = rnd(101, 9999); return num(`${dec(ai / 100)} × ${fmt(f)} = ?`, (ai * f) / 100, { hint: 'Décale la virgule vers la droite (1, 2 ou 3 rangs).', explain: `${dec(ai / 100)} × ${fmt(f)} = ${dec((ai * f) / 100)}` }); }
    if (m === 1) { const n = rnd(11, 9999); return num(`${fmt(n)} ÷ ${fmt(f)} = ?`, n / f, { hint: 'Diviser par 10, 100, 1 000 : la virgule recule de 1, 2 ou 3 rangs.', explain: `${fmt(n)} ÷ ${fmt(f)} = ${dec(n / f)}` }); }
    const n = rnd(11, 9999); return num(`? × ${fmt(f)} = ${fmt(n)}`, n / f, { hint: `Cherche ? : ${fmt(n)} ÷ ${fmt(f)}.`, explain: `${dec(n / f)} × ${fmt(f)} = ${fmt(n)}` });
  }
  const a = pick([rnd(2, 9), rnd(11, 99), rnd(100, 999), rnd(11, 99)]);
  const m = rnd(0, 2);
  if (m === 0) return num(`${fmt(a)} × ${fmt(f)} = ?`, a * f, { hint: "Chaque fois que tu multiplies par 10, chaque chiffre avance d'un rang : on ajoute un zéro.", explain: `${fmt(a)} × ${fmt(f)} = ${fmt(a * f)}` });
  if (m === 1) return num(`${fmt(a)} × ? = ${fmt(a * f)}`, f, { hint: 'Combien de zéros ont été ajoutés ?', explain: `${fmt(a)} × ${fmt(f)} = ${fmt(a * f)}` });
  return num(`? × ${fmt(f)} = ${fmt(a * f)}`, a, { hint: 'Enlève les zéros ajoutés.', explain: `${fmt(a)} × ${fmt(f)} = ${fmt(a * f)}` });
}

function decomp(lv) {
  if (lv === 'CM2' && rnd(0, 2) === 0) {
    const names = ['des dizaines', 'des unités', 'des dixièmes', 'des centièmes', 'des millièmes'];
    const d = [rnd(1, 9), rnd(0, 9), rnd(1, 9), rnd(0, 9), rnd(1, 9)];
    const k = rnd(0, 4);
    return num(`Dans le nombre ${d[0]}${d[1]},${d[2]}${d[3]}${d[4]}, quel est le chiffre ${names[k]} ?`, d[k],
      { hint: 'Avant la virgule : unités, dizaines… Après la virgule : dixièmes, centièmes, millièmes.', explain: `Le chiffre ${names[k]} est ${d[k]}.` });
  }
  const places = [[1000000, '1 000 000'], [100000, '100 000'], [10000, '10 000'], [1000, '1 000'], [100, '100'], [10, '10'], [1, '1']];
  const nd = lv === 'CM2' ? rnd(5, 7) : rnd(3, 5);
  const used = places.slice(7 - nd);
  const digits = used.map(() => rnd(1, 9));
  const n = used.reduce((s, [v], i) => s + v * digits[i], 0);
  if (rnd(0, 1) === 0) {
    const parts = shuffle(used.map(([v], i) => digits[i] * v));
    return num(`${parts.map(fmt).join(' + ')} = ?`, n, { hint: 'Additionne les morceaux : unités, dizaines, centaines…', explain: `La somme vaut ${fmt(n)}.` });
  }
  const hide = rnd(0, used.length - 1);
  const terms = used.map(([, label], i) => i === hide ? '<b class="hole">?</b>' : `${digits[i]} × ${label}`);
  return num(`${fmt(n)} = ${terms.join(' + ')}<br><small>Écris le nombre qui remplace ?</small>`, digits[hide] * used[hide][0],
    { hint: `Regarde le chiffre de la position manquante dans ${fmt(n)}.`, explain: `${fmt(n)} = ${used.map(([v], i) => fmt(digits[i] * v)).join(' + ')}` });
}

function demidroite(lv) {
  const ticks = 12, m = pick([2, 4, 5]);
  let sc; // pas, en centièmes
  if (lv === 'CM2' && rnd(0, 9) < 7) sc = pick([5, 10, 20, 25, 50, 100, 200]);
  else sc = pick([1, 2, 5, 10, 20, 25, 50, 100, 250, 500].map(v => v * 100));
  let p; do { p = rnd(1, ticks); } while (p === m);
  const x0 = 30, dx = 42;
  let t = '';
  for (let i = 0; i <= ticks; i++) t += `<line x1="${x0 + i * dx}" y1="22" x2="${x0 + i * dx}" y2="46" stroke="#222" stroke-width="2"/>`;
  const lab = (v) => dec(v / 100);
  const svg = `<svg viewBox="0 0 590 110" class="fig" role="img" aria-label="demi-droite graduée">
    <line x1="${x0}" y1="34" x2="565" y2="34" stroke="#222" stroke-width="2"/>
    <polygon points="565,28 577,34 565,40" fill="#222"/>${t}
    <text x="${x0}" y="68" text-anchor="middle" font-size="16" fill="#222">0</text>
    <text x="${x0 + m * dx}" y="68" text-anchor="middle" font-size="16" fill="#222">${lab(m * sc)}</text>
    <polygon points="${x0 + p * dx - 8},4 ${x0 + p * dx + 8},4 ${x0 + p * dx},20" fill="#c0392b"/>
    <text x="${x0 + p * dx}" y="100" text-anchor="middle" font-size="18" fill="#c0392b" font-weight="700">?</text></svg>`;
  return { kind: 'input', numeric: true, prompt: 'Quel nombre correspond à la flèche rouge ?', svg, answer: String((p * sc) / 100),
    hint: `Entre 0 et ${lab(m * sc)} il y a ${m} intervalles : un intervalle vaut ${lab(sc)}.`,
    explain: `Un pas vaut ${lab(sc)}, la flèche est au pas n° ${p} : ${lab(p * sc)}.` };
}

function proportion(lv) {
  if (lv === 'CM2' && rnd(0, 2) === 0) {
    const p = pick([10, 20, 25, 50, 75]), n = pick([40, 60, 80, 120, 160, 200, 240, 400]);
    if (rnd(0, 1) === 0) return num(`Un article coûte ${n} €. Il est soldé à − ${p} %.<br><b>Quelle est la réduction, en euros ?</b>`, (n * p) / 100,
      { hint: `${p} % de ${n}, c'est ${n} × ${p} ÷ 100.`, explain: `${p} % de ${n} = ${(n * p) / 100}` });
    return num(`Dans une école de ${n} élèves, ${p} % des élèves mangent à la cantine.<br><b>Combien d'élèves mangent à la cantine ?</b>`, (n * p) / 100,
      { hint: `${p} % de ${n}, c'est ${n} × ${p} ÷ 100.`, explain: `${p} % de ${n} = ${(n * p) / 100}` });
  }
  const items = [
    ['potions', 'coûtent', '€', 2, 9, true], ['plumes', 'coûtent', '€', 2, 9, true], ['chaudrons', 'coûtent', '€', 3, 12, true],
    ['paquets de bonbons', 'pèsent', 'g', 20, 90], ['livres', 'pèsent', 'g', 100, 300], ['pommes', 'contiennent', 'calories', 20, 60],
  ];
  const [name, verb, unit, lo, hi, money] = pick(items);
  const [k1, k2, k3] = shuffle(lv === 'CM2' ? [2, 3, 4, 5, 6, 7, 8, 9, 12] : [2, 3, 4, 5, 6, 8, 10]);
  if (lv === 'CM2' && money) {
    const ut = rnd(5, 45); // prix unitaire en dixièmes d'euro
    return num(`${k1} ${name} ${verb} ${dec((k1 * ut) / 10)} ${unit}.<br>${k2} ${name} ${verb} ${dec((k2 * ut) / 10)} ${unit}.<br><b>Combien ${verb} ${k3} ${name} ?</b>`,
      (k3 * ut) / 10, { hint: `Trouve d'abord le prix d'1 objet : ${dec((k1 * ut) / 10)} ÷ ${k1}.`, explain: `1 objet = ${dec(ut / 10)} ${unit}, donc ${k3} objets = ${dec((k3 * ut) / 10)} ${unit}.` });
  }
  const u = rnd(lo, hi);
  return num(`${k1} ${name} ${verb} ${fmt(k1 * u)} ${unit}.<br>${k2} ${name} ${verb} ${fmt(k2 * u)} ${unit}.<br><b>Combien ${verb} ${k3} ${name} ?</b>`,
    k3 * u, { hint: `Trouve d'abord la valeur d'1 objet : ${fmt(k1 * u)} ÷ ${k1}.`, explain: `1 objet = ${fmt(u)} ${unit}, donc ${k3} objets = ${fmt(k3 * u)} ${unit}.` });
}

// Figure « en escalier » sur quadrillage : renvoie le dessin, le périmètre et l'aire
function polySvg(n, rows, legend) {
  let h; do { h = Array.from({ length: n }, () => rnd(1, rows)); } while (new Set(h).size < 2);
  const cs = 30, pad = 14;
  const W = n * cs + pad * 2, H = rows * cs + pad * 2 + 26;
  const filled = (c, r) => c >= 0 && c < n && r >= 0 && r < h[c];
  let cells = '', edges = '', per = 0, area = 0;
  for (let c = 0; c < n; c++) for (let r = 0; r < h[c]; r++) {
    area++;
    const x = pad + c * cs, y = pad + (rows - 1 - r) * cs;
    cells += `<rect x="${x}" y="${y}" width="${cs}" height="${cs}" fill="#f3c6e8" stroke="#bbb" stroke-width="1"/>`;
    if (!filled(c, r + 1)) { edges += `<line x1="${x}" y1="${y}" x2="${x + cs}" y2="${y}"/>`; per++; }
    if (!filled(c, r - 1)) { edges += `<line x1="${x}" y1="${y + cs}" x2="${x + cs}" y2="${y + cs}"/>`; per++; }
    if (!filled(c - 1, r)) { edges += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + cs}"/>`; per++; }
    if (!filled(c + 1, r)) { edges += `<line x1="${x + cs}" y1="${y}" x2="${x + cs}" y2="${y + cs}"/>`; per++; }
  }
  const ly = pad + rows * cs + 16;
  const leg = legend === 'ua'
    ? `<rect x="${pad}" y="${ly - 9}" width="18" height="18" fill="#f3c6e8" stroke="#888"/><text x="${pad + 26}" y="${ly + 5}" font-size="14" fill="#333" font-style="italic">1 u.a.</text>`
    : `<line x1="${pad}" y1="${ly}" x2="${pad + cs}" y2="${ly}" stroke="#444" stroke-width="4"/><text x="${pad + cs + 8}" y="${ly + 5}" font-size="14" fill="#333" font-style="italic">1 u.l.</text>`;
  const svg = `<svg viewBox="0 0 ${W} ${H}" class="fig" role="img" aria-label="polygone sur quadrillage">${cells}
    <g stroke="#c0188f" stroke-width="${legend === 'ua' ? 2 : 4}" stroke-linecap="round">${edges}</g>${leg}</svg>`;
  return { svg, per, area };
}

function perimetre(lv) {
  if (lv === 'CM2' && rnd(0, 1) === 0) {
    const m = rnd(0, 1);
    if (m === 0) { const L = rnd(5, 24), l = rnd(2, L - 1); return num(`Un rectangle mesure ${L} cm de longueur et ${l} cm de largeur.<br><b>Quel est son périmètre (en cm) ?</b>`, 2 * (L + l), { hint: 'P = 2 × (longueur + largeur).', explain: `2 × (${L} + ${l}) = ${2 * (L + l)}` }); }
    const c = rnd(3, 25); return num(`Un carré a un côté de ${c} cm.<br><b>Quel est son périmètre (en cm) ?</b>`, 4 * c, { hint: 'P = 4 × côté.', explain: `4 × ${c} = ${4 * c}` });
  }
  const { svg, per } = polySvg(lv === 'CM2' ? rnd(5, 9) : rnd(4, 7), lv === 'CM2' ? 4 : 3, 'ul');
  return { kind: 'input', numeric: true, prompt: 'Détermine le périmètre de ce polygone (en u.l.).', svg, answer: String(per),
    hint: 'Compte tous les côtés des carreaux sur le contour.', explain: `Le contour mesure ${per} u.l.` };
}

function aire() {
  const m = rnd(0, 3);
  if (m === 0) {
    const { svg, area } = polySvg(rnd(4, 8), 4, 'ua');
    return { kind: 'input', numeric: true, prompt: "Détermine l'aire de cette figure (en u.a.).", svg, answer: String(area),
      hint: 'Compte les carreaux colorés, colonne par colonne.', explain: `La figure contient ${area} carreaux : ${area} u.a.` };
  }
  if (m === 1) { const L = rnd(4, 20), l = rnd(2, L - 1); return num(`Un rectangle mesure ${L} cm de longueur et ${l} cm de largeur.<br><b>Quelle est son aire (en cm²) ?</b>`, L * l, { hint: 'Aire = longueur × largeur.', explain: `${L} × ${l} = ${L * l}` }); }
  if (m === 2) { const c = rnd(3, 15); return num(`Un carré a un côté de ${c} cm.<br><b>Quelle est son aire (en cm²) ?</b>`, c * c, { hint: 'Aire = côté × côté.', explain: `${c} × ${c} = ${c * c}` }); }
  const b = rnd(2, 12) * 2, h = rnd(3, 14);
  return num(`Un triangle rectangle a deux côtés de l'angle droit qui mesurent ${b} cm et ${h} cm.<br><b>Quelle est son aire (en cm²) ?</b>`, (b * h) / 2,
    { hint: "C'est la moitié d'un rectangle : (côté × côté) ÷ 2.", explain: `(${b} × ${h}) ÷ 2 = ${(b * h) / 2}` });
}

function linesSvg(angs, offs) {
  const W = 380, H = 280, cx = W / 2, cy = H / 2;
  let g = '';
  angs.forEach((deg, k) => {
    const r = deg * Math.PI / 180, dx = Math.cos(r), dy = Math.sin(r);
    const px = cx + offs[k][0], py = cy + offs[k][1];
    g += `<line x1="${px - dx * 400}" y1="${py - dy * 400}" x2="${px + dx * 400}" y2="${py + dy * 400}" stroke="#222" stroke-width="3" clip-path="url(#cl)"/>`;
    const lx = Math.max(24, Math.min(W - 24, px + dx * 105 + dy * 14)), ly = Math.max(20, Math.min(H - 10, py + dy * 105 - dx * 14));
    g += `<text x="${lx}" y="${ly}" font-size="18" fill="#7a1f1f" font-style="italic" text-anchor="middle">(d${k + 1})</text>`;
  });
  return `<svg viewBox="0 0 ${W} ${H}" class="fig" role="img" aria-label="trois droites"><defs><clipPath id="cl"><rect x="0" y="0" width="${W}" height="${H}"/></clipPath></defs>
    <rect x="1" y="1" width="${W - 2}" height="${H - 2}" fill="#fffdf5" stroke="#c9b88a"/>${g}</svg>`;
}
const PAIRS = [[0, 1], [0, 2], [1, 2]];
const pairLabel = ([x, y]) => `(d${x + 1}) et (d${y + 1})`;

function perpendiculaires() {
  const pi = rnd(0, 2), [i, j] = PAIRS[pi];
  const a = rnd(0, 179), off = pick([rnd(20, 70), rnd(110, 160)]);
  const ang = [0, 0, 0], third = [0, 1, 2].find(k => k !== i && k !== j);
  ang[i] = a; ang[j] = a + 90; ang[third] = a + off;
  const offs = ang.map(() => [rnd(-30, 30), rnd(-20, 20)]);
  return { kind: 'choice', prompt: 'Quelles sont les deux droites qui semblent perpendiculaires ?', svg: linesSvg(ang, offs),
    choices: PAIRS.map(pairLabel), answer: pairLabel(PAIRS[pi]),
    hint: "Perpendiculaires = elles forment un angle droit, comme le coin d'une feuille.", explain: `${pairLabel(PAIRS[pi])} forment un angle droit.` };
}

function paralleles() {
  const pi = rnd(0, 2), [i, j] = PAIRS[pi];
  const a = rnd(0, 179), off = pick([rnd(25, 70), rnd(110, 155)]);
  const ang = [0, 0, 0], offs = [[0, 0], [0, 0], [0, 0]], third = [0, 1, 2].find(k => k !== i && k !== j);
  const r = a * Math.PI / 180, nx = -Math.sin(r), ny = Math.cos(r); // normale aux droites parallèles
  const d1 = rnd(-70, -28), d2 = rnd(28, 70);
  ang[i] = a; ang[j] = a; ang[third] = a + off;
  offs[i] = [nx * d1, ny * d1]; offs[j] = [nx * d2, ny * d2]; offs[third] = [rnd(-30, 30), rnd(-20, 20)];
  return { kind: 'choice', prompt: 'Quelles sont les deux droites qui semblent parallèles ?', svg: linesSvg(ang, offs),
    choices: PAIRS.map(pairLabel), answer: pairLabel(PAIRS[pi]),
    hint: 'Parallèles = elles gardent toujours le même écart et ne se croisent jamais.', explain: `${pairLabel(PAIRS[pi])} sont parallèles.` };
}

function angles() {
  const [name, th] = pick([['aigu', rnd(25, 80)], ['droit', 90], ['obtus', rnd(100, 160)]]);
  const rho = rnd(0, 359), W = 300, H = 250, cx = W / 2, cy = H / 2, len = 95, rad = 30;
  const P = (deg, l) => [cx + l * Math.cos(deg * Math.PI / 180), cy - l * Math.sin(deg * Math.PI / 180)];
  const [x1, y1] = P(rho, len), [x2, y2] = P(rho + th, len), [a1, b1] = P(rho, rad), [a2, b2] = P(rho + th, rad);
  const svg = `<svg viewBox="0 0 ${W} ${H}" class="fig" role="img" aria-label="un angle"><rect x="1" y="1" width="${W - 2}" height="${H - 2}" fill="#fffdf5" stroke="#c9b88a"/>
    <path d="M ${a1} ${b1} A ${rad} ${rad} 0 0 0 ${a2} ${b2}" fill="none" stroke="#c0392b" stroke-width="3"/>
    <line x1="${cx}" y1="${cy}" x2="${x1}" y2="${y1}" stroke="#222" stroke-width="3" stroke-linecap="round"/>
    <line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="#222" stroke-width="3" stroke-linecap="round"/></svg>`;
  return { kind: 'choice', prompt: 'Cet angle est…', svg, choices: ['aigu', 'droit', 'obtus'], answer: name,
    hint: "Compare avec l'angle droit (le coin d'une feuille) : plus petit = aigu, plus grand = obtus.", explain: `Cet angle est ${name}.` };
}

function symetrie(lv) {
  const big = lv === 'CM2', cols = big ? 10 : 8, rows = big ? 7 : 6, half = cols / 2;
  const cells = new Set(), key = (r, c) => r + ',' + c;
  cells.add(key(rnd(1, rows - 2), half - 1));
  const target = big ? rnd(10, 14) : rnd(6, 9);
  let guard = 0;
  while (cells.size < target && guard++ < 400) {
    const [rr, cc] = pick([...cells]).split(',').map(Number);
    const [dr, dc] = pick([[1, 0], [-1, 0], [0, -1]]);
    const nr = rr + dr, nc = cc + dc;
    if (nr >= 0 && nr < rows && nc >= 0 && nc < half) cells.add(key(nr, nc));
  }
  const left = [...cells].map(s => s.split(',').map(Number));
  return { kind: 'symmetry', prompt: 'Colorie les carreaux (à droite de la ligne) pour que <b>(d)</b> soit un axe de symétrie.', cols, rows, left,
    hint: "Chaque carreau a un « jumeau » à la même distance de l'axe, de l'autre côté, sur la même ligne.", explain: 'Voici la figure symétrique.' };
}

function fractions() {
  const m = rnd(0, 2);
  if (m === 0) {
    const b = pick([2, 3, 4, 5, 10]), a = rnd(1, b - 1), k = rnd(2, 12), n = b * k;
    return num(`Calcule ${a}/${b} de ${n}.`, a * k, { hint: `Divise ${n} par ${b}, puis multiplie par ${a}.`, explain: `${n} ÷ ${b} = ${k} ; ${k} × ${a} = ${a * k}` });
  }
  if (m === 1) {
    const den = pick([10, 100]), a = den === 10 ? rnd(1, 99) : rnd(1, 999);
    return num(`Écris ${a}/${den} sous forme décimale.`, a / den, { hint: `Diviser par ${den} : décale la virgule de ${den === 10 ? 1 : 2} rang(s) vers la gauche.`, explain: `${a}/${den} = ${dec(a / den)}` });
  }
  const a = rnd(1, 99);
  return num(`${dec(a / 100)} = ?/100`, a, { hint: 'Les centièmes sont les deux chiffres après la virgule.', explain: `${dec(a / 100)} = ${a}/100` });
}

function calcul() {
  const m = rnd(0, 3);
  if (m === 0) { const a = rnd(12, 45), b = rnd(11, 25); return num(`${a} × ${b} = ?`, a * b, { hint: `Pose l'opération, ou décompose : ${a} × ${b} = ${a} × 10 + ${a} × ${b - 10}.`, explain: `${a} × ${b} = ${a * b}` }); }
  if (m === 1) {
    const d = rnd(3, 9), q = rnd(20, 150), r = rnd(0, d - 1), n = d * q + r, askQ = rnd(0, 1) === 0;
    return num(`Division euclidienne de ${fmt(n)} par ${d}.<br><b>Quel est le ${askQ ? 'quotient' : 'reste'} ?</b>`, askQ ? q : r,
      { hint: `Cherche le plus grand multiple de ${d} qui ne dépasse pas ${fmt(n)}.`, explain: `${fmt(n)} = ${d} × ${q} + ${r}` });
  }
  const ai = rnd(105, 2999), bi = rnd(105, 2999);
  if (m === 2) return num(`${dec(ai / 100)} + ${dec(bi / 100)} = ?`, (ai + bi) / 100, { hint: 'Aligne les virgules, additionne comme des entiers.', explain: `${dec(ai / 100)} + ${dec(bi / 100)} = ${dec((ai + bi) / 100)}` });
  const hi = Math.max(ai, bi), lo = Math.min(ai, bi);
  return num(`${dec(hi / 100)} − ${dec(lo / 100)} = ?`, (hi - lo) / 100, { hint: 'Aligne les virgules, soustrais comme des entiers.', explain: `${dec(hi / 100)} − ${dec(lo / 100)} = ${dec((hi - lo) / 100)}` });
}

function conversions() {
  const units = [['km', 'm', 1000], ['m', 'cm', 100], ['m', 'mm', 1000], ['kg', 'g', 1000], ['L', 'mL', 1000], ['L', 'cL', 100], ['h', 'min', 60]];
  const [big, small, f] = pick(units);
  if (small === 'min') {
    const x = rnd(1, 9) + pick([0, 0.5]);
    return num(`${dec(x)} ${big} = ? ${small}`, x * f, { hint: `1 ${big} = ${fmt(f)} ${small}.`, explain: `${dec(x)} × ${fmt(f)} = ${dec(x * f)} ${small}` });
  }
  if (rnd(0, 1) === 0) {
    const ai = rnd(11, 99); // x = ai/10, calcul en entiers pour éviter les erreurs d'arrondi
    return num(`${dec(ai / 10)} ${big} = ? ${small}`, (ai * f) / 10, { hint: `1 ${big} = ${fmt(f)} ${small}.`, explain: `${dec(ai / 10)} × ${fmt(f)} = ${dec((ai * f) / 10)} ${small}` });
  }
  const s = rnd(11, 999) * pick([1, 5, 10]);
  return num(`${fmt(s)} ${small} = ? ${big}`, s / f, { hint: `1 ${big} = ${fmt(f)} ${small}, donc on divise par ${fmt(f)}.`, explain: `${fmt(s)} ÷ ${fmt(f)} = ${dec(s / f)} ${big}` });
}

// ---------- FRANÇAIS ----------
const codPool = CODS.map(c => ({ t: c.t, S: c.S, V: c.V, inf: c.inf, C: c.COD }));
const sentencePool = (lv) => lv === 'CM2' ? [...SENTENCES, ...codPool] : SENTENCES;

function verbe(lv) {
  const pool = sentencePool(lv), s = pick(pool);
  const others = shuffle(pool.filter(x => x !== s)).slice(0, 3).map(x => x.C.split(' ').pop());
  const nouns = [s.S.split(' ').pop(), s.C.split(' ').pop(), others[0]].filter(w => w !== s.V);
  const choices = shuffle([s.V, ...[...new Set(nouns)].slice(0, 3)]);
  return { kind: 'choice', prompt: `Quel est le <b>verbe</b> de cette phrase ?<br><i>${s.t}</i>`, choices, answer: s.V,
    hint: 'Le verbe change quand on change le temps : « hier… », « demain… ».', explain: `Le verbe est « ${s.V} » (infinitif : ${s.inf}).` };
}

function sujet(lv) {
  const pool = sentencePool(lv), s = pick(pool);
  const extras = shuffle([...new Set(pool.map(x => x.S))].filter(x => x !== s.S && x !== s.C));
  const choices = shuffle([s.S, s.C, extras[0], extras[1]]);
  return { kind: 'choice', prompt: `Quel est le <b>sujet</b> du verbe « ${s.V} » ?<br><i>${s.t}</i>`, choices, answer: s.S,
    hint: `Pose la question : « Qui est-ce qui ${s.V} ? » ou « C'est ... qui ${s.V} ».`, explain: `Le sujet est « ${s.S} ».` };
}

function infinitif(lv) {
  const pool = sentencePool(lv), s = pick(pool);
  const wrong = shuffle([...new Set(pool.filter(x => x.inf !== s.inf).map(x => x.inf))]).slice(0, 3);
  return { kind: 'choice', prompt: `Quel est l'<b>infinitif</b> du verbe « ${s.V} » ?`, choices: shuffle([s.inf, ...wrong.slice(0, 2)]), answer: s.inf,
    hint: "L'infinitif, c'est le nom du verbe dans le dictionnaire.", explain: `« ${s.V} » vient du verbe « ${s.inf} ».` };
}

function cod() {
  const c = pick(CODS), other = pick(CODS.filter(x => x !== c)).COD;
  const choices = shuffle([...new Set([c.COD, c.CC, c.S, other])]);
  return { kind: 'choice', prompt: `Quel est le <b>complément d'objet direct</b> (COD) du verbe « ${c.V} » ?<br><i>${c.t}</i>`, choices, answer: c.COD,
    hint: `Pose la question « ${c.S} ${c.V} quoi ? » ou « qui ? » juste après le verbe, sans préposition.`, explain: `Le COD est « ${c.COD} » (${c.S} ${c.V} quoi ? ${c.COD}).` };
}

const NATURE_LIST = ['nom', 'verbe', 'adjectif', 'déterminant', 'adverbe', 'pronom', 'préposition'];
function nature() {
  const [ph, mot, nat] = pick(NATURES);
  const choices = shuffle([nat, ...shuffle(NATURE_LIST.filter(n => n !== nat)).slice(0, 3)]);
  return { kind: 'choice', prompt: `Dans la phrase « <i>${ph}</i> », quelle est la <b>nature</b> du mot « <b>${mot}</b> » ?`, choices, answer: nat,
    hint: 'Remplace le mot par un autre de la même sorte, ou demande-toi ce qu\'il fait dans la phrase.', explain: `« ${mot} » est un mot de nature : ${nat}.` };
}

function homophones() {
  const [ph, good, bad] = pick(HOMOPHONES);
  return { kind: 'choice', prompt: `Complète la phrase :<br><i>${ph.replace('___', '<b class="blank">…</b>')}</i>`, choices: shuffle([good, ...bad]), answer: good,
    hint: 'Essaie de remplacer par un autre mot : « avait » pour a, « était » pour est, « et puis » pour et…', explain: `${ph.replace('___', good)}` };
}

const PRON = ['je', 'tu', 'il', 'nous', 'vous', 'ils'];
function conj(tense, tag, lv) {
  const pool = Object.entries(lv === 'CM2' ? { ...VERBS, ...EXTRA_VERBS } : VERBS);
  const [inf, forms] = pick(lv === 'CM1' && tense === 'present' && rnd(0, 2) > 0 ? pool.filter(([, v]) => v.ce2) : pool);
  const idx = rnd(0, 5), pr = PRON[idx], ans = forms[tense][idx];
  const elide = pr === 'je' && /^[aeiouhéèê]/i.test(ans);
  const shown = elide ? "j'" : pr === 'il' ? 'il/elle' : pr === 'ils' ? 'ils/elles' : pr;
  return { kind: 'input', numeric: false,
    prompt: `Conjugue « <b>${inf}</b> » ${tag} :<br><span class="pron">${shown}${elide ? '' : ' '}<span class="blank">…</span></span>`,
    answer: ans, hint: `Première lettre : « ${ans[0]} ». Pense à la terminaison de « ${pr} ».`, explain: `${elide ? "j'" : shown + ' '}${ans}` };
}

function passeCompose() {
  const [inf, aux, pp] = pick(PC_VERBS), [sj, g, n] = pick(PC_SUBJECTS);
  let ans;
  if (aux === 'avoir') ans = `${n === 1 ? 'a' : 'ont'} ${pp}`;
  else ans = `${n === 1 ? 'est' : 'sont'} ${pp}${g === 'f' ? 'e' : ''}${n === 2 ? 's' : ''}`;
  return { kind: 'input', numeric: false,
    prompt: `Mets au passé composé :<br><i>${sj} <b>(${inf})</b> hier.</i><br><small>Écris l'auxiliaire et le participe passé.</small>`,
    answer: ans, hint: aux === 'être' ? "Avec l'auxiliaire être, le participe passé s'accorde avec le sujet (e si féminin, s si pluriel)." : "Avec l'auxiliaire avoir, on n'accorde pas ici : auxiliaire + participe passé.",
    explain: `${sj} ${ans}` };
}

function passeSimple() {
  const [inf, s, p] = pick(PS_VERBS), plural = rnd(0, 1) === 1;
  return { kind: 'input', numeric: false,
    prompt: `Conjugue « <b>${inf}</b> » au passé simple :<br><span class="pron">${plural ? 'ils/elles' : 'il/elle'} <span class="blank">…</span></span>`,
    answer: plural ? p : s, hint: `Première lettre : « ${(plural ? p : s)[0]} ». Le passé simple se rencontre surtout dans les récits.`, explain: `${plural ? 'ils' : 'il'} ${plural ? p : s}` };
}

function dictee(lv) {
  const [w, def] = pick(lv === 'CM2' ? DICTEE_CM2 : DICTEE_CM1);
  return { kind: 'input', numeric: false, speak: w, slow: true,
    prompt: `🎧 Écoute le mot, puis écris-le.<br><small>Indice : ${def}</small>`,
    answer: w, hint: `Le mot commence par « ${w[0]} » et il a ${w.length} lettres.`, explain: `Le mot s'écrit : ${w}` };
}


// ---------- v4 : MATHS (programme CM1) ----------
const choiceQ = (prompt, answer, wrong, hint, explain, extra = {}) => ({ kind: 'choice', prompt, choices: shuffle([answer, ...wrong]), answer, hint, explain, ...extra });

function multiples(lv) {
  const m = rnd(0, 2), big = lv === 'CM2';
  if (m === 0) {
    const k = rnd(3, big ? 12 : 9), good = k * rnd(3, 12), wrong = new Set();
    while (wrong.size < 3) { const w = good + rnd(-6, 6); if (w > 0 && w % k !== 0) wrong.add(w); }
    return choiceQ(`Lequel de ces nombres est un <b>multiple de ${k}</b> ?`, String(good), [...wrong].map(String),
      `Un multiple de ${k} est dans la table de ${k}.`, `${good} = ${k} × ${good / k}`);
  }
  if (m === 1) {
    const n = pick([12, 18, 20, 24, 30, 36, 40, 42, 48, 60]);
    const divs = []; for (let d = 2; d < n; d++) if (n % d === 0) divs.push(d);
    const good = pick(divs), wrong = []; for (let d = 2; d <= 9; d++) if (n % d !== 0) wrong.push(d);
    return choiceQ(`Lequel de ces nombres est un <b>diviseur de ${n}</b> ?`, String(good), shuffle(wrong).slice(0, 3).map(String),
      `${n} se partage exactement par un diviseur (sans reste).`, `${n} = ${good} × ${n / good}`);
  }
  const k = pick(big ? [2, 3, 5, 10] : [2, 5, 10]);
  const n = rnd(2, 99) * rnd(1, 9) + rnd(0, 1) * rnd(1, 4);
  const yes = n % k === 0;
  const hint = k === 2 ? 'Un nombre divisible par 2 finit par 0, 2, 4, 6 ou 8.' : k === 5 ? 'Un nombre divisible par 5 finit par 0 ou 5.' : k === 10 ? 'Un nombre divisible par 10 finit par 0.' : 'Additionne les chiffres : si la somme est dans la table de 3, le nombre est divisible par 3.';
  return choiceQ(`Le nombre ${fmt(n)} est-il divisible par ${k} ?`, yes ? 'Oui' : 'Non', [yes ? 'Non' : 'Oui'], hint, `${fmt(n)} ${yes ? 'est' : "n'est pas"} divisible par ${k}.`);
}

function fraccm1(lv) {
  const m = rnd(0, 3);
  if (m === 0) {
    const b = pick([3, 4, 5, 6, 8, 10]), a = rnd(1, b - 1);
    const w = 270 / b;
    let rects = ''; for (let i = 0; i < b; i++) rects += `<rect x="${10 + i * w}" y="10" width="${w}" height="40" fill="${i < a ? '#e0a526' : '#f4f4f4'}" stroke="#555" stroke-width="2"/>`;
    const svg = `<svg viewBox="0 0 290 60" class="fig" role="img" aria-label="bande partagée en ${b} parts égales dont ${a} colorées">${rects}</svg>`;
    const wrong = new Set(); [`${b - a}/${b}`, `${a}/${b + 2}`, `${b}/${a}`, `${a + 1}/${b}`].forEach(x => { if (x !== `${a}/${b}`) wrong.add(x); });
    return choiceQ('Quelle fraction de la bande est colorée ?', `${a}/${b}`, [...wrong].slice(0, 3),
      'Le dénominateur = nombre de parts égales. Le numérateur = parts colorées.', `${a} parts colorées sur ${b} : ${a}/${b}`, { svg });
  }
  if (m === 1) {
    const b = rnd(2, 6), k = rnd(2, 5), a = rnd(1, b - 1);
    return num(`${a}/${b} = ?/${b * k}`, a * k, { hint: `Multiplie le haut et le bas par ${k}.`, explain: `${a} × ${k} = ${a * k} et ${b} × ${k} = ${b * k}` });
  }
  if (m === 2) {
    const n = rnd(2, 5), d1 = rnd(2, 5); let d2; do { d2 = rnd(2, 10); } while (d2 === d1);
    const big = d1 < d2 ? d1 : d2, small = d1 < d2 ? d2 : d1;
    return choiceQ(`Quelle fraction est la <b>plus grande</b> : ${n}/${d1} ou ${n}/${d2} ?`, `${n}/${big}`, [`${n}/${small}`],
      'Même numérateur : plus on partage en petites parts (dénominateur grand), plus chaque part est petite.', `${n}/${big} > ${n}/${small}`);
  }
  const b = pick([2, 3, 4, 5, 10]), k = rnd(2, big_lv(lv)), a = 1;
  return num(`Calcule 1/${b} de ${b * k}.`, k, { hint: `Prendre 1/${b}, c'est diviser par ${b}.`, explain: `${b * k} ÷ ${b} = ${k}` });
}
const big_lv = (lv) => lv === 'CM2' ? 15 : 10;

function compdec(lv) {
  const mk = () => { const i = rnd(0, 9), t = rnd(0, 9), c = rnd(0, 9), len = rnd(1, 3);
    return len === 1 ? { s: `${i},${t}`, v: i * 100 + t * 10 } : len === 2 ? { s: `${i},${t}${c}`, v: i * 100 + t * 10 + c } : { s: `${i}`, v: i * 100 }; };
  const xs = []; let guard = 0;
  while (xs.length < 3 && guard++ < 200) { const x = mk(); if (!xs.some(y => y.v === x.v)) xs.push(x); }
  const maxi = rnd(0, 1) === 0, sorted = [...xs].sort((a, b) => a.v - b.v), good = maxi ? sorted[2] : sorted[0];
  return choiceQ(`Quel nombre est le <b>plus ${maxi ? 'grand' : 'petit'}</b> ?`, good.s, xs.filter(x => x !== good).map(x => x.s),
    'Compare d\'abord la partie entière, puis les dixièmes, puis les centièmes.', `Dans l'ordre : ${sorted.map(x => x.s).join(' < ')}`);
}

function arrondi(lv) {
  const ai = rnd(105, lv === 'CM2' ? 99999 : 9999), x = ai / 100;
  if (rnd(0, 1) === 0) return num(`Arrondis ${dec(x)} à l'<b>unité</b> près.`, Math.floor((ai + 50) / 100), { hint: 'Regarde le chiffre des dixièmes : 5 ou plus, on arrondit au-dessus.', explain: `${dec(x)} ≈ ${Math.floor((ai + 50) / 100)}` });
  const t = Math.floor((ai + 5) / 10);
  return num(`Arrondis ${dec(x)} au <b>dixième</b> près.`, t / 10, { hint: 'Regarde le chiffre des centièmes : 5 ou plus, on arrondit au-dessus.', explain: `${dec(x)} ≈ ${dec(t / 10)}` });
}

function division(lv) {
  const d = rnd(2, 9), q = lv === 'CM2' ? rnd(12, 99) : rnd(3, 19), r = rnd(0, d - 1), n = d * q + r, askQ = rnd(0, 1) === 0;
  return num(`${n} = ${d} × ? + ${r === 0 ? '0' : r}<br><b>Quel est le ${askQ ? 'quotient (?)' : 'reste'} ?</b><small> (division de ${n} par ${d})</small>`, askQ ? q : r,
    { hint: `Cherche le plus grand multiple de ${d} qui ne dépasse pas ${n}.`, explain: `${n} = ${d} × ${q} + ${r}` });
}

const hm2 = (min) => `${Math.floor(min / 60)}h${String(min % 60).padStart(2, '0')}`;
function durees() {
  const m = rnd(0, 2);
  if (m === 0) {
    const s = rnd(7, 18) * 60 + rnd(0, 11) * 5, d = rnd(1, 3) * 60 + rnd(0, 11) * 5;
    return { kind: 'input', numeric: false, prompt: `Un film commence à ${hm2(s)} et dure ${hm2(d)}.<br><b>À quelle heure finit-il ?</b><br><small>Écris l'heure comme 16h35.</small>`,
      answer: hm2(s + d), hint: 'Ajoute d\'abord les heures, puis les minutes (60 min = 1 h).', explain: `${hm2(s)} + ${hm2(d)} = ${hm2(s + d)}` };
  }
  if (m === 1) {
    const s = rnd(7, 15) * 60 + rnd(0, 11) * 5, d = rnd(1, 4) * 60 + rnd(1, 11) * 5;
    return { kind: 'input', numeric: false, prompt: `Un spectacle commence à ${hm2(s)} et finit à ${hm2(s + d)}.<br><b>Combien de temps dure-t-il ?</b><br><small>Écris la durée comme 1h35.</small>`,
      answer: hm2(d), hint: 'Va de l\'heure de début à la prochaine heure pleine, puis ajoute le reste.', explain: `De ${hm2(s)} à ${hm2(s + d)} : ${hm2(d)}` };
  }
  const h = rnd(1, 5), mn = pick([0, 10, 15, 20, 30, 45]);
  return num(`Combien de minutes y a-t-il dans ${h} h ${mn ? mn + ' min' : ''} ?`, h * 60 + mn, { hint: '1 h = 60 min.', explain: `${h} × 60 + ${mn} = ${h * 60 + mn}` });
}

function unites(lv) {
  const U = [['km', 'm', 1000], ['m', 'cm', 100], ['m', 'mm', 1000], ['kg', 'g', 1000], ['L', 'mL', 1000], ['L', 'cL', 100], ['cm', 'mm', 10], ['t', 'kg', 1000]];
  const [big, small, f] = pick(U);
  if (rnd(0, 1) === 0) { const x = rnd(2, lv === 'CM2' ? 60 : 30); return num(`${x} ${big} = ? ${small}`, x * f, { hint: `1 ${big} = ${fmt(f)} ${small}.`, explain: `${x} × ${fmt(f)} = ${fmt(x * f)} ${small}` }); }
  const x = rnd(2, 40); return num(`${fmt(x * f)} ${small} = ? ${big}`, x, { hint: `1 ${big} = ${fmt(f)} ${small} : on divise par ${fmt(f)}.`, explain: `${fmt(x * f)} ÷ ${fmt(f)} = ${x} ${big}` });
}

function egalite(lv) {
  const m = rnd(0, lv === 'CM2' ? 4 : 3), a = rnd(3, 60), x = rnd(2, 40);
  if (m === 0) return num(`? + ${a} = ${a + x}`, x, { hint: `Soustrais : ${a + x} − ${a}.`, explain: `${a + x} − ${a} = ${x}` });
  if (m === 1) return num(`${a + x} − ? = ${a}`, x, { hint: `Cherche ce qu'on a enlevé : ${a + x} − ${a}.`, explain: `${a + x} − ${x} = ${a}` });
  const k = rnd(2, 9);
  if (m === 2) return num(`${k} × ? = ${k * x}`, x, { hint: `Divise : ${k * x} ÷ ${k}.`, explain: `${k} × ${x} = ${k * x}` });
  if (m === 3) return num(`? ÷ ${k} = ${x}`, k * x, { hint: `Multiplie : ${x} × ${k}.`, explain: `${k * x} ÷ ${k} = ${x}` });
  const c = rnd(2, 20); return num(`${k} × ? + ${c} = ${k * x + c}`, x, { hint: `Enlève d'abord ${c}, puis divise par ${k}.`, explain: `${k * x + c} − ${c} = ${k * x} ; ${k * x} ÷ ${k} = ${x}` });
}

function probas() {
  const m = rnd(0, 2);
  if (m === 0) {
    const cols = shuffle(['rouges', 'bleues', 'vertes']); let n;
    do { n = cols.map(() => rnd(1, 7)); } while (new Set(n).size < 3);
    const idx = n.indexOf(Math.max(...n));
    return choiceQ(`Un sac contient ${cols.map((c, i) => `${n[i]} bille${n[i] > 1 ? 's' : ''} ${c}`).join(', ')}.<br><b>Quelle couleur a le plus de chances d'être tirée ?</b>`,
      cols[idx], cols.filter((_, i) => i !== idx), 'Plus il y a de billes d\'une couleur, plus on a de chances de la tirer.', `Il y a plus de billes ${cols[idx]}.`);
  }
  if (m === 1) {
    const r = rnd(1, 6), b = rnd(1, 6);
    return num(`Un sac contient ${r} bille${r > 1 ? 's' : ''} rouge${r > 1 ? 's' : ''} et ${b} bille${b > 1 ? 's' : ''} bleue${b > 1 ? 's' : ''}. On tire une bille sans regarder.<br><b>Combien de chances sur ${r + b} de tirer une rouge ?</b>`, r,
      { hint: 'Compte les billes rouges.', explain: `${r} chances sur ${r + b}.` });
  }
  const [txt, a] = pick([['un nombre pair', 3], ['un 6', 1], ['un nombre plus grand que 4', 2], ['un multiple de 3', 2], ['un nombre impair', 3]]);
  return num(`On lance un dé à 6 faces (1, 2, 3, 4, 5, 6).<br><b>Combien de chances sur 6 d'obtenir ${txt} ?</b>`, a, { hint: `Compte les faces qui conviennent parmi 1, 2, 3, 4, 5, 6.`, explain: `${a} faces conviennent sur 6.` });
}

function programme(lv) {
  let n = rnd(2, 12), steps = lv === 'CM2' ? 3 : 2, txt = `• Choisis le nombre ${n}`, v = n;
  const ops = [['Ajoute', (v, k) => v + k, 2, 12], ['Multiplie par', (v, k) => v * k, 2, 5], ['Retranche', (v, k) => v - k, 1, 9]];
  for (let i = 0; i < steps; i++) {
    let o, k, r, g = 0; do { [o, , ] = [pick(ops)]; k = rnd(o[2], o[3]); r = o[1](v, k); } while ((r < 0 || r > 200) && g++ < 50);
    txt += `<br>• ${o[0]} ${k}`; v = r;
  }
  return num(`<b>Programme de calcul</b><br>${txt}<br><b>Quel nombre obtiens-tu ?</b>`, v, { hint: 'Fais les étapes une par une, dans l\'ordre.', explain: `Résultat : ${v}` });
}

function problemes(lv) {
  const s = lv === 'CM2' ? 2 : 1, m = rnd(0, 3);
  if (m === 0) {
    const a = rnd(2, 5), p = rnd(2, 4) * s, q = rnd(1, 6) * s, tot = a * p + q, B = Math.ceil((tot + 1) / 10) * 10;
    return num(`Sana achète ${a} cahiers à ${p} € l'un et un stylo à ${q} €. Elle paie avec ${B} €.<br><b>Combien lui rend-on ?</b>`, B - tot,
      { hint: 'Étape 1 : le prix total. Étape 2 : ce qu\'on rend.', explain: `${a} × ${p} + ${q} = ${tot} ; ${B} − ${tot} = ${B - tot}` });
  }
  if (m === 1) {
    const n = rnd(20, 60) * s, d = rnd(3, 15), u = rnd(3, 15);
    return num(`Dans un bus, il y a ${n} passagers. À l'arrêt, ${d} personnes descendent et ${u} montent.<br><b>Combien y a-t-il de passagers ensuite ?</b>`, n - d + u,
      { hint: 'Enlève ceux qui descendent, ajoute ceux qui montent.', explain: `${n} − ${d} + ${u} = ${n - d + u}` });
  }
  if (m === 2) {
    const k = rnd(4, 12), x = rnd(2, 6), e = rnd(1, k * x - 1);
    return num(`Un paquet contient ${k} bonbons. Léa achète ${x} paquets et mange ${e} bonbons.<br><b>Combien lui en reste-t-il ?</b>`, k * x - e,
      { hint: 'Calcule d\'abord le nombre total de bonbons.', explain: `${k} × ${x} − ${e} = ${k * x - e}` });
  }
  const p = rnd(4, 9) * s, B = rnd(30, 80) * s; if (B % p === 0) return problemes(lv);
  return num(`Un livre coûte ${p} €. Avec ${B} €, combien de livres entiers peut-on acheter ?`, Math.floor(B / p),
    { hint: `C'est une division : ${B} ÷ ${p}. On garde le quotient.`, explain: `${B} = ${p} × ${Math.floor(B / p)} + ${B % p}` });
}

const geom = () => qcm(GEOM);

function cercle(lv) {
  const r = rnd(2, lv === 'CM2' ? 30 : 15);
  if (rnd(0, 1) === 0) return num(`Le rayon d'un cercle mesure ${r} cm.<br><b>Quel est son diamètre (en cm) ?</b>`, 2 * r, { hint: 'Diamètre = 2 × rayon.', explain: `2 × ${r} = ${2 * r}` });
  return num(`Le diamètre d'un cercle mesure ${2 * r} cm.<br><b>Quel est son rayon (en cm) ?</b>`, r, { hint: 'Rayon = diamètre ÷ 2.', explain: `${2 * r} ÷ 2 = ${r}` });
}

function diagramme(lv) {
  const names = shuffle(['pommes', 'bananes', 'fraises', 'poires', 'oranges']).slice(0, 4);
  let v; do { v = names.map(() => rnd(1, lv === 'CM2' ? 14 : 10)); } while (new Set(v).size < 4);
  const ymax = Math.max(...v) + (Math.max(...v) % 2 ? 1 : 0) + 2, bw = 52, gap = 22, x0 = 46, H = 190, top = 14, bot = H - 40;
  let g = '';
  for (let y = 0; y <= ymax; y += 2) { const py = bot - (y / ymax) * (bot - top); g += `<line x1="${x0}" y1="${py}" x2="${x0 + 4 * (bw + gap)}" y2="${py}" stroke="#ddd"/><text x="${x0 - 8}" y="${py + 4}" font-size="12" text-anchor="end" fill="#444">${y}</text>`; }
  names.forEach((nm, i) => { const bh = (v[i] / ymax) * (bot - top), x = x0 + gap / 2 + i * (bw + gap);
    g += `<rect x="${x}" y="${bot - bh}" width="${bw}" height="${bh}" fill="#6f8be0" stroke="#34479b"/><text x="${x + bw / 2}" y="${bot + 16}" font-size="12" text-anchor="middle" fill="#222">${nm}</text>`; });
  const svg = `<svg viewBox="0 0 ${x0 + 4 * (bw + gap) + 10} ${H}" class="fig" role="img" aria-label="diagramme en barres des fruits préférés"><line x1="${x0}" y1="${top}" x2="${x0}" y2="${bot}" stroke="#222" stroke-width="2"/><line x1="${x0}" y1="${bot}" x2="${x0 + 4 * (bw + gap)}" y2="${bot}" stroke="#222" stroke-width="2"/>${g}</svg>`;
  const head = 'Des élèves ont choisi leur fruit préféré (nombre d\'élèves).<br>';
  const m = rnd(0, 3), i = rnd(0, 3);
  if (m === 0) return num(`${head}<b>Combien d'élèves ont choisi les ${names[i]} ?</b>`, v[i], { svg, hint: 'Lis la hauteur de la barre sur l\'axe de gauche.', explain: `La barre des ${names[i]} monte à ${v[i]}.` });
  if (m === 1) { const mx = v.indexOf(Math.max(...v)); return choiceQ(`${head}<b>Quel fruit est le plus choisi ?</b>`, names[mx], names.filter((_, k) => k !== mx), 'Cherche la barre la plus haute.', `Les ${names[mx]} : ${v[mx]} élèves.`, { svg }); }
  if (m === 2) return num(`${head}<b>Combien d'élèves en tout ont voté ?</b>`, v.reduce((a, b) => a + b, 0), { svg, hint: 'Additionne la hauteur des 4 barres.', explain: `${v.join(' + ')} = ${v.reduce((a, b) => a + b, 0)}` });
  const j = (i + 1 + rnd(0, 2)) % 4, hi = Math.max(v[i], v[j]), lo = Math.min(v[i], v[j]);
  return num(`${head}<b>Combien d'élèves de plus ont choisi ${v[i] >= v[j] ? names[i] : names[j]} que ${v[i] >= v[j] ? names[j] : names[i]} ?</b>`, hi - lo, { svg, hint: 'Lis les deux barres puis soustrais.', explain: `${hi} − ${lo} = ${hi - lo}` });
}

// ---------- v4 : FRANÇAIS ----------
const gap = (ph) => ph.replace('___', '<b class="blank">…</b>');
const fillQ = (bank, prompt, hint) => { const [ph, good, bad] = pick(bank); return choiceQ(`${prompt}<br><i>${gap(ph)}</i>`, good, bad, hint, ph.replace('___', good)); };

function phrasetype() {
  const [ph, t] = pick(PHRASES);
  return choiceQ(`Quel est le type de cette phrase ?<br><i>${ph}</i>`, t, ['déclarative', 'interrogative', 'exclamative', 'impérative'].filter(x => x !== t),
    'Déclarative : on raconte. Interrogative : on pose une question (?). Exclamative : on exprime une émotion (!). Impérative : on donne un ordre.', `C'est une phrase ${t}.`);
}
function negation() {
  const [aff, good, bad] = pick(NEGATIONS);
  return choiceQ(`Quelle est la <b>forme négative</b> de :<br><i>${aff}</i>`, good, bad, 'La négation entoure le verbe : ne … pas (n\' devant une voyelle).', good);
}
const determinants = () => fillQ(DETERMINANTS, 'Choisis le bon <b>déterminant</b>.', 'Le déterminant s\'accorde avec le nom : genre (masculin/féminin) et nombre.');
const pronoms = () => fillQ(PRONOMS, 'Choisis le bon <b>pronom</b>.', 'Un pronom remplace un nom : qui parle-t-on ? Un ou plusieurs ? Garçon ou fille ?');
const accordgn = () => fillQ(ACCORDS_GN, "Choisis la bonne forme (accord dans le groupe nominal).", "L'adjectif s'accorde avec le nom : féminin (e), pluriel (s).");
const accordverbe = () => fillQ(ACCORDS_VERBE, "Choisis la bonne forme du verbe.", 'Trouve le vrai sujet du verbe (souvent le premier nom) : qui est-ce qui … ?');
const ppetre = () => fillQ(PP_ETRE, 'Choisis le bon participe passé.', "Avec être, le participe passé s'accorde avec le sujet (e au féminin, s au pluriel).");
const familles = () => { const [q, good, bad] = pick(FAMILLES); return choiceQ(q, good, bad, 'Les mots de la même famille ont le même radical.', `« ${good} » contient le même radical.`); };
function invariables() { const [good, bad] = pick(INVARIABLES); return choiceQ('Quelle est la bonne orthographe ?', good, bad, 'Visualise le mot : tu l\'as déjà vu écrit !', `Le mot s'écrit : ${good}`); }

function cerger() {
  const [p, inf, ans, hint] = pick(CERGER), elide = p === 'je' && /^[aeiouhéèê]/i.test(ans);
  return { kind: 'input', numeric: false, prompt: `Conjugue « <b>${inf}</b> » au présent :<br><span class="pron">${elide ? "j'" : p + ' '}<span class="blank">…</span></span>`, answer: ans, hint, explain: `${elide ? "j'" : p + ' '}${ans}` };
}
function eleter() {
  const [p, inf, ans, hint] = pick(ELETER), elide = p === 'je' && /^[aeiouhéèê]/i.test(ans);
  return { kind: 'input', numeric: false, prompt: `Conjugue « <b>${inf}</b> » au présent :<br><span class="pron">${elide ? "j'" : p + ' '}<span class="blank">…</span></span>`, answer: ans, hint, explain: `${elide ? "j'" : p + ' '}${ans}` };
}
function coi() {
  const c = pick(COIS), others = COIS.filter(x => x !== c);
  const choices = shuffle([...new Set([c[3], c[1], pick(others)[3], pick(others)[3]])].filter(x => x !== c[3] || true)).slice(0, 4);
  if (!choices.includes(c[3])) choices[0] = c[3];
  return choiceQ(`Quel est le <b>complément d'objet indirect</b> (COI) du verbe « ${c[2]} » ?<br><i>${c[0]}</i>`, c[3], [...new Set(choices.filter(x => x !== c[3]))].slice(0, 3),
    'Un COI est introduit par une préposition (à, de…) : pose la question « à qui ? », « à quoi ? », « de quoi ? ».', `Le COI est « ${c[3]} ».`);
}
const temps = () => fillQ(TEMPS_RACONTER, 'Choisis le temps qui convient pour raconter.', 'Imparfait : décors, habitudes. Passé composé : action terminée, soudaine.');
function lecture() { const [t, q, good, bad] = pick(LECTURES); return choiceQ(`<div class="texte">${t}</div><b>${q}</b>`, good, bad, 'Relis le texte et cherche les indices.', `Réponse : ${good}`); }
function vocab() {
  if (rnd(0, 1) === 0) { const [w, g, b] = pick(SYNONYMES); return choiceQ(`Quel mot veut dire presque la même chose que « <b>${w}</b> » ?`, g, b, 'Un synonyme peut remplacer le mot dans une phrase.', `« ${g} » est un synonyme de « ${w} ».`); }
  const [w, g, b] = pick(CONTRAIRES); return choiceQ(`Quel est le <b>contraire</b> de « ${w} » ?`, g, b, 'Le contraire dit l\'opposé.', `Le contraire de « ${w} » est « ${g} ».`);
}

// ---------- v4 : ANGLAIS ----------
function angecoute() {
  const [en, fr] = pick(ANG_WORDS), others = shuffle(ANG_WORDS.filter(x => x[1] !== fr)).slice(0, 2).map(x => x[1]);
  return choiceQ('🎧 Écoute le mot en anglais.<br><b>Que veut-il dire en français ?</b>', fr, others, `Le mot commence par « ${en[0]} » (en anglais). Appuie sur 🔊 pour réécouter.`, `« ${en} » = ${fr}`, { speak: en, speakLang: 'en-GB', slow: true });
}

// ---------- QCM ----------
function qcm(bank) {
  const [q, good, bad] = pick(bank);
  return { kind: 'choice', prompt: q, choices: shuffle([good, ...bad.slice(0, 3)]), answer: good, hint: 'Réfléchis bien, tu peux y arriver !', explain: `Bonne réponse : ${good}` };
}

const GEN = {
  tables, doublemoitie, mult10, decomp, demidroite, proportion, perimetre, perpendiculaires, symetrie,
  fractions, calcul, conversions, aire, angles, paralleles,
  verbe, sujet, infinitif, cod, nature, homophones, passeCompose, passeSimple, dictee,
  conjPresent: (lv) => conj('present', 'au présent', lv),
  conjImparfait: (lv) => conj('imparfait', "à l'imparfait", lv),
  conjFutur: (lv) => conj('futur', 'au futur', lv),
  sciences: (lv) => qcm(lv === 'CM2' ? SCIENCES2 : SCIENCES),
  culture: (lv) => qcm(lv === 'CM2' ? CULTURE2 : CULTURE),
  multiples, fraccm1, compdec, arrondi, division, durees, unites, egalite, probas, programme, problemes, geom, cercle, diagramme,
  phrasetype, negation, determinants, pronoms, accordgn, accordverbe, ppetre, familles, invariables, cerger, eleter, coi, temps, lecture, vocab,
  histoire: () => qcm(HISTOIRE), geo: () => qcm(GEO), sciences3: () => qcm(SCIENCES3), anglais: () => qcm(ANGLAIS), angecoute,
};

export function makeQuestion(skillId, lv = 'CM1') {
  const q = GEN[skillId](lv);
  q.skill = skillId;
  const base = q.level || SKILLS[skillId].level;
  q.level = lv === 'CM2' ? (base === 'CE2' ? 'CM1' : 'CM2') : base; // en CM2, le programme CM1 devient « révision »
  return q;
}

// Choix pondéré : on revoit plus souvent ce qui est fragile
export function pickSkill(subject, stats, avoid, lv = 'CM1') {
  const all = Object.keys(SKILLS).filter(id => SKILLS[id].subject === subject && SKILLS[id].lv.includes(lv));
  const ids = all.length > 1 ? all.filter(id => id !== avoid) : all;
  const w = ids.map(id => {
    const s = stats[id];
    if (!s || s.tot < 3) return 2.5;
    return 0.6 + (1 - s.ok / s.tot) * 3;
  });
  let r = Math.random() * w.reduce((a, b) => a + b, 0);
  for (let i = 0; i < ids.length; i++) { r -= w[i]; if (r <= 0) return ids[i]; }
  return ids[0];
}

export function buildSession(subject, n, stats, lv = 'CM1') {
  const qs = []; let last = null; const seen = new Set();
  let guard = 0;
  while (qs.length < n && guard++ < 100) {
    const id = pickSkill(subject, stats, last, lv);
    const q = makeQuestion(id, lv);
    const sig = q.skill + q.prompt;
    if (seen.has(sig)) continue;
    seen.add(sig); qs.push(q); last = id;
  }
  while (qs.length < n) qs.push(makeQuestion(pickSkill(subject, stats, null, lv), lv));
  return qs;
}

// Séance sur un seul sujet : on évite les doublons, puis on complète si la banque est petite
export function buildSkill(id, n, lv = 'CM1') {
  const qs = [], seen = new Set(); let guard = 0;
  while (qs.length < n && guard++ < 400) { const q = makeQuestion(id, lv), sig = q.prompt; if (seen.has(sig)) continue; seen.add(sig); qs.push(q); }
  while (qs.length < n) qs.push(makeQuestion(id, lv));
  return qs;
}

// Séance « Nouveautés » : uniquement les compétences ajoutées récemment, en privilégiant celles qu'elle a peu essayées
export function buildNew(n, stats, lv = 'CM1') {
  const ids = NEW_SKILLS.filter(id => SKILLS[id].lv.includes(lv)), qs = [], seen = new Set(); let last = null, guard = 0;
  while (qs.length < n && guard++ < 200) {
    const pool = ids.filter(id => id !== last), w = pool.map(id => 1 / (1 + ((stats[id] || {}).tot || 0)));
    let r = Math.random() * w.reduce((a, b) => a + b, 0), id = pool[pool.length - 1];
    for (let i = 0; i < pool.length; i++) { r -= w[i]; if (r <= 0) { id = pool[i]; break; } }
    const q = makeQuestion(id, lv), sig = q.skill + q.prompt;
    if (seen.has(sig)) continue;
    seen.add(sig); qs.push(q); last = id;
  }
  return qs;
}

export function stitchQuestion(lv = 'CM1') { return makeQuestion(pick(['tables', 'doublemoitie', 'mult10']), lv); }
