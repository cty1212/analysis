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
    >
      <template #icon="props" v-if="item.slotIcon">
        <base-svg
          class="barIcon"
          :name="props.active ? item.icon + '-active' : item.icon"
        />
      </template>
      {{ item.name }}
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
      { icon: `user`, name: `用户`, slotIcon: true },
      { icon: `business`, name: `经营`, slotIcon: true },
      { icon: `activity`, name: `活动`, slotIcon: true }
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
.barIcon {
  width: 40px;
  height: 40px;
}
</style>
