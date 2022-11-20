<template>
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
import { ref, onMounted } from 'vue'
import {
  getFxOnline,
  getFxOffline,
  getHshOnline,
  getHshOffline
} from '../api/businessAnalysis'
const fxName = ref(``)
const columnsFx = ref([])
const fxListOnline = ref([])
let fxData = {}
const fxListOffline = ref([])
onMounted(async () => {
  getFxOnlineList()
  getFxOfflineList()
  getHshOnlineList()
  getHshOfflineList()
})
async function getFxOnlineList() {
  const data = await getFxOnline()
  fxData = data
  const keyList = Object.keys(data)
  columnsFx.value = keyList
  fxName.value = keyList[0]
  fxListOnline.value = fxData[fxName.value]
}
async function getFxOfflineList() {
  const data = await getFxOffline()
  fxListOffline.value = data
}
let hshData = {}
const hshName = ref(``)
const hshListOnline = ref([])
const columnsHsh = ref([])
const hshListOffline = ref([])
async function getHshOnlineList() {
  const data = await getHshOnline()
  hshData = data
  const keyList = Object.keys(data)
  columnsHsh.value = keyList
  hshName.value = keyList[0]
  hshListOnline.value = hshData[hshName.value]
}
async function getHshOfflineList() {
  const data = await getHshOffline()
  hshListOffline.value = data
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
