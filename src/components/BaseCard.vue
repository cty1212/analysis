<template>
  <div class="card">
    <div class="header" v-if="title">
      <div class="line" />
      <div class="title">{{ props.title }}</div>
      <div class="select" @click="showPopup" v-if="name">
        <span class="name">{{ props.name }}</span>
        <van-icon name="arrow-down" />
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup>
const emit = defineEmits([`showPopup`])
const props = defineProps({
  title: {
    type: String,
    default: ``
  },
  columns: {
    type: Array,
    default: () => []
  },
  name: {
    type: String,
    default: ``
  }
})
function showPopup() {
  emit(`showPopup`)
}
</script>

<style lang="scss" scoped>
.card {
  background: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(218, 222, 229, 0.5);
  border-radius: 16px;
  /* box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px; */
  .header {
    display: flex;
    padding: 30px 48px 0;
    align-items: center;
    .line {
      background: #f39600;
      border-radius: 4px;
      width: 8px;
      height: 24px;
      margin-right: 16px;
    }
    .title {
      font-family: PingFangSC-Medium;
      font-size: 30px;
      color: #303133;
      line-height: 38px;
      font-weight: 500;
    }
  }
  .select {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    .name {
      font-size: 28px;
      color: #8f939a;
      text-align: center;
      line-height: 32px;
      font-weight: 400;
      margin-right: 25px;
    }
    :deep().van-icon-arrow-down {
      font-size: 13.95px;
    }
  }
}
</style>
