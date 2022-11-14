<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  prefix: {
    type: String,
    default: `icon`
  },
  name: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ``
  }
})
const symbolId = computed(() => `#icon-${props.name}`)
const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.className}`
  }
  return `svg-icon`
})
</script>
<style scope>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
