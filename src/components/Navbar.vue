<template>
    <nav class="navbar bg-light sticky-top">
      <div class="container-fluid">
        
        <a class="navbar-brand" href="#">
          <img src="../../logo.png" alt="" width="160" height="60">
        </a>

        <span v-if="userAuth">{{ userAuth.email }}</span>

        <ul class="nav">

          <li class="nav-item ms-1 me-1" v-if="userAuth">
            <router-link to="/" class="btn btn-outline-dark" aria-current="page"><i class="bi bi-house-door"></i> Homey</router-link>
          </li>

          <li class="nav-item ms-1 me-1" v-if="userAuth">
            <router-link to="/staffRecord" class="btn btn-outline-dark" aria-current="page"><i class="bi bi-table"></i> Staff</router-link>
          </li>

          <li class="nav-item ms-1 me-1" v-if="userAuth">
            <router-link :to="`/userProfile/${userAuth.uid}`" class="btn btn-outline-dark" aria-current="page"><i class="bi bi-person-lines-fill"></i> Profile</router-link>
          </li>

          <li class="nav-item ms-1 me-1" v-if="userAuth">
            <a class="btn btn-outline-danger" @click="handleClick"><i class="bi bi-box-arrow-in-right"></i></a>
          </li>
          
          <li class="nav-item ms-1 me-1" v-if="!userAuth">
            <router-link to="/login" class="btn btn-outline-dark"><i class="bi bi-box-arrow-in-right"></i> Login</router-link>
          </li>
          <li class="nav-item ms-1 me-1" v-if="!userAuth">
            <router-link to="/signup" class="btn btn-outline-dark"><i class="bi bi-box-arrow-in-down"></i> Sign Uppy</router-link>
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

    return { handleClick, userAuth, }
  }
}
</script>

<style>
</style>