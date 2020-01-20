<template>
  <div ref="line" style="width:350px;height:150px"></div>
</template>

<script>
import echarts from "echarts";

export default {
  data() {
    return {
      charts: "",
      list: []
    };
  },
  methods: {
    drawLine() {
      // console.log(this.courseList);
      // console.log(this.list);

      this.charts.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: ["已观看视频", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 10, name: "已观看视频" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ]
          }
        ]
      });
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.charts = echarts.init(this.$refs.line);
      this.drawLine();
    });
  }
};
</script>



<style>
</style>



// option = {
//         "series": [{
//             type: "pie",
//             center: ["50%", "50%"],
//             radius: ["30%", "40%"],
//             hoverAnimation: false,
//             startAngle: 60,
//             data: [{
//                 name: "0-10分钟",
//                 value: 32,
//                 z: 5,
//                 labelLine: {
//                     smooth: true,
//                     length: 30,
//                     length2: 30,
//                     lineStyle: {
//                         type: 'solid',
//                         color: "#4f6078",
//                         width: 1.5
//                     }
//                 },
//                 label: {
//                     color: "#f1f1f2",
//                     formatter: "{b}\n{c}件({d}%)",
//                 },
//                 itemStyle: {     //修改图形的样式
//                     color: {
//                         type: 'linear',
//                         colorStops: [{
//                             offset: 0, color: '#f79c69' // 0% 处的颜色
//                         }, {
//                             offset: 1, color: '#e48f63' // 100% 处的颜色
//                         }],
//                         global: false // 缺省为 false
//                     }
//                 }
//             }, {
//                 name: "",
//                 value: 55,
//                 labelLine: {
//                     show: false,
//                     emphasis: {
//                         show: false
//                     }
//                 },
//                 itemStyle: {
//                     color: "#161e2a"
//                 }
//             }]
//         }, {
//             type: "pie",
//             center: ["50%", "50%"],
//             radius: ["50%", "60%"],
//             z: 1,
//             hoverAnimation: false,
//             startAngle: 30,
//             data: [{
//                 name: "10-20分钟",
//                 value: 80,
//                 labelLine: {
//                     length: 30,
//                     length2: 30,
//                     lineStyle: {
//                         color: "#4f6078",
//                         width: 1.5
//                     }
//                 },
//                 label: {
//                     color: "#f1f1f2",
//                     formatter: "{b}\n{c}件({d}%)"
//                 },
//                 itemStyle: {
//                     color: {
//                         type: 'linear',
//                         colorStops: [{
//                             offset: 0, color: '#fcef96' // 0% 处的颜色
//                         }, {
//                             offset: 1, color: '#f9dd29' // 100% 处的颜色
//                         }],
//                         global: false // 缺省为 false
//                     }
//                 }
//             }, {
//                 name: "",
//                 value: 40,
//                 labelLine: {
//                     show: false,
//                     emphasis: {
//                         show: false
//                     }
//                 },
//                 itemStyle: {
//                     color: "#161e2a"
//                 }
//             }]
//         },
//         {
//             type: "pie",
//             center: ["50%", "50%"],
//             radius: ["70%", "80%"],
//             hoverAnimation: false,
//             startAngle: 10,
//             data: [{
//                 name: "30分钟以上",
//                 value: 120,
//                 z: 5,
//                 labelLine: {
//                     length: 10,
//                     length2: 30,
//                     lineStyle: {
//                         color: "#4f6078",
//                         width: 1.5
//                     }
//                 },
//                 label: {
//                     color: "#f1f1f2",
//                     formatter: "{b}\n{c}件({d}%)",
//                     fontSize: 12
//                 },
//                 itemStyle: {
//                     color: {
//                         type: 'linear',
//                         colorStops: [{
//                             offset: 0, color: '#0d81fe' // 0% 处的颜色
//                         }, {
//                             offset: 1, color: '#1ac2f3' // 100% 处的颜色
//                         }],
//                         global: false // 缺省为 false
//                     }
//                 }
//             }, {
//                 name: "",
//                 value: 50,
//                 labelLine: {
//                     show: false,
//                     emphasis: {
//                         show: false
//                     }
//                 },
//                 itemStyle: {
//                     color: "#161e2a"
//                 }
//             }]
//         }]
//     }

