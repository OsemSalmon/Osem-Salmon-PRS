
import { initializeApp } from "firebase/app"
import { getAuth} from "firebase/auth"
import { onUnmounted } from "vue"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC_Q-aiMJggiHDCWNmbgIOHvMT3Bf1YWUc",
  authDomain: "udemy-testing-2f637.firebaseapp.com",
  projectId: "udemy-testing-2f637",
  storageBucket: "udemy-testing-2f637.appspot.com",
  messagingSenderId: "450783955581",
  appId: "1:450783955581:web:6c41ae8d5299f92ab9bf14"
};


const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const db = getFirestore(app)


//const usersCollection = db.collection('users')



export { auth }

export const createUser = user => {
  return usersCollection.add(user)
}

export const getUser = async id => {
  const user = await usersCollection.doc(id).get()
  return user.exist ? user.data() : null
}

export const updateUser = (id, user) => {
  return usersCollection.doc(id).update(user)
}

export const deleteUser = id => {
  return usersCollection.doc(id).delete()
}

export const useLoadUsers = () => {
  const users = ref([])
  usersCollection.onSnapshot(snapshot => {
    users.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return users
}