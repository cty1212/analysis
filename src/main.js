import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import 'normalize.css'
import '@/assets/common.scss'
import 'virtual:svg-icons-register'
import 'vant/es/toast/style'
// import 'vant/es/dialog/style'

import App from './App.vue'
import router from './router'

const app = createApp(App)
// app.use(createPinia())
app.use(router)
router
  .isReady()
  .then(() => {
    app.mount(`#app`)
  })
  .catch((err) => {
    console.log(`err`, err)
    app.mount(`#app`)
  })
