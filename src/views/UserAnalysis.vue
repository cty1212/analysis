<template>
  <base-card class="mb24">
    <van-tabs v-model:active="vipChannelKey" @click-tab="onClickTab">
      <van-tab
        :title="item"
        v-for="item in vipChannel"
        :name="item"
        :key="item"
      />
    </van-tabs>
    <base-echart
      v-if="vipChannelKey === '会员等级'"
      :options="initPieOption('会员等级', '32.5%')"
      class="h400"
    />
    <base-echart
      v-if="vipChannelKey === '注册渠道'"
      :options="initPieOption('注册渠道', '32.5%')"
      class="h400"
    />
  </base-card>
  <base-card title="注册用户" class="mb24">
    <div class="sex-plate-age">
      <div
        v-for="item in sexPlateAge"
        class="item"
        :key="item"
        :class="{ active: activeKey === item }"
        @click="sexPlateAgeChange(item)"
      >
        {{ item }}
      </div>
    </div>
    <base-echart
      v-if="activeKey === '性别'"
      :options="initPieOption('性别')"
      class="h400"
    />
    <base-echart
      v-if="activeKey === '板块'"
      :options="initPieOption('板块')"
      class="h400"
    />
    <base-echart
      v-if="activeKey === '年龄'"
      :options="initBarOption()"
      class="h884"
    />
  </base-card>
  <base-card title="注册来源分布" class="mb24">
    <base-echart :options="initBarOption()" class="h884" />
  </base-card>
  <base-card title="注册用户生命周期" class="mb24">
    <base-echart :options="initRadarOption()" class="h727" />
  </base-card>
  <base-card title="业态复购率" class="mb18">
    <base-echart :options="initBarLineMergeOption()" class="h400" />
  </base-card>
</template>

<script setup>
import { ref } from 'vue'
const sexPlateAge = [`性别`, `板块`, `年龄`]
const activeKey = ref(`性别`)
const vipChannel = [`会员等级`, `注册渠道`]
const vipChannelKey = ref(`会员等级`)
function onClickTab(val) {
  console.log(val)
  vipChannelKey.value = val.title
}
function sexPlateAgeChange(item) {
  this.activeKey = item
}
function initPieOption(graphicText, left = `36.5%`) {
  return {
    tooltip: {
      trigger: `item`
    },
    legend: {
      orient: `vertical`,
      itemWidth: 6,
      itemHeight: 6,
      right: `10`,
      icon: `circle`,
      top: `center`,
      formatter: function (name) {
        return name.length > 8 ? name.slice(0, 8) + `...` : name
      }
    },
    graphic: {
      elements: [
        {
          type: `text`,
          style: {
            text: graphicText,
            font: `bolder 2em "Microsoft YaHei", sans-serif`,
            fill: `#606266`
          },
          left: left,
          top: `middle`,
          enterFrom: {
            // 淡入
            style: { opacity: 0 },
            // 从左飞入
            x: 0
          },
          leaveTo: {
            // 淡出
            style: { opacity: 0 },
            // 向右飞出
            x: 200
          },
          transition: `all`
        }
      ]
    },
    series: [
      {
        name: `Access From`,
        type: `pie`,
        radius: [`40%`, `60%`],
        center: [`40%`, `50%`],
        data: [
          { value: 1048, name: `Search Engine` },
          { value: 735, name: `Direct` },
          { value: 580, name: `Email` },
          { value: 484, name: `Union Ads` },
          { value: 300, name: `Video Ads` }
        ],
        avoidLabelOverlap: true,
        emphasis: {
          show: true,
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: `rgba(0, 0, 0, 0.5)`
          }
        },
        labelLine: {
          show: true,
          length: 5
        },

        label: {
          show: true,
          formatter: `{c}`
        }
      }
    ]
  }
}
function initBarOption(color = `#F39424`) {
  return {
    tooltip: {
      trigger: `axis`,
      axisPointer: {
        type: `shadow`
      }
    },
    legend: {
      show: false
    },
    grid: {
      left: `3%`,
      right: `8%`,
      bottom: `3%`,
      top: `10%`,
      containLabel: true
    },
    xAxis: {
      type: `value`
      // boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: `category`,
      data: [
        `61岁及以上`,
        `51-60岁`,
        `41-50岁`,
        `31-40岁`,
        `21-30岁`,
        `20岁及以下`
      ],
      axisLabel: {
        // interval: 0,
        // rotate: 60
        formatter: function (value) {
          if (value.length > 4) {
            return value.slice(0, 4) + `\n` + value.slice(4)
          }
          return value
        }
      }
    },
    series: [
      {
        type: `bar`,
        data: [100, 200, 500, 100, 800, 1000],
        itemStyle: {
          color
        }
      }
    ]
  }
}
function initBarLineMergeOption(color = `#F39424`) {
  return {
    tooltip: {
      trigger: `axis`,
      axisPointer: {
        type: `cross`,
        crossStyle: {
          color: `#999`
        }
      }
    },
    grid: {
      left: `3%`,
      right: `5%`,
      bottom: `18%`,
      top: `12%`,
      containLabel: true
    },
    legend: {
      data: [`用户复购率`, `订单复购率`, `用户回购率`],
      left: `center`,
      bottom: `7%`,
      icon: `rect`,
      itemWidth: 16,
      itemHeight: 4
    },
    xAxis: {
      type: `category`,
      data: [`06`, `07`, `08`, `09`, `10`, `11`, `12`, `01`, `02`],
      axisPointer: {
        type: `shadow`
      }
    },
    yAxis: {
      type: `value`,
      min: 0,
      max: 100,
      interval: 25,
      axisLabel: {
        formatter: `{value}%`
      }
    },
    series: [
      {
        name: `总计`,
        type: `bar`,
        tooltip: {
          valueFormatter: function (value) {
            return value + `%`
          }
        },
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 5.6, 8.2, 32.6],
        itemStyle: {
          color
        }
      },
      {
        name: `用户复购率`,
        type: `line`,
        tooltip: {
          valueFormatter: function (value) {
            return value + `%`
          }
        },
        data: [3.0, 4.9, 7.0, 23.2, 25.6, 2.7, 3.6, 90.2, 32.6]
      },
      {
        name: `订单复购率`,
        type: `line`,
        tooltip: {
          valueFormatter: function (value) {
            return value + `%`
          }
        },
        data: [4.0, 4.9, 25.6, 76.7, 20.6, 10.2, 32.6, 23.2, 7.0]
      },
      {
        name: `用户回购率`,
        type: `line`,
        tooltip: {
          valueFormatter: function (value) {
            return value + `%`
          }
        },
        data: [25.0, 4.9, 7.0, 25.6, 40.7, 15.2, 32.6, 23.2, 30.6]
      }
    ]
  }
}
function initRadarOption() {
  return {
    tooltip: {
      trigger: `axis`
    },
    legend: {
      data: [
        `风行（零售）`,
        `风行（订奶）`,
        `悦秀会商城`,
        `皇上皇小程序`,
        `流失预警客户`
      ],
      left: `center`,
      bottom: `5%`,
      itemWidth: 6,
      itemHeight: 6,
      width: `90%`,
      icon: `circle`
    },
    radar: {
      shape: `polygon`,
      radius: `63%`,
      center: [`50%`, `45%`],
      indicator: [
        { name: `现在客户` },
        { name: `流失客户` },
        { name: `流失预警客户` },
        { name: `活跃客户` },
        { name: `新客户` }
      ]
    },
    series: [
      {
        type: `radar`,
        data: [
          {
            value: [4200, 3000, 2000, 3500, 3500],
            name: `风行（零售）`
          },
          {
            value: [3010, 5000, 2000, 4500, 1600],
            name: `风行（订奶）`
          },
          {
            value: [4000, 3000, 4500, 3000, 3050],
            name: `悦秀会商城`
          },
          {
            value: [1855, 1800, 2800, 4500, 4200],
            name: `皇上皇小程序`
          },
          {
            value: [1500, 1600, 1500, 2600, 4500],
            name: `流失预警客户`
          }
        ],
        tooltip: {
          trigger: `item`
        }
      }
    ]
  }
}
</script>

<style scoped lang="scss">
:deep() .van-tabs {
  border-bottom: 1px solid rgba(238, 238, 238, 1);
  height: 91px;
  box-sizing: content-box;
  .van-tabs__wrap {
    height: 91px;
    border-radius: 16px;
    .van-tabs__nav--line {
      padding-bottom: 0;
      .van-tab__text--ellipsis {
        font-size: 34px;
        color: #373737;
        text-align: center;
      }
      .van-tabs__line {
        height: 4px;
        background: #f39424;
        border-radius: 2px;
        width: 95px;
        bottom: 0;
      }
      .van-tab--active {
        .van-tab__text--ellipsis {
          font-size: 34px;
          color: #f39424;
          font-weight: 500;
        }
      }
    }
  }
}

.h400 {
  height: 552px;
  font-size: 15px;
}
.h884 {
  height: 884px;
  font-size: 15px;
}
.h727 {
  height: 727px;
}
.mb24 {
  margin-bottom: 24px;
}
.mb18 {
  margin-bottom: 18px;
}
.sex-plate-age {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 56px;
  padding: 0 24px;
  .item {
    background: #f5f5f5;
    border-radius: 40px;
    height: 74px;
    line-height: 74px;
    text-align: center;
    font-size: 30px;
    color: #333333;
    flex: 1;
    margin-right: 37px;
    &:last-child {
      margin-right: 0;
    }
    &.active {
      background: #f39424;
      color: #ffffff;
      font-weight: bold;
    }
  }
}
</style>
