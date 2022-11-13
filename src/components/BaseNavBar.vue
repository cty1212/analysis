<template>
  <van-nav-bar
    left-arrow
    :title="props.title"
    fixed
    safe-area-inset-top
    placeholder
    @click-left="onClickLeft"
  />
</template>

<script setup>
const emit = defineEmits([`clickLeft`])
const props = defineProps({
  title: {
    type: String,
    default: ``
  }
})
function onClickLeft(val) {
  emit(`clickLeft`, val)
}
</script>

<style lang="scss">
.van-nav-bar__content {
  height: 88px;
  background: orange;
}
.van-nav-bar__title {
  font-size: 36px;
  color: #ffffff;
  font-weight: 500;
}
.van-nav-bar .van-icon {
  color: #fff;
  font-size: 36.7px;
}
</style>
