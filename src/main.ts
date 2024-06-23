import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/css/styles.css'
import 'bootstrap/dist/js/bootstrap.js';

createApp(App).use(store).use(router).mount('#app')
