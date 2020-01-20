<template>
  <div class="details">
    <div class="title">
      <p>如何快速学英语</p>
      <div class="message">
        <div class="name">
          <span>张晓红</span>
          <span>于2019年6月24日发表</span>
          <span>浏览：100</span>
          <span>回复：100</span>
        </div>
        <div class="btn">
          <el-button>只看楼主</el-button>
          <el-button>收藏</el-button>
          <el-button>回复</el-button>
        </div>
      </div>
    </div>
    <el-row class="master">
      <el-col :span="24">
        <el-col :span="5" class="master-img">
          <img src="@/common/images/u267.jpg" alt />
          <p class="name">楼主</p>
          <p class="time">2019年6月24日</p>
        </el-col>
        <el-col :span="19" style="padding-right: 80px;">
          <img style="width: 100%;" src="@/common/images/banner03.png" alt />
          <div
            style=" text-indent: 25px;line-height: 22px;"
          >计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊</div>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="main" v-for="(item, index) in 2" :key="index">
      <el-col :span="24">
        <el-col :span="5" class="main-img">
          <img src="@/common/images/u267.jpg" alt />
          <p class="name">山鸡</p>
          <p class="time">2019年6月24日</p>
        </el-col>
        <el-col :span="19" class="main-comment">
          <div class="meReply">你的英文手写的真漂亮</div>
          <div class="reply-box">
            <div class="reply">
              <img src="@/common/images/center.jpg" alt />
              <div class="reply-main">
                <p>纪念刘和珍君</p>
                <p>我觉得学习英语很重要，但学英语要有好方法...</p>
              </div>
            </div>
            <div class="time">
              <span>2019年6月24日</span>
              <el-button @click="replyAction(index)">回复</el-button>
            </div>
          </div>
        </el-col>
      </el-col>
    </el-row>
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

    <el-dialog title="回复" :visible.sync="dialogVisible" width="30%">
      <textarea rows="15"></textarea>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      init_data: {
        name: "",
        page: 1,
        strip: 1
      },
      page: {
        total: 10
      },
      dialogVisible: false
    };
  },
  methods: {
    replyAction(index) {
      console.log(index);
      this.dialogVisible = true;
    },
    handleCurrentChange(val) {
      this.init_data.page = val;
    }
  }
};
</script>


<style lang="scss" scoped>
.details {
  padding: 15px 70px;

  .title {
    border-bottom: 1px solid #999;
    padding: 10px 0;
    p {
      line-height: 26px;
      font-size: 14px;
    }
    .message {
      display: flex;
      justify-content: space-between;
      align-items: center;
      &/deep/ .el-button {
        height: 27px;
        background-color: rgba(22, 155, 213, 1);
        padding: 0 20px;
        color: #fff;
      }
      .name {
        span {
          margin-right: 15px;
          color: #999;
        }
        span:nth-of-type(1) {
          margin-right: 55px;
          color: #617fa5;
        }
      }
    }
  }
  .master {
    padding: 20px 0;
    min-height: 200px;
    border-bottom: 1px solid #999;
    .master-img {
      img {
        width: 102px;
        height: 102px;
      }
      .name {
        margin-top: 20px;
        font-size: 18px;
      }
      .time {
        color: #999;
      }
    }
  }
  .main {
    padding: 20px 0;
    min-height: 200px;
    .main-img {
      img {
        width: 102px;
        height: 102px;
      }
      .name {
        margin-top: 20px;
        font-size: 18px;
      }
      .time {
        color: #999;
      }
    }
    .main-comment {
      padding-right: 80px;
      .meReply {
        min-height: 100px;
        font-size: 18px;
      }
      .reply-box {
        background-color: #f2f2f2;
        min-height: 125px;
        width: 100%;
        padding: 20px 10px 10px 20px;
        .reply {
          display: flex;
          img {
            width: 65px;
            height: 65px;
            margin-right: 10px;
          }
          .reply-main {
            line-height: 24px;
            font-size: 14px;
            p:nth-of-type(1) {
              font-size: 16px;
            }
          }
        }
        .time {
          text-align: right;
          span {
            color: #999;
            margin-right: 25px;
          }
          &/deep/ .el-button {
            color: #fff;
            background-color: #169bd5;
            height: 25px;
            padding: 0 20px;
          }
        }
      }
    }
  }
  textarea {
    width: 100%;
  }
}

.details
  /deep/
  .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: #617fa5;
}
.details /deep/ .el-pagination.is-background .el-pager li:hover {
  color: #617fa5;
}
.details
  /deep/
  .el-pagination.is-background
  .el-pager
  li.active:not(.disabled):hover {
  color: #fff;
}
</style>