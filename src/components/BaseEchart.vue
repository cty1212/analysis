<script setup>
import echarts from '@/plugins/echarts'
import { debounce, isString } from 'lodash-es'
import {
  computed,
  ref,
  unref,
  watch,
  onMounted,
  onBeforeUnmount,
  onActivated,
  nextTick
} from 'vue'

const props = defineProps({
  options: {
    type: Object,
    required: true
  },
  width: {
    type: [String, Number],
    default: ``
  },
  height: {
    type: [String, Number],
    default: ``
  },
  landscape: {
    type: Boolean,
    default: false
  }
})

const options = computed(() => {
  return props.options
})

const elRef = ref(null)

let echartRef = null

const contentEl = ref(null)

const styles = computed(() => {
  const width = isString(props.width) ? props.width : `${props.width}px`
  const height = isString(props.height) ? props.height : `${props.height}px`

  return {
    width,
    height
  }
})

const landscapeStyles = computed(() => {
  let width, height
  if (props.landscape) {
    width = document.documentElement.clientHeight + `px`
    height = document.documentElement.clientWidth + `px`
    return {
      width,
      height
    }
  }
  return styles
})

const initChart = () => {
  if (unref(elRef) && props.options) {
    echartRef = echarts.init(unref(elRef))
    echartRef?.setOption(unref(options))
  }
}

watch(
  () => options.value,
  (options) => {
    if (echartRef) {
      echartRef?.setOption(options)
    }
  },
  {
    deep: true
  }
)

const resizeHandler = debounce(() => {
  console.log(1111111)
  if (echartRef) {
    echartRef.resize()
  }
}, 100)

const contentResizeHandler = async (e) => {
  if (e.propertyName === `width`) {
    resizeHandler()
  }
}

let classLandscape = ref(``)

onMounted(() => {
  initChart()
  nextTick(() => {
    if (props.landscape) {
      classLandscape.value = `classLandscape`
      console.log(elRef.value.style)
      resizeHandler()
      // elRef.value.style.width = document.documentElement.clientHeight
    }
  })
  window.addEventListener(`resize`, resizeHandler)

  contentEl.value = document.getElementsByClassName(`layout-content`)[0]
  unref(contentEl) &&
    unref(contentEl).addEventListener(`transitionend`, contentResizeHandler)
})

onBeforeUnmount(() => {
  window.removeEventListener(`resize`, resizeHandler)
  unref(contentEl) &&
    unref(contentEl).removeEventListener(`transitionend`, contentResizeHandler)
})

onActivated(() => {
  if (echartRef) {
    echartRef.resize()
  }
})
defineExpose({
  resizeHandler
})
</script>

<template>
  <div
    ref="elRef"
    :class="[$attrs.class, classLandscape]"
    :style="landscapeStyles"
  />
</template>

<style scoped lang="scss">
.classLandscape {
  position: absolute !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(90deg);
}
</style>
