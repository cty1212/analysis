<template>
  <base-card title="风行乳业-线上" name="周期订奶" @showPopup="showPopup">
    <div style="margin-top: 30px">1111</div>
  </base-card>
  <base-popup-picker
    :columns="columns"
    v-model:showPicker="showPicker"
    @onConfirm="onConfirm"
  />
</template>

<script setup>
import { ref } from 'vue'

const showPicker = ref(false)
function showPopup() {
  showPicker.value = true
}
const columns = [
  {
    text: `浙江`,
    children: [
      {
        text: `杭州`
      },
      {
        text: `温州`
      }
    ]
  },
  {
    text: `福建`,
    children: [
      {
        text: `福州`
      },
      {
        text: `厦门`
      }
    ]
  }
]
function onConfirm(val) {
  console.log(val)
  showPicker.value = false
}
</script>

<style scoped></style>
