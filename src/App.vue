<template>
  <base-nav-bar :title="title" @click-left="onClickLeft" />
  <common-top :topList="topList" />
  <div class="container">
    <router-view />
  </div>
  <base-tab-bar v-model:active="active" @tab-change="tabChange" />
</template>

<script setup>
import { ref, watch } from 'vue'
import { RouterView, useRouter, useRoute } from 'vue-router'
import CommonTop from './components/CommonTop.vue'
const router = useRouter()
const nameList = [`用户概览与特征`, `经营分析`, `活动分析`]
const routerList = [`/`, `/businessAnalysis`, `/activityAnalysis`]
const active = ref(0)
const title = ref(`用户概览与特征`)
const route = useRoute()
const topList = ref(
  new Array(5).fill({
    title: `会员人数`,
    num: `13,000`,
    hb: `112.61%`,
    tb: `112.61%`
  })
)
console.log(topList)
function tabChange(index) {
  router.push(routerList[index])
  title.value = nameList[index]
}
function onClickLeft() {
  router.go(-1)
}
watch(
  () => route.path,
  (val) => {
    const index = routerList.findIndex((item) => item.includes(val))
    active.value = index
    title.value = nameList[index]
  }
)
</script>

<style lang="scss">
.container {
  padding: 0 24px 90px;
}
</style>
