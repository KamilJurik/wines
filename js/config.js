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

const APP_VERSION = '2.0';
