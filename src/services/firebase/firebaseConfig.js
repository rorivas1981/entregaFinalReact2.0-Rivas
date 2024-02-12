import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDS9urAUxf4mfQeBBeNwVDd15J9QiVqWRE",
    authDomain: "cursoreact-42921.firebaseapp.com",
    projectId: "cursoreact-42921",
    storageBucket: "cursoreact-42921.appspot.com",
    messagingSenderId: "828430874078",
    appId: "1:828430874078:web:ed0faacf80a9bc28aa194f"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)