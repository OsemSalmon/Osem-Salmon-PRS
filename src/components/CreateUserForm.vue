<template>
  <form @submit.prevent="handleSubmit">
    <h3>Add a New User</h3>

    <label for="title">Full Name:</label>
    <input type="text" name="fullname" v-model="fullname" required>

    <label for="email">Email:</label>
    <input type="text" name="email" v-model="email" required>

    <label for="password">Password:</label>
    <input type="password" name="password" v-model="password" required>

    <button>Add User</button>
    <div v-if="error">
      {{ error }}
    </div>
  </form>
</template>

<script>
import {ref} from 'vue'
import {db} from '../firebase/config'
import {addDoc, collection} from 'firebase/firestore'
import { useRouter } from 'vue-router'

import useSignup from '../composables/useSignup'

export default {
  setup () {
    const fullname = ref('')
    const email = ref('')
    const password = ref('')

    const { signup, error } = useSignup()
    const router = useRouter()

    const handleSubmit = async () => {
      const colRef = collection(db, 'user')
      await signup(email.value, password.value)
      if (!error.value) {
        router.push('/')
      }

      else {
        return
      }

      await addDoc(colRef, {
        fullname: fullname.value,
        email: email.value,
        isadmin: false
      })

      fullname.value = ''
      email.value = ''
      password.value = ''
    }

    return {handleSubmit, fullname, email, password, error}
  }

}
</script>

<style>
form {
  padding: 10px;
  margin-top: 10px;
  border: 1px dashed #c3c8ce;
}
</style>