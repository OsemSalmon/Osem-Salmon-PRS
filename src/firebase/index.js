// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo7JdP7m6pQ_EWOHM9U6FR1a1_1gYe4O0",
  authDomain: "vue-osem-salmon.firebaseapp.com",
  projectId: "vue-osem-salmon",
  storageBucket: "vue-osem-salmon.appspot.com",
  messagingSenderId: "904724475427",
  appId: "1:904724475427:web:44b0b070a8886574264b96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)


export { auth }