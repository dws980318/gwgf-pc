<template>
  <el-dialog custom-class="dialog_class" :visible.sync="$store.state.dialogVisible" width="450px">
    <span slot="title">欢迎登陆</span>
    <div id="dialog-body">
      <div class="small_tab">
        <div class="tab_conent">
          <el-form ref="checkForm" :model="form" :rules="rules">
            <el-col :span="24">
              <el-form-item prop="username">
                <el-input
                  clearable
                  type="text"
                  @keyup.enter.native="login"
                  placeholder="请输入账号"
                  v-model="form.username"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="password">
                <el-input
                  type="password"
                  name="password"
                  placeholder="请输入密码"
                  v-model="form.password"
                  clearable
                  show-password
                  @keyup.enter.native="login"
                ></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="14">
              <el-input type="text" name="code" class="code" placeholder="验证码" v-model="code"></el-input>
            </el-col>
            <el-col :span="10">
              <div class="code_img" @click="refreshCode">
                <s-identify :content-width="145" :content-height="40" :identifyCode="identifyCode"></s-identify>
              </div>
            </el-col>-->
            <el-col :span="12">
              <!-- <el-checkbox type="success" v-model="service">我同意《服务条款》</el-checkbox> -->
              <!-- <el-checkbox type="success" v-model="autoLoginWeek">10天内自动登录</el-checkbox> -->
            </el-col>
            <el-col :span="12">
              <el-col :span="12">
                <!-- <p class="lost" @click="showPassword">忘记密码</p> -->
              </el-col>
              <el-col :span="12">
                <p class="register" @click="registerAction">去注册</p>
              </el-col>
            </el-col>
            <el-col :span="24">
              <!-- @keyup.enter.native="login()" -->
              <el-button class="loginButton" @click="login">登录</el-button>
            </el-col>
          </el-form>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import SIdentify from "./common/Code";
export default {
  name: "Login",
  components: {
    SIdentify
  },
  data() {
    return {
      active: 0,
      form: {
        username: "",
        password: ""
      },
      code: "",
      autoLoginWeek: true,
      service: false,

      identifyCodes:
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxzy",
      identifyCode: "",
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  created() {
    // this.init.addRoute(0);
    // this.keyupSubmit();
  },
  methods: {
    changeTab(index) {
      this.active = index;
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      // console.log(this.identifyCode)
    },
    keyupSubmit() {
      let that = this;
      document.onkeypress = function(e) {
        const keycode = document.all ? event.keyCode : e.which;
        if (keycode == 13) {
          that.login(); // 登录方法名
          return false;
        }
      };
    },
    login() {
      const code = this.code.toLowerCase();
      const identifyCode = this.identifyCode.toLowerCase();
      this.$refs["checkForm"].validate(valid => {
        if (valid) {
          // if (code === identifyCode) {
          this.api.login(this.form).then(res => {
            console.log(res);
            if (res.status === 200) {
              this.$store.state.dialogVisible = false;
              this.$message.success(res.message);
              localStorage.login = true;
              localStorage.list = JSON.stringify(res.data);
              localStorage.token = res.data.token;
              if (res.data.positionId === "teacher") {
                this.$store.commit("setIsLogin", 1);
                this.init.addRoute(1);
              } else {
                this.$store.commit("setIsLogin", 0);
                this.init.addRoute(0);
              }
              // if (localStorage.showLogin) {
              //   this.$router.replace("/index");
              //   location.href = "./index.html#" + this.$route.path;
              // } else {
              this.$router.replace("/index");
              location.href = "./index.html";
              // }
            } else {
              this.$message.error(res.message);
            }
          });
          // } else {
          //   this.$message.error("验证码输入错误，请重新输入");
          // }
        } else {
          return false;
        }
      });
    },
    registerAction() {
      this.$store.commit("showLoginModal", false);
      this.$store.commit("showRegisterModal", true);
    },
    showPassword() {
      this.$store.commit("showPasswordModal", true);
    }
  }
};
</script>

<style scoped>
.small_nav {
  display: flex;
  width: 100%;
  height: 35px;
}
.small_item {
  cursor: pointer;
  position: relative;
  flex: 1;
  text-align: center;
  font-size: 16px;
  line-height: 35px;
  color: #999;
}
.small_item:before {
  content: "";
  position: absolute;
  left: 0;
  top: 10px;
  width: 1px;
  height: 15px;
  background: #999;
}
.small_item:first-of-type:before {
  width: 0px;
}
.small_nav .active {
  color: #617fa5;
  font-weight: 700;
}
.small_tab {
  width: 100%;
  height: auto;
}
.small_tab .tab_conent {
  width: 100%;
  height: 350px;
  padding: 40px 30px 20px 30px;
}
input {
  margin: 0 0 20px;
  padding: 0 10px;
}
input:focus {
  outline: none !important;
  border-color: #617fa5;
}
input::placeholder {
  color: #ccc;
}
.username,
.password,
.code {
  height: 40px;
  line-height: 40px;
  color: #333;
  padding-right: 10px;
  font-size: 12px;
  background: transparent;
}
.code_img {
  height: 40px;
  background: #000;
  margin: 0 0 20px;
}
.lost,
.register {
  /*font-size: 12px;*/
  display: block;
  text-align: center;
  color: #617fa5;
  text-decoration: none;
  cursor: pointer;
}
.loginButton {
  width: 100%;
  background-color: #617fa5;
  color: #fff;
  border: none;
  border-radius: 0;
  margin-top: 45px;
}
el-checkbox__input.is-checked >>> el-checkbox__inner {
  background-color: red !important;
  border-color: red !important;
}
</style>
