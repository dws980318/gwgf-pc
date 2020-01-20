<template>
  <el-dialog width="70%" class="dialog_class" :visible.sync="$store.state.studyVisible">
    <div class="study">
      <div class="study-title">
        <div>
          <span>学习计划</span>
          <span>学习宣言：学完至少一门课程，越努力越幸运</span>
        </div>
        <p>调整下周目标</p>
      </div>
      <div class="target">
        <div class="target-left">
          <div class="target-label">学习计划已达成 请继续保持</div>
          <div class="target-radius">
            <p>
              <span>0</span>
              <span>/30</span>
            </p>
            <p>学习时长</p>
          </div>
          <p class="calendar-bottom">连续3天完成日目标可获得奖励</p>
        </div>
        <div class="target-right">
          <p class="target-title">本周目标</p>
          <div class="target-radius">
            <p>
              <span>0</span>
            </p>
            <p>达成天数</p>
          </div>
          <div>
            <ul class="target-calendar">
              <li class="hui">日</li>
              <li class="hui">一</li>
              <li>二</li>
              <li>三</li>
              <li>四</li>
              <li>五</li>
              <li>六</li>
            </ul>
          </div>
        </div>
        <div class="btn">智能推荐</div>
      </div>
      <div class="study-title">
        <div>
          <span>每日学习任务</span>
          <span>坚持就是胜利！</span>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>
              <p class="advance">上一周</p>
            </th>
            <th v-for="(item, index) in date" :key="index">
              <p>{{item.month}}</p>
              <p>{{item.week}}</p>
            </th>
            <th>
              <p class="advance">下一周</p>
            </th>
          </tr>
          <tr>
            <th>
              <p class="advance">学习时长</p>
              <p>(分钟)</p>
            </th>
            <th v-for="(items, indexs) in 7" :key="indexs">0/30</th>
             <th>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>学习任务</td>
            <td v-for="(j, index) in 8" :key="index">
              10:00数据结构与算法开课了
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      date: [
        { month: "06月17日", week: "周日" },
        { month: "06月18日", week: "周一" },
        { month: "06月19日", week: "周二" },
        { month: "06月20日", week: "周三" },
        { month: "06月21日", week: "周四" },
        { month: "06月22日", week: "周五" },
        { month: "06月23日", week: "周六" }
      ]
    };
  },
  created() {
    // console.log(this.$store.state.studyVisible);
  },
  methods: {}
};
</script>

<style scoped lang="scss">
@mixin flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dialog_class {
  /deep/ .el-dialog {
    background-color: #e9f9f7;
    /deep/ .el-dialog__body {
      padding: 10px 40px;
    }
  }
  .study {
    .study-title {
      @include flex;
      font-size: 14px;
      span:nth-of-type(1) {
        padding-left: 10px;
        border-left: 4px solid #169bd5;
        font-size: 18px;
        display: inline-block;
        height: 24px;
        margin-right: 20px;
      }
      span:nth-of-type(2) {
        color: #999;
      }
      p {
        width: 110px;
        height: 34px;
        border: 1px solid #617fa5;
        line-height: 34px;
        text-align: center;
      }
    }
    .target {
      display: flex;
      justify-content: space-around;
      align-items: center;
      position: relative;
      border-bottom: 2px solid #fff;
      margin-bottom: 20px;
      .target-left {
        width: 377px;
        height: 255px;
        background-color: #e9f9f7;
        padding: 30px 20px;
        text-align: center;
        .target-label {
          margin: 0 auto;
          width: 194px;
          height: 29px;
          font-size: 14px;
          color: #fff;
          text-align: center;
          line-height: 29px;
          background-color: #a37d3e;
          border-radius: 15px;
        }
        .target-radius {
          height: 105px;
          width: 105px;
          border-radius: 50%;
          border: 3px solid #d6d2d2;
          margin: 0 auto;
          text-align: center;
          padding-top: 15px;
          margin: 15px auto;
          background-color: #fff;
          p {
            font-size: 14px;
          }
          p:nth-of-type(1) {
            font-size: 36px;
            color: #617fa5;
            span:nth-of-type(2) {
              font-size: 20px;
            }
          }
        }
        .target-calendar {
          display: flex;
          padding: 0 20px;
          margin-top: 15px;
          justify-content: center;
          align-items: center;
          li {
            margin-right: 10px;
            width: 22px;
            height: 22px;
            text-align: center;
            line-height: 22px;
            border-radius: 50%;
            background-color: #fff;
          }
          .hui {
            background-color: #ddd;
          }
        }
        .calendar-bottom {
          text-align: center;
          font-size: 14px;
          margin-top: 10px;
        }
      }
      .target-right {
        width: 377px;
        height: 255px;
        background-color: #e9f9f7;
        padding: 30px 20px;
        position: relative;
        text-align: center;
        .target-title {
          font-size: 20px;
          margin-bottom: 15px;
        }
        .target-radius {
          height: 105px;
          width: 105px;
          border-radius: 50%;
          border: 3px solid #d6d2d2;
          margin: 0 auto;
          text-align: center;
          padding-top: 15px;
          background-color: #fff;
          p {
            font-size: 14px;
          }
          p:nth-of-type(1) {
            font-size: 36px;
            color: #617fa5;
            span:nth-of-type(2) {
              font-size: 20px;
            }
          }
        }
        .target-calendar {
          display: flex;
          padding: 0 20px;
          margin-top: 15px;
          justify-content: center;
          align-items: center;
          li {
            margin-right: 10px;
            width: 22px;
            height: 22px;
            text-align: center;
            line-height: 22px;
            border-radius: 50%;
            background-color: #fff;
          }
          .hui {
            background-color: #ddd;
          }
        }
        .calendar-bottom {
          text-align: center;
          font-size: 14px;
          margin-top: 10px;
        }
      }
      .btn {
        position: absolute;
        top: 10px;
        right: 0;
        width: 110px;
        height: 34px;
        background-color: #617fa5;
        color: #fff;
        text-align: center;
        line-height: 34px;
        cursor: pointer;
      }
    }
    .table {
      width: 100%;
      height: 326px;
      background-color: #fff;
      margin-top: 15px;
      border-collapse: collapse;
      table,
      td,
      th {
        text-align: center;
        border: 1px solid #e4e4e4;
      }
      th {
        height: 50px;
      }
      td {
        width: 110px;
        padding: 0 10px;
      }
      .advance {
        cursor: pointer;
        &:hover {
          color: #169bd5;
        }
      }
    }
  }
}
</style>
