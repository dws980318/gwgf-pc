<template>
  <div class="header-con">
    <div class="container">
      <div class="header-main">
        <div class="logo" @click="$router.push('/index')">
          <img src="@/common/images/login.png" alt />
        </div>
        <div class="main-nav" v-if="$store.state.isLogin === '1'">
          <ul>
            <li @click="indexAction">首页</li>
            <li @click="commentAction">互动讨论</li>
            <li @click="teachAction">课程教学</li>
            <li @click="activityAction">专业活动</li>
            <li @click="resourceAction">课程评估</li>
            <li @click="discussAction">精品资源</li>
          </ul>
        </div>
        <div class="main-nav" v-if="$store.state.isLogin === '0'">
          <ul>
            <li @click="indexAction">首页</li>
            <li @click="commentAction">互动讨论</li>
            <li @click="teachAction">课程学习</li>
            <li @click="activityAction">专业活动</li>
            <li @click="resourceAction">作业管理</li>
            <li @click="discussAction">精品资源</li>
          </ul>
        </div>
        <div class="main-right">
          <!-- <div class="main-left">
            <img src="@/common/images/fphone.png" alt />
            <p>客户端</p>
          </div>-->

          <div class="main-content">
            <input type="text" placeholder="搜索感兴趣的课程" />
            <div class="icon">
              <img src="@/common/images/search.png" alt />
            </div>
          </div>
          <div style="color: #fff;min-width:44px;">{{ form.accountname }}</div>
          <div class="right">
            <el-dropdown
              style="width:50px; height: 100%;"
              trigger="click"
              @command="setting"
            >
              <img :src="imgurl ? imgurl : avator" alt />
              <el-dropdown-menu slot="dropdown" style="text-align: center;">
                <span
                  class="drop_title"
                  style="line-height: 40px; pointer-events: none"
                  >{{ form.realName }}</span
                >
                <el-dropdown-item icon="el-icon-s-tools" command="seting"
                  >设置</el-dropdown-item
                >
                <el-dropdown-item icon="el-icon-user" command="info"
                  >个人中心</el-dropdown-item
                >
                <el-dropdown-item icon="el-icon-switch-button" command="logout"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
            <!-- <span></span> -->
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
      form: {
        accountname: "",
        realName: ""
      },
      imgurl: "",
      avator: userImg,
      isLogin: ""
    };
  },
  created() {
    this.$store.state.isLogin = localStorage.isLogin
      ? localStorage.isLogin
      : this.$store.state.isLogin;
    if (localStorage.list) {
      this.form = JSON.parse(localStorage.list);
    }
    this.imgurl = this.downloadfileUrl + this.form.photo;
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
    commentAction() {
      this.$router.push("/comment");
    },
    indexAction() {
      this.$router.push("/index");
    },
    teachAction() {
      this.$router.push("/teach");
    },
    resourceAction() {
      this.$router.push("/resource");
    },
    discussAction() {
      this.$router.push("/assess");
    },
    activityAction() {
      this.$router.push("/activity");
    },
    studyAction() {
      this.$router.push("/study");
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
}
/*标题栏*/
.header-con {
  width: 100%;
  height: 51px;
  background-color: #333;
}
.header-con .container {
  font-size: 14px;
}
.header-con .container .header-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 51px;
  background-color: #333;
  margin: auto;
  font-size: 14px;
}
.header-con .logo {
  cursor: pointer;
  width: 220px;
  height: 47px;
}
.header-con .logo img {
  width: 100%;
  height: 100%;
}
.main-nav {
  flex: 1;
  height: 51px;
}
.main-nav ul {
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.main-nav ul li {
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
.main-right {
  width: 440px;
  height: 51px;
  @include flex;
}
.main-right .main-left {
  display: flex;
  width: 120px;
}
.main-right .main-left img {
  width: 28px;
  height: 28px;
  cursor: pointer;
}
.main-right .main-left p {
  width: 40%;
  color: #fff;
  margin-left: 10px;
  cursor: pointer;
  line-height: 28px;
}
.main-right .main-content {
  display: flex;
  width: 260px;
  margin-right: 25px;
  margin-left: 25px;
}
.main-right .main-content input {
  border: 2px solid #617fa5;
  padding: 0 10px;
  flex: 1;
}
.main-right .main-content input::-webkit-input-placeholder {
  color: #000;
}
.main-right .main-content .icon {
  width: 37px;
  height: 30px;
  background-color: #617fa5;
  text-align: center;
  cursor: pointer;
}
.main-right .main-content .icon img {
  width: 25px;
  height: 25px;
  margin: 3px auto;
}
.main-right .right {
  width: 50px;
  @include flex;
  height: 100%;
}
.main-right .right div {
  cursor: pointer;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.main-right .right img {
  height: 80%;
  width: 80%;
  border-radius: 50%;
  border: 1px solid #fff;
  cursor: pointer;
}
/*标题栏.end*/
</style>
