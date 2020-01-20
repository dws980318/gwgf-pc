<template>
  <!-- 学习进度 -->
  <div class="schedule">
    <div class="title">
      <span>班级:{{list.grade}}</span>
      <span>管理老师:{{list.name}}</span>
    </div>
    <div class="schedule-top">
      <p class="schedule-top-title">学习进度</p>
      <div class="schedule-top-main">
        <div class="course-left">
          <el-progress class="progress-circle" type="circle" :percentage="25"></el-progress>
          <p>开课进度</p>
          <p>开课时间：2019-09-02至2020-01-18</p>
        </div>
        <div class="course-right">
          <el-progress class="progress-circle" type="circle" :percentage="25"></el-progress>
          <p>继续学习</p>
          <p>越努力越幸运~</p>
        </div>
      </div>
    </div>
    <div class="schedule-content">
      <p class="schedule-content-title">学习统计</p>
      <div class="schedule-content-main">
        <p class="record-title">学习记录</p>
        <div class="record-main">
          <div class="record-main-left">
            <p>
              <span>已观看视频</span>
              <span>52:45:55</span>
            </p>
            <p>
              <span>已发表帖子</span>
              <span>98条</span>
            </p>
            <p>
              <span>已记录笔记</span>
              <span>587条</span>
            </p>
          </div>
          <div class="record-main-right">
            <p style="width: 400px;height: 50px;">
              <span>已提交考试</span>
              <el-progress :percentage="10"></el-progress>
            </p>
            <p style="width: 400px;height: 50px;">
              <span>已提交作业</span>
              <el-progress :percentage="10"></el-progress>
            </p>
            <p style="width: 400px;height: 50px;">
              <span>已提交测验</span>
              <el-progress :percentage="10"></el-progress>
            </p>
          </div>
        </div>
      </div>
      <div class="schedule-content-bottom">
        <p class="grade-title">学习成绩</p>
        <div class="grade-main">
          <div style="height: 50px;">
            <el-progress class="progress-circle" type="circle" :stroke-width="24" :percentage="25"></el-progress>
          </div>
          <div class="grade-main-content">
            <div>
              <p>
                <span></span>
                <span>已观看视频</span>
                <span>10分</span>
              </p>
              <p>
                <span></span>
                <span>已提交考试</span>
                <span>10分</span>
              </p>
              <p>
                <span></span>
                <span>已发表帖子</span>
                <span>10分</span>
              </p>
            </div>
            <div style="margin-left: 40px;">
              <p>
                <span></span>
                <span>已提交作业</span>
                <span>10分</span>
              </p>
              <p>
                <span></span>
                <span>已记录笔记</span>
                <span>10分</span>
              </p>
              <p>
                <span></span>
                <span>已提交测验</span>
                <span>10分</span>
              </p>
            </div>
          </div>
          <!-- <Echarts></Echarts> -->
          <div class="grade-main-right">
            <div style="height:60px"></div>
            <div>各项成绩的分为当前得分，每天00：00会更新一次，最终成绩，依照教师制定的考核标准为准</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Echarts from "@/components/common/Echarts";
export default {
  components: {
    Echarts
  },
  data() {
    return {
      list: {
        name: "陈晓华",
        grade: "终极一班"
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.schedule {
  background-color: #fff;
  width: 100%;
  padding: 10px 60px;
  .title {
    height: 40px;
    padding-top: 10px;
    border-bottom: 1px solid #999;
    span {
      font-size: 18px;
      color: #999;
      margin-right: 70px;
    }
  }
  .schedule-top {
    margin-top: 20px;
    .schedule-top-title {
      font-size: 18px;
      color: #999;
      line-height: 60px;
    }
    .schedule-top-main {
      display: flex;
      height: 295px;
      .course-left {
        text-align: center;
        width: 50%;
        border: 1px solid #e4e4e4;
        .progress-circle {
          margin: 15px 0;
        }
        p {
          line-height: 30px;
          font-size: 14px;
          color: #999;
        }
      }
      .course-right {
        text-align: center;
        width: 50%;
        border: 1px solid #e4e4e4;
        .progress-circle {
          margin: 15px 0;
        }
        p {
          line-height: 30px;
          font-size: 14px;
          color: #999;
        }
        p:nth-of-type(1) {
          margin: 0 auto;
          width: 87px;
          height: 29px;
          border-radius: 5px;
          border: 1px solid #e4e4e4;
        }
      }
    }
  }
  .schedule-content {
    margin-top: 20px;
    margin-bottom: 20px;
    .schedule-content-title {
      font-size: 18px;
      color: #999;
      line-height: 60px;
    }
    .schedule-content-main {
      height: 234px;
      border: 1px solid #e4e4e4;
      .record-title {
        text-align: center;
        font-size: 18px;
        line-height: 70px;
      }
      .record-main {
        display: flex;
        font-size: 14px;
        color: #999;
        .record-main-left {
          width: 50%;
          padding-left: 40px;
          p {
            line-height: 45px;
            span:nth-of-type(2) {
              margin-left: 20px;
              color: #617fa5;
            }
          }
        }
        .record-main-right {
          width: 50%;
        }
      }
    }
    .schedule-content-bottom {
      margin-top: 30px;
      height: 234px;
      border: 1px solid #e4e4e4;
      .grade-title {
        text-align: center;
        font-size: 18px;
        line-height: 70px;
      }
      .grade-main {
        display: flex;
        justify-content: space-around;
        .grade-main-content {
          display: flex;
          p {
            line-height: 40px;
            span:nth-of-type(1) {
              display: inline-block;
              width: 13px;
              height: 13px;
              border-radius: 50%;
              background-color: #ff2525;
            }
            span:nth-of-type(3) {
              color: #999;
              margin-left: 20px;
            }
          }
        }
        .grade-main-right {
          color: #999;
          width: 238px;
          font-size: 14px;
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
}
</style>
