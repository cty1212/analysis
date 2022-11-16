<template>
  <div class="list">
    <div
      class="box"
      :class="{
        // 'min-w': (index + 1) % 3 === 1,
        // 'flex-auto': (index + 1) % 3 === 0,
        // 'flex-314': [2, 5, 8].includes(index + 1)
        center: (index + 1) % 3 === 0
      }"
      v-for="(item, index) in props.list"
      :key="item.name"
    >
      <div class="cell" :class="{ 'pl-20': [2, 5, 8].includes(index + 1) }">
        <div class="name">{{ item.name }}</div>
        <div class="value">{{ item.value }}</div>
      </div>
      <!-- <div
        class="line"
        v-if="(index + 1) % 3 !== 0 && index !== props.list.length - 1"
      /> -->
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})
</script>
<style scoped lang="scss">
.list {
  display: flex;
  flex-wrap: wrap;
  .box {
    display: flex;
    /* justify-content: space-between; */
    flex: 0 0 33.3333333333333%;
    &.center {
      justify-content: center;
    }

    &.min-w {
      min-width: 33.33333333%;
    }
    &.flex-auto {
      flex: 1;
    }
    &.flex-314 {
      .cell {
        width: 192px;
      }
    }
    .line {
      width: 0px;
      height: 62px;
      border-left: 1px solid rgba(242, 242, 242, 1);
      margin: 0 31.5px;
    }
    .cell {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 60px;
      &.pl-20 {
        padding-left: 10px;
      }
      .name {
        font-size: 24px;
        color: #909399;
        letter-spacing: 0;
        line-height: 32px;
        font-weight: 400;
        margin-bottom: 12px;
      }
      .value {
        font-family: Oswald-Regular;
        font-size: 32px;
        color: #f08700;
        letter-spacing: 0;
        text-align: center;
        line-height: 40px;
        font-weight: 400;
      }
    }
  }
}
</style>
