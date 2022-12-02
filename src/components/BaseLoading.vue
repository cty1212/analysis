<template>
  <div class="loading">
    <van-loading type="spinner" color="#f08700">
      {{ props.text }}
    </van-loading>
    <!-- <base-svg name="loading" class="loadingSvg" />
    <span class="txt">{{ props.text }}</span> -->
  </div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: `加载中...`
  }
})
</script>

<style lang="scss" scoped>
.loadingSvg {
  width: 100px;
  height: 100px;
  color: #f08700;
}
.txt {
  color: #f08700;
  font-size: 15px;
  margin-left: 16px;
}
.loading {
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
}
</style>
