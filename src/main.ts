import 'primevue/resources/themes/lara-light-green/theme.css';
import 'vue3-toastify/dist/index.css';
import './assets/css/main.css';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import { createApp } from 'vue';
import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify';
import App from './App.vue';
import router from './router';

const app = createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(
    Vue3Toasity,
    {
        autoClose: 3000,
        position: 'top-right',
    } as ToastContainerOptions
)
app.use(PrimeVue,
);


app.use(ConfirmationService);

app.use(router)

app.mount('#app')
