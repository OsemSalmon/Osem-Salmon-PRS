// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { ref, onUnmounted } from 'vue'

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

const db = app.firestore()
const usersCollection = db.collection('users')

export const createUser = user => {
  return usersCollection.add(user)
}

export const getUser = async id => {
  const user = await usersCollection.doc(id).get()
  return user.exists ? user.data() : null
}

export const updateUser = (id, user) => {
  return usersCollection.doc(id).update(user)
}

export const deleteUser = id => {
  return usersCollection.doc(id).delete()
}

export const useLoadUsers = () => {
  const users = ref([])
  const close = usersCollection.onSnapshot(snapshot => {
    users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return users
}

export { auth }