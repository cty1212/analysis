import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'normalize.css'
import '@/assets/common.scss'
import 'virtual:svg-icons-register'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
await router.isReady()
app.mount(`#app`)
