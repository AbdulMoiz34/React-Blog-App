import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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

export {
    auth,
    createUserWithEmailAndPassword
}