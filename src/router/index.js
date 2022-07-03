import { createRouter, createWebHistory } from 'vue-router'

// view components
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import patientRecord from '../views/patientRecord.vue'
import getUserAuth from '../composables/getUserAuth'

import { auth } from '../firebase/config'

const requireAuth = (to, from, next) => {
  let user = auth.currentUser
  if (!user) {
    next({name: 'Login'})
  }

  else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/patientRecord/:nric',
    name: 'Patient Record',
    component: patientRecord
  },
  {
    path: '/userProfile/:useruid',
    name: 'Profile',
    component: () => import('../views/userProfile.vue'),
  },
  {
    path: '/staffRecord',
    name: 'Staff Record',
    component: () => import('../views/staffRecord.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
