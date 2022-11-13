<template>
  <van-popup v-model:show="value" round position="bottom">
    <van-picker
      :columns="props.columns"
      @cancel="value = false"
      @confirm="onConfirm"
    />
  </van-popup>
</template>

<script setup>
import { computed } from 'vue'

const emit = defineEmits([`update:showPicker`, `onConfirm`])
const props = defineProps({
  showPicker: {
    type: Boolean,
    default: false
  },
  columns: {
    type: Array,
    default: () => []
  }
})
const value = computed({
  get() {
    return props.showPicker
  },
  set(value) {
    emit(`update:showPicker`, value)
  }
})
function onConfirm(value) {
  emit(`onConfirm`, value)
}
</script>

<style lang="scss">
.van-popup--bottom.van-popup--round {
  border-radius: 16px 16px 0 0;
}
.van-picker__toolbar {
  height: 90px;
  border-bottom: 1px solid #e5e5e5;
}
.van-picker__cancel,
.van-picker__confirm {
  font-family: PingFangSC-Regular;
  font-size: 30px;
  color: #f39424;
  font-weight: 400;
}
.van-picker-column__item {
  .van-ellipsis {
    font-family: PingFangSC-Regular;
    font-size: 34px;
    color: #303133;
    text-align: center;
    font-weight: 400;
  }
}
.van-picker__frame {
  left: 0;
  right: 0;
}
.van-picker__mask {
  background-image: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.4)
    ),
    linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6));
}
</style>
