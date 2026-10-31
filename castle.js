// Accueil cinématique : un château gothique de nuit, dessiné en code (original), animé en direct.
// Couches : ciel + lune + montagnes (fond), lac + reflets ondulants, falaise + château + pins (avant), puis
// fenêtres qui vacillent, brume, bougies flottantes, hibou, étoiles filantes. Les « points chauds » (tours) sont des boutons HTML.
// Option : déposer un fichier chateau.jpg (3:4 portrait, par exemple généré par une IA) : il remplace le dessin.
let H = 1600; const W = 1200, HP = 1000, WATER = 1180, Z = 1.2, ZX = 640, ZY = 950; // Z : zoom sur le château
const zx = (x) => ZX + (x - ZX) * Z, zy = (y) => ZY + (y - ZY) * Z;
const rng = (seed) => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
const mk = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
const glowSprite = (rgb) => { const c = mk(64, 64), x = c.getContext('2d'), g = x.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, `rgba(${rgb},.95)`); g.addColorStop(.35, `rgba(${rgb},.35)`); g.addColorStop(1, `rgba(${rgb},0)`); x.fillStyle = g; x.fillRect(0, 0, 64, 64); return c; };

// mode photo : points chauds en coordonnées de la photo (échelle 1, décalée de −200 en x, collée en bas de la scène)
const PSPOTS = { anglais: [175, 400], francais: [280, 300], mission: [260, 545], maths: [610, 430], culture: [875, 300], sciences: [490, 300] };
let PZ = 1; const FX = 600; // zoom de la photo (téléphone : plus gros)
const PFLICK = [[330,520],[362,500],[405,490],[430,480],[450,470],[525,465],[585,455],[640,445],[465,330],[500,320],[515,360],[480,370],[820,305],[900,345],[880,370],[885,470],[905,520],[760,500],[790,420]].map(([x, y]) => [x - 200, y]);
// ---------- points chauds (positions dans le repère 1200 × 1600) ----------
const SPOTS = [
  { k: 'anglais', x: 250, y: 900 }, { k: 'francais', x: 390, y: 735 }, { k: 'mission', x: 600, y: 915 },
  { k: 'maths', x: 800, y: 585 }, { k: 'culture', x: 930, y: 805 }, { k: 'sciences', x: 1010, y: 1040 },
];
const NAMES = { anglais: ['Magie des langues'], francais: ['Sortilèges'], mission: ['Grande Salle'], maths: ['Arithmancie'], culture: ['Histoire de la magie'], sciences: ['Botanique & Cosmos'] };

export function sceneHtml(info, house, hero) {
  const hs = SPOTS.map(({ k, x, y }) => {
    const sub = k === 'mission' ? `Mission du jour · ${info.mission}` : `★ ${info[k].n}/${info[k].total}`;
    const label = k === 'mission' ? `Grande Salle : mission du jour, ${info.mission}. Ouvrir` : `${NAMES[k][0]} : ${info[k].n} sujets sur ${info[k].total} avec une étoile. Ouvrir`;
    return `<button class="hs ${k === 'mission' ? 'main' : ''}" data-k="${k}" style="left:${(zx(x) / W * 100).toFixed(2)}%;top:${(zy(y) / H * 100).toFixed(2)}%" aria-label="${label}"><span class="ring"></span><span class="plaque"><b>${NAMES[k][0]}</b><small>${sub}</small></span></button>`;
  }).join('');
  return `<section class="scene" id="scene" aria-label="Le château : touche une tour pour choisir une matière"><canvas aria-hidden="true"></canvas><div class="shero">${hero}</div>${hs}<p class="scene-hint">Touche une tour pour entrer</p></section>`;
}

// ---------- construction des couches fixes ----------
let L = null; // couches mises en cache
let photo = null; const onPhoto = []; // image optionnelle chateau.jpg : si elle existe, elle remplace le dessin
if (typeof Image === 'function') { const im = new Image(); im.onload = () => { photo = im; H = HP; L = null; onPhoto.forEach(f => f()); }; im.src = 'chateau.jpg'; }

function build() {
  const r = rng(7), back = mk(W, H), fore = mk(W, H), mist = mk(2400, 280);
  const wins = []; // fenêtres allumées : { x, y, w, h, kind, ph, rgb }

  // ---- fond : ciel crépusculaire, lune, nuages, montagnes ----
  const b = back.getContext('2d');
  if (photo) {
    b.fillStyle = '#080d22'; b.fillRect(0, 0, W, H); b.drawImage(photo, -200, H - photo.height, photo.width, photo.height);
    const g = b.createLinearGradient(0, 0, 0, H - photo.height + 130); g.addColorStop(0, '#080d22'); g.addColorStop(.7, '#080d22f0'); g.addColorStop(1, '#080d2200'); b.fillStyle = g; b.fillRect(0, 0, W, H - photo.height + 130);
  } else {
    let g = b.createLinearGradient(0, 0, 0, WATER);
    [[0, '#03051a'], [.28, '#0d1440'], [.5, '#223070'], [.64, '#4a4a8e'], [.74, '#9a7aa0'], [.8, '#e0a08a'], [1, '#f0b890']].forEach(([o, c]) => g.addColorStop(o, c));
    b.fillStyle = g; b.fillRect(0, 0, W, WATER + 1);
    // halo de la lune
    g = b.createRadialGradient(840, 470, 40, 840, 470, 520); g.addColorStop(0, 'rgba(190,205,255,.55)'); g.addColorStop(.4, 'rgba(120,140,220,.18)'); g.addColorStop(1, 'rgba(120,140,220,0)');
    b.fillStyle = g; b.fillRect(0, 0, W, 1100);
    // lune
    g = b.createRadialGradient(830, 460, 10, 840, 470, 150); g.addColorStop(0, '#fffdf0'); g.addColorStop(.8, '#e9eeff'); g.addColorStop(1, '#bcc8ee');
    b.fillStyle = g; b.beginPath(); b.arc(840, 470, 150, 0, 7); b.fill();
    b.save(); b.beginPath(); b.arc(840, 470, 150, 0, 7); b.clip();
    for (let i = 0; i < 18; i++) { const a = r() * 7, d = Math.sqrt(r()) * 130, rr = 10 + r() * 34; b.fillStyle = `rgba(110,125,175,${.07 + r() * .1})`; b.beginPath(); b.arc(840 + Math.cos(a) * d, 470 + Math.sin(a) * d, rr, 0, 7); b.fill(); }
    g = b.createRadialGradient(840, 470, 90, 840, 470, 150); g.addColorStop(0, 'rgba(60,80,140,0)'); g.addColorStop(1, 'rgba(60,80,140,.35)'); b.fillStyle = g; b.fillRect(690, 320, 300, 300);
    b.restore();
    // voiles de nuages éclairés
    for (let i = 0; i < 9; i++) { const x = 100 + r() * 1000, y = 230 + r() * 440, rx = 180 + r() * 340, ry = 10 + r() * 26; g = b.createRadialGradient(x, y, 0, x, y, rx); g.addColorStop(0, `rgba(170,185,240,${.1 + r() * .1})`); g.addColorStop(1, 'rgba(170,185,240,0)'); b.save(); b.translate(x, y); b.scale(1, ry / rx); b.translate(-x, -y); b.fillStyle = g; b.beginPath(); b.arc(x, y, rx, 0, 7); b.fill(); b.restore(); }
    // lueur chaude à l'horizon
    g = b.createRadialGradient(650, 940, 0, 650, 940, 700); g.addColorStop(0, 'rgba(255,170,120,.35)'); g.addColorStop(1, 'rgba(255,170,120,0)'); b.save(); b.translate(650, 940); b.scale(1, .28); b.translate(-650, -940); b.fillStyle = g; b.beginPath(); b.arc(650, 940, 700, 0, 7); b.fill(); b.restore();
    g = b.createRadialGradient(650, 1000, 0, 650, 1000, 620); g.addColorStop(0, 'rgba(255,190,130,.7)'); g.addColorStop(.5, 'rgba(255,140,120,.22)'); g.addColorStop(1, 'rgba(255,140,120,0)'); b.fillStyle = g; b.fillRect(0, 500, W, 700);
    // montagnes : trois plans, de plus en plus sombres (perspective atmosphérique)
    const ridge = (base, amp, seed, top, bot) => { const q = rng(seed), n = 160, pts = new Array(n + 1).fill(0); pts[0] = q() * amp; pts[n] = q() * amp;
      for (let s = n, a = amp; s > 1; s /= 2, a *= .55) for (let i = s / 2; i < n; i += s) pts[i] = (pts[i - s / 2] + pts[i + s / 2]) / 2 + (q() - .5) * a;
      b.beginPath(); b.moveTo(0, WATER); pts.forEach((p, i) => b.lineTo(i * W / n, base - p)); b.lineTo(W, WATER); b.closePath();
      const gg = b.createLinearGradient(0, base - amp, 0, WATER); gg.addColorStop(0, top); gg.addColorStop(1, bot); b.fillStyle = gg; b.fill(); };
    ridge(900, 150, 11, '#7a78bc', '#d29aa8'); ridge(960, 170, 23, '#4a4d92', '#9a76a0'); ridge(1040, 130, 41, '#262c64', '#56508a');
  }

  const makeMist = () => { const m = mist.getContext('2d'); for (let i = 0; i < 80; i++) { const x = r() * 2400, y = 60 + r() * 160, rr = 70 + r() * 150, a = .05 + r() * .1; for (const dx of [0, -2400, 2400]) { const g = m.createRadialGradient(x + dx, y, 0, x + dx, y, rr); g.addColorStop(0, `rgba(176,188,232,${a})`); g.addColorStop(1, 'rgba(176,188,232,0)'); m.fillStyle = g; m.fillRect(x + dx - rr, y - rr, rr * 2, rr * 2); } } };
  if (photo) { makeMist(); return { back, mist, wins: [], stars: [], candles: Array.from({ length: 0 }, () => ({ x: 120 + r() * 960, y: r() * 340, v: .12 + r() * .28, p: r() * 6.28, h: 12 + r() * 10 })), glow: glowSprite('255,196,110'), glowW: glowSprite('255,230,170') }; }
  // ---- avant-plan : viaduc, falaise, château, pins ----
  const f = fore.getContext('2d'), SIL = '#070a17', RIM = '#a8b8f0';
  // viaduc (à gauche) : tablier, piles, arches découpées
  f.fillStyle = '#080b19'; f.fillRect(0, 1042, 262, 28); f.fillRect(0, 1070, 262, 130);
  f.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 4; i++) { const cx = 40 + i * 68, rr = 26; f.beginPath(); f.moveTo(cx - rr, 1200); f.lineTo(cx - rr, 1120); f.arc(cx, 1120, rr, Math.PI, 0); f.lineTo(cx + rr, 1200); f.closePath(); f.fill(); }
  f.globalCompositeOperation = 'source-over';
  const S = []; // silhouettes du château (passe de lumière + passe sombre)
  const rect = (x, y, w, h) => S.push(c => c.fillRect(x, y, w, h));
  const poly = (p) => S.push(c => { c.beginPath(); p.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath(); c.fill(); });
  const spire = (cx, base, w, h) => S.push(c => { c.beginPath(); c.moveTo(cx - w / 2, base); c.quadraticCurveTo(cx - w * .1, base - h * .55, cx, base - h); c.quadraticCurveTo(cx + w * .1, base - h * .55, cx + w / 2, base); c.closePath(); c.fill(); });
  const cren = (x, y, w, n) => { const m = w / (n * 2 - 1); for (let i = 0; i < n; i++) rect(x + i * 2 * m, y - m * 1.2, m, m * 1.2); };
  const win = (x, y, kind, rgb = '255,190,100') => wins.push({ x, y, kind, ph: r() * 6.28, rgb, sp: .5 + r() * 1.2 });
  const tower = (cx, top, bottom, w, sh, slits) => {
    rect(cx - w / 2, top, w, bottom - top); rect(cx - w / 2 - 7, top - 12, w + 14, 16); cren(cx - w / 2 - 7, top - 12, w + 14, 7);
    rect(cx - w * .36, top - 64, w * .72, 54); spire(cx, top - 64, w * .96, sh);
    [[-1, 0], [1, 0]].forEach(([s]) => { rect(cx + s * (w / 2 + 2) - 8, top - 44, 16, 34); spire(cx + s * (w / 2 + 2), top - 44, 20, 46); });
    win(cx, top - 38, 'arch'); win(cx - w * .2, top + 14, 'slit'); slits.forEach(y => win(cx + (r() < .5 ? -1 : 1) * w * .14, y, 'slit'));
  };
  // falaise
  const cliff = []; for (let x = 232; x <= 1150; x += 14) cliff.push([x, 995 + Math.sin(x * .03) * 8 + (r() - .5) * 22]);
  S.push(c => { c.beginPath(); c.moveTo(225, WATER + 40); c.lineTo(250, 1070); cliff.forEach(([x, y]) => c.lineTo(x, y)); c.lineTo(1160, 1070); c.lineTo(1190, WATER + 40); c.closePath(); c.fill(); });
  // murs et corps du château
  rect(236, 962, 850, 120); cren(236, 962, 850, 50); rect(300, 900, 130, 70); cren(300, 900, 130, 8);
  rect(838, 880, 250, 90); cren(838, 880, 250, 12);
  // tours principales (hotspots)
  tower(250, 830, 1040, 70, 84, [890, 940]);       // Magie des langues
  tower(390, 700, 1040, 84, 108, [770, 840, 910]);  // Sortilèges
  tower(800, 650, 1040, 92, 122, [720, 790, 860]);  // Arithmancie
  tower(930, 760, 1040, 78, 74, [830, 900]);        // Histoire (horloge)
  wins.push({ x: 930, y: 806, kind: 'clock', ph: 0, rgb: '255,225,150', sp: .1 });
  // grande salle
  rect(470, 860, 260, 140); poly([[446, 860], [600, 724], [754, 860]]); poly([[560, 760], [600, 700], [640, 760]]);
  [470, 730].forEach(x => { rect(x - 24, 790, 48, 210); cren(x - 24, 790, 48, 3); spire(x, 790, 56, 78); win(x, 820, 'arch'); win(x, 900, 'slit'); });
  spire(600, 726, 40, 56); spire(524, 810, 36, 44); spire(676, 810, 36, 44);
  for (let i = 0; i < 5; i++) win(510 + i * 45, 906, 'tall');
  win(600, 790, 'rose', '255,205,120');
  // petites tourelles réparties
  [310, 345, 540, 670, 870, 1010, 1060, 190].forEach((x, i) => { const hh = 40 + (r() * 46 | 0), by = x < 260 ? 1042 : x > 840 ? 880 : 962; rect(x - 13, by - hh, 26, hh); spire(x, by - hh, 34, 44 + r() * 30); if (r() < .7) win(x, by - hh + 10, 'slit'); });
  // contreforts
  for (let x = 260; x < 1090; x += 74) poly([[x, 962], [x + 22, 962], [x + 40, 1060], [x - 10, 1060]]);
  // observatoire / serre (Botanique & Cosmos)
  rect(960, 985, 110, 50); S.push(c => { c.beginPath(); c.arc(1010, 985, 52, Math.PI, 0); c.closePath(); c.fill(); }); rect(1004, 925, 6, 60);
  for (let i = 0; i < 4; i++) win(975 + i * 28, 1000, 'sq', '120,255,190'); win(1010, 950, 'slit', '120,255,210');
  // passe lumière (décalée vers la lune) puis passe sombre
  f.fillStyle = RIM; S.forEach(fn => { f.save(); f.translate(3.2, -3.2); fn(f); f.restore(); });
  { const sg = f.createLinearGradient(0, 640, 0, 1120); sg.addColorStop(0, '#0a0f26'); sg.addColorStop(.6, '#1a1a38'); sg.addColorStop(1, '#2c2540'); f.fillStyle = sg; } S.forEach(fn => fn(f));
  // pierre éclairée par la lune (source en haut à droite) : dégradé de lumière + joints de pierres, uniquement sur les formes existantes
  f.globalCompositeOperation = 'source-atop';
  { const lg = f.createLinearGradient(1050, 640, 300, 1100); lg.addColorStop(0, 'rgba(165,185,245,.85)'); lg.addColorStop(.4, 'rgba(105,122,190,.45)'); lg.addColorStop(1, 'rgba(50,55,110,0)'); f.fillStyle = lg; f.fillRect(0, 600, W, 600); }
  for (let y = 650; y < 1100; y += 9) { f.fillStyle = `rgba(20,24,60,${.16 + r() * .1})`; f.fillRect(180, y, 930, 1.4); for (let x = 180 + (y % 18) * 2; x < 1110; x += 22 + r() * 18) { f.fillStyle = 'rgba(20,24,60,.2)'; f.fillRect(x, y, 1.2, 9); } }
  for (const [x, w] of [[250, 70], [390, 84], [800, 92], [930, 78]]) { const g = f.createLinearGradient(x - w / 2, 0, x + w / 2, 0); g.addColorStop(0, 'rgba(10,12,35,.55)'); g.addColorStop(.55, 'rgba(10,12,35,0)'); g.addColorStop(1, 'rgba(190,205,255,.25)'); f.fillStyle = g; f.fillRect(x - w / 2, 640, w, 420); }
  f.globalCompositeOperation = 'source-over';
  // texture de roche
  for (let i = 0; i < 90; i++) { const x = 250 + r() * 880, y = 1010 + r() * 170; f.fillStyle = `rgba(80,95,160,${.04 + r() * .07})`; f.fillRect(x, y, 2 + r() * 3, 14 + r() * 50); }
  // pins sur les rives
  const pine = (x, y, h, col) => { f.fillStyle = col; for (let k = 0; k < 6; k++) { const w = h * (.42 - k * .05), yy = y - h * (k * .17); f.beginPath(); f.moveTo(x - w, yy); f.lineTo(x, yy - h * .3); f.lineTo(x + w, yy); f.closePath(); f.fill(); } f.fillRect(x - 3, y, 6, h * .12); };
  for (let i = 0; i < 26; i++) pine(r() * 230, 1150 + r() * 40, 90 + r() * 120, '#050813');
  for (let i = 0; i < 20; i++) pine(1010 + r() * 200, 1160 + r() * 50, 90 + r() * 140, '#050813');
  pine(70, 1560, 520, '#03040b'); pine(190, 1600, 420, '#03040b'); pine(1130, 1590, 560, '#03040b'); pine(1010, 1600, 380, '#03040b');
  f.fillStyle = '#03040b'; f.beginPath(); f.moveTo(0, 1600); f.lineTo(0, 1420); f.quadraticCurveTo(160, 1500, 330, 1600); f.fill(); f.beginPath(); f.moveTo(W, 1600); f.lineTo(W, 1380); f.quadraticCurveTo(1040, 1500, 880, 1600); f.fill();

  // ---- reflet : fond + avant-plan retournés (la ligne de flottaison est en haut de la bande) ----
  const rflip = mk(W, 440), rf = rflip.getContext('2d'); rf.save(); rf.translate(0, 440); rf.scale(1, -1); rf.drawImage(back, 0, WATER - 440, W, 440, 0, 0, W, 440); rf.drawImage(fore, 0, WATER - 440, W, 440, 0, 0, W, 440); rf.restore();

  // ---- brume : bande de bouffées douces, répétable ----
  const m = mist.getContext('2d');
  for (let i = 0; i < 80; i++) { const x = r() * 2400, y = 60 + r() * 160, rr = 70 + r() * 150, a = .05 + r() * .1; for (const dx of [0, -2400, 2400]) { const g = m.createRadialGradient(x + dx, y, 0, x + dx, y, rr); g.addColorStop(0, `rgba(176,188,232,${a})`); g.addColorStop(1, 'rgba(176,188,232,0)'); m.fillStyle = g; m.fillRect(x + dx - rr, y - rr, rr * 2, rr * 2); } }

  const stars = Array.from({ length: 330 }, () => ({ x: r() * W, y: Math.pow(r(), 1.3) * 640, s: .6 + r() * 1.7, p: r() * 6.28, f: .6 + r() * 2.2 }));
  const candles = Array.from({ length: 0 }, () => ({ x: 120 + r() * 960, y: 700 + r() * 520, v: .12 + r() * .28, p: r() * 6.28, h: 12 + r() * 10 }));
  return { back, fore, refl: rflip, mist, wins, stars, candles, glow: glowSprite('255,196,110'), glowG: glowSprite('120,255,200'), glowW: glowSprite('255,230,170') };
}

function owl(c, x, y, k, flap, rim) {
  c.save(); c.translate(x, y); c.scale(k, k); const w = Math.sin(flap) * .75; c.fillStyle = '#05070f';
  [-1, 1].forEach(s => { c.save(); c.scale(s, 1); c.rotate(-.12 - w * .6); c.beginPath(); c.moveTo(6, -4); c.quadraticCurveTo(46, -26 - w * 26, 84, -4 + w * 22); c.quadraticCurveTo(48, -2, 6, 12); c.closePath(); c.fill(); c.restore(); });
  c.beginPath(); c.ellipse(0, 4, 11, 19, 0, 0, 7); c.fill(); c.beginPath(); c.arc(0, -17, 9.5, 0, 7); c.fill();
  c.beginPath(); c.moveTo(-8, -23); c.lineTo(-5, -33); c.lineTo(-1, -25); c.moveTo(8, -23); c.lineTo(5, -33); c.lineTo(1, -25); c.fill();
  c.restore();
}

// ---------- démarrage de l'animation ----------
export function startScene(root) {
  const cv = root && root.querySelector && root.querySelector('canvas');
  if (!cv || !cv.getContext || typeof requestAnimationFrame !== 'function') return;
  const ctx = cv.getContext('2d'); if (!ctx) return;
  if (!L) { try { L = build(); } catch { return; } }
  const reduce = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const size = () => { const dpr = Math.min(window.devicePixelRatio || 1, 2), w = Math.round(Math.min(root.clientWidth * dpr, W)); cv.width = w; cv.height = Math.round(w * H / W); };
  const place = () => { if (root.classList) root.classList.toggle('photo', !!photo); // la classe d'abord : elle fixe la largeur mesurée ensuite
    if (photo) { const cw = root.clientWidth || 800,  pz = cw < 600 ? 1.15 : 1, h = cw < 600 ? 1150 : cw >= 900 ? 860 : HP; if (h !== H) { H = h; L = null; } PZ = pz; }
    if (photo && root.style) root.style.aspectRatio = `${W} / ${H}`;
    root.querySelectorAll('.hs').forEach(b => { const o = SPOTS.find(q => q.k === b.dataset.k), [x, y] = photo ? ((p) => [FX + (p[0] - FX) * PZ, (H - 250) + (H - 780 + p[1] - (H - 250)) * PZ])(PSPOTS[b.dataset.k]) : [zx(o.x), zy(o.y)]; b.style.left = (x / W * 100).toFixed(2) + '%'; b.style.top = (y / H * 100).toFixed(2) + '%'; }); size(); };
  size(); if (photo) place(); else onPhoto.push(() => { if (cv.isConnected) { place(); if (reduce) draw(3); } });
  const onResize = () => { if (!cv.isConnected) return; photo ? place() : size(); if (reduce) draw(3); }; window.addEventListener('resize', onResize);
  let px = 0, py = 0, tx = 0, ty = 0, last = 0; const t0 = performance.now();
  root.addEventListener('pointermove', (e) => { const b = root.getBoundingClientRect(); tx = (e.clientX - b.left) / b.width - .5; ty = (e.clientY - b.top) / b.height - .5; });
  const drawPhoto = (t) => {
    if (!L) { try { L = build(); } catch { return; } }
    const k = cv.width / W, oy = H - 780, FY = H - 250; px += (tx - px) * .06; py += (ty - py) * .06; const sx = (px * 10 + Math.sin(t * .12) * 4) * .5, sy = py * 3;
    ctx.setTransform(k, 0, 0, k, 0, 0); ctx.clearRect(0, 0, W, H);
    ctx.setTransform(k * PZ, 0, 0, k * PZ, k * FX * (1 - PZ), k * FY * (1 - PZ));
    ctx.drawImage(L.back, -14 - sx, -8 - sy, W + 28, H + 16);
    ctx.globalCompositeOperation = 'lighter';
    PFLICK.forEach(([x, y], i) => { ctx.globalAlpha = .08 + .2 * (.5 + .5 * Math.sin(t * (1.1 + i % 5 * .4) + i * 2.1)); ctx.drawImage(L.glow, x - sx - 26, y + oy - sy - 26, 52, 52); });
    ctx.globalCompositeOperation = 'source-over';
    [[oy + 640, .55, 8, 1.3], [oy + 420, .22, 4, 1]].forEach(([y, al, sp, sc], i) => { const off = (t * sp + i * 700) % 2400; ctx.globalAlpha = al; for (const dx of [-2400, 0, 2400]) ctx.drawImage(L.mist, 0, 0, 2400, 280, dx - off, y - 140 * sc, 2400, 280 * sc); });
    const y0 = oy + 400, cy = (c) => ((c.y - t * c.v * 18) % 340 + 340) % 340 + y0, ca = (yy) => Math.min(1, (yy - y0) / 50) * Math.min(1, (y0 + 340 - yy) / 70);
    ctx.globalCompositeOperation = 'lighter';
    for (const c of L.candles) { const yy = cy(c), xx = c.x + Math.sin(t * .5 + c.p) * 22, fa = ca(yy); if (fa <= 0) continue; ctx.globalAlpha = .7 * fa * (.75 + .25 * Math.sin(t * 9 + c.p * 5)); ctx.drawImage(L.glowW, xx - 26, yy - c.h - 24, 52, 52); }
    ctx.globalCompositeOperation = 'source-over';
    for (const c of L.candles) { const yy = cy(c), xx = c.x + Math.sin(t * .5 + c.p) * 22, fa = ca(yy); if (fa <= 0) continue; ctx.globalAlpha = fa; ctx.fillStyle = '#efe3c2'; ctx.fillRect(xx - 3, yy - c.h, 6, c.h); ctx.fillStyle = '#ffd77a'; ctx.beginPath(); ctx.ellipse(xx, yy - c.h - 5, 3, 6, 0, 0, 7); ctx.fill(); }
    ctx.globalAlpha = 1; owl(ctx, ((t * 30) % 1700) - 250, oy + 130 + Math.sin(t * .6) * 40, .6, t * 5.2);
    const ph = (t % 14) / 14; if (ph < .06) { const u = ph / .06, y1 = oy - 20; ctx.strokeStyle = `rgba(255,255,255,${1 - u})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(1000 - u * 520, y1 + u * 150); ctx.lineTo(1110 - u * 520, y1 - 24 + u * 150); ctx.stroke(); }
    ctx.setTransform(k, 0, 0, k, 0, 0);
    const g = ctx.createRadialGradient(W / 2, H * .5, H * .4, W / 2, H * .5, H * .85); g.addColorStop(0, 'rgba(0,0,10,0)'); g.addColorStop(1, 'rgba(0,0,10,.4)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  };
  const draw = (t) => {
    if (photo) return drawPhoto(t);
    if (!L) { try { L = build(); } catch { return; } }
    const k = cv.width / W; px += (tx - px) * .06; py += (ty - py) * .06;
    const sx = px * 10 + Math.sin(t * .12) * 4, sy = py * 6;
    ctx.setTransform(k, 0, 0, k, 0, 0); ctx.clearRect(0, 0, W, H); ctx.setTransform(k * Z, 0, 0, k * Z, k * ZX * (1 - Z), k * ZY * (1 - Z));
    ctx.save(); ctx.translate(-sx * .4, -sy * .4); ctx.drawImage(L.back, 0, 0, W, H);
    // étoiles
    if (!photo) for (const s of L.stars) { const a = .35 + .65 * Math.abs(Math.sin(t * s.f + s.p)); ctx.fillStyle = `rgba(235,240,255,${a})`; ctx.fillRect(s.x, s.y, s.s, s.s); }
    ctx.restore();
    // lac : reflet ondulé en bandes + paillettes de lune
    if (!photo) {
      { const lg = ctx.createLinearGradient(0, WATER, 0, H); lg.addColorStop(0, '#3a3466'); lg.addColorStop(.25, '#1a1e48'); lg.addColorStop(1, '#070a1c'); ctx.fillStyle = lg; ctx.fillRect(0, WATER, W, H - WATER); }
      for (let y = 0; y < 420; y += 5) { const d = y / 420, off = Math.sin(y * .09 + t * 1.3) * (2 + d * 9) + Math.sin(y * .31 - t * .8) * 2; ctx.globalAlpha = .9 * Math.pow(1 - d, .8); ctx.drawImage(L.refl, 0, y, W, 5, off, WATER + y, W, 5); }
      ctx.globalAlpha = 1;
      for (let i = 0; i < 70; i++) { const y = WATER + 6 + i * 6, wv = 20 + i * 1.1; ctx.fillStyle = `rgba(215,225,255,${(.25 + .35 * Math.abs(Math.sin(t * 1.5 + i * 2.3))) * (1 - i / 80)})`; ctx.fillRect(840 + Math.sin(t * .9 + i) * 14 - wv / 2, y, wv, 2); }
    }
    ctx.save(); ctx.translate(-sx, -sy); if (!photo) ctx.drawImage(L.fore, 0, 0, W, H);
    // fenêtres vacillantes + halos
    if (!photo) {
      for (const w of L.wins) {
        const a = .7 + .3 * Math.sin(t * w.sp * 3 + w.ph) * Math.sin(t * .7 + w.ph * 3);
        const gs = w.kind === 'tall' || w.kind === 'rose' ? 70 : w.kind === 'clock' ? 80 : w.kind === 'sq' ? 46 : 44, sp = w.rgb[0] === '1' ? L.glowG : L.glow;
        ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = .5 * a; ctx.drawImage(sp, w.x - gs / 2, w.y - gs / 2 + 10, gs, gs); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = a;
        ctx.fillStyle = `rgb(${w.rgb})`;
        if (w.kind === 'slit') ctx.fillRect(w.x - 3, w.y - 4, 6, 22);
        else if (w.kind === 'arch') { ctx.beginPath(); ctx.moveTo(w.x - 7, w.y + 24); ctx.lineTo(w.x - 7, w.y + 8); ctx.quadraticCurveTo(w.x - 7, w.y, w.x, w.y - 8); ctx.quadraticCurveTo(w.x + 7, w.y, w.x + 7, w.y + 8); ctx.lineTo(w.x + 7, w.y + 24); ctx.fill(); }
        else if (w.kind === 'tall') { ctx.beginPath(); ctx.moveTo(w.x - 8, w.y + 40); ctx.lineTo(w.x - 8, w.y + 12); ctx.quadraticCurveTo(w.x - 8, w.y + 2, w.x, w.y - 10); ctx.quadraticCurveTo(w.x + 8, w.y + 2, w.x + 8, w.y + 12); ctx.lineTo(w.x + 8, w.y + 40); ctx.fill(); }
        else if (w.kind === 'rose') { ctx.beginPath(); ctx.arc(w.x, w.y, 17, 0, 7); ctx.fill(); ctx.strokeStyle = '#070a17'; ctx.lineWidth = 2.5; for (let q = 0; q < 4; q++) { ctx.beginPath(); ctx.moveTo(w.x - 17 * Math.cos(q * .79), w.y - 17 * Math.sin(q * .79)); ctx.lineTo(w.x + 17 * Math.cos(q * .79), w.y + 17 * Math.sin(q * .79)); ctx.stroke(); } }
        else if (w.kind === 'clock') { ctx.beginPath(); ctx.arc(w.x, w.y, 19, 0, 7); ctx.fill(); ctx.strokeStyle = '#070a17'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(w.x, w.y); ctx.lineTo(w.x, w.y - 13); ctx.moveTo(w.x, w.y); ctx.lineTo(w.x + 9, w.y + 4); ctx.stroke(); }
        else ctx.fillRect(w.x - 9, w.y - 8, 18, 16);
      }
      ctx.globalAlpha = 1;
    }
    ctx.restore();
    // rayons de lune (lumière additive) + voile de nuage devant la lune
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 5; i++) { const a = 1.9 + i * .22 + Math.sin(t * .15 + i) * .03, len = 1500; ctx.globalAlpha = .05 + .02 * Math.sin(t * .4 + i * 2); const g = ctx.createLinearGradient(840, 470, 840 + Math.cos(a) * len, 470 + Math.sin(a) * len); g.addColorStop(0, 'rgba(190,205,255,1)'); g.addColorStop(1, 'rgba(190,205,255,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(840, 470); ctx.lineTo(840 + Math.cos(a - .05) * len, 470 + Math.sin(a - .05) * len); ctx.lineTo(840 + Math.cos(a + .05) * len, 470 + Math.sin(a + .05) * len); ctx.fill(); }
    ctx.restore(); ctx.globalAlpha = 1;
    // brume : trois nappes à vitesses différentes
    [[1120, .85, 9, 1.6], [985, .5, 6, 1.2], [690, .28, 4, 1.1]].forEach(([y, al, sp, sc], i) => { const off = ((t * sp + i * 700) % 2400); ctx.globalAlpha = al * .8; for (const dx of [-2400, 0, 2400]) ctx.drawImage(L.mist, 0, 0, 2400, 280, dx - off, y - 140 * sc, 2400, 280 * sc); });
    ctx.globalAlpha = 1;
    // bougies flottantes
    ctx.globalCompositeOperation = 'lighter';
    for (const c of L.candles) { const yy = ((c.y - t * c.v * 18) % 560 + 560) % 560 + 640, xx = c.x + Math.sin(t * .5 + c.p) * 22, fa = Math.min(1, (yy - 640) / 60) * Math.min(1, (1200 - yy) / 120); if (fa <= 0) continue;
      const fl = .75 + .25 * Math.sin(t * 9 + c.p * 5); ctx.globalAlpha = .75 * fa * fl; ctx.drawImage(L.glowW, xx - 26, yy - c.h - 24, 52, 52); }
    ctx.globalCompositeOperation = 'source-over';
    for (const c of L.candles) { const yy = ((c.y - t * c.v * 18) % 560 + 560) % 560 + 640, xx = c.x + Math.sin(t * .5 + c.p) * 22, fa = Math.min(1, (yy - 640) / 60) * Math.min(1, (1200 - yy) / 120); if (fa <= 0) continue;
      ctx.globalAlpha = fa; ctx.fillStyle = '#efe3c2'; ctx.fillRect(xx - 3, yy - c.h, 6, c.h); ctx.fillStyle = '#ffd77a'; ctx.beginPath(); ctx.ellipse(xx, yy - c.h - 5, 3, 6, 0, 0, 7); ctx.fill(); }
    ctx.globalAlpha = 1;
    // hiboux devant la lune
    const o1 = ((t * 34) % 1700) - 250; if (!photo) { owl(ctx, o1, 470 + Math.sin(t * .6) * 44, .9, t * 5.2); const o2 = ((t * 21 + 900) % 1700) - 250; owl(ctx, o2, 640 + Math.sin(t * .45 + 2) * 30, .55, t * 6.1 + 1); }
    // étoile filante
    const ph = (t % 14) / 14; if (ph < .06 && !photo) { const u = ph / .06; ctx.strokeStyle = `rgba(255,255,255,${1 - u})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(1000 - u * 520, 120 + u * 190); ctx.lineTo(1000 - u * 520 + 110, 120 + u * 190 - 24); ctx.stroke(); }
    // vignette
    const g = ctx.createRadialGradient(W / 2, H * .5, H * .35, W / 2, H * .5, H * .78); g.addColorStop(0, 'rgba(0,0,10,0)'); g.addColorStop(1, 'rgba(0,0,10,.38)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  };
  if (reduce) { draw(3); return; }
  const loop = (ts) => { if (!cv.isConnected) { window.removeEventListener('resize', onResize); return; } requestAnimationFrame(loop); if (document.hidden || ts - last < 32) return; last = ts; draw((ts - t0) / 1000 + 3); };
  requestAnimationFrame(loop);
}
