import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/all.scss'
import Swal from 'sweetalert2'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Swal)
app.mount('#app')
