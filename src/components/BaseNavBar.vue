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
.van-safe-area-top {
  background: orange;
  background-image: url('@/assets/imgs/header-bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.van-nav-bar__content {
  height: 88px;
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
