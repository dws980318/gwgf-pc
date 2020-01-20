<template>
  <!-- 章节内容 -->
  <div class="chapter">
    <div class="chapter-top">
      <div class="top-title">章节内容</div>
      <el-button class="btn">管理内容</el-button>
    </div>
    <div class="chapter-bottom" v-for="(item, index) in list" :key="index">
      <div class="bottom-title">
        <p>{{item.title}}</p>
      </div>
      <div class="bottom-content">
        <p>认识课程</p>
        <p v-for="(course, courseIndex) in item.courseList" :key="courseIndex">
          <i class="el-icon-s-order"></i>
          {{course.catalogue}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          title: "绪论",
          courseList: [
            { catalogue: "绪论(视频)" },
            { catalogue: "绪论(课件)" },
            { catalogue: "课程内容" }
          ]
        },
        {
          title: "第一章  社会实践",
          courseList: [
            { catalogue: "绪论(视频)" },
            { catalogue: "绪论(视频)" },
            { catalogue: "绪论(视频)" },
            { catalogue: "绪论(课件)" },
            { catalogue: "绪论(课件)" },
            { catalogue: "绪论(课件)" },
            { catalogue: "课程内容" },
            { catalogue: "课程内容" },
            { catalogue: "课程内容" }
          ]
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.chapter {
  background-color: #fff;
  width: 100%;
  padding: 0 60px;
  .chapter-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d7d7d7;
    .btn {
      width: 84px;
      height: 40px;
    }
    .top-title {
      font-size: 18px;
      line-height: 50px;
    }
  }
  .chapter-bottom {
    margin-top: 20px;
    .bottom-title {
      height: 48px;
      background-color: #f2f2f2;
      padding: 0 20px;
      p {
        font-size: 16px;
        line-height: 48px;
      }
    }
    .bottom-content {
      font-size: 14px;
      p {
        padding-left: 140px;
        line-height: 30px;
        i {
          margin-right: 15px;
        }
      }
      p:nth-of-type(1) {
        padding-left: 70px;
      }
    }
  }
}
.chapter /deep/ .el-button {
  background-color: #617fa5;
  color: #fff;
  width: 73px;
  height: 29px;
  padding: 0;
}
</style>
