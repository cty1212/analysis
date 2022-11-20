<template>
  <base-loading v-if="loading" />
  <template v-else>
    <base-card
      title="私域"
      class="mb24"
      :name="syName"
      @showPopup="showPicker = true"
    >
      <div class="content">
        <cell-list-second :list="syList" />
      </div>
    </base-card>
    <base-card
      title="企微"
      class="mb24"
      :name="qwName"
      @showPopup="showPickerQw = true"
    >
      <div class="content">
        <cell-list-second :list="qwList" />
      </div>
    </base-card>
  </template>
  <base-popup-picker
    :columns="columnsSy"
    v-model:showPicker="showPicker"
    @onConfirm="onConfirm"
  />
  <base-popup-picker
    :columns="columnsQw"
    v-model:showPicker="showPickerQw"
    @onConfirm="onConfirmQw"
  />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getQiWei, getSiYu } from '../api/activityAnalysis'
const loading = ref(true)
let timer = null
onMounted(async () => {
  await getSiYuList()
  await getQiWeiList()
})
onUnmounted(() => {
  clearTimeout(timer)
  timer = null
})
let siYuData = {}
const syName = ref(``)
const syList = ref([])
const columnsSy = ref([])
async function getSiYuList() {
  try {
    const data = await getSiYu()
    siYuData = data
    const keyList = Object.keys(data)
    columnsSy.value = keyList
    syName.value = keyList[0]
    syList.value = siYuData[syName.value]
  } catch (error) {
    console.log(error)
  }
}

let qwData = {}
const qwName = ref(``)
const qwList = ref([])
const columnsQw = ref([])
async function getQiWeiList() {
  try {
    const data = await getQiWei()
    qwData = data
    const keyList = Object.keys(data)
    columnsQw.value = keyList
    qwName.value = keyList[0]
    qwList.value = qwData[qwName.value]
  } catch (error) {
    console.log(error)
  }
  timer = setTimeout(() => {
    loading.value = false
  }, 500)
}
const showPicker = ref(false)
const showPickerQw = ref(false)
function onConfirm(val) {
  console.log(val)
  syList.value = siYuData[val]
  syName.value = val
  showPicker.value = false
}
function onConfirmQw(val) {
  console.log(val)
  qwList.value = qwData[val]
  qwName.value = val
  showPickerQw.value = false
}
</script>

<style scoped lang="scss">
.content {
  padding: 50px 48px 0;
}
</style>
