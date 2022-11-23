<template>
  <base-nav-bar :title="title" @click-left="onClickLeft" />
  <common-top :topList="topList" />
  <div class="container">
    <!-- <suspense> -->
    <router-view />
    <!-- <template #fallback> Loading... </template>
    </suspense> -->
    <!-- <router-view /> -->
  </div>
  <base-tab-bar v-model:active="active" @tab-change="tabChange" />
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { RouterView, useRouter, useRoute } from 'vue-router'
import CommonTop from './components/CommonTop.vue'
import { getTopList } from './api/userAnalysis'
const router = useRouter()
const nameList = [`用户概览与特征`, `经营分析`, `活动分析`]
const routerList = [`/`, `/businessAnalysis`, `/activityAnalysis`]
const active = ref(0)
const title = ref(`用户概览与特征`)
const route = useRoute()
const topList = ref([])
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

onMounted(async () => {
  try {
    const data = await getTopList()
    topList.value = data
  } catch (error) {
    console.log(error)
  }
})
</script>

<style lang="scss">
.container {
  position: relative;
  padding: 0 24px 90px;
}
</style>
