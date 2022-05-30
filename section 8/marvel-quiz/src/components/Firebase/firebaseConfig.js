import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, doc } from 'firebase/firestore'

// Your web app's Firebase configuration
const config = {
    apiKey: "AIzaSyBaSjJPmliy-6wkFoLY57sTxeznFqm64Mw",
    authDomain: "marvel-quiz-c575a.firebaseapp.com",
    projectId: "marvel-quiz-c575a",
    storageBucket: "marvel-quiz-c575a.appspot.com",
    messagingSenderId: "596767062097",
    appId: "1:596767062097:web:d3a6c6470b3e92d761a070"
};

const app = initializeApp(config)
export const auth = getAuth(app)

export const firestoreDB = getFirestore()

export const user = (uid) => doc(firestoreDB, `users/${uid}`)