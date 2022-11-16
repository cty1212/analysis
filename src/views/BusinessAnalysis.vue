<template>
  <base-card
    title="风行乳业-线上"
    class="mb24"
    name="周期订奶"
    @showPopup="showPopup"
  >
    <div class="content">
      <cell-list :list="list1" />
    </div>
  </base-card>
  <base-card title="风行乳业-线下-2020" class="mb24" @showPopup="showPopup">
    <div class="content">
      <cell-list :list="list2" />
    </div>
  </base-card>
  <base-card
    title="皇上皇-线上"
    name="天猫期舰店"
    class="mb24"
    @showPopup="showPopup"
  >
    <div class="content">
      <cell-list :list="list3" />
    </div>
  </base-card>
  <base-card
    title="皇上皇-线下"
    class="mb24"
    name="广州-直营门店"
    @showPopup="showPopup"
  >
    <div class="content">
      <cell-list :list="list4" />
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
    name: `用户总数（万）`,
    value: `111`
  },
  {
    name: `购买总人数（万）`,
    value: `0.86`
  },
  {
    name: `购买转化率`,
    value: `0.76%`
  },
  {
    name: `订单数`,
    value: `1.6`
  },
  {
    name: `客单价（元）`,
    value: `476`
  },
  {
    name: `金额（万）`,
    value: `789`
  },
  {
    name: `复购人数（万）`,
    value: `0.31`
  },
  {
    name: `复购率`,
    value: `36.4%`
  }
])
const list2 = reactive([
  {
    name: `门店总数（个）`,
    value: `111`
  },
  {
    name: `订单量（万）`,
    value: `0.86`
  },
  {
    name: `客单价（万）`,
    value: `0.76%`
  }
])
const list3 = reactive([
  {
    name: `用户总数（万）`,
    value: `111`
  },
  {
    name: `活跃度`,
    value: `0.86`
  },
  {
    name: `交易量（万元）`,
    value: `0.76%`
  },
  {
    name: `客单价（元）`,
    value: `1.6`
  },
  {
    name: `复购率`,
    value: `476`
  }
])
const list4 = reactive([
  {
    name: `门店总数（个）`,
    value: `111`
  },
  {
    name: `订单量（万）`,
    value: `0.86`
  },
  {
    name: `客单价（万）`,
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
