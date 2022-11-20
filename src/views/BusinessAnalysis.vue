<template>
  <base-loading v-if="loading" />
  <template v-else>
    <base-card
      title="风行乳业-线上"
      class="mb24"
      :name="fxName"
      @showPopup="showPicker = true"
    >
      <div class="content">
        <cell-list :list="fxListOnline" />
      </div>
    </base-card>
    <base-card title="风行乳业-线下" class="mb24">
      <div class="content">
        <cell-list :list="fxListOffline" />
      </div>
    </base-card>
    <base-card
      title="皇上皇-线上"
      :name="hshName"
      class="mb24"
      @showPopup="showHshPicker = true"
    >
      <div class="content">
        <cell-list :list="hshListOnline" />
      </div>
    </base-card>
    <base-card title="皇上皇-线下" class="mb24">
      <div class="content">
        <cell-list :list="hshListOffline" />
      </div>
    </base-card>
  </template>
  <base-popup-picker
    :columns="columnsFx"
    v-model:showPicker="showPicker"
    @onConfirm="onConfirm"
  />
  <base-popup-picker
    :columns="columnsHsh"
    v-model:showPicker="showHshPicker"
    @onConfirm="onHshConfirm"
  />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import {
  getFxOnline,
  getFxOffline,
  getHshOnline,
  getHshOffline
} from '../api/businessAnalysis'
const loading = ref(true)
const fxName = ref(``)
const columnsFx = ref([])
const fxListOnline = ref([])
let fxData = {}
const fxListOffline = ref([])
let timer = null
onUnmounted(() => {
  clearTimeout(timer)
  timer = null
})
onMounted(async () => {
  await getFxOnlineList()
  await getFxOfflineList()
  await getHshOnlineList()
  await getHshOfflineList()
})
async function getFxOnlineList() {
  try {
    const data = await getFxOnline()
    fxData = data
    const keyList = Object.keys(data)
    columnsFx.value = keyList
    fxName.value = keyList[0]
    fxListOnline.value = fxData[fxName.value]
  } catch (error) {
    console.log(error)
  }
}
async function getFxOfflineList() {
  try {
    const data = await getFxOffline()
    fxListOffline.value = data
  } catch (error) {
    console.log(error)
  }
}
let hshData = {}
const hshName = ref(``)
const hshListOnline = ref([])
const columnsHsh = ref([])
const hshListOffline = ref([])
async function getHshOnlineList() {
  try {
    const data = await getHshOnline()
    hshData = data
    const keyList = Object.keys(data)
    columnsHsh.value = keyList
    hshName.value = keyList[0]
    hshListOnline.value = hshData[hshName.value]
  } catch (error) {
    console.log(error)
  }
}
async function getHshOfflineList() {
  try {
    const data = await getHshOffline()
    hshListOffline.value = data
  } catch (error) {
    console.log(error)
  }
  timer = setTimeout(() => {
    loading.value = false
  }, 500)
}
const showPicker = ref(false)
const showHshPicker = ref(false)
function onConfirm(val) {
  fxListOnline.value = fxData[val]
  fxName.value = val
  showPicker.value = false
}
function onHshConfirm(val) {
  hshListOnline.value = hshData[val]
  hshName.value = val
  showHshPicker.value = false
}
</script>

<style scoped lang="scss">
.content {
  padding: 50px 48px 0;
}
</style>
