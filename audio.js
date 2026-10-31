// Musique d'accueil : « Let the Mystery Unfold » (Geoff Harvey, libre de droits, fichier musique.mp3). Boucle ; démarre au premier toucher
// (règle iOS) et s'arrête dès qu'on quitte l'accueil. Fondu d'entrée et de sortie.
let el = null, on = false, fade = null;
const VOL = .6;
const ramp = (to, ms, done) => { clearInterval(fade); const from = el.volume, t0 = Date.now(); fade = setInterval(() => { const u = Math.min(1, (Date.now() - t0) / ms); el.volume = from + (to - from) * u; if (u >= 1) { clearInterval(fade); done && done(); } }, 50); };
export const musicOn = () => on;
export function startMusic() {
  if (typeof Audio !== 'function') return;
  if (!el) { el = new Audio('musique.mp3'); el.loop = true; el.preload = 'auto'; }
  if (on) { if (el.paused) el.play().catch(() => {}); return; }
  on = true; el.volume = 0; el.play().then(() => on && ramp(VOL, 2000)).catch(() => {}); // refusé avant le premier toucher : on réessaie au toucher suivant
}
export function stopMusic() {
  if (!on) return; on = false; ramp(0, 700, () => !on && el.pause());
}
