<template>
  <van-tabbar
    v-model="value"
    active-color="#F39424"
    inactive-color="#333"
    placeholder
    fixed
    safe-area-inset-bottom
    @change="tabChange"
  >
    <van-tabbar-item
      :icon="item.icon"
      v-for="item in props.tabBarList"
      :key="item.icon"
      >{{ item.name }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { computed } from 'vue'
const emit = defineEmits([`tabChange`, `update:active`])
const props = defineProps({
  active: {
    type: Number,
    default: 0
  },
  tabBarList: {
    type: Array,
    default: () => [
      { icon: `friends-o`, name: `用户` },
      { icon: `point-gift-o`, name: `经营` },
      { icon: `apps-o`, name: `活动` }
    ]
  }
})
const value = computed({
  get() {
    return props.active
  },
  set(value) {
    emit(`update:active`, value)
  }
})
function tabChange(val) {
  emit(`tabChange`, val)
}
</script>

<style lang="scss">
.van-tabbar {
  height: 108px;
}
</style>
