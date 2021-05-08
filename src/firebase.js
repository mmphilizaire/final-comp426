import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB-DMBKi2_wbv0hjXobVt1QWLaSKwZ6kJc",
    authDomain: "final-comp426.firebaseapp.com",
    projectId: "final-comp426",
    storageBucket: "final-comp426.appspot.com",
    messagingSenderId: "24353847634",
    appId: "1:24353847634:web:de8214c3a05ca07843e28b",
    measurementId: "G-QMTKDZKGPX"
  };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

export {auth, firestore};