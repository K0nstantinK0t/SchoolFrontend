import './assets/styles.scss'
import * as bootstrap from 'bootstrap'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import store from "@/store.js";
import config from "@/config.js";


axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.headers.common['Authorization'] = `bearer ${store.token}`
axios.defaults.headers.common['Accept'] = 'application/json'
axios.get('http://api.school.local/sanctum/csrf-cookie')
const app = createApp(App)

app.use(router)

app.mount('#app')
