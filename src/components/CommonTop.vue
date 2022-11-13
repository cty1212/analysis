<template>
  <div class="top">
    <common-top-item
      :item="item"
      v-for="item in props.topList"
      :key="item.id"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  topList: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  background: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(218, 222, 229, 0.5);
  margin-bottom: 24px;
  overflow-x: auto;
}
</style>
