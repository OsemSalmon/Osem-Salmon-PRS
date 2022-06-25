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
            <a class="nav-link btn btn-outline-light" @click="handleClick"><span class="material-icons">logout</span></a>
          </li>
          <li class="nav-item" v-if="!userAuth">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
        </ul>
        <!-- <ul class="nav">        
          <div v-if="userAuth">
          <li class="nav-item"><router-link to="/" class="nav-link">Home</router-link></li>
          <li class="nav-item"><a @click="handleClick" class="nav-link"><span class="material-icons">logout</span></a></li>
            
          </div>
          
          <div v-if="!userAuth">
            <router-link to="/login" class="nav-link">Login</router-link>
          </div>
        </ul> -->
      </div>
    </nav>
    
</template>

<script>
import { auth } from '../firebase/config'
import { signOut } from '@firebase/auth'
import { useRouter } from 'vue-router'
import { watchEffect } from 'vue'

import getUserAuth from '../composables/getUserAuth'

export default {
  setup() {
    const { userAuth } = getUserAuth()
    const router = useRouter()

    const handleClick = () => {
      signOut(auth)
    }

    watchEffect(() => {
      if(!userAuth.value) {
        router.push('/login')
      }
    })

    return { handleClick, userAuth }
  }

}
</script>

<style>
/* nav {
  display: flex;
  align-items: center;
}
nav h1 {
  margin-right: auto;
  margin-bottom: 0;
}
nav a {
  margin-left: 16px;
  color: #2c3e50;
}
nav button {
  margin-left: 16px;
}
nav a.router-link-exact-active {
  color: #0ec58e;
}
nav + p {
  margin-top: 0;
  margin-bottom: 30px;
} */
</style>