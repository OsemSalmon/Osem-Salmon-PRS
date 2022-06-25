import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//firebase import
import { auth } from './firebase/config'
import { onAuthStateChanged } from 'firebase/auth'

//bootstrap import
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

let app

onAuthStateChanged(auth, () => {
    if (!app) {
        app = createApp(App).use(router).mount('#app')
    }
})