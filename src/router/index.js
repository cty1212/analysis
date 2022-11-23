import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import storage from '@/utils/storage'
import { getUserInfo } from '@/api/oAuth'
// import { Dialog } from 'vant'

// import { oAuthConfig } from '@/utils/oAuth'

NProgress.configure({ showSpinner: true })

const modules = import.meta.glob(`@/views/*.vue`)

const routes = [
  {
    path: `/`,
    name: `UserAnalysis`,
    component: modules[`/src/views/UserAnalysis.vue`]
  },
  {
    path: `/businessAnalysis`,
    name: `businessAnalysis`,
    component: modules[`/src/views/BusinessAnalysis.vue`]
  },
  {
    path: `/activityAnalysis`,
    name: `activityAnalysis`,
    component: modules[`/src/views/ActivityAnalysis.vue`]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes,
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 }
  }
})

async function getUserToken(code) {
  try {
    const user = await getUserInfo({
      code
    })
    console.log(user)
    if (user.token) {
      console.log(222)
      storage.setItem(`token`, user.token)
    }
    return true
  } catch (error) {
    console.log(error)
    return true
  }
}

router.beforeEach(async (_to) => {
  console.log(_to)
  NProgress.start()
  if (!storage.getItem(`token`) && _to.query.code && _to.query.state) {
    return getUserToken(_to.query.code)
  } else {
    return true
  }
  // start progress bar
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
// router.onError((error) => {
//   console.log(error)
// })
export default router
