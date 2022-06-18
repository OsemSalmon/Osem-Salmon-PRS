import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDtBsjrvIOUtRmcTBTfhHGhItndCwtM9QA",
    authDomain: "osemsalmonv3.firebaseapp.com",
    projectId: "osemsalmonv3",
    storageBucket: "osemsalmonv3.appspot.com",
    messagingSenderId: "467045403887",
    appId: "1:467045403887:web:f47b8b0e4c049e3ac05f1a"
}

initializeApp(firebaseConfig)

const db = getFirestore()
const auth = getAuth()

export { db, auth }