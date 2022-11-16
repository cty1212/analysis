<template>
  <base-card
    title="私域-2020-06"
    class="mb24"
    name="总计"
    @showPopup="showPopup"
  >
    <div class="content">
      <cell-list-second :list="list1" />
    </div>
  </base-card>
  <base-card
    title="企微-2020-06-总计"
    class="mb24"
    name="总计"
    @showPopup="showPopup"
  >
    <div class="content">
      <cell-list-second :list="list2" />
    </div>
  </base-card>
  <base-popup-picker
    :columns="columns"
    v-model:showPicker="showPicker"
    @onConfirm="onConfirm"
  />
</template>

<script setup>
import { reactive, ref } from 'vue'

const list1 = reactive([
  {
    name: `人群触达人数（万）`,
    value: `111`
  },
  {
    name: `参与活动人数（万）`,
    value: `0.86`
  },
  {
    name: `用户转化（%）`,
    value: `0.76%`
  },
  {
    name: `销售额（万元）`,
    value: `1.6`
  }
])
const list2 = reactive([
  {
    name: `人数增长`,
    value: `111`
  },
  {
    name: `企微群增长`,
    value: `0.86`
  },
  {
    name: `群活跃度（%）`,
    value: `0.76%`
  },
  {
    name: `群转化（%）`,
    value: `0.76%`
  }
])

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

<style scoped lang="scss">
.content {
  padding: 50px 48px 0;
}
</style>
