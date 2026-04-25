const firebaseConfig = {
  apiKey: "AIzaSyBlRlWgPHzCoKHsDpp04_-ii7nrxhLkhOc",
  authDomain: "kamiwines.firebaseapp.com",
  projectId: "kamiwines",
  storageBucket: "kamiwines.firebasestorage.app",
  messagingSenderId: "916804554075",
  appId: "1:916804554075:web:ac988f8493e9417f2ade7e"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const APP_VERSION = '3.0';
const ADMIN_EMAIL = 'kamil.jurik@easyportal365.com';

// Helpers ──────────────────────────────────────────────
function sklonujLahev(n) { return n === 1 ? 'láhev' : (n >= 2 && n <= 4) ? 'láhve' : 'lahví'; }

// Backward-compatible čtení viniční tratě (typo `vinacniTrat` v <=2.1)
function ctiVinicniTrat(v) { return v.vinicniTrat || v.vinacniTrat || ''; }

// Audit log helper — používá ho admin.html, ale i jiné akce ho mohou volat
async function auditLog(akce, cil) {
  try {
    const u = auth.currentUser;
    if (!u) return;
    await db.collection('auditLog').add({
      adminUid:   u.uid,
      adminEmail: u.email,
      akce:       akce,
      cilUid:     cil?.uid   || null,
      cilEmail:   cil?.email || null,
      cilJmeno:   cil?.jmeno || null,
      casovaZnamka: firebase.firestore.FieldValue.serverTimestamp(),
    });
  } catch (e) { console.warn('audit log failed', e); }
}
