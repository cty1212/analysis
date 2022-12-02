import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import storage from '@/utils/storage'
import { getUserInfo } from '@/api/oAuth'
// import UserAnalysis from '../views/UserAnalysis.vue'
// import BusinessAnalysis from '../views/BusinessAnalysis.vue'
// import ActivityAnalysis from '../views/ActivityAnalysis.vue'
// import { Dialog } from 'vant'

// import { oAuthConfig } from '@/utils/oAuth'

NProgress.configure({ showSpinner: true })

const modules = import.meta.glob(`@/views/*.vue`)

const routes = [
  {
    path: `/`,
    redirect: `/userAnalysis`
  },
  {
    path: `/userAnalysis`,
    name: `UserAnalysis`,
    component: modules[`/src/views/UserAnalysis.vue`]
    // component: UserAnalysis
  },
  {
    path: `/businessAnalysis`,
    name: `businessAnalysis`,
    component: modules[`/src/views/BusinessAnalysis.vue`]
    // component: BusinessAnalysis
  },
  {
    path: `/activityAnalysis`,
    name: `activityAnalysis`,
    component: modules[`/src/views/ActivityAnalysis.vue`]
    // component: ActivityAnalysis
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_ROUTER_PATH),
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
  } catch (error) {
    console.log(error)
  }
}

router.beforeEach(async (_to, _from, next) => {
  console.log(_to)
  NProgress.start()
  if (!storage.getItem(`token`) && _to.query.code && _to.query.state) {
    await getUserToken(_to.query.code)
    next()
  } else {
    next()
  }
  // start progress bar
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
router.onError((error, to, from) => {
  console.log(error)
  console.log(to)
  console.log(from)
})
export default router
