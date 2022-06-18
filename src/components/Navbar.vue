<template>
  <div>
    <nav>
      <h1>OsemSalmonV3</h1>
      <!-- <h4>{{ user.fullname }}</h4> -->

      <!-- for logged in users -->
      <div>
        <router-link to="/">Home</router-link>
        <button @click="handleClick">Logout</button>
      </div>
      
      <!-- for logged out users -->
      <div>
        <router-link to="/login">Login</router-link>
      </div>

      
    </nav>
  </div>
</template>

<script>
import { auth } from '../firebase/config'
import { signOut } from '@firebase/auth'

import getUserAuth from '../composables/getUserAuth'
import getCollection from '../composables/getCollection'

export default {
  setup() {
    const { userAuth } = getUserAuth()
    
    const { documents: user } = getCollection('user')

    const handleClick = () => {
      signOut(auth)
    }

    return { handleClick, userAuth, user }
  }

}
</script>

<style>
nav {
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
}
</style>