import { SUBJECTS, SKILLS, NEW_SKILLS, buildSession, buildNew, buildSkill, makeQuestion, stitchQuestion, pick, rnd } from './gen.js';
import { sceneHtml, startScene } from './castle.js';
import { startMusic, stopMusic, musicOn } from './audio.js';
import { syncSession, syncState, loadRewards } from './sync.js';

const LS = 'sana_v1';
const HOUSES = {
  rouge: { name: 'Gryffondor', emoji: '🦁', c1: '#a4161a', c2: '#e0a526' },
  bleu:  { name: 'Serdaigle', emoji: '🦅', c1: '#1d3f8a', c2: '#b8863b' },
  jaune: { name: 'Poufsouffle', emoji: '🦡', c1: '#c79a0a', c2: '#2b2b2b' },
  vert:  { name: 'Serpentard', emoji: '🐍', c1: '#1f6b3a', c2: '#b7bcc2' },
};
const crest = (id) => `<img class="crestimg" src="crest-${id}.png" alt="" onerror="this.replaceWith(document.createTextNode('${HOUSES[id].emoji}'))">`;
const TITLES = [
  [0, 'Apprentie sorcière'], [400, 'Élève appliquée'], [1000, 'Préfète'],
  [2000, 'Championne de potions'], [3500, 'Maîtresse des sortilèges'], [6000, 'Grande Sorcière'], [9000, 'Légende de Poudlard'],
];
const OK_MSG = ['Magnifique !', 'Bien joué, sorcière !', 'Excellent !', 'Parfait !', '10 points pour ta maison !'];
const STITCH_OK = ['Stitch : « Ohana ! Bravo ! »', 'Stitch saute de joie 🌺', 'Stitch applaudit avec ses 4 bras !'];
const STITCH_KO = ['Stitch : « Pas grave, on réessaie ! »', 'Stitch te fait un câlin 💙', 'Même Stitch se trompe parfois !'];
const IDLE_MS = 60000;                 // au-delà, le chrono se met en pause (plus de contact avec l'écran)
const REVIEW_STEPS = [1, 3, 7, 14];    // jours avant de revoir une question ratée
const DEFAULT_REWARDS = [              // modifiables depuis l'espace parent
  { pts: 300, days: 2, label: '🍦 Une glace' }, { pts: 600, days: 4, label: '🍰 Choisir le dessert du dimanche' }, { pts: 1100, days: 6, label: '🏊 Une sortie piscine' }, { pts: 1700, days: 8, label: '🍔 Un petit Quick' }, { pts: 2400, days: 11, label: '📚 Un nouveau livre' }, { pts: 3300, days: 15, label: '🎬 Une sortie cinéma' }, { pts: 4500, days: 19, label: '🎲 Un jeu de société' }, { pts: 6000, days: 25, label: '🍽️ Un petit resto avec papa' }, { pts: 8000, days: 32, label: '🧱 Une boîte de LEGO' },
];
const CHALLENGES = [
  { id: 'days', txt: 'Travaille 5 jours différents', target: 5 },
  { id: 'correct', txt: 'Réussis 120 questions', target: 120 },
  { id: 'minutes', txt: 'Travaille 100 minutes', target: 100 },
];
const CHALLENGE_BONUS = 100, CUP_BONUS = 50, SESSION_N = 20, MISSION_PER_SUBJECT = 4;
const workDays = () => Object.values(S.timeLog).filter(t => t >= 300).length; // jours avec au moins 5 min de travail réel

const defaults = { house: null, points: 0, stats: { CM1: {}, CM2: {} }, sessions: 0, tickets: 0, streak: 0, lastDay: null,
  rushBest: 0, bestStreak: 0, totalCorrect: 0, challengesWon: 0, run: null, level: 'CM1', timeLog: {}, goalMin: 15, review: [], rewardsCfg: null, unlocked: [],
  week: null, cups: [], cupNotice: null, autoRead: false };
let S = Object.assign({}, defaults, (() => { try { return JSON.parse(localStorage.getItem(LS)); } catch { return {}; } })());
if (!S.stats.CM1 && !S.stats.CM2) S.stats = { CM1: S.stats, CM2: {} }; // ancienne sauvegarde : tout était du CM1
S.stats.CM1 ||= {}; S.stats.CM2 ||= {}; S.timeLog ||= {}; S.review ||= []; S.unlocked ||= []; S.cups ||= [];
const save = () => { try { localStorage.setItem(LS, JSON.stringify(S)); } catch { /* stockage plein ou bloqué */ } };

const $app = document.getElementById('app');
const dayStr = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const addDays = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return dayStr(d); };
const levelOf = (p) => { let l = 0; TITLES.forEach(([min], i) => { if (p >= min) l = i; }); return l; };
const clock = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
const fmtDur = (s) => { s = Math.round(s); return s < 60 ? `${s} s` : s < 3600 ? `${Math.floor(s / 60)} min ${String(s % 60).padStart(2, '0')} s` : `${Math.floor(s / 3600)} h ${String(Math.floor(s / 60) % 60).padStart(2, '0')}`; };
const fmtMin = (s) => s < 3600 ? `${Math.floor(s / 60)} min` : `${Math.floor(s / 3600)} h ${String(Math.floor(s / 60) % 60).padStart(2, '0')}`;
const weekSec = () => { let t = 0; for (let i = 0; i < 7; i++) { const d = new Date(); d.setDate(d.getDate() - i); t += S.timeLog[dayStr(d)] || 0; } return t; };
const addTime = (sec) => { const d = dayStr(); S.timeLog[d] = (S.timeLog[d] || 0) + sec; if (S.week) S.week.sec += sec; };
const applyHouse = () => {
  const h = HOUSES[S.house] || HOUSES.rouge;
  document.documentElement.style.setProperty('--c1', h.c1);
  document.documentElement.style.setProperty('--c2', h.c2);
};
const isFresh = (q) => G && NEW_SKILLS.includes(q.skill) && ((S.stats[G.level] || {})[q.skill] || { tot: 0 }).tot < 5;
const tagText = (q) => (isFresh(q) && !q.review ? '🆕 ' : '') + (q.review ? '🔁 À revoir' : q.level === 'CE2' ? '↩︎ Révision CE2' : q.level === 'CM1' && G && G.level === 'CM2' ? '↩︎ Révision CM1' : q.level === 'CM2' ? '🎓 CM2' : '📘 CM1');
const stateDoc = () => ({ points: S.points, streak: S.streak, house: S.house, level: S.level, unlocked: S.unlocked.map(u => `${u.label} (${u.pts})`), review: S.review.length });

// ---------------- LECTURE À VOIX HAUTE ----------------
const speechOK = typeof speechSynthesis !== 'undefined' && typeof SpeechSynthesisUtterance !== 'undefined';
// Choix de la voix : on écarte les voix « gadget » d'Apple, on préfère les voix de qualité (Premium / Enhanced / Siri) et les bonnes voix connues.
const NOVELTY = /albert|bad news|bahh|bells|boing|bubbles|cellos|deranged|good news|hysterical|jester|organ|superstar|trinoids|whisper|wobble|zarvox|fred|junior|ralph|kathy/i;
const GOOD = { en: /daniel|kate|serena|arthur|martha|oliver|samantha|karen|moira/i, fr: /am[ée]lie|thomas|audrey|aur[ée]lie|marie|virginie/i };
const voicesFor = (l) => { try { return speechSynthesis.getVoices().filter(v => v.lang.toLowerCase().replace('_', '-').startsWith(l) && !NOVELTY.test(v.name)); } catch { return []; } };
const voiceScore = (v, l) => { const lang = v.lang.toLowerCase().replace('_', '-'); return (lang === (l === 'en' ? 'en-gb' : 'fr-fr') ? 6 : 0) + (/premium|enhanced|siri|neural|natural|am[ée]lior/i.test(v.name) ? 8 : 0) + (GOOD[l].test(v.name) ? 4 : 0) + (v.localService ? 1 : 0); };
const bestVoice = (l) => { const all = voicesFor(l), pref = S.voices && S.voices[l]; return all.find(v => v.name === pref) || all.sort((a, b) => voiceScore(b, l) - voiceScore(a, l))[0] || null; };
const speakOne = (text, l, slow) => new Promise(res => { try { const u = new SpeechSynthesisUtterance(text), v = bestVoice(l); u.lang = l === 'en' ? 'en-GB' : 'fr-FR'; if (v) { u.voice = v; u.lang = v.lang; } u.rate = slow ? .72 : l === 'en' ? .85 : .95; u.onend = u.onerror = () => res(); speechSynthesis.speak(u); } catch { res(); } });
// parts : [{ t: texte, l: 'fr' | 'en' }, …] lues l'une après l'autre
function speakParts(parts, slow) {
  if (!speechOK) return;
  try { speechSynthesis.cancel(); } catch { return; }
  const id = ++speakId; (async () => { for (const p of parts) { if (id !== speakId) return; if (p.t.trim()) await speakOne(p.t, p.l, slow); } })();
}
let speakId = 0;
const speak = (text, slow, lang) => speakParts([{ t: text, l: (lang || 'fr').slice(0, 2) === 'en' ? 'en' : 'fr' }], slow);
// bouton « changer de voix » : fait défiler les voix disponibles (anglais puis français)
function cycleVoice(l) { const all = voicesFor(l); if (!all.length) return 'aucune voix'; const cur = bestVoice(l), nx = all[(all.indexOf(cur) + 1) % all.length]; S.voices = Object.assign({}, S.voices, { [l]: nx.name }); save(); speakParts([{ t: l === 'en' ? 'Hello, my name is ' + nx.name.split(' ')[0] : 'Bonjour, je m\'appelle ' + nx.name.split(' ')[0], l }]); return nx.name; }
if (speechOK) try { speechSynthesis.onvoiceschanged = () => {}; speechSynthesis.getVoices(); } catch { /* */ }
// anglais : ce qui est entre « » est lu avec la voix anglaise, le reste en français
const ENG_CHOICES = /Comment dit-on|en anglais|bonne réponse|___|capitale/;
function speechParts(q) {
  if (q.speak) return [{ t: q.speak, l: (q.speakLang || 'fr').slice(0, 2) === 'en' ? 'en' : 'fr' }];
  if ((SKILLS[q.skill] || {}).subject !== 'anglais') return [{ t: speechText(q), l: 'fr' }];
  const raw = q.prompt.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/___/g, ' blanc ').replace(/ = /g, ' veut dire ').replace(/—/g, ','), parts = [];
  const ql = /en anglais/.test(raw) ? 'fr' : 'en'; // « bonjour » en anglais : le mot cité est français
  raw.split(/(«[^»]*»)/).forEach(seg => { if (/^«/.test(seg)) parts.push({ t: seg.replace(/[«»]/g, ''), l: ql }); else parts.push({ t: seg, l: 'fr' }); });
  if (q.kind === 'choice') { parts.push({ t: 'Choix.', l: 'fr' }); const l = ENG_CHOICES.test(q.prompt) ? 'en' : 'fr'; q.choices.forEach(c => parts.push({ t: c.replace(/[.!?]$/, '') + '.', l })); }
  return parts;
}
const speechText = (q) => {
  if (q.speak) return q.speak;
  let t = q.prompt.replace(/<[^>]+>/g, ' ').replace(/ /g, '').replace(/…|\?(?=\s*(?:\/|$))/g, ' blanc ')
    .replace(/(\d)\/(\d)/g, '$1 sur $2').replace(/ × /g, ' fois ').replace(/ ÷ /g, ' divisé par ').replace(/ \+ /g, ' plus ')
    .replace(/ − /g, ' moins ').replace(/ = /g, ' égale ').replace(/€/g, ' euros').replace(/%/g, ' pour cent').replace(/\s+/g, ' ').trim();
  if (q.kind === 'choice') t += '. Choix : ' + q.choices.join(', ') + '.';
  return t;
};

// ---------------- RÉVISION ESPACÉE ----------------
const subjectOf = (skill) => SKILLS[skill].subject;
const isBank = (skill) => subjectOf(skill) !== 'maths'; // maths : on régénère un exercice neuf ; le reste : même question
const sigOf = (q) => q.skill + '|' + (isBank(q.skill) ? q.prompt : 'gen');
const dueReviews = (level, subjects) => S.review.filter(r => r.level === level && r.due <= dayStr() && subjects.includes(subjectOf(r.skill))).sort((a, b) => a.due < b.due ? -1 : 1);

function withReviews(qs, subjects, max, level) {
  const due = dueReviews(level, subjects).slice(0, max);
  qs.length = Math.max(0, qs.length - due.length); // la séance garde sa longueur : les révisions remplacent des questions neuves
  due.forEach(it => {
    const q = it.q ? JSON.parse(JSON.stringify(it.q)) : makeQuestion(it.skill, it.level);
    q.reviewId = it.id; q.review = true;
    qs.splice(rnd(0, qs.length), 0, q);
  });
  return qs;
}

// firstTry = bonne réponse du premier coup
function updateReview(q, firstTry) {
  if (q.reviewId) {
    const it = S.review.find(r => r.id === q.reviewId); if (!it) return;
    if (firstTry) { S.reviewDone = (S.reviewDone || 0) + 1; it.step++; if (it.step >= REVIEW_STEPS.length) S.review = S.review.filter(r => r !== it); else it.due = addDays(REVIEW_STEPS[it.step]); }
    else { it.step = 0; it.due = addDays(1); }
    return;
  }
  if (firstTry) return;
  const sig = sigOf(q);
  if (S.review.some(r => r.sig === sig && r.level === G.level)) return;
  const copy = isBank(q.skill) ? JSON.parse(JSON.stringify(q)) : null;
  S.review.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), sig, skill: q.skill, level: G.level, q: copy, step: 0, due: addDays(1) });
  S.review = S.review.slice(-60);
}

// ---------------- RÉCOMPENSES ----------------
const getRewards = () => (S.rewardsCfg && S.rewardsCfg.length ? S.rewardsCfg : DEFAULT_REWARDS).slice().sort((a, b) => a.pts - b.pts);
const isUnlocked = (r) => S.points >= r.pts && workDays() >= (r.days || 0);
function newRewards() { // une récompense demande assez de points ET assez de jours de travail
  const won = getRewards().filter(r => isUnlocked(r) && !S.unlocked.some(u => u.pts === r.pts && u.label === r.label));
  won.forEach(r => S.unlocked.push({ pts: r.pts, label: r.label, at: dayStr() }));
  return won;
}
const rewardLine = (r) => { const dp = Math.max(0, r.pts - S.points), dd = Math.max(0, (r.days || 0) - workDays());
  return `${r.label} — ${dp ? `encore ${dp} pts` : 'points OK ✅'}${r.days ? ` · ${dd ? `encore ${dd} jour${dd > 1 ? 's' : ''} de travail` : 'jours OK ✅'}` : ''}`; };

// ---------------- SUJETS : ÉTOILES ET TROPHÉES ----------------
const stars = (id, lv = S.level) => { const t = (S.stats[lv] || {})[id]; if (!t || !t.tot) return 0; const r = t.ok / t.tot;
  return t.tot >= 60 && r >= 0.85 ? 3 : t.tot >= 30 && r >= 0.75 ? 2 : t.tot >= 10 && r >= 0.6 ? 1 : 0; };
const topicsOf = (subject, lv = S.level) => Object.keys(SKILLS).filter(id => SKILLS[id].subject === subject && SKILLS[id].lv.includes(lv));
const totalSec = () => Object.values(S.timeLog).reduce((a, b) => a + b, 0);
function badges() {
  const all = Object.keys(SKILLS).filter(id => SKILLS[id].lv.includes(S.level)), st = all.map(id => stars(id));
  const n1 = st.filter(x => x >= 1).length, n3 = st.filter(x => x >= 3).length, bs = Math.max(S.streak, S.bestStreak || 0);
  const B = (id, emoji, label, got) => ({ id, emoji, label, got });
  return [
    B('s3', '🔥', 'Série de 3 jours', bs >= 3), B('s7', '🔥', 'Série de 7 jours', bs >= 7), B('s14', '🌋', 'Série de 14 jours', bs >= 14),
    B('c100', '🧙', '100 bonnes réponses', (S.totalCorrect || 0) >= 100), B('c500', '🧙‍♀️', '500 bonnes réponses', (S.totalCorrect || 0) >= 500), B('c1500', '🪄', '1 500 bonnes réponses', (S.totalCorrect || 0) >= 1500),
    B('t5', '⏱️', '5 heures de travail', totalSec() >= 18000), B('t20', '⌛', '20 heures de travail', totalSec() >= 72000),
    B('st1', '⭐', 'Une première étoile de sujet', n1 >= 1), B('st5', '🌟', '5 sujets avec une étoile', n1 >= 5), B('st15', '✨', '15 sujets avec une étoile', n1 >= 15), B('st3', '👑', 'Un sujet maîtrisé (3 étoiles)', n3 >= 1),
    B('def', '🎯', 'Défi de la semaine réussi', (S.challengesWon || 0) >= 1), B('cup', '🏆', 'Coupe des maisons gagnée', S.cups.some(c => c.rank === 1)),
    B('rev', '🔁', '10 questions revues jusqu\'au bout', (S.reviewDone || 0) >= 10),
  ];
}

// ---------------- COUPE DES MAISONS + DÉFI ----------------
const hash = (s) => { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; };
const weekKey = () => { const d = new Date(); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return dayStr(d); }; // lundi
const weekFraction = () => { const d = new Date(); return (((d.getDay() + 6) % 7) + (d.getHours() * 60 + d.getMinutes()) / 1440) / 7; };
// Les autres maisons suivent le vrai travail de Sana : elles restent à ±36 points environ, passent devant puis derrière
// (onde propre à chaque maison, croissante avec les points) ; si Sana ne travaille pas, elles avancent doucement (150 pts/semaine).
const rivalPts = (id, key, mine, f) => {
  const m = mine > 300 ? 300 + (mine - 300) * 0.88 : mine; // si elle travaille beaucoup, elle prend de l'avance
  const x = Math.max(m, 150 * Math.min(1, f));
  const h = hash(key + id), period = 360 + h % 200, phase = (h % 628) / 100;
  return Math.max(0, Math.round(x + 36 * Math.min(1, x / 150) * Math.sin(2 * Math.PI * x / period + phase)));
};
const challenge = () => CHALLENGES[hash(S.week.key) % CHALLENGES.length];
const challengeProgress = () => { const c = challenge(); return c.id === 'days' ? S.week.days.length : c.id === 'correct' ? S.week.correct : Math.floor(S.week.sec / 60); };

function ensureWeek() {
  const key = weekKey();
  if (S.week && S.week.key === key) return;
  if (S.week && S.week.points > 0) {
    const old = S.week;
    const rank = 1 + Object.keys(HOUSES).filter(id => id !== S.house).filter(id => rivalPts(id, old.key, old.points, 1) > old.points).length;
    const bonus = rank === 1 ? CUP_BONUS : 0;
    S.cups.push({ week: old.key, rank, points: old.points }); S.cups = S.cups.slice(-26);
    S.points += bonus; S.cupNotice = { rank, points: old.points, bonus };
  }
  S.week = { key, points: 0, days: [], correct: 0, sec: 0, done: false };
  save();
}
function cupRows() {
  const f = weekFraction();
  return Object.entries(HOUSES).map(([id, h]) => ({ id, h, me: id === S.house, pts: id === S.house ? S.week.points : rivalPts(id, S.week.key, S.week.points, f) }))
    .sort((a, b) => b.pts - a.pts || (b.me ? 1 : 0) - (a.me ? 1 : 0));
}

// ---------------- ACCUEIL ----------------
// pour chaque tour : nombre de sujets avec au moins une étoile
const castleInfo = (due) => { const o = { mission: `${Object.keys(SUBJECTS).length * MISSION_PER_SUBJECT} questions${due ? ` · 🔁 ${due}` : ''}` };
  Object.keys(SUBJECTS).forEach(k => { const ids = topicsOf(k); o[k] = { n: ids.filter(id => stars(id) >= 1).length, total: ids.length }; }); return o; };
let onHome = false;
const musicPref = () => { try { return localStorage.getItem('sana_music') !== '0'; } catch { return true; } };
const leaveHome = () => { onHome = false; stopMusic(); if (document.body) document.body.classList.remove('is-home'); };
function home() {
  if (!S.house) return choose();
  if (location.hash) location.hash = '';
  onHome = true; ensureWeek(); applyHouse();
  const h = HOUSES[S.house], lv = levelOf(S.points);
  const next = TITLES[lv + 1];
  const pct = next ? Math.round((S.points - TITLES[lv][0]) / (next[0] - TITLES[lv][0]) * 100) : 100;
  const today = S.timeLog[dayStr()] || 0, goal = S.goalMin * 60, gpct = Math.min(100, Math.round(today / goal * 100));
  const rows = cupRows(), maxP = Math.max(100, ...rows.map(r => r.pts)), rank = rows.findIndex(r => r.me) + 1;
  const ch = challenge(), prog = challengeProgress();
  const nr = getRewards().find(r => !isUnlocked(r));
  const due = dueReviews(S.level, Object.keys(SUBJECTS)).length;
  const n = S.cupNotice;
  const weak = weakSkills();
  const newCount = NEW_SKILLS.filter(id => SKILLS[id].lv.includes(S.level)).length;
  const hero = `<header class="hero">
    <div class="crest">${crest(S.house)}</div>
    <div><h1>Bonjour Sana !</h1><p>${h.name} · <b>${TITLES[lv][1]}</b></p></div>
    <div class="stats"><span>⭐ ${S.points}</span><span>🔥 ${S.streak} j</span><span>🎓 ${S.level}</span></div>
  </header>`;
  $app.innerHTML = `
  ${sceneHtml(castleInfo(due), h, hero)}
  <div class="homebody">
  <div class="mast"><h2>La Gazette de l'école de magie</h2><p>${new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })} · Édition spéciale Sana</p></div>
  <div class="xp" title="Progression vers le prochain titre"><div style="width:${pct}%"></div></div>
  ${n ? `<div class="notice">🏆 Coupe de la semaine dernière : ${n.rank === 1 ? 'ta maison a gagné !' : `${n.rank}e place`} (${n.points} pts)${n.bonus ? ` · +${n.bonus} points bonus !` : ''} <button class="link" id="okn">OK</button></div>` : ''}
  <div class="goal"><div class="gl"><span>⏱ Aujourd'hui : <b>${fmtMin(today)}</b> / ${S.goalMin} min ${today >= goal ? '🎯' : ''}</span><span>Semaine : ${fmtMin(weekSec())}</span></div>
    <div class="xp slim"><div style="width:${gpct}%"></div></div></div>
  ${S.run ? `<div class="resume"><button class="mission" id="resume">▶ Reprendre ma séance<small>${runLabel()} · question ${Math.min(S.run.i + 1, S.run.qs.length)}/${S.run.qs.length}</small></button><button class="link" id="abandon">Terminer cette séance et garder mes points</button></div>` : ''}
  ${weak.length ? `<button class="mission faibles" id="faibles">💪 Entraînement ciblé<small>${weak.length} notion${weak.length > 1 ? 's' : ''} à renforcer (moins de 75 %) • points +50 %</small></button>` : ''}
  <button class="mission nouveau" id="nouveau">🆕 Nouveautés<small>${newCount} sujets du programme à découvrir • ${SESSION_N} questions</small></button>
  ${S.tickets > 0 ? `<button class="stitch" id="stitch"><img src="stitch.png" alt="" onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:'👽',className:'e'}))"><div><b>Mission Stitch ×${S.tickets}</b><small>Stitch s'est échappé ! Calcul éclair de 45 secondes</small></div></button>` : `<p class="hint">🌺 Fais encore ${3 - (S.sessions % 3)} séance(s) pour débloquer une visite de Stitch !</p>`}
  <div class="cup"><div class="gl"><b>🏆 Coupe des maisons · cette semaine</b><span>${rank}e / 4</span></div>
    ${rows.map(r => `<div class="cuprow ${r.me ? 'me' : ''}"><span>${r.h.emoji} ${r.h.name}</span><div class="xp slim"><div style="width:${Math.round(r.pts / maxP * 100)}%"></div></div><b>${r.pts}</b></div>`).join('')}
    <p class="small">🎯 Défi : ${ch.txt} — <b>${Math.min(prog, ch.target)}/${ch.target}</b> ${S.week.done ? `✅ (+${CHALLENGE_BONUS} pts)` : `(+${CHALLENGE_BONUS} pts)`}<br>Les autres maisons avancent toutes seules 🪄</p></div>
  <button class="link big" id="rw">🎁 ${nr ? `Prochaine récompense : ${rewardLine(nr)}` : 'Toutes les récompenses sont débloquées !'}</button>
  <button class="link big" id="tr">🏅 Mes trophées (${badges().filter(b => b.got).length}/${badges().length})</button>
  <footer><button class="link" id="lvl">Niveau : ${S.level} (changer)</button>${speechOK ? ` · <button class="link" id="ar">🔊 Lecture auto : ${S.autoRead ? 'oui' : 'non'}</button>` : ''}${speechOK ? ` · <button class="link" id="ven">🎙 Voix anglaise</button> · <button class="link" id="vfr">🎙 Voix française</button>` : ''} · <a href="parent.html">Espace parent</a></footer>
  </div>`;
  document.querySelectorAll('.hs').forEach(b => { const go = () => b.dataset.k === 'mission' ? startSession('mission') : topicsScreen(b.dataset.k); b.onclick = go; });
  if (document.body) document.body.classList.add('is-home');
  const sc = document.getElementById('scene'); startScene(sc);
  // musique d'accueil : démarre au premier toucher (règle iOS), s'arrête quand on entre dans une salle
  if (sc) { const mb = document.createElement('button'); mb.className = 'musbtn'; mb.setAttribute('aria-label', 'Musique'); const paint = () => { mb.textContent = musicPref() ? '🎵' : '🔇'; };
    mb.onclick = (e) => { e.stopPropagation(); const v = !musicPref(); try { localStorage.setItem('sana_music', v ? '1' : '0'); } catch {} paint(); v ? startMusic() : stopMusic(); }; paint(); sc.appendChild(mb); }
  const arm = () => { if (onHome && musicPref()) startMusic(); }; arm(); document.addEventListener('pointerdown', arm, { once: true });
  document.getElementById('nouveau').onclick = () => startSession('nouveau');
  const fb0 = document.getElementById('faibles'); if (fb0) fb0.onclick = () => startSession('faibles');
  const rs = document.getElementById('resume'); if (rs) { rs.onclick = resume; document.getElementById('abandon').onclick = abandon; }
  document.getElementById('tr').onclick = trophiesScreen;
  // Mode test caché : toucher 5 fois « Bonjour Sana ! » (pour tout essayer avant de valider)
  let taps = 0; document.querySelector('.hero h1').onclick = () => { if (++taps < 5) return; taps = 0; if (document.getElementById('testp')) return;
    $app.insertAdjacentHTML('beforeend', `<div class="cup" id="testp"><b>🧪 Mode test</b><p class="small">Pour essayer les récompenses sans attendre. À ne pas utiliser sur la vraie tablette de Sana (sauf « tout remettre à zéro » avant de la lui donner).</p>
      <button class="link" id="t1">+500 points</button> · <button class="link" id="t2">+1 jour de travail</button> · <button class="link" id="t3">Tout remettre à zéro</button></div>`);
    document.getElementById('t1').onclick = () => { S.points += 500; S.week.points += 500; newRewards(); save(); home(); };
    document.getElementById('t2').onclick = () => { S.timeLog['test-' + Date.now()] = 600; newRewards(); save(); home(); };
    document.getElementById('t3').onclick = () => { if (confirm('Tout effacer sur cet appareil ?')) { try { localStorage.removeItem(LS); localStorage.removeItem('sana_pending'); } catch {} location.hash = ''; location.reload(); } }; };
  const st = document.getElementById('stitch'); if (st) st.onclick = stitchRush;
  const ok = document.getElementById('okn'); if (ok) ok.onclick = () => { S.cupNotice = null; save(); home(); };
  document.getElementById('rw').onclick = rewardsScreen;
  document.getElementById('lvl').onclick = () => { S.level = S.level === 'CM1' ? 'CM2' : 'CM1'; save(); syncState(stateDoc()); home(); };
  const ven = document.getElementById('ven'), vfr = document.getElementById('vfr'); if (ven) { ven.onclick = () => { ven.textContent = '🎙 ' + cycleVoice('en'); }; vfr.onclick = () => { vfr.textContent = '🎙 ' + cycleVoice('fr'); }; }
  const ar = document.getElementById('ar'); if (ar) ar.onclick = () => { S.autoRead = !S.autoRead; save(); if (S.autoRead) speak('Lecture automatique activée'); home(); };
  save();
}

function rewardsScreen() {
  leaveHome();
  const wd = workDays();
  $app.innerHTML = `<div class="topbar"><button class="back" id="rb" aria-label="Retour">←</button><h1 class="grow">🎁 Mes récompenses</h1></div>
    <p>Tu as <b>⭐ ${S.points} points</b> et <b>${wd} jour${wd > 1 ? 's' : ''} de travail</b> (5 min ou plus). Il faut les deux pour débloquer !</p>
    <div class="rwlist">${getRewards().map(r => { const got = isUnlocked(r), p = Math.min(100, Math.round(S.points / r.pts * 100));
      return `<div class="rwitem ${got ? 'got' : ''}"><div class="gl"><b>${got ? '✅' : '🔒'} ${r.label}</b><span>${r.pts} pts${r.days ? ` · ${r.days} j` : ''}</span></div><div class="xp slim"><div style="width:${p}%"></div></div>${got ? '' : `<p class="small">${rewardLine({ ...r, label: '' }).replace(/^ — /, '')}</p>`}</div>`; }).join('')}</div>
    <p class="small">Les récompenses sont choisies par tes parents.</p>`;
  document.getElementById('rb').onclick = home;
}

function trophiesScreen() {
  leaveHome(); const bs = badges();
  $app.innerHTML = `<div class="topbar"><button class="back" id="rb" aria-label="Retour">←</button><h1 class="grow">🏅 Mes trophées</h1></div>
    <p>${bs.filter(b => b.got).length} sur ${bs.length} gagnés !</p>
    <div class="rwlist">${bs.map(b => `<div class="rwitem ${b.got ? 'got' : 'lockedb'}"><b>${b.got ? b.emoji : '🔒'} ${b.label}</b></div>`).join('')}</div>`;
  document.getElementById('rb').onclick = home;
}

// Choix d'un sujet précis dans une matière (ou tout mélangé)
function topicsScreen(subject) {
  leaveHome(); const sub = SUBJECTS[subject], lv = S.level, ids = topicsOf(subject, lv);
  $app.innerHTML = `<div class="topbar"><button class="back" id="rb" aria-label="Retour">←</button><h1 class="grow">${sub.emoji} ${sub.name}</h1></div>
    <button class="mission" id="mix">🎲 Tout mélangé<small>${SESSION_N} questions • ${ids.length} sujets • ${lv}</small></button>
    <p class="small">…ou choisis un sujet (les étoiles montrent ta maîtrise) :</p>
    <div class="topics">${ids.map(id => { const t = (S.stats[lv] || {})[id], n = stars(id, lv), pct = t && t.tot ? Math.round(t.ok / t.tot * 100) : null;
      return `<button class="topic" data-id="${id}"><span class="tl">${NEW_SKILLS.includes(id) && (!t || t.tot < 5) ? '🆕 ' : ''}${SKILLS[id].label}</span><span class="ts">${'★'.repeat(n)}${'☆'.repeat(3 - n)}</span><small>${pct === null ? 'pas encore essayé' : `${pct} % du 1er coup · ${t.tot} questions`}</small></button>`; }).join('')}</div>`;
  document.getElementById('rb').onclick = home;
  document.getElementById('mix').onclick = () => startSession(subject);
  document.querySelectorAll('.topic').forEach(b => b.onclick = () => startSession('skill:' + b.dataset.id));
}

function choose() {
  leaveHome();
  document.documentElement.style.setProperty('--c1', '#3a2a5a'); document.documentElement.style.setProperty('--c2', '#d6b25e');
  $app.innerHTML = `<div class="center"><h1>✨ Cérémonie de répartition ✨</h1><p>Choisis ta maison, Sana !</p>
  <div class="grid">${Object.entries(HOUSES).map(([id, h]) => `<button class="subject house" data-h="${id}" style="--c1:${h.c1};--c2:${h.c2}"><span class="e">${crest(id)}</span><b>${h.name}</b></button>`).join('')}</div></div>`;
  document.querySelectorAll('.house').forEach(b => b.onclick = () => { S.house = b.dataset.h; save(); home(); });
}

// ---------------- SÉANCE ----------------
let G = null; // séance en cours
let rush = null; // mission Stitch en cours
let lastAct = Date.now();

const WEAK_MAX = 0.75, WEAK_BONUS = 1.5;
const weakSkills = (lv = S.level) => Object.keys(SKILLS).filter(id => SKILLS[id].lv.includes(lv)).map(id => ({ id, t: (S.stats[lv] || {})[id] }))
  .filter(({ t }) => t && t.tot >= 2 && t.ok / t.tot < WEAK_MAX).sort((a, b) => a.t.ok / a.t.tot - b.t.ok / b.t.tot).map(x => x.id);
function buildWeak(n, lv) {
  const ids = weakSkills(lv), qs = [], seen = new Set(); let last = null, guard = 0;
  while (qs.length < n && guard++ < 300) {
    const pool = ids.length > 1 ? ids.filter(i => i !== last) : ids, w = pool.map(i => 1.2 - S.stats[lv][i].ok / S.stats[lv][i].tot);
    let r = Math.random() * w.reduce((a, b) => a + b, 0), id = pool[pool.length - 1];
    for (let k = 0; k < pool.length; k++) { r -= w[k]; if (r <= 0) { id = pool[k]; break; } }
    const q = makeQuestion(id, lv); if (seen.has(q.prompt)) continue; seen.add(q.prompt); qs.push(q); last = id;
  }
  return qs;
}
const kindName = (k) => k === 'faibles' ? 'Entraînement ciblé' : k === 'mission' ? 'Mission du jour' : k === 'nouveau' ? 'Nouveautés' : k.startsWith('skill:') ? SKILLS[k.slice(6)].label : SUBJECTS[k].name;
const runLabel = () => `${kindName(S.run.kind)} · ${S.run.level || 'CM1'}`;

// Sauvegarde l'endroit exact où elle en est (question, essais, cases coloriées, temps de travail).
function persist() {
  if (!G) return;
  S.run = { kind: G.kind, level: G.level, qs: G.qs, i: G.i, correct: G.correct, points: G.points, start: G.start, skills: G.skills,
    firstTry: G.firstTry, attempts: G.attempts, done: G.done, mine: [...G.mine], elapsed: G.elapsed };
  save();
}
function pause() { persist(); G = null; home(); }
function restoreG() { const r = S.run; G = { ...r, level: r.level || 'CM1', mine: new Set(r.mine), tq0: Date.now() }; }
function resume() {
  leaveHome(); restoreG(); location.hash = 'seance';
  if (G.done) next(); else showQuestion(true);
}
function abandon() { restoreG(); endSession(true); }

// Chrono « actif » : il ne compte que si l'écran est visible et qu'elle a touché l'écran il y a moins d'une minute.
['pointerdown', 'keydown', 'touchstart'].forEach(ev => addEventListener(ev, () => { lastAct = Date.now(); }, { passive: true }));
setInterval(() => {
  if (!G || document.hidden || Date.now() - lastAct > IDLE_MS) return;
  ensureWeek(); G.elapsed = (G.elapsed || 0) + 1; addTime(1);
  if (G.elapsed % 5 === 0) persist();
  const tm = document.getElementById('tm'); if (tm) tm.textContent = clock(G.elapsed);
}, 1000);
document.addEventListener('visibilitychange', () => { if (document.hidden) { persist(); if (speechOK) { speakId++; speechSynthesis.cancel(); } } });
// Geste « retour » de l'iPad / du navigateur : même effet que la flèche ←
window.addEventListener('hashchange', () => {
  if (location.hash) return;
  if (G) pause(); else if (rush) cancelRush();
});

function startSession(kind) {
  if (S.run) { restoreG(); endSession(true, true); } // une ancienne séance en pause est clôturée (points gardés)
  leaveHome(); ensureWeek();
  const lv = S.level, st = S.stats[lv];
  const all = Object.keys(SUBJECTS), isSkill = kind.startsWith('skill:');
  const subjects = kind === 'mission' || kind === 'nouveau' || kind === 'faibles' ? all : isSkill ? [SKILLS[kind.slice(6)].subject] : [kind];
  let qs = kind === 'mission' ? subjects.flatMap(s => buildSession(s, MISSION_PER_SUBJECT, st, lv)) : kind === 'nouveau' ? buildNew(SESSION_N, st, lv) : kind === 'faibles' ? buildWeak(SESSION_N, lv)
    : isSkill ? buildSkill(kind.slice(6), SESSION_N, lv) : buildSession(kind, SESSION_N, st, lv);
  if (!isSkill) qs = withReviews(qs, subjects, kind === 'nouveau' || kind === 'faibles' ? 0 : kind === 'mission' ? 4 : 5, lv);
  G = { kind, level: lv, qs, i: 0, correct: 0, points: 0, start: Date.now(), skills: {}, firstTry: 0, elapsed: 0, tq0: Date.now() };
  location.hash = 'seance';
  showQuestion();
}

function symSvg(q, mine, reveal) {
  const cs = 38, pad = 10, W = q.cols * cs + pad * 2, H = q.rows * cs + pad * 2, ax = pad + (q.cols / 2) * cs;
  const key = (r, c) => r + ',' + c;
  const target = new Set(q.left.map(([r, c]) => key(r, q.cols - 1 - c)));
  let g = '';
  for (let r = 0; r < q.rows; r++) for (let c = 0; c < q.cols; c++) {
    const leftOn = q.left.some(([a, b]) => a === r && b === c);
    const onRight = c >= q.cols / 2;
    const on = leftOn || (onRight && (mine.has(key(r, c)) || (reveal && target.has(key(r, c)))));
    const wrong = reveal && onRight && mine.has(key(r, c)) && !target.has(key(r, c));
    g += `<rect data-r="${r}" data-c="${c}" x="${pad + c * cs}" y="${pad + r * cs}" width="${cs}" height="${cs}" fill="${wrong ? '#e8a0a0' : on ? (leftOn ? '#2a6fdb' : '#e0a526') : '#efefef'}" stroke="#888"/>`;
  }
  return `<svg id="sym" viewBox="0 0 ${W} ${H}" class="fig sym" role="img" aria-label="grille de symétrie">${g}
    <line x1="${ax}" y1="2" x2="${ax}" y2="${H - 2}" stroke="#111" stroke-width="4"/><text x="${ax + 8}" y="20" font-size="16" font-style="italic">(d)</text></svg>`;
}

function showQuestion(keep) {
  const q = G.qs[G.i];
  if (!keep) { G.attempts = 0; G.mine = new Set(); G.done = false; }
  G.tq0 = Date.now();
  const total = G.qs.length;
  const tagOn = q.review || q.level === 'CE2' || (q.level === 'CM1' && G.level === 'CM2');
  let body = `<div class="tagrow"><div class="tag ${tagOn ? 'ce2' : ''}">${tagText(q)} · ${SKILLS[q.skill].label}</div>${speechOK ? '<button class="say" id="say" aria-label="Écouter la question">🔊 Écouter</button>' : ''}</div>
    <div class="prompt">${q.prompt}</div>`;
  if (q.speak && !speechOK) body += `<p class="small dark">Pas de voix sur cet appareil : le mot a ${q.answer.length} lettres.</p>`;
  if (q.svg) body += q.svg;
  if (q.kind === 'symmetry') body += symSvg(q, G.mine, false);
  if (q.kind === 'input') body += `<input id="ans" class="ans" ${q.numeric ? 'inputmode="decimal"' : ''} autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Ta réponse">`;
  if (q.kind === 'choice') body += `<div class="choices">${q.choices.map(c => `<button class="choice" data-v="${c.replace(/"/g, '&quot;')}">${c}</button>`).join('')}</div>`;
  $app.innerHTML = `
    <div class="topbar"><button class="back" id="quit" aria-label="Pause : revenir à l'accueil">←</button><div class="bar"><div style="width:${(G.i / total) * 100}%"></div></div><span class="clock" id="tm" title="Temps de travail">${clock(G.elapsed || 0)}</span><span>${G.i + 1}/${total}</span></div>
    <div class="card">${body}</div>
    <div id="fb" class="fb"></div>
    <button id="go" class="primary">${q.kind === 'choice' ? '' : 'Valider'}</button>`;
  document.getElementById('quit').onclick = pause;
  const say = document.getElementById('say'); if (say) say.onclick = () => speakParts(speechParts(q), q.slow);
  if (speechOK && !keep && (q.speak || S.autoRead)) speakParts(speechParts(q), q.slow);
  const go = document.getElementById('go');
  if (q.kind === 'choice') go.style.display = 'none';
  go.onclick = () => G.done ? next() : check();
  const inp = document.getElementById('ans');
  if (inp) { inp.focus(); inp.addEventListener('keydown', e => { if (e.key === 'Enter') go.click(); }); }
  document.querySelectorAll('.choice').forEach(b => b.onclick = () => { if (!G.done) check(b.dataset.v, b); });
  const sym = document.getElementById('sym');
  if (sym) sym.addEventListener('click', e => {
    if (G.done) return; const t = e.target; if (t.tagName !== 'rect') return;
    const r = +t.dataset.r, c = +t.dataset.c; if (c < q.cols / 2) return;
    const k = r + ',' + c; G.mine.has(k) ? G.mine.delete(k) : G.mine.add(k);
    t.setAttribute('fill', G.mine.has(k) ? '#e0a526' : '#efefef');
    persist();
  });
  if (keep && G.attempts === 1) { const fb = document.getElementById('fb'); fb.className = 'fb bad'; fb.innerHTML = `🤔 Tu avais déjà essayé. Indice : ${q.hint}<br><small>Il te reste une seconde chance !</small>`; }
  persist();
}

// Texte : sans espaces ni majuscules, apostrophes unifiées. Nombres : « 3,5 » = « 3.5 » = « 3,50 ».
const norm = (s, numeric) => { s = String(s).trim().toLowerCase().replace(/[\s  ]/g, ''); return numeric ? s.replace(',', '.') : s.replace(/[’‘`]/g, "'"); };
const same = (a, b, numeric) => numeric ? (norm(a, true) !== '' && Number(norm(a, true)) === Number(norm(b, true))) : norm(a) === norm(b);

function check(val, btn) {
  const q = G.qs[G.i];
  let ok;
  if (q.kind === 'symmetry') {
    const target = new Set(q.left.map(([r, c]) => r + ',' + (q.cols - 1 - c)));
    ok = target.size === G.mine.size && [...target].every(k => G.mine.has(k));
  } else if (q.kind === 'choice') ok = val === q.answer;
  else { val = document.getElementById('ans').value; if (!val.trim()) return; ok = same(val, q.answer, q.numeric); }

  const fb = document.getElementById('fb'), go = document.getElementById('go');
  const sk = (G.skills[q.skill] ||= { ok: 0, tot: 0, sec: 0 });
  const qsec = () => { sk.sec = (sk.sec || 0) + Math.min(120, (Date.now() - G.tq0) / 1000); };
  if (ok) {
    const pts = Math.round((G.attempts === 0 ? 10 : 5) * (G.kind === 'faibles' ? WEAK_BONUS : 1));
    G.points += pts; G.correct++; sk.tot++; qsec();
    if (G.attempts === 0) { G.firstTry++; sk.ok++; }
    updateReview(q, G.attempts === 0);
    if (btn) btn.classList.add('good');
    fb.className = 'fb good'; fb.innerHTML = `✅ ${pick(OK_MSG)} <b>+${pts}</b>${q.review && G.attempts === 0 ? ' · tu as retenu cette question 🔁' : ''}<br><small>${pick(STITCH_OK)}</small>`;
    finishQ(go);
  } else if (G.attempts === 0) {
    G.attempts = 1;
    if (btn) { btn.classList.add('bad'); btn.disabled = true; }
    fb.className = 'fb bad'; fb.innerHTML = `🤔 Pas tout à fait. Indice : ${q.hint}<br><small>Tu as une seconde chance !</small>`;
  } else {
    sk.tot++; qsec(); updateReview(q, false);
    if (btn) btn.classList.add('bad');
    document.querySelectorAll('.choice').forEach(b => { if (b.dataset.v === q.answer) b.classList.add('good'); });
    if (q.kind === 'symmetry') document.getElementById('sym').outerHTML = symSvg(q, G.mine, true);
    fb.className = 'fb bad'; fb.innerHTML = `Voici la réponse : <b>${q.kind === 'input' || q.kind === 'choice' ? (q.kind === 'input' && q.numeric ? q.answer.replace('.', ',') : q.answer) : ''}</b><br><small>${q.explain}</small><br><small>On la reverra demain 🔁 · ${pick(STITCH_KO)}</small>`;
    finishQ(go);
  }
  persist();
}

function finishQ(go) {
  G.done = true; go.style.display = ''; go.textContent = G.i + 1 < G.qs.length ? 'Suivant →' : 'Voir mon résultat 🏆';
  document.querySelectorAll('.choice').forEach(b => b.disabled = true);
  const i = document.getElementById('ans'); if (i) i.disabled = true;
}

function next() { G.i++; G.i < G.qs.length ? showQuestion() : endSession(false); }

function endSession(early, silent) {
  const answered = early ? G.i + (G.done ? 1 : 0) : G.qs.length;
  const dur = Math.round(G.elapsed || 0);
  const before = levelOf(S.points), badgesBefore = badges().filter(b => b.got).map(b => b.id);
  ensureWeek();
  S.points += G.points; S.week.points += G.points; S.week.correct += G.correct;
  const today = dayStr();
  if (answered >= 3 && !S.week.days.includes(today)) S.week.days.push(today);
  const st = S.stats[G.level] ||= {};
  Object.entries(G.skills).forEach(([id, r]) => { const s = (st[id] ||= { ok: 0, tot: 0 }); s.ok += r.ok; s.tot += r.tot; });
  let ticket = false;
  if (answered >= 5) {
    S.sessions++; if (S.sessions % 3 === 0) { S.tickets++; ticket = true; }
    const y = new Date(); y.setDate(y.getDate() - 1);
    if (S.lastDay !== today) { S.streak = S.lastDay === dayStr(y) ? S.streak + 1 : 1; S.lastDay = today; }
  }
  let challengeWon = false;
  if (!S.week.done && challengeProgress() >= challenge().target) { S.week.done = true; challengeWon = true; S.challengesWon = (S.challengesWon || 0) + 1; S.points += CHALLENGE_BONUS; S.week.points += CHALLENGE_BONUS; }
  S.totalCorrect = (S.totalCorrect || 0) + G.correct; S.bestStreak = Math.max(S.bestStreak || 0, S.streak);
  const won = newRewards(); const newBadges = badges().filter(b => b.got && !badgesBefore.includes(b.id));
  S.run = null; save();
  if (answered > 0) {
    const skills = {}; Object.entries(G.skills).forEach(([id, r]) => { skills[id] = { ok: r.ok, tot: r.tot, sec: Math.round(r.sec || 0) }; });
    syncSession({ name: 'Sana', mode: G.kind.startsWith('skill:') ? SKILLS[G.kind.slice(6)].subject : G.kind, level: G.level, startedAt: G.start, durationSec: dur, answered, correct: G.correct, firstTry: G.firstTry, points: G.points, skills });
    syncState(stateDoc());
  }
  if (silent) { G = null; return; }
  leaveHome();
  const ratio = answered ? G.correct / answered : 0;
  const stars = ratio >= .9 ? 3 : ratio >= .65 ? 2 : ratio > 0 ? 1 : 0;
  const lvUp = levelOf(S.points) > before;
  const avg = answered ? Math.round(dur / answered) : 0;
  $app.innerHTML = `<div class="center">
    <div class="stars">${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>
    <h1>${early ? 'Séance arrêtée' : 'Séance terminée !'}</h1>
    <p class="big">${G.correct} / ${answered} réussies · <b>+${G.points} points</b></p>
    <p>⏱ ${fmtDur(dur)} de travail${answered ? ` · ${avg} s par question` : ''}</p>
    ${challengeWon ? `<p class="up">🎯 Défi de la semaine réussi : +${CHALLENGE_BONUS} points !</p>` : ''}
    ${won.map(r => `<p class="up">🎁 Récompense débloquée : <b>${r.label}</b> ! Montre-le à tes parents.</p>`).join('')}
    ${newBadges.map(b => `<p class="up">${b.emoji} Nouveau trophée : <b>${b.label}</b> !</p>`).join('')}
    ${lvUp ? `<p class="up">🎉 Nouveau titre : ${TITLES[levelOf(S.points)][1]} !</p>` : ''}
    ${ticket ? `<p class="up">👽 Stitch vient de s'échapper ! Une mission Stitch t'attend à l'accueil.</p>` : ''}
    <button class="primary" id="home">Retour à Poudlard 🏰</button></div>`;
  document.getElementById('home').onclick = home;
  G = null;
}

// ---------------- MISSION STITCH ----------------
function cancelRush() {
  if (!rush) return;
  clearInterval(rush.iv); rush = null; S.tickets++; save(); home(); // le ticket est rendu
}

function stitchRush() {
  if (S.run) persist();
  leaveHome(); ensureWeek();
  S.tickets--; save(); location.hash = 'stitch';
  const lv = S.level;
  let left = 45, good = 0, tot = 0, q = stitchQuestion(lv), over = false;
  const draw = () => {
    $app.innerHTML = `<div class="topbar"><button class="back" id="rb" aria-label="Annuler la mission">←</button></div><div class="center rush"><h1>👽 Mission Stitch</h1>
    <div class="timer" id="t">${left}</div><p>Réponds vite : Stitch attend !</p>
    <div class="card"><div class="prompt">${q.prompt}</div>
    <input id="ans" class="ans" inputmode="decimal" autocomplete="off" placeholder="?"></div>
    <p class="big">✔ ${good}</p></div>`;
    document.getElementById('rb').onclick = cancelRush;
    const i = document.getElementById('ans'); i.focus();
    i.addEventListener('keydown', e => {
      if (e.key !== 'Enter' || !i.value.trim() || over) return;
      tot++; if (same(i.value, q.answer, true)) good++;
      q = stitchQuestion(lv); draw();
    });
  };
  draw();
  const iv = setInterval(() => {
    left--; const t = document.getElementById('t'); if (t) t.textContent = left;
    if (left <= 0) {
      clearInterval(iv); over = true; rush = null;
      const pts = good * 3; S.points += pts; S.week.points += pts; if (good > S.rushBest) S.rushBest = good; addTime(45);
      const won = newRewards(); save();
      syncSession({ name: 'Sana', mode: 'stitch', level: lv, startedAt: Date.now() - 45000, durationSec: 45, answered: tot, correct: good, firstTry: good, points: pts, skills: {} });
      syncState(stateDoc());
      $app.innerHTML = `<div class="center"><div class="stars">👽🌺</div><h1>Stitch est content !</h1>
        <p class="big">${good} bonnes réponses · <b>+${pts} points</b></p><p>Record : ${S.rushBest}</p>
        ${won.map(r => `<p class="up">🎁 Récompense débloquée : <b>${r.label}</b> !</p>`).join('')}
        <button class="primary" id="home">Retour à Poudlard 🏰</button></div>`;
      document.getElementById('home').onclick = home;
    }
  }, 1000);
  rush = { iv };
}

if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
home();
// Récompenses choisies par le parent (si le suivi en ligne est configuré)
loadRewards().then(items => { if (items && items.length) { S.rewardsCfg = items; save(); if (onHome && !G && !rush) home(); } }).catch(() => {});
