import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@fortawesome/fontawesome-free/css/all.css'
import App from './App.vue'
import router from './router'
import store from './stores'
// Firebase imports


// ✅ Initialize Firebase without name conflict


// ✅ Create Vue app
const app = createApp(App)
app.use(createPinia())
app.use(store) // use the store
app.use(router)
app.mount('#app')
