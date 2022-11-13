<script setup>
import echarts from '@/plugins/echarts'
import { number } from 'echarts/core'
import { debounce, isString } from 'lodash-es'
import {
  computed,
  ref,
  unref,
  watch,
  onMounted,
  onBeforeUnmount,
  onActivated
} from 'vue'

const props = defineProps({
  options: {
    type: Object,
    required: true
  },
  width: {
    type: [String, number],
    default: ``
  },
  height: {
    type: [String, number],
    default: ``
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
  if (echartRef) {
    echartRef.resize()
  }
}, 100)

const contentResizeHandler = async (e) => {
  if (e.propertyName === `width`) {
    resizeHandler()
  }
}

onMounted(() => {
  initChart()

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
</script>

<template>
  <div ref="elRef" :class="[$attrs.class]" :style="styles" />
</template>
