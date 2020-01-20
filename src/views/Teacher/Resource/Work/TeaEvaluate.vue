<template>
  <!-- 课程评价 -->
  <div style="padding: 20px;">
    <el-page-header
      style="margin-bottom: 20px;"
      @back="goBack"
      :content="$route.params.id ? '查看' : '新增'"
    ></el-page-header>
    <el-tabs style="padding: 0 20px;" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="教师评价" name="teacher"></el-tab-pane>
      <el-tab-pane label="学生评价" name="student"></el-tab-pane>
    </el-tabs>
    <div v-if="activeName === 'teacher'">
      <div class="teaEvaluate" v-for="teaItem in form">
        <div class="teaEvaluate-title">教师评价</div>
        <div class="teaEvaluate-block">
          <span class="demonstration">知识量：</span>
          <el-rate class="el-rate" disabled v-model="teaItem.criterionOne"></el-rate>
          <span class="demonstration">(课程内容是否充实，有价值)</span>
        </div>
        <div class="teaEvaluate-block">
          <span class="demonstration">教师互动：</span>
          <el-rate class="el-rate" disabled v-model="teaItem.criterionTwo"></el-rate>
          <span class="demonstration">（教师是否积极参与交流和互动）</span>
        </div>
        <div class="teaEvaluate-block">
          <span class="demonstration">课程设计：</span>
          <el-rate class="el-rate" disabled v-model="teaItem.criterionThree"></el-rate>
          <span class="demonstration">（课程内容是否合理，形式丰富）</span>
        </div>
        <div class="schoolmate">
          <div class="teaEvaluate-title">对学生评语</div>
          <div class="theme-bottom">
            <div style="min-height: 40px;padding-top: 15px;padding-bottom: 15px;">{{teaItem.remark}}</div>
            <div>
              <p>
                <span>{{teaItem.userName}}</span>
                <span>{{teaItem.assessTime}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="stuEvaluate">
        <div v-for="stuItem in form">
          <div class="stuEvaluate-title">学生自评</div>
          <div class="stuEvaluate-block">
            <span class="demonstration">知识量：</span>
            <el-rate class="el-rate" disabled v-model="stuItem.criterionOne"></el-rate>
            <span class="demonstration">(课程内容是否充实，有价值)</span>
          </div>
          <div class="stuEvaluate-block">
            <span class="demonstration">教师互动：</span>
            <el-rate class="el-rate" disabled v-model="stuItem.criterionTwo"></el-rate>
            <span class="demonstration">（教师是否积极参与交流和互动）</span>
          </div>
          <div class="stuEvaluate-block">
            <span class="demonstration">课程设计：</span>
            <el-rate class="el-rate" disabled v-model="stuItem.criterionThree"></el-rate>
            <span class="demonstration">（课程内容是否合理，形式丰富）</span>
          </div>
          <div class="schoolmate">
            <div class="theme-bottom">
              <div style="min-height: 40px;padding-top: 15px;padding-bottom: 15px;">{{stuItem.remark}}</div>
              <div class="userName">
                <p>
                  <span>{{stuItem.userName}}</span>
                  <span>{{stuItem.assessTime}}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="schoolmate">
          <div class="stuEvaluate-title" v-if="tabData.length !== 0">同学互评</div>
          <div class="theme-bottom" v-for="(item, index) in tabData" :key="index">
            <div class="stuEvaluate-block">
              <span class="demonstration">知识量：</span>
              <el-rate class="el-rate" disabled v-model="item.criterionOne"></el-rate>
              <span class="demonstration">(课程内容是否充实，有价值)</span>
            </div>
            <div class="stuEvaluate-block">
              <span class="demonstration">教师互动：</span>
              <el-rate class="el-rate" disabled v-model="item.criterionTwo"></el-rate>
              <span class="demonstration">（教师是否积极参与交流和互动）</span>
            </div>
            <div class="stuEvaluate-block">
              <span class="demonstration">课程设计：</span>
              <el-rate class="el-rate" disabled v-model="item.criterionThree"></el-rate>
              <span class="demonstration">（课程内容是否合理，形式丰富）</span>
            </div>
            <div
              style="min-height: 40px;padding-top: 15px;margin-top: 15px;border-top: 1px solid #333;"
            >{{item.remark}}</div>
            <div class="userName">
              <p>
                <span>{{item.userName}}</span>
                <span>{{item.assessTime}}</span>
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
      init_data: {
        pageSize: 10,
        pageNumber: 1
      },
      page: {
        total: 10
      },
      form: [],
      list_data: {
        id: "",
        type: 1
      },
      page: {
        total: 0
      },
      imgList: {},
      options: [
        { dicName: "教师评价", type: 1 },
        { dicName: "学生评价", type: 2 }
      ],
      selectIndex: 0,
      hoverIndex: 0,
      hoverTop: 0,
      activeName: "teacher",
      tabData: []
    };
  },
  created() {
    this.init(this.$route.params.id);
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    //列表数据
    init(id) {
      this.form = [];
      this.list_data.id = id;
      this.api.getjobassess(this.list_data).then(res => {
        if (res.data) {
          this.form.push(res.data);
        }
        console.log(res);
      });
    },
    list(id) {
      this.list_data.id = id;
      this.list_data.type = 3;
      this.api.getjobassess(this.list_data).then(res => {
        console.log(res);
        this.tabData = res.data;
        this.page.total = res.count;
      });
    },
    handleClick(tab, event) {
      console.log(tab);
      if (tab.name === "teacher") {
        this.list_data.type = 1;
        this.init(this.$route.params.id);
      } else {
        this.list_data.type = 2;
        this.init(this.$route.params.id);
        this.list(this.$route.params.id);
      }
    },
    handleCurrentChange(val) {
      this.init_data.pageNumber = val;
      this.list();
    }
  }
};
</script>

<style lang="scss" scoped>
.teaEvaluate {
  background-color: #fff;
  width: 100%;

  padding: 0 60px 20px 60px;
  .nav-main {
    width: 203px;
    background-color: #fff;
    margin-bottom: 10px;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    ul {
      position: relative;
      .active_hover {
        position: absolute;
        left: 0;
        width: 100%;
        height: 46px;
        background-color: #617fa5;
        transition: all 0.3s;
      }
      li {
        position: relative;
        display: block;
        width: 100%;
        text-align: center;
        line-height: 46px;
        color: #000;
        cursor: pointer;
        transition: color 0.2s;
        transition-delay: 0.15s;
        &.active {
          color: #fff;
        }
      }
      li:nth-of-type(1) {
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
      }
      a {
        display: block;
        width: 100%;
        text-align: center;
        line-height: 46px;
        color: #000;
        cursor: pointer;
        &.router-link-active {
          background-color: #617fa5;
          color: #fff;
        }
      }
      a:nth-of-type(1) {
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
      }
    }
  }
  .img {
    text-align: center;
    img {
      width: 80%;
      height: 200px;
    }
  }
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
      .userName {
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