<template>
  <div class="item-border">
    <div class="item">
      <div class="title">{{ item.title }}</div>
      <div class="num">{{ item.num }}</div>
      <div class="b-box">
        <div class="box-item">
          <div class="txt">
            <span class="circle" />
            <span class="content">环比</span>
          </div>
          <div class="percent">
            <span class="txt">{{ item.hb }}</span>
            <base-svg name="down" class="down" />
          </div>
        </div>
        <div class="box-item">
          <div class="txt">
            <span class="circle" />
            <span class="content">同比</span>
          </div>
          <div class="percent">
            <span class="txt">{{ item.tb }}</span>
            <base-svg name="up" class="up" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    default: () => ({
      title: `会员人数`,
      num: `13,000`,
      hb: `112.61%`,
      tb: `112.61%`
    })
  }
})
const { item } = toRefs(props)
</script>

<style lang="scss" scoped>
.item-border {
  padding: 32px 0px 45px 32px;
  &:last-child {
    .item {
      border-right: 0;
    }
  }
}
.down,
.up {
  width: 24px;
  height: 24px;
  margin-bottom: 6px;
}
.item {
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(216, 215, 217, 1);
  padding-right: 36px;
  .title {
    font-size: 24px;
    color: #333333;
    letter-spacing: 0;
    line-height: 32px;
    font-weight: 400;
    margin-bottom: 16px;
  }
  .num {
    font-family: Oswald-Medium;
    font-size: 36px;
    color: #f08700;
    letter-spacing: 0;
    line-height: 40px;
    font-weight: 500;
    margin-bottom: 32px;
  }
  .b-box {
    display: flex;
    .box-item {
      &:first-child {
        margin-right: 63px;
      }
      .txt {
        display: flex;
        align-items: center;
        margin-bottom: 4px;
        .content {
          font-size: 24px;
          color: #8f939a;
          line-height: 32px;
          font-weight: 400;
        }
        .circle {
          display: inline-block;
          width: 8px;
          height: 8px;
          background: #f39424;
          border-radius: 5px;
          margin-right: 8px;
        }
      }
      .percent {
        display: flex;
        align-items: center;
        margin-left: 16px;
        height: 40px;
        .txt {
          font-family: Oswald-Regular;
          font-size: 24px;
          color: #333333;
          letter-spacing: 0;
          line-height: 40px;
          height: 40px;
          font-weight: 400;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
