import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { Toast, options } from '@/plugins/toast'
import {setFallbackApiManager } from '@/composables/useApi'
import ApiManager from '@/utils/ApiManager'

const app = createApp(App)
    
app.use(router)
app.use(Toast, options)

const apiManager = new ApiManager();
setFallbackApiManager(apiManager);
app.provide('$apiManager', apiManager);

app.mount('#app')