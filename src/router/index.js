import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/firebase'
import HomeView from '@/views/Home.vue'
import Edit from '@/views/EditView.vue'
import Login from '@/views/Login-page.vue'

const routes = [
  {
    path: '/',
    name: 'default',
    component: Login,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: {
      requiresAuth:true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login-page.vue')
  },
  {
    path: '/main',
    name: 'HomeView',
    component: HomeView,
    meta: {
      requiresAuth:true
    }
  },
  {
    path: '/edit/:id',
    name: 'EditView',
    component: Edit
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (auth.currentUser) {
      next();
    }
    else{
      next({
        path: '/',
      })
    }
  }
  else{
    next();
  }
})

export default router
