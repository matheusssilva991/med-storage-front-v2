import './assets/css/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const app = createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(
    Vue3Toasity,
    {
        autoClose: 2000,
        position: 'top-right',
    } as ToastContainerOptions
)

app.use(router)

app.mount('#app')
