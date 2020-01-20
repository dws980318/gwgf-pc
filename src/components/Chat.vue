<template>
  <el-dialog class="dialog_class" :visible.sync="$store.state.chatVisible" width="60%" height="80%">
    <div class="chat">
      <el-row>
        <el-col :span="24">
          <el-col :span="5" style="background-color:#eaeaea;" class="chat-left">
            <div class="search">
              <i class="el-icon-search"></i>
              <input type="text" placeholder="搜索" />
            </div>
            <div class="chat-list">
              <div
                class="chunk"
                v-for="(item, index) in 15"
                :key="index"
                @click="navAction(index)"
                :class="{active: selectIndex === index}"
              >
                <img src="@/common/images/center.jpg" alt />
                <div class="message">
                  <p>王同学</p>
                  <p>学习进度怎么样...</p>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="19" style="background-color:#e4e4e4;" class="chat-right">
            <div class="title">一对一</div>
            <div class="main">
             <div v-for="item in 5" :key="item">
                <div class="main-left">
                <img src="@/common/images/center.jpg" alt />
                <p>好的,谢谢老师</p>
              </div>
              <div class="main-content">
                <span>12:30</span>
              </div>
              <div class="main-right">
                <img src="@/common/images/center.jpg" alt />
                <p>好的,谢谢老师</p>
              </div>
             </div>
            </div>
            <div class="import">
              <div class="import-img">
                <img src="@/common/images/img03.png" alt />
                <img src="@/common/images/img04.png" alt />
                <img src="@/common/images/img05.png" alt />
                <img src="@/common/images/img06.png" alt />
              </div>
              <div class="import-text">
                <textarea></textarea>
              </div>
              <div class="import-btn">
                <span>发送</span>
              </div>
            </div>
          </el-col>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      selectIndex: 0
    };
  },
  methods: {
    navAction(index) {
      this.selectIndex = index;
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog_class {
  /deep/ .el-dialog {
    .el-dialog__body {
      padding: 10px 0 0 0;
    }
    .el-dialog__header {
      .el-dialog__headerbtn {
        position: absolute;
        top: 13px;
        right: 13px;
      }
    }
  }
  .chat {
    width: 100%;
    background-color: #f2f2f2;
    font-size: 14px;
    height: auto;
    .chat-left {
      .search {
        padding: 10px 0px;
        text-align: center;
        position: relative;
        i {
          position: absolute;
          left: 23px;
          top: 19px;
          font-size: 24px;
          color: #999;
          font-weight: 700;
        }
        input {
          width: 90%;
          height: 40px;
          background: inherit;
          background-color: rgba(215, 215, 215, 1);
          border: none;
          border-radius: 4px;
          box-shadow: none;
          padding-left: 40px;
          &::-webkit-input-placeholder {
            color: #999;
          }
        }
      }
      .chat-list {
        height: 638px;
        overflow-y: auto;
        &::-webkit-scrollbar {
          display: none;
        }
        .chunk {
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          padding: 5px;
          height: 66px;
          img {
            width: 57px;
            height: 57px;
          }
          .message {
            flex: 1;
            padding-left: 5px;
            line-height: 25px;
          }
        }
      }
    }
    .chat-right {
      display: flex;
      flex-direction: column;
      .title {
        height: 70px;
        line-height: 70px;
        padding: 0 20px;
        font-size: 18px;
        font-weight: 900;
        background-color: #fff;
      }
      .main {
        height: 398px;
        overflow-y: auto;
        padding: 15px;
        &::-webkit-scrollbar {
          display: none;
        }
        .main-left {
          display: flex;

          img {
            width: 60px;
            height: 60px;
            margin-right: 5px;
          }
          p {
            min-width: 160px;
            min-height: 60px;
            line-height: 60px;
            font-size: 16px;
            display: inline-block;
            text-align: center;
            background-color: #fff;
          }
        }
        .main-right {
          display: flex;
          flex-direction: row-reverse;
          p {
            background-color: #91e86d;
            min-width: 160px;
            min-height: 60px;
            line-height: 60px;
            font-size: 16px;
            display: inline-block;
            text-align: center;
          }
          img {
            width: 60px;
            height: 60px;
            margin-left: 5px;
          }
        }
        .main-content {
          height: 50px;
          width: 100%;
          text-align: center;
          line-height: 50px;
          span {
            display: inline-block;
            width: 86px;
            height: 30px;
            color: #fff;
            background-color: #cccccc;
            font-size: 14px;
            text-align: center;
            line-height: 30px;
            border-radius: 5px;
          }
        }
      }
      .import {
        height: 230px;
        background-color: #fff;
        padding: 15px;
        .import-img {
          height: 40px;
          img {
            margin-right: 20px;
          }
        }
        .import-text {
          width: 100%;
          height: 125px;
          textarea {
            width: 100%;
            height: 100%;
            border: none;
            resize: none;
            &::-webkit-scrollbar {
              display: none;
            }
          }
        }
        .import-btn {
          text-align: right;
          span {
            display: inline-block;
            width: 89px;
            height: 35px;
            background-color: #169bd5;
            color: #fff;
            text-align: center;
            line-height: 35px;
            font-size: 14px;
            border-radius: 4px;
          }
        }
      }
    }
  }
}
.active {
  background-color: #fff;
}
</style>