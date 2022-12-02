<template>
  <base-loading v-if="loading" />
  <template v-else>
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
        :options="vipLevel"
        class="h400"
      />
      <base-echart
        v-if="vipChannelKey === '注册渠道'"
        :options="registered"
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
      <base-echart v-if="activeKey === '性别'" :options="sex" class="h400" />
      <base-echart v-if="activeKey === '板块'" :options="plate" class="h400" />
      <base-echart v-if="activeKey === '年龄'" :options="age" class="h884" />
    </base-card>
    <base-card title="注册来源分布" class="mb24">
      <base-echart :options="registeredSource" class="h884" />
    </base-card>
    <base-card title="注册用户生命周期" class="mb24">
      <base-echart :options="userLife" class="h727" />
    </base-card>
    <base-card title="业态复购率" class="mb18 pr">
      <div class="zoom" @click="zoom">
        <base-svg name="zoom-in" class="zoom-in" />
      </div>
      <base-echart :options="bugAgain" class="h400" />
    </base-card>
  </template>
  <van-popup v-model:show="showLandscape">
    <div class="bg-all-white">
      <base-echart
        ref="childChart"
        landscape
        :options="bugAgain"
        class="landscape"
      />
      <div class="zoom zoom-out" @click="zoomOut">
        <base-svg name="zoom-out" class="zoom-in" />
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue'
import {
  getVipLevel,
  getRegistered,
  getRegisteredUsers,
  getRegisteredSource,
  getUserLife,
  getBuyAgain
} from '../api/userAnalysis'
import { parseTime } from '../utils/index'
const loading = ref(true)
const sexPlateAge = [`性别`, `板块`, `年龄`]
const activeKey = ref(`性别`)
const vipChannel = [`会员等级`, `注册渠道`]
const vipChannelKey = ref(`会员等级`)
const showLandscape = ref(false)
const childChart = ref(null)
const vipLevel = ref({})
const registered = ref({})
const age = ref({})
const sex = ref({})
const plate = ref({})
const registeredSource = ref({})
const userLife = ref({})
const bugAgain = ref({})
onMounted(async () => {
  await getVipList()
  await getRegisteredList()
  await getRegisteredUsersList()
  await getRegisteredSourceList()
  await getUserLifeObj()
  await getBuyAgainObj()
})
async function getVipList() {
  try {
    const data = await getVipLevel()
    vipLevel.value = initPieOption(`会员等级`, `32.5%`, data)
  } catch (error) {
    console.log(error)
  }
}
async function getRegisteredList() {
  try {
    const data = await getRegistered()
    registered.value = initPieOption(`年龄`, `32.5%`, data)
  } catch (error) {
    console.log(error)
  }
}

async function getRegisteredUsersList() {
  try {
    const {
      sexList = [],
      ageObj = {},
      plateList = []
    } = await getRegisteredUsers()
    age.value = initBarOption(ageObj.yData, ageObj.seriesData)
    plate.value = initPieOption(`板块`, `36.5%`, plateList)
    if (!sexList.errno) {
      sex.value = initPieOption(`性别`, `36.5%`, sexList)
    }
  } catch (error) {
    console.log(error)
  }
}

async function getRegisteredSourceList() {
  try {
    const { yData, seriesData } = await getRegisteredSource()
    registeredSource.value = initBarOption(yData, seriesData)
  } catch (error) {
    console.log(error)
  }
}

async function getUserLifeObj() {
  try {
    const data = await getUserLife()
    userLife.value = initRadarOption({ ...data })
  } catch (error) {
    console.log(error)
  }
}

async function getBuyAgainObj() {
  try {
    const { legend, seriesData } = await getBuyAgain({
      months: getAllMonth()
    })
    const seriesRest = seriesData.map((item) => ({
      ...item,
      tooltip: {
        valueFormatter: function (value) {
          return value + `%`
        }
      }
    }))
    bugAgain.value = initBarLineMergeOption({ legend, seriesData: seriesRest })
  } catch (error) {
    console.log(error)
  }
  loading.value = false
}

function getAllMonth(index = 11) {
  const arr = []
  const now = parseTime(new Date(), `{y}-{m}`)
  for (let i = index; i > 0; i--) {
    const date = new Date()
    date.setMonth(date.getMonth() - i)
    arr.push(parseTime(date, `{y}-{m}`))
  }
  arr.push(now)
  return arr
}

function zoom() {
  showLandscape.value = true
  bugAgain.value.xAxis.axisLabel.rotate = 0
  nextTick(() => {
    childChart.value.resizeHandler()
  })
}
function zoomOut() {
  bugAgain.value.xAxis.axisLabel.rotate = 45
  showLandscape.value = false
}
function onClickTab(val) {
  vipChannelKey.value = val.title
}
function sexPlateAgeChange(item) {
  activeKey.value = item
}
function initPieOption(graphicText, left = `36.5%`, data = []) {
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
        // name: `Access From`,
        type: `pie`,
        radius: [`40%`, `60%`],
        center: [`40%`, `50%`],
        data: data,
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
function initBarOption(yData, seriesData, color = `#F39424`) {
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
      data: yData,
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
        data: seriesData,
        itemStyle: {
          color
        }
      }
    ]
  }
}
function initBarLineMergeOption(data = {}) {
  const {
    // color = `#F39424`,
    left = `3%`,
    right = `5%`,
    top = `12%`,
    bottom = `18%`,
    legend = [],
    seriesData = []
  } = data
  // console.log(color)
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
      left,
      right,
      bottom,
      top,
      containLabel: true
    },
    legend: {
      data: legend,
      left: `center`,
      bottom: `7%`,
      icon: `rect`,
      itemWidth: 16,
      itemHeight: 4
    },
    xAxis: {
      type: `category`,
      data: getAllMonth(),
      axisPointer: {
        type: `shadow`
      },
      axisLabel: {
        rotate: 45,
        interval: 0
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
    series: seriesData
  }
}
function initRadarOption({ indicator, legend, series }) {
  return {
    tooltip: {
      trigger: `axis`
    },
    legend: {
      data: legend,
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
      indicator
    },
    series: [
      {
        type: `radar`,
        data: series,
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
.pr {
  position: relative;
}
.zoom {
  background: #ffffff;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: absolute;
  right: 32px;
  top: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 8;
  &.zoom-out {
    bottom: 44px;
    right: 30px;
    z-index: 8;
    top: initial;
  }
  .zoom-in {
    width: 38.89px;
    height: 35px;
  }
}
.bg-all-white {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #fff;
  position: relative;
}
.landscape {
  width: 100vw;
  height: 100vh;
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
