<template>
  <form @submit.prevent="handleSubmit">
    <h2>Sign up</h2>

    <label for="email">Email:</label>
    <input type="email" name="email" v-model="email" required>

    <label for="password">Password:</label>
    <input type="password" name="password" v-model="password" required>

    <button>Sign up</button> 
    <div v-if="error">{{ error }}</div>
  </form>

  <div class="container">
    <div class="row">
      <div class="col-3">col1</div>
      <div class="col">
        <form @submit.prevent="handleSubmit">
        <div class="form-floating mb-3">
          <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="email">
          <label for="floatingInput">Email Address</label>
        </div>

        <div class="form-floating mb-3">
          <input type="password" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="password">
          <label for="floatingInput">Password</label>
        </div>
        
        <div class="form-floating mb-3">
          <input type="password" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="passwordRepeat">
          <label for="floatingInput">Password</label>
        </div>
        
        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="fullname">
          <label for="floatingInput">Full Name</label>
        </div>

        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="pNumber">
          <label for="floatingInput">Phone Number</label>
        </div>

        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="address">
          <label for="floatingInput">Address</label>
        </div>

        <div class="form-floating mb-3">
          <button class="btn btn-primary">Sign Up</button>
        </div>

        </form>
      </div>
      <div class="col-3">col3</div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { db } from '../firebase/config'
import { addDoc, collection } from 'firebase/firestore'

import useSignup from '../composables/useSignup'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const fullname = ref('')
    const isAdmin = ref(false)
    const isApproved = ref(false)
    const pNumber = ref('')
    const address = ref('')
    const uid = ref('')

    const router = useRouter()

    const { signup, error } = useSignup()

    const handleSubmit = async () => {
      await signup(email.value, password.value)
      
      if(!error.value) {
        const colRef = collection(db, 'staff')
        await addDoc(colRef, {
          email: email.value,
          fullname: fullname.value,
          isAdmin: isAdmin.value,
          isApproved: isApproved.value,
          pNumber: pNumber.value,
          address: address.value,
          uid: uid.value

        })
        router.push('/')
      }
    }

    return { 
    email,
    password, 
    handleSubmit, 
    error,
    fullname,
    isAdmin,
    isApproved,
    pNumber,
    address
    }
  }
}
</script>