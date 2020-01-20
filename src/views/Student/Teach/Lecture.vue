<template>
  <div class="lecture">
    <div style="height: 60px;backgroung-color:#999;border-bottom: 1px solid #d2cccc"></div>
    <div class="container">
      <el-row>
        <el-col :span="24" style="margin-bottom: 20px;">
          <el-col :span="19">
            <el-col :span="6">
              <div class="catalogue">
                <div class="title">目录</div>
                <div class="list-box">
                  <div
                    :class="selectIndex === index ? 'active' : 'list'"
                    v-for="(item, index) in 15"
                    :key="index"
                    @click="navAction(index)"
                  >商务英语第一章</div>
                </div>
                <div class="packUp">
                  <span>收起</span>
                  <i class="el-icon-arrow-right"></i>
                </div>
                <div class="title"></div>
              </div>
            </el-col>
            <el-col :span="18">
              <div class="video">
                <p>在线演讲模拟练习</p>
                <div class="img">
                  <img src="@/common/images/img07.jpg" alt />
                </div>
                <div class="title">
                  <i class="el-icon-microphone"></i>
                  <span @click="transcribeAction">录制</span>
                  <i class="el-icon-edit-outline"></i>
                  <span>做笔记</span>
                </div>
              </div>
            </el-col>
          </el-col>
          <el-col :span="5">
            <div class="chat">
              <div class="title">
                <span>相关资源</span>
              </div>
              <div class="course">
                <div class="course-nav">
                  <img src="@/common/images/center.jpg" alt />
                  <span>绪论（视频）</span>
                </div>
                <div class="course-nav">
                  <img src="@/common/images/center.jpg" alt />
                  <span>绪论（课件）</span>
                </div>
                <div class="course-nav">
                  <img src="@/common/images/center.jpg" alt />
                  <span>课程内容</span>
                </div>
              </div>
              <div class="main">
                <p>系统信息：课程直播已开始。</p>
                <div class="message" v-for="item in 25" :key="item">
                  <span>刘东：</span>
                  <span>老师好</span>
                </div>
              </div>
              <div class="inp">
                <i class="el-icon-picture-outline-round"></i>
                <input type="text" />
                <span>发送</span>
              </div>
            </div>
          </el-col>
        </el-col>
      </el-row>
      <el-dialog title="录制" class="transcribe" :visible.sync="transcribeShow" width="60%">
        <img style="width:100%;height:100%" src="@/common/images/banner03.png" alt />
        <div class="left"></div>
        <div class="right"></div>
        <div class="top"></div>
        <div class="bottom"></div>
        <div class="time">00:00:00</div>
        <div class="rec">
          <span></span>
          <span>REC</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="finishAction">结束</el-button>
          <el-button @click="transcribeShow = false">取 消</el-button>
        </span>
      </el-dialog>
      <el-dialog title="录制" class="finish" :visible.sync="finishShow" width="60%">
        <img style="width:100%;height:100%" src="@/common/images/banner03.png" alt />
        <div class="left"></div>
        <div class="right"></div>
        <div class="top"></div>
        <div class="bottom"></div>
        <div class="time">01:45:48</div>
        <div class="rec">
          <span></span>
          <span>REC</span>
        </div>
        <div class="img">
          <img src="@/common/images/audio.png" alt />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="finishShowAction">上传</el-button>
          <el-button @click="finishShowAction">保存</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectIndex: 3,
      transcribeShow: false,
      finishShow: false
    };
  },
  methods: {
    navAction(index) {
      this.selectIndex = index;
    },
    transcribeAction() {
      this.transcribeShow = true;
    },
    finishAction() {
      // this.transcribeShow = false;
      this.finishShow = true;
    },
    finishShowAction() {
      this.finishShow = false;
      this.transcribeShow = false;
    }
  }
};
</script>


<style lang="scss" scoped>
.lecture {
  width: 100%;
  background-color: #f2f2f2;
  .container {
    font-size: 12px;
    background-color: #f2f2f2;
    .catalogue {
      position: relative;
      .title {
        background-color: #fff;
        font-size: 16px;
        font-weight: 700;
        line-height: 67px;
        padding-left: 20px;
        height: 67px;
      }
      .list-box {
        height: 679px;
        overflow-y: auto;
        &::-webkit-scrollbar {
          display: none;
        }
        .list {
          height: 67px;
          background-color: #f2f2f2;
          border-bottom: 1px solid #fff;
          line-height: 67px;
          padding-left: 20px;
          font-size: 14px;
        }
        .active {
          height: 67px;
          background-color: #fff;
          line-height: 67px;
          padding-left: 20px;
          font-size: 14px;
        }
      }
      .packUp {
        position: absolute;
        right: -35px;
        top: 320px;
        text-align: center;
        line-height: 69px;
        height: 69px;
        width: 69px;
        background-color: #fff;
        border-radius: 50%;
        font-size: 14px;
      }
    }
    .video {
      p {
        font-size: 18px;
        height: 67px;
        line-height: 67px;
        padding-left: 20px;
        border-left: 1px solid #f2f2f2;
        background-color: #fff;
      }
      .img {
        height: 679px;
        background-color: #c7c5c5;
        background-size: cover;
        padding: 40px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        background-color: #fff;
        font-size: 14px;
        line-height: 67px;
        padding-right: 40px;
        height: 67px;
        text-align: right;
        span {
          margin-right: 20px;
          display: inline-block;
          cursor: pointer;
        }
        i {
          font-size: 24px;
          display: inline-block;
        }
      }
    }
    .chat {
      margin-left: 15px;
      background-color: #fff;
      .title {
        line-height: 36px;
        padding-left: 20px;
        font-size: 14px;
        border-bottom: 1px solid #999;
      }
      .course {
        padding: 15px 15px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-bottom: 1px solid #999;
        margin-bottom: 15px;
        .course-nav {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 33.33%;
          img {
            width: 36px;
            height: 36px;
          }
        }
      }
      .main {
        height: 573px;
        overflow-y: auto;
        border-bottom: 1px solid #999;
        &::-webkit-scrollbar {
          display: none;
        }
        padding: 15px;
        p {
          margin-bottom: 30px;
          color: #617fa5;
        }
        .message {
          line-height: 26px;
          span:nth-of-type(1) {
            color: #617fa5;
          }
        }
      }
      .inp {
        padding: 30px 10px;
        display: flex;
        position: relative;
        input {
          width: 80%;
          height: 44px;
          border-bottom-left-radius: 5px;
          border-top-left-radius: 5px;
          border: 1px solid #617fa5;
          padding-left: 30px;
        }
        i {
          position: absolute;
          top: 40px;
          left: 15px;
          font-size: 24px;
        }
        span {
          width: 20%;
          height: 44px;
          background-color: #617fa5;
          color: #fff;
          display: inline-block;
          border-bottom-right-radius: 5px;
          border-top-right-radius: 5px;
          text-align: center;
          line-height: 44px;
          cursor: pointer;
        }
      }
    }
  }
}

.container .transcribe /deep/ .el-dialog .el-dialog__body {
  position: relative;
  padding: 0;
  margin: 20px;
  .left {
    position: absolute;
    top: 0;
    left: 0;
    width: 116px;
    height: 48px;
    border-left: 3px solid #000;
    border-top: 3px solid #000;
  }
  .right {
    position: absolute;
    top: 0;
    right: 0;
    width: 116px;
    height: 48px;
    border-right: 3px solid #000;
    border-top: 3px solid #000;
  }
  .bottom {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 116px;
    height: 48px;
    border-right: 3px solid #000;
    border-bottom: 3px solid #000;
  }
  .top {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 116px;
    height: 48px;
    border-left: 3px solid #000;
    border-bottom: 3px solid #000;
  }
  .time {
    position: absolute;
    bottom: 0;
    left: 121px;
    font-size: 20px;
    color: #000;
  }
  .rec {
    position: absolute;
    top: 0;
    left: 121px;
    display: flex;
    margin-left: 15px;
    span:nth-of-type(1) {
      width: 21px;
      height: 21px;
      background-color: #08f108;
      display: inline-block;
      border-radius: 50%;
    }
    span:nth-of-type(2) {
      margin-left: 5px;
      font-size: 20px;
      font-weight: 600;
    }
  }
}

.container .finish /deep/ .el-dialog .el-dialog__body {
  position: relative;
  padding: 0;
  margin: 20px;
  .left {
    position: absolute;
    top: 0;
    left: 0;
    width: 116px;
    height: 48px;
    border-left: 3px solid #000;
    border-top: 3px solid #000;
  }
  .right {
    position: absolute;
    top: 0;
    right: 0;
    width: 116px;
    height: 48px;
    border-right: 3px solid #000;
    border-top: 3px solid #000;
  }
  .bottom {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 116px;
    height: 48px;
    border-right: 3px solid #000;
    border-bottom: 3px solid #000;
  }
  .top {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 116px;
    height: 48px;
    border-left: 3px solid #000;
    border-bottom: 3px solid #000;
  }
  .time {
    position: absolute;
    bottom: 0;
    left: 121px;
    font-size: 20px;
    color: #000;
  }
  .rec {
    position: absolute;
    top: 0;
    left: 121px;
    display: flex;
    margin-left: 15px;
    span:nth-of-type(1) {
      width: 21px;
      height: 21px;
      background-color: red;
      display: inline-block;
      border-radius: 50%;
    }
    span:nth-of-type(2) {
      margin-left: 5px;
      font-size: 20px;
      font-weight: 600;
    }
  }
  .img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>