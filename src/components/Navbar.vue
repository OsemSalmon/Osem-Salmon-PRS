<template>
    <nav class="navbar bg-light sticky-top">
      <div class="container-fluid">
        
        <a class="navbar-brand material-icons" href="#">vaccines</a>
        <span v-if="userAuth">{{ userAuth.email }}</span>

        <ul class="nav">
          <li class="nav-item" v-if="userAuth">
            <router-link to="/" class="nav-link active" aria-current="page"><span class="material-icons">home</span></router-link>
          </li>

          <li class="nav-item" v-if="userAuth">
            <router-link :to="`/userProfile/${userAuth.uid}`" class="nav-link active" aria-current="page"><span class="material-icons">account_circle</span></router-link>
          </li>
          <form v-for="staff in staff" :key="staff.id" @submit.prevent="handleUpdate(staff)">
          <button></button>
          </form>
          <li class="nav-item" v-if="userAuth">
            <router-link to="/staffRecord" class="nav-link active" aria-current="page"><span class="material-icons">group</span></router-link>
          </li>

          <li class="nav-item" v-if="userAuth">
            <a class="nav-link btn btn-outline-light" @click="handleClick"><span class="material-icons">logout</span></a>
          </li>
          
          <li class="nav-item" v-if="!userAuth">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item" v-if="!userAuth">
            <router-link to="/signup" class="nav-link">Sign Up</router-link>
          </li>
        </ul>  
      </div>
    </nav>

</template>

<script>
import { auth } from '../firebase/config'
import { signOut } from '@firebase/auth'
import { useRouter, useRoute } from 'vue-router'
import { watchEffect } from 'vue'
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/config"

import getUserAuth from '../composables/getUserAuth'
import getCollection from '../composables/getCollection'

export default {
  setup() {
    const { userAuth } = getUserAuth()
    const router = useRouter()
    const route = useRoute()

    const { documents: staff } = getCollection("staff",
    ['email', '==', userAuth.value.email])

    const handleUpdate = (staff) => {
      const docRef = doc(db, "staff", staff.id)
      updateDoc(docRef, {
        uid: userAuth.value.uid
      })
    }

    const handleClick = () => {
      signOut(auth)
      router.push('/login')
    }

    watchEffect(() => {
      if(!userAuth.value) {
        if(route.name !== 'Login' && route.name !== 'Signup') {
          router.push('/login')
        }
      }
    })

    return { handleClick, userAuth, staff, handleUpdate }
  }
}
</script>

<style>
</style>