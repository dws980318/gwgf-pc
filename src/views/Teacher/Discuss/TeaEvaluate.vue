<template>
  <!-- 课程评价 -->
  <div class="teaEvaluate">
    <div class="teaEvaluate-title">教师评价</div>
    <div class="teaEvaluate-block">
      <span class="demonstration">知识量：</span>
      <el-rate class="el-rate" v-model="form.criterionOne"></el-rate>
      <span class="demonstration">(课程内容是否充实，有价值)</span>
    </div>
    <div class="teaEvaluate-block">
      <span class="demonstration">教师互动：</span>
      <el-rate class="el-rate" v-model="form.criterionTwo"></el-rate>
      <span class="demonstration">（教师是否积极参与交流和互动）</span>
    </div>
    <div class="teaEvaluate-block">
      <span class="demonstration">课程设计：</span>
      <el-rate class="el-rate" v-model="form.criterionThree"></el-rate>
      <span class="demonstration">（课程内容是否合理，形式丰富）</span>
    </div>
    <div class="schoolmate">
      <div class="teaEvaluate-title">对学生评语</div>
      <div class="theme-bottom" v-for="(item, index) in 1" :key="index">
        <div
          style="min-height: 40px;padding-top: 15px;padding-bottom: 15px;"
        >{{form.remark}}</div>
        <div>
          <p>
            <span>{{form.userName}}</span>
            <span>{{form.assessTime}}</span>
          </p>
          <p>
            <span>浏览：0</span>
            <span>回复：0</span>
            <span>投票：0</span>
          </p>
        </div>
      </div>
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
      form: {
        criterionOne: 0,
        criterionTwo: 0,
        criterionThree: 0,
      },
      list_data: {
        id: "",
        type: 1
      },
      page: {
        total: 0
      }
    };
  },
  created() {
    console.log(this.$route.params);
    if (this.$route.params.id) {
      this.init(this.$route.params.id);
    }
  },
  methods: {
    //列表数据
    init(id) {
      this.list_data.id = id
      this.api.getworkassess(this.list_data).then(res => {
        this.form = res.data;
        console.log(res);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.teaEvaluate {
  background-color: #fff;
  width: 100%;
  padding: 0 60px 20px 60px;
  .teaEvaluate-title {
    border-bottom: 1px solid #d7d7d7;
    font-size: 18px;
    line-height: 50px;
  }
  .teaEvaluate-block {
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
</style>