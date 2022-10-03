import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
    apiKey: "AIzaSyBCjunb7vRo_PYu2AkXK0wUrqLGKm2vgjg",
    authDomain: "soulfulwebapplicatie.firebaseapp.com",
    databaseURL: "https://soulfulwebapplicatie-default-rtdb.firebaseio.com",
    projectId: "soulfulwebapplicatie",
    storageBucket: "soulfulwebapplicatie.appspot.com",
    messagingSenderId: "555607829296",
    appId: "1:555607829296:web:dc33f7e6bd3bc341dbb6f5",
    measurementId: "G-3BBMXDJB1M"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
