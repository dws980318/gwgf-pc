<template>
  <div class="banner">
    <div class="container">
      <div class="header">
        <div class="nav">
          <ul style="height: 100%;">
            <li>
              <img @click="$router.push('/index')" src="@/common/images/logo1.png" alt />
            </li>
          </ul>
        </div>

        <div class="main-right" v-if="!$store.state.login">
          <span @click="loginAction">登录</span>
          <span @click="registerAction">注册</span>
        </div>
        <div class="right" v-else>
          <!-- <div @click="discussActions">设置</div>
          <div @click="personalAction">{{form.accountname}}</div>
          <span @click="logout">退出</span>-->
          <span class="span">{{form.accountname}}</span>
          <el-dropdown style trigger="click" @command="setting">
            <img :src="imgurl?imgurl:avator" alt />
            <el-dropdown-menu slot="dropdown" style="text-align: center;">
              <span
                class="drop_title"
                style="line-height: 40px; pointer-events: none"
              >{{form.accountname}}</span>
              <el-dropdown-item icon="el-icon-s-tools" command="seting">设置</el-dropdown-item>
              <el-dropdown-item icon="el-icon-user" command="info">个人中心</el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button" command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dialog title="点击确定将退出" :visible.sync="dialogVisible" width="30%">
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="logoutAction">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
      <div style="flex:1;" v-if="$store.state.isLogin">
        <div class="navList" v-if="$store.state.isLogin === '0'">
          <!-- <transition
          enter-active-class="bounce-enter-active"
          leave-active-class="bounce-leave-active"
          >-->
          <div class="home-box">
            <div class="home" @click="$router.push('/teach/list')">课程学习</div>
          </div>
          <!-- </transition> -->
          <div class="activity-box">
            <!-- <div class="activity" @mouseenter="enter" @mouseleave="leave">专业活动</div> -->
            <div class="activity" @click="$router.push('/activity/course/list')">专业活动</div>
          </div>
          <div class="assess-box">
            <div class="assess" @click="$router.push('/assess/checked/list')">精品资源</div>
          </div>
          <div class="work-box">
            <div class="work" @click="$router.push('/comment/list')">互动讨论</div>
          </div>
          <div class="teach-box">
            <div class="teach" @click="$router.push('/resource/work/list')">作业管理</div>
          </div>
          <div class="comment-box">
            <a class="comment" style="color: #fff;" href="#miao">自我演练</a>
            <!-- <div class="comment" @click="$router.push('/comment/list')">自我演练</div> -->
          </div>
        </div>
        <div class="navList" v-else>
          <div class="home-box">
            <div class="home" @click="$router.push('/teach/list')">课程教学</div>
          </div>
          <div class="activity-box">
            <div class="activity" @click="$router.push('/activity/course/list')">专业活动</div>
          </div>
          <div class="assess-box">
            <div class="assess" @click="$router.push('/assess/checked/list')">精品资源</div>
          </div>
          <div class="work-box">
            <div class="work" @click="$router.push('/comment/list')">互动讨论</div>
          </div>
          <div class="teach-box">
            <div class="teach" @click="$router.push('/resource/work/list')">课程评估</div>
          </div>
          <div class="comment-box">
            <a class="comment" style="color: #fff;" href="#miao">自我演练</a>
            <!-- <div class="comment" @click="$router.push('/comment/list')">自我演练</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userImg from "@/common/images/u267.jpg";
export default {
  name: "Head",
  data() {
    return {
      list: [],
      selectIndex: 0,
      form: {
        accountname: "",
        realName: "",
        photo: userImg
      },
      avator: userImg,
      dialogVisible: false,
      show: false
    };
  },
  created() {
    if (localStorage.list) {
      this.form = JSON.parse(localStorage.list);
    }
    this.imgurl = this.downloadfileUrl + this.form.photo;
    this.$store.state.login = localStorage.login
      ? localStorage.login
      : this.$store.state.login;
    this.$store.state.isLogin = localStorage.isLogin
      ? localStorage.isLogin
      : this.$store.state.isLogin;
  },
  methods: {
    setting(event) {
      if (event === "logout") {
        this.api.logout().then(res => {
          console.log(res);
          this.$message.success(res.message);
          this.dialogVisible = false;
          this.$router.replace("/login");
          setTimeout(() => {
            location.reload();
            this.$store.commit("clearLogin", true);
          }, 300);
        });
      } else if (event === "info") {
        this.$router.push("/personal");
      } else if (event === "seting") {
        this.$router.push("/discuss");
      }
    },
    logoutAction() {
      this.api.logout().then(res => {
        this.$message.success(res.message);
        this.dialogVisible = false;
        this.$router.replace("/login");
        setTimeout(() => {
          location.reload();
          this.$store.commit("clearLogin", true);
        }, 300);
      });
    },
    logout() {
      this.dialogVisible = true;
    },
    loginAction() {
      this.$store.commit("showLoginModal", true);
    },
    registerAction() {
      this.$store.commit("showRegisterModal", true);
    }
  }
};
</script>

<style scoped lang="scss" type="text/css">
@mixin flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  // @include flex;
}
.banner {
  height: 884px;
  background-image: url("../common/images/banner.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  .container {
    font-size: 12px;
    background: rgba(0, 0, 0, 0);
    height: 884px;
    display: flex;
    flex-direction: column;
    .header {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 100%;
      height: 134px;
      .nav {
        height: 100%;
        width: 100%;
        ul {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          li {
            span {
              font-size: 26px;
              font-family: SourceHanSansCN;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
              line-height: 107px;
              padding: 8px;
              line-height: 134px;
              cursor: pointer;
              &.active {
                border-bottom: 4px solid #fff;
              }
            }
            img {
              width: 320px;
              height: 76px;
              cursor: pointer;
            }
          }
        }
      }
    }
    .navList {
      height: 100%;
      width: 100%;
      position: relative;
      .home-box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 181px;
        height: 181px;
        background: rgba(106, 196, 243, 0.6);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        line-height: 164px;
        font-weight: 600;
        font-size: 30px;
        font-family: SourceHanSansCN;
        color: #fff;
        // animation: cloudMove 2s linear infinite;
        .home {
          width: 164px;
          height: 164px;
          background: rgba(106, 196, 243, 0.7);
          border-radius: 50%;
          cursor: pointer;
          &::before {
            content: "";
            position: absolute;
            left: -238px;
            top: 12px;
            width: 100%;
            box-sizing: border-box;
            border-bottom: 2px solid rgba(149, 204, 239, 1);
            transform-origin: bottom center;
            transform: rotateZ(17deg) scale(1.614);
          }
        }
      }
      .activity-box {
        position: absolute;
        top: 68px;
        left: 760px;
        width: 129px;
        height: 129px;
        background: rgba(106, 196, 243, 0.6);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        line-height: 112px;
        font-weight: 600;
        font-size: 20px;
        font-family: SourceHanSansCN;
        color: #fff;
        // animation: cloudMove 2s linear infinite;
        .activity {
          width: 112px;
          height: 112px;
          background: rgba(106, 196, 243, 0.7);
          border-radius: 50%;
          cursor: pointer;
          &::before {
            content: "";
            position: absolute;
            left: -91px;
            top: 169px;
            width: 100%;
            box-sizing: border-box;
            border-bottom: 3px solid rgba(149, 204, 239, 1);
            transform-origin: bottom center;
            transform: rotateZ(132deg) scale(1.04);
          }
        }
      }
      .assess-box {
        position: absolute;
        top: 250px;
        right: 120px;
        width: 135px;
        height: 135px;
        background: rgba(106, 196, 243, 0.6);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        line-height: 118px;
        font-weight: 600;
        font-size: 20px;
        font-family: SourceHanSansCN;
        color: #fff;
        // animation: cloudMove 2s linear infinite;
        .assess {
          width: 118px;
          height: 118px;
          background: rgba(106, 196, 243, 0.7);
          border-radius: 50%;
          cursor: pointer;
          &::before {
            content: "";
            position: absolute;
            left: -69px;
            top: 190px;
            width: 100%;
            box-sizing: border-box;
            border-bottom: 3px solid rgba(149, 204, 239, 1);
            transform-origin: bottom center;
            transform: rotateZ(121deg) scale(1.014);
          }
          &::after {
            content: "";
            position: absolute;
            left: -213px;
            top: 97px;
            width: 100%;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            border-bottom: 2px solid #95ccef;
            -webkit-transform-origin: bottom center;
            transform-origin: bottom center;
            -webkit-transform: rotateZ(121deg) scale(1.014);
            transform: rotateZ(169deg) scale(2.014);
          }
        }
      }
      .work-box {
        position: absolute;
        bottom: 80px;
        right: 260px;
        width: 177px;
        height: 177px;
        background: rgba(106, 196, 243, 0.6);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        line-height: 160px;
        font-weight: 600;
        font-size: 26px;
        font-family: SourceHanSansCN;
        color: #fff;
        // animation: cloudMove 2s linear infinite;
        .work {
          width: 160px;
          height: 160px;
          background: rgba(106, 196, 243, 0.7);
          border-radius: 50%;
          cursor: pointer;
          &::before {
            content: "";
            position: absolute;
            left: -144px;
            top: -15px;
            width: 100%;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            border-bottom: 4px solid #95ccef;
            -webkit-transform-origin: bottom center;
            transform-origin: bottom center;
            -webkit-transform: rotateZ(121deg) scale(1.014);
            transform: rotateZ(33deg) scale(0.884);
          }
        }
      }
      .teach-box {
        position: absolute;
        bottom: 90px;
        left: 260px;
        width: 155px;
        height: 155px;
        background: rgba(106, 196, 243, 0.6);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        line-height: 138px;
        font-weight: 600;
        font-size: 26px;
        font-family: SourceHanSansCN;
        color: #fff;
        // animation: cloudMove 2s linear infinite;
        .teach {
          width: 138px;
          height: 138px;
          background: rgba(106, 196, 243, 0.7);
          border-radius: 50%;
          cursor: pointer;
          &::before {
            content: "";
            position: absolute;
            left: 142px;
            top: -20px;
            width: 100%;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            border-bottom: 3px solid #95ccef;
            -webkit-transform-origin: bottom center;
            transform-origin: bottom center;
            -webkit-transform: rotateZ(121deg) scale(1.014);
            transform: rotateZ(145deg) scale(1.08);
          }
        }
      }
      .comment-box {
        position: absolute;
        top: 160px;
        left: 140px;
        width: 117px;
        height: 117px;
        background: rgba(106, 196, 243, 0.6);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        line-height: 100px;
        font-weight: 600;
        font-size: 18px;
        font-family: SourceHanSansCN;
        color: #fff;
        // animation: cloudMove 2s linear infinite;
        .comment {
          width: 100px;
          height: 100px;
          background: rgba(106, 196, 243, 0.7);
          border-radius: 50%;
          cursor: pointer;
          &::before {
            content: "";
            position: absolute;
            left: 311px;
            top: 11px;
            width: 100%;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            border-bottom: 1px solid #95ccef;
            -webkit-transform-origin: bottom center;
            transform-origin: bottom center;
            -webkit-transform: rotateZ(121deg) scale(1.014);
            transform: rotateZ(172deg) scale(4.08);
          }
          &::after {
            content: "";
            position: absolute;
            left: 64px;
            top: 231px;
            width: 100%;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            border-bottom: 2px solid #95ccef;
            -webkit-transform-origin: bottom center;
            transform-origin: bottom center;
            -webkit-transform: rotateZ(121deg) scale(1.014);
            transform: rotateZ(71deg) scale(2.05);
          }
        }
      }
    }
  }
}
.main-right {
  padding: 0 20px;
  box-sizing: border-box;
  width: 140px;
  @include flex;
  font-size: 16px;
  position: absolute;
  right: 0;
  top: 56px;
}
.main-right span {
  position: relative;
  width: 50px;
  cursor: pointer;
  color: rgba(255, 255, 255, 1);
}
.main-right span:nth-of-type(2):before {
  content: "";
  position: absolute;
  top: 5px;
  left: -11px;
  width: 2px;
  height: 14px;
  background-color: #999;
}
.right {
  position: absolute;
  right: 0;
  top: 43px;
  margin: 0 10px;
  box-sizing: border-box;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: Center;
}
.right .span {
  font-size: 16px;
  margin-right: 15px;
}
.right div {
  cursor: pointer;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 49px;
  height: 49px;
  border-radius: 50%;
  border: 1px solid #fff;
}
.right img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
  border: 1px solid #fff;
  cursor: pointer;
}
@keyframes cloudMove {
  0% {
    transform: translate(-50%, -50%);
  }
  50% {
    transform: translate(-50%, -60%);
  }
  100% {
    transform: translate(-50%, -50%);
  }
}

.bounce-enter-active {
  animation: cloudMove 0.5s;
}
.bounce-leave-active {
  animation: cloudMove 0.5s reverse;
}
</style>
