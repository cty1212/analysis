// function landscapeOption(color = `#F39424`) {
//   return {
//     tooltip: {
//       trigger: `axis`,
//       // formatter: (params) => {
//       //   console.log(params)
//       // },
//       axisPointer: {
//         type: `cross`,
//         crossStyle: {
//           color: `#999`
//         }
//       }
//       // textStyle: {
//       //   color: `#fff`
//       // }
//       // extraCssText: `box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);`
//     },
//     grid: {
//       left: `10%`,
//       // right: `5%`,
//       // bottom: `18%`,
//       // top: `12%`,
//       containLabel: true
//       // tooltip: {}
//     },
//     legend: {
//       orient: `vertical`,
//       data: [`用户复购率`, `订单复购率`, `用户回购率`],
//       left: `5%`,
//       bottom: `center`,
//       icon: `rect`,
//       itemWidth: 16,
//       itemHeight: 4
//     },
//     yAxis: {
//       type: `category`,
//       data: [`06`, `07`, `08`, `09`, `10`, `11`, `12`, `01`, `02`],
//       inverse: `true`, //是否是反向坐标轴。
//       axisLabel: {
//         rotate: -90
//       },
//       axisPointer: {
//         type: `shadow`
//       }
//     },
//     xAxis: {
//       type: `value`,
//       min: 0,
//       max: 100,
//       interval: 25,
//       axisLabel: {
//         formatter: `{value}%`,
//         rotate: 90
//       },
//       position: `top`, //x 轴的位置【top bottom】
//       nameRotate: -90 //坐标轴名字旋转，角度值。
//     },
//     series: [
//       {
//         name: `总计`,
//         type: `bar`,
//         // tooltip: {
//         //   // extraCssText: `transform: rotate(90deg)`,
//         //   valueFormatter: function (value) {
//         //     return value + `%`
//         //   }
//         // },
//         data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 5.6, 8.2, 32.6],
//         itemStyle: {
//           color
//         }
//       },
//       {
//         name: `用户复购率`,
//         type: `line`,
//         // tooltip: {
//         //   // extraCssText: `transform: rotate(90deg)`,
//         //   valueFormatter: function (value) {
//         //     return value + `%`
//         //   }
//         // },
//         data: [3.0, 4.9, 7.0, 23.2, 25.6, 2.7, 3.6, 90.2, 32.6]
//       },
//       {
//         name: `订单复购率`,
//         type: `line`,
//         // tooltip: {
//         //   // extraCssText: `transform: rotate(90deg)`,
//         //   valueFormatter: function (value) {
//         //     return value + `%`
//         //   }
//         // },
//         data: [4.0, 4.9, 25.6, 76.7, 20.6, 10.2, 32.6, 23.2, 7.0]
//       },
//       {
//         name: `用户回购率`,
//         type: `line`,
//         // tooltip: {
//         //   // extraCssText: `transform: rotate(90deg)`,
//         //   valueFormatter: function (value) {
//         //     return value + `%`
//         //   }
//         // },
//         data: [25.0, 4.9, 7.0, 25.6, 40.7, 15.2, 32.6, 23.2, 30.6]
//       }
//     ]
//   }
// }

// {
//   name: `总计`,
//   type: `bar`,
//   tooltip: {
//     valueFormatter: function (value) {
//       return value + `%`
//     }
//   },
//   data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 5.6, 8.2, 32.6],
//   itemStyle: {
//     color
//   }
// },
