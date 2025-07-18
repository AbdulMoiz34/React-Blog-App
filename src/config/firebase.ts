import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, addDoc, collection, setDoc, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCxq7ZheS4LVBJDSda_db2iljtw8BJLEQA",
    authDomain: "react-blog-app-33125.firebaseapp.com",
    projectId: "react-blog-app-33125",
    storageBucket: "react-blog-app-33125.firebasestorage.app",
    messagingSenderId: "1099165671598",
    appId: "1:1099165671598:web:1a22687751925e21bb4d3f",
    measurementId: "G-WW1G89ZX47"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
    auth,
    createUserWithEmailAndPassword,
    db,
    addDoc,
    collection,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
    setDoc,
    doc,
    getDoc
}