import { ref } from 'vue'

//import firebase
import { auth } from '../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'

//refs
const userAuth = ref(auth.currentUser)

onAuthStateChanged(auth, (_user) => {
    console.log('User changed. Current is:', _user)
    userAuth.value = _user
})

const getUserAuth = () => {
    return { userAuth }
}

export default getUserAuth