import { firebaseConfig } from './firebase-config.js';

const V = '10.12.2';
const PENDING = 'sana_pending';
let dbPromise = null;

export const enabled = !!firebaseConfig.apiKey;

function getDb() {
  if (!enabled) return Promise.resolve(null);
  dbPromise ||= (async () => {
    const [{ initializeApp }, fs] = await Promise.all([
      import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`),
      import(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore.js`),
    ]);
    const app = initializeApp(firebaseConfig);
    return { db: fs.getFirestore(app), fs };
  })().catch(() => { dbPromise = null; return null; });
  return dbPromise;
}

const readQ = () => { try { return JSON.parse(localStorage.getItem(PENDING)) || []; } catch { return []; } };
const writeQ = (q) => localStorage.setItem(PENDING, JSON.stringify(q.slice(-200)));

export async function flush() {
  const ctx = await getDb(); if (!ctx) return;
  const q = readQ(); const left = [];
  for (const rec of q) {
    try { await ctx.fs.addDoc(ctx.fs.collection(ctx.db, 'sessions'), rec); } catch { left.push(rec); }
  }
  writeQ(left);
}

export async function syncSession(rec) {
  if (!enabled) return;
  const q = readQ(); q.push(rec); writeQ(q);
  flush();
}

export async function syncState(state) {
  const ctx = await getDb(); if (!ctx) return;
  try { await ctx.fs.setDoc(ctx.fs.doc(ctx.db, 'state', 'sana'), { ...state, lastSeen: Date.now() }); } catch { /* hors ligne : tant pis */ }
}

window.addEventListener('online', flush);
flush();

// Récompenses configurées par le parent (lecture publique, écriture réservée au parent connecté)
export async function loadRewards() {
  const ctx = await getDb(); if (!ctx) return null;
  try {
    const snap = await ctx.fs.getDoc(ctx.fs.doc(ctx.db, 'config', 'rewards'));
    const items = snap.exists() ? snap.data().items : null;
    return Array.isArray(items) ? items.filter(r => r && Number.isFinite(r.pts) && typeof r.label === 'string') : null;
  } catch { return null; }
}
