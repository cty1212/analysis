import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
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
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 }
  }
})

router.beforeEach((_to, _from, next) => {
  NProgress.start() // start progress bar
  next()
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
export default router
