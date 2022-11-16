<template>
  <div class="list">
    <div
      class="box"
      :class="{
        // center: (index + 1) % 2 === 0
      }"
      v-for="item in props.list"
      :key="item.name"
    >
      <div class="cell">
        <div class="name">{{ item.name }}</div>
        <div class="value">{{ item.value }}</div>
      </div>
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
    flex: 0 0 50%;
    &.center {
      justify-content: center;
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
