<template>
  <van-button type="primary" @click="push">用户</van-button>
  <van-button type="primary" @click="push1">经营</van-button>
  <van-button type="primary" @click="push2">活动</van-button>
  <div class="test">1111</div>
  <div class="test1">1111</div>
  <RouterView />
</template>

<script setup>
import { RouterView, useRouter } from 'vue-router'
const router = useRouter()
function push() {
  router.push(`/`)
}
function push1() {
  router.push(`/businessAnalysis`)
}
function push2() {
  router.push(`/activityAnalysis`)
}
</script>

<style scoped lang="scss">
.test {
  width: 200px;
  height: 50px;
}
.test1 {
  width: fit-content;
  display: flex;
  transform: translate(-50%);
}
</style>
