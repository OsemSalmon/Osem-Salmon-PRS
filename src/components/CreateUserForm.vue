<template>
  <form @submit.prevent="handleSubmit">
    <h3>Add a New User</h3>

    <label for="title">Full Name:</label>
    <input type="text" name="fullname" v-model="fullname" required>

    <label for="email">Email:</label>
    <input type="text" name="email" v-model="email" required>

    <button>Add User</button>
  </form>
</template>

<script>
import {ref} from 'vue'

import {db} from '../firebase/config'
import {addDoc, collection} from 'firebase/firestore'

export default {
  setup () {
    const fullname = ref('')
    const email = ref('')

    const handleSubmit = async () => {
      const colRef = collection(db, 'user')

      await addDoc(colRef, {
        fullname: fullname.value,
        email: email.value,
        isadmin: false
      })

      fullname.value = ''
      email.value = ''
    }

    return {handleSubmit, fullname, email}
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