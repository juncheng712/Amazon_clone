import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB2kwx78UNaClKoaXeH4IRYTZsR2tBS8Zc",
    authDomain: "clone-5bdd0.firebaseapp.com",
    projectId: "clone-5bdd0",
    storageBucket: "clone-5bdd0.appspot.com",
    messagingSenderId: "272402658528",
    appId: "1:272402658528:web:5c0e2418776ff6e2a68c85",
    measurementId: "G-FV1CZT2DD8"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const storage = firebase.storage();
  const auth = firebase.auth();

  export { db, auth, storage };