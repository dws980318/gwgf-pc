<template>
<!-- 课程评价 -->
  <div class="evaluate">
    <div class="evaluate-title">学生评价</div>
    <div class="evaluate-block">
      <span class="demonstration">知识量：</span>
      <el-rate class="el-rate" v-model="value1"></el-rate>
      <span class="demonstration">(课程内容是否充实，有价值)</span>
    </div>
    <div class="evaluate-block">
      <span class="demonstration">教师互动：</span>
      <el-rate class="el-rate" v-model="value2"></el-rate>
      <span class="demonstration">（教师是否积极参与交流和互动）</span>
    </div>
    <div class="evaluate-block">
      <span class="demonstration">课程设计：</span>
      <el-rate class="el-rate" v-model="value3"></el-rate>
      <span class="demonstration">（课程内容是否合理，形式丰富）</span>
    </div>
    <div class="evaluate-richEdit">
      <p>课程评语:</p>
      <tinymce-editor style="width: 800px;" ref="editor"></tinymce-editor>
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
      value3: 5
    };
  }
};
</script>

<style lang="scss" scoped>
.evaluate {
  background-color: #fff;
  width: 100%;
  padding: 0 60px 20px 60px;
  .evaluate-title {
    border-bottom: 1px solid #d7d7d7;
    font-size: 18px;
    line-height: 50px;
  }
  .evaluate-block {
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
  .evaluate-richEdit {
    p {
      font-size: 18px;
      line-height: 90px;
    }
  }
}
</style>