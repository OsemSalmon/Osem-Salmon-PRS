
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { 
  getFirestore, collection, getDocs,
  addDoc
 } from "firebase/firestore"
import { onUnmounted } from "vue"


const firebaseConfig = {
  apiKey: "AIzaSyCo7JdP7m6pQ_EWOHM9U6FR1a1_1gYe4O0",
  authDomain: "vue-osem-salmon.firebaseapp.com",
  projectId: "vue-osem-salmon",
  storageBucket: "vue-osem-salmon.appspot.com",
  messagingSenderId: "904724475427",
  appId: "1:904724475427:web:44b0b070a8886574264b96"
}

//init firebase app
const app = initializeApp(firebaseConfig)

//init auth
const auth = getAuth(app)
export { auth }

//init firestore
const db = getFirestore()

//collection reference
const colRef = collection(db, 'patient')

//get collection data
getDocs(colRef)
  .then((snapshot) => {
    let patient = []
    snapshot.docs.forEach((doc) => {
      patient.push({ ...doc.data(), id: doc.id })
    })
    console.log(patient)
  })
.catch(err => {
  console.log(err.message)
})


//add
const addPatientInfo = document.querySelector('.add')
addPatientInfo.addEventListener('submit', (e) => {
  e.preventDefault()
  
  addDoc(colRef, {
    patientName: addPatientInfo.patientName.value,
    patientIC: addPatientInfo.patientIC.value,
  })
  .then(() => {
    addPatientInfo.reset()
  })

})

remove
const deletePatientInfo = document.querySelector('.add')
addPatientInfo.addEventListener('submit', (e) => {
  e.preventDefault()
})

