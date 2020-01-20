<template>
  <div class="lecture">
    <div class="container">
      <a name="miao"></a>
      <el-row>
        <el-col :span="24" style="margin-bottom: 20px;">
          <h2 class="h2">
            <span>
              <i></i>自助演练学习
            </span>
          </h2>
          <el-col :span="24">
            <div class="video">
              <div class="img">
                <div class="number">68人模拟</div>
                <img
                  src="http://193.112.76.40:8090/downloadfile/2f42e630-88da-4b44-8d30-ba53f7616e97"
                  alt
                />
                <span>商务英语第一章</span>
              </div>
              <div class="title">
                <el-col :span="18" class="title-bottom">
                  <i class="iconfont iconall"></i>
                  <span>作品</span>
                  <i class="el-icon-microphone"></i>
                  <span>演练</span>
                  <i class="el-icon-video-camera"></i>
                  <span @click="transcribeAction">录制</span>
                  <i class="iconfont iconplay"></i>
                  <span>播放/回放</span>
                  <i class="el-icon-edit-outline"></i>
                  <span>点评反馈</span>
                </el-col>
              </div>
            </div>
          </el-col>
          <!-- <el-col :span="5">
            <div class="title">演练目录</div>
            <div class="list-box">
              <div
                :class="selectIndex === index ? 'active' : 'list'"
                v-for="(item, index) in 15"
                :key="index"
                @click="navAction(index)"
              >商务英语第一章</div>
            </div>
          </el-col>-->
        </el-col>
      </el-row>
      <el-dialog title="录制" class="transcribe" :visible.sync="transcribeShow" width="60%">
        <img
          style="width:100%;height:100%"
          src="http://193.112.76.40:8090/downloadfile/2f42e630-88da-4b44-8d30-ba53f7616e97"
          alt
        />
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
        <img
          style="width:100%;height:100%"
          src="http://193.112.76.40:8090/downloadfile/2f42e630-88da-4b44-8d30-ba53f7616e97"
          alt
        />
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
  background-color: #000;
  .container {
    font-size: 12px;
    background-color: #000;
    .title {
      background-color: #fff;
      font-size: 26px;
      font-weight: 700;
      line-height: 67px;
      padding-left: 20px;
      height: 67px;
      color: rgba(15, 141, 226, 1);
    }
    .list-box {
      height: 679px;
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      .list {
        height: 67px;
        background: rgba(255, 255, 255, 0.15);
        line-height: 67px;
        padding-left: 20px;
        font-size: 18px;
        cursor: pointer;
        color: rgba(255, 255, 255, 0.3);
        position: relative;
        &:hover {
          background-color: rgba(255, 255, 255, 0.3);
          &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 4px;
            background-color: rgba(15, 141, 226, 1);
          }
        }
      }
      .active {
        height: 67px;
        background: rgba(255, 255, 255, 0.3);
        line-height: 67px;
        padding-left: 20px;
        font-size: 18px;
        color: #fff;
        cursor: pointer;
        position: relative;
        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 4px;
          background-color: rgba(15, 141, 226, 1);
        }
      }
    }
    .h2 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 60px;
      height: 82px;
      font-size: 24px;
      font-weight: 400;
      span {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        i {
          margin-right: 10px;
          display: inline-block;
          width: 5px;
          height: 31px;
          background: rgba(15, 141, 226, 1);
        }
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
        position: relative;
        .number {
          background-color: #23b8ff;
          width: 141px;
          height: 47px;
          position: absolute;
          left: 20px;
          top: 40px;
          color: #fff;
          font-size: 18px;
          line-height: 47px;
          text-align: center;
        }
        img {
          width: 100%;
          height: 100%;
        }
        span {
          position: absolute;
          left: 40px;
          bottom: 80px;
          font-size: 54px;
          color: #fff;
        }
      }
      .title {
        background-color: #fff;
        font-size: 14px;
        height: 67px;
        .title-bottom {
          text-align: center;
          display: flex;
          text-align: center;
          align-items: center;
          span {
            margin-right: 20px;
            display: inline-block;
            text-align: center;
            cursor: pointer;
          }
          i {
            text-align: center;
            font-size: 24px;
            display: inline-block;
          }
        }
      }
    }
  }
}

.lecture .transcribe /deep/ .el-dialog .el-dialog__body {
  position: relative;
  padding: 0;
  margin: 20px;
  height: 50vh;
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

.lecture .finish /deep/ .el-dialog .el-dialog__body {
  position: relative;
  padding: 0;
  margin: 20px;
  height: 50vh;
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