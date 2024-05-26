import './assets/styles.scss'
import * as bootstrap from 'bootstrap'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import store from "@/store.js";


axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.headers.common['Authorization'] = `bearer ${store.token}`
axios.defaults.headers.common['Accept'] = 'application/json'
axios.get('http://api.tastly.com/sanctum/csrf-cookie').then((response)=>console.log(response))
const app = createApp(App)

app.use(router)

app.mount('#app')
