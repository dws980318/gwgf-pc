<template>
  <!-- 学生评价 -->
  <div class="stuEvaluate">
    <div class="stuEvaluate-title">学生自评</div>
    <div class="stuEvaluate-block">
      <span class="demonstration">知识量：</span>
      <el-rate class="el-rate" v-model="value1"></el-rate>
      <span class="demonstration">(课程内容是否充实，有价值)</span>
    </div>
    <div class="stuEvaluate-block">
      <span class="demonstration">教师互动：</span>
      <el-rate class="el-rate" v-model="value2"></el-rate>
      <span class="demonstration">（教师是否积极参与交流和互动）</span>
    </div>
    <div class="stuEvaluate-block">
      <span class="demonstration">课程设计：</span>
      <el-rate class="el-rate" v-model="value3"></el-rate>
      <span class="demonstration">（课程内容是否合理，形式丰富）</span>
    </div>
    <div class="schoolmate">
      <div class="stuEvaluate-title">同学互评</div>
      <div class="theme-bottom" v-for="(item, index) in 5" :key="index">
        <div style="min-height: 40px;padding-top: 15px;padding-bottom: 15px;">王晓涵同学很勤奋。</div>
        <div>
          <p>
            <span>张晓红</span>
            <span>于2019年6月24日评价</span>
          </p>
          <p>
            <span>浏览：0</span>
            <span>回复：0</span>
            <span>投票：0</span>
          </p>
        </div>
      </div>
    </div>
    <div class="panel_pagination" style="margin-top:20px;">
       <el-pagination
        style="text-align:center"
        background
        @current-change="handleCurrentChange"
        :page-size="init_data.pageSize"
        :current-page="init_data.pageNumber"
        layout="prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </div>
  </div>
</template>


<script>
import TinymceEditor from "@/components/tinymce-editor";
export default {
  components: {
    TinymceEditor
  },
  data() {
    return {
      value1: 4,
      value2: 2,
      value3: 5,
      init_data: {
        name: "",
        page: 1,
        strip: 1
      },
      page: {
        total: 10
      }
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.init_data.page = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.stuEvaluate {
  background-color: #fff;
  width: 100%;
  padding: 0 60px 20px 60px;
  .stuEvaluate-title {
    border-bottom: 1px solid #d7d7d7;
    font-size: 18px;
    line-height: 50px;
  }
  .stuEvaluate-block {
    display: flex;
    line-height: 28px;
    margin-top: 28px;
    span {
      font-size: 14px;
    }
    span:nth-of-type(1) {
      width: 72px;
      display: inline-block;
    }
    .el-rate {
      margin-top: 4px;
    }
    &/deep/.el-rate__icon {
      font-size: 22px;
    }
  }
  .schoolmate {
    margin-top: 25px;
    .theme-bottom {
      border-bottom: 1px solid #999;
      div:nth-of-type(2) {
        display: flex;
        justify-content: space-between;
        p:nth-of-type(1) {
          height: 30px;
          text-align: center;
          span:nth-of-type(1) {
            color: #617fa5;
            margin-right: 35px;
          }
          span:nth-of-type(2) {
            color: #999;
          }
        }
        p:nth-of-type(2) {
          color: #999;
          span {
            margin-left: 40px;
          }
        }
      }
    }
  }
}

.stuEvaluate
  /deep/
  .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: #617fa5;
}
.stuEvaluate /deep/ .el-pagination.is-background .el-pager li:hover {
  color: #617fa5;
}
.stuEvaluate
  /deep/
  .el-pagination.is-background
  .el-pager
  li.active:not(.disabled):hover {
  color: #fff;
}
</style>