<template>
  <div class="study">
    <!-- <div class="portrait-box">
      <div class="portrait">
        <div class="portrait-left">
          <img :src="imgurl?imgurl:avator" alt />
          <div class="portrait-title">
            <p>{{form.realName}}</p>
            <p>
              <span>关注0人</span>
              <span>粉丝5人</span>
            </p>
          </div>
        </div>
        <div class="portrait-right">
          <p class="portrait-theme portrait-common">
            <i class="el-icon-document"></i>
            <span>主题/回复</span>
            <span>0</span>
          </p>
          <p class="portrait-like portrait-common">
            <i class="el-icon-document"></i>
            <span>点赞数量</span>
            <span>453</span>
          </p>
          <p class="portrait-time portrait-common">
            <i class="el-icon-document"></i>
            <span>学习时长</span>
            <span>8小时56分钟</span>
          </p>
        </div>
      </div>
    </div>-->
    <div class="top"></div>
    <div class="study-box">
      <div class="container">
        <el-row>
          <el-col :span="24" class="study-left">
            <div class="course">
              <div class="course-title">
                <span>学习课程</span>
                <span>学习宣言：学完至少一门课程，越努力越幸运</span>
              </div>
              <div class="list-box">
                <div
                  class="course-list"
                  v-for="(item, index) in tableData"
                  :key="index"
                  @click="CourseDetailsAction(item.id)"
                >
                  <img :src="item.imgId ? (downloadfileUrl + item.imgId) : imgUrl" alt />
                  <div class="list-title">
                    <p class="name">{{item.lessonName}}</p>
                    <!-- <p class="college">{{item.lessonLength}}</p> -->
                    <p class="hour">{{item.lessonContent}}</p>
                    <!-- <p class="hour">学习宣言：学完至少一门课程，越努力越幸运学习宣言：学完至少一门课程，越努力越幸运</p> -->
                    <p class="time">{{item.uploadTime}}</p>
                  </div>
                </div>
              </div>
              <div class="panel_pagination" style="text-align:center;margin: 0 auto;">
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
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import imgUrl from "@/common/images/center.jpg";
import userImg from "@/common/images/u267.jpg";
export default {
  data() {
    return {
      activeName: "first",
      list: [
        { title: "全部" },
        { title: "正在进行" },
        { title: "即将开始" },
        { title: "已经结束" }
      ],
      imgUrl: imgUrl,
      avator: userImg,
      selectIndex: 0,
      init_data: {
        pageNumber: 1,
        pageSize: 8
      },
      list_data: {
        lessonName: ""
      },
      page: {
        total: 0
      },
      form: {
        realName: "",
        sex: "",
        birthday: "",
        remark: "",
        age: "",
        classId: ""
      },
      tableData: [] // 用于存放数据
    };
  },
  created() {
    this.init();
    this.form = JSON.parse(localStorage.list);
    this.imgurl = this.downloadfileUrl + this.form.photo;
  },
  methods: {
    // 列表数据
    init() {
      this.loading = true;
      this.api.getalllessons(this.init_data, this.list_data).then(res => {
        this.tableData = res.data;
        this.page.total = res.count;
        this.loading = false;
      });
    },
    studyDialogAction() {
      this.$store.commit("showStudyModal", true);
    },
    CourseDetailsAction(id) {
      this.$router.push("/teach/" + id);
    },
    handleCurrentChange(val) {
      this.init_data.pageNumber = val;
      this.init();
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.study {
  height: 100%;
  width: 100%;
  background: #eeeeee;
  padding-bottom: 40px;
  .top {
    height: 59px;
    width: 100%;
    line-height: 20px;
    padding: 10px 0;
    font-size: 14px;
    border-bottom: 1px solid #e6e2e2;
  }
  .portrait-box {
    width: 100%;
    background-color: #999999;
    .portrait {
      clear: both;
      margin: auto;
      height: auto;
      font-size: 0;
      width: 1270px;
      height: 220px;
      @include flex;
      font-size: 12px;
      padding-left: 40px;
      img {
        width: 104px;
        height: 104px;
        border-radius: 50%;
      }
      .portrait-left {
        @include flex;
        .portrait-title {
          height: 104px;
          margin-left: 30px;
          p:nth-of-type(1) {
            font-size: 20px;
            font-weight: 600;
            color: #fff;
            margin-bottom: 30px;
          }
          p:nth-of-type(2) {
            font-size: 16px;
            color: #fff;
          }
        }
      }
      .portrait-right {
        width: 400px;
        @include flex;
        color: #fff;
        font-size: 14px;
        .portrait-common {
          display: flex;
          flex-direction: column;
          line-height: 23px;
          i {
            font-size: 38px;
          }
        }
        .portrait-theme {
          position: relative;
          i {
            position: absolute;
            top: 4px;
            left: -40px;
          }
        }
        .portrait-like {
          position: relative;
          i {
            position: absolute;
            top: 4px;
            left: -40px;
          }
        }
        .portrait-time {
          position: relative;
          i {
            position: absolute;
            top: 4px;
            left: -40px;
          }
        }
      }
    }
  }
  .study-box {
    width: 100%;
    background-color: #eeeeee;
    .container {
      background-color: #fff;
      min-height: 730px;
      font-size: 12px;
      padding: 20px;
      .study-left {
        .left-title {
          border-left: 4px solid #169bd5;
          padding-left: 10px;
          @include flex;
          font-size: 14px;
          span:nth-of-type(1) {
            font-size: 18px;
            margin-right: 20px;
          }
          span:nth-of-type(2) {
            color: #999;
          }
          p {
            cursor: pointer;
            &:hover {
              color: #169bd5;
            }
          }
        }
        .plan {
          @include flex;
          margin-top: 20px;
          .plan-left {
            width: 558px;
            height: 255px;
            background-color: #e9f9f7;
            text-align: center;
            & /deep/ .el-button {
              background-color: #617fa5;
              color: #fff;
              margin-top: 10px;
            }
            img {
              margin-top: 40px;
              width: 105px;
              height: 79px;
            }
            p {
              line-height: 30px;
            }
          }
          .plan-right {
            width: 377px;
            height: 255px;
            background-color: #e9f9f7;
            padding: 30px 20px;
            position: relative;
            .plan-label {
              position: absolute;
              right: 0;
              top: 0;
              width: 194px;
              height: 29px;
              font-size: 14px;
              color: #fff;
              text-align: center;
              line-height: 29px;
              background-color: #a37d3e;
              border-bottom-left-radius: 15px;
            }
            .plan-radius {
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
            .plan-calendar {
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
        }
        .course {
          .course-title {
            border-left: 4px solid #169bd5;
            padding-left: 10px;
            font-size: 14px;
            margin-bottom: 10px;
            span:nth-of-type(1) {
              font-size: 18px;
              margin-right: 20px;
            }
          }
          .course-nav {
            font-size: 14px;
            margin-bottom: 20px;
            span {
              cursor: pointer;
            }
            .active {
              color: #409eff;
            }
            span:nth-of-type(1) {
              margin-right: 15px;
              position: relative;
            }
            span:nth-of-type(1):after {
              content: "";
              position: absolute;
              right: -10px;
              top: 0;
              width: 2px;
              height: 16px;
              background-color: #f2f2f2;
            }
            span:nth-of-type(2) {
              margin-right: 15px;
              position: relative;
            }
            span:nth-of-type(2):after {
              content: "";
              position: absolute;
              right: -10px;
              top: 0;
              width: 2px;
              height: 16px;
              background-color: #f2f2f2;
            }
            span:nth-of-type(3) {
              margin-right: 15px;
              position: relative;
            }
            span:nth-of-type(3):after {
              content: "";
              position: absolute;
              right: -10px;
              top: 0;
              width: 2px;
              height: 16px;
              background-color: #f2f2f2;
            }
          }
          .list-box {
            display: flex;
            flex-flow: wrap;
            // justify-content: space-between;
            .course-list {
              width: 18%;
              height: 256px;
              background-color: #fff;
              margin-bottom: 17px;
              cursor: pointer;
              display: flex;
              flex-direction: column;
              margin-right: 2%;
              box-shadow: 0px 0px 5px #ccc;
              transition: all 0.3s ease;
              &:hover {
                box-shadow: 2px 2px 15px #ccc;
              }
              &:nth-of-type(5n) {
                margin-right: 0;
              }
              img {
                width: 100%;
                height: 111px;
              }
              .list-title {
                padding: 10px;
                font-size: 14px;
                .college {
                  color: #999;
                  line-height: 32px;
                }
                .hour {
                  color: #617fa5;
                  height: 40px;
                  margin-top: 10px;
                  overflow: hidden;
                }
                .time {
                  margin-top: 5px;
                  font-size: 12px;
                  color: #999;
                }
              }
            }
          }
        }
      }
    }
  }
}
.study /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #617fa5;
}
.study /deep/ .el-pagination.is-background .el-pager li:hover {
  color: #617fa5;
}
.study
  /deep/
  .el-pagination.is-background
  .el-pager
  li.active:not(.disabled):hover {
  color: #fff;
}
</style>