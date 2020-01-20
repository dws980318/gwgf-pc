<template>
  <el-dialog custom-class="dialog_class" :visible.sync="$store.state.registerVisible" width="450px">
    <span slot="title">欢迎注册</span>
    <div id="dialog-body">
      <div class="small_tab">
        <div class="tab_conent">
          <el-form ref="checkForm" :model="form" :rules="rules">
            <el-row>
              <el-col :span="24">
                <el-form-item prop="username">
                  <el-input clearable type="text" placeholder="请输入账号" v-model="form.username"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item prop="rname">
                  <el-input clearable type="text" placeholder="请输入真实姓名" v-model="form.rname"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item prop="aname">
                  <el-input clearable type="text" placeholder="请输入昵称" v-model="form.aname"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item prop="code">
                  <el-input clearable type="text" placeholder="请输入学号" v-model="form.code"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item prop="password">
                  <el-input
                    type="password"
                    placeholder="请输入密码"
                    v-model="form.password"
                    clearable
                    show-password
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item prop="verifyPassword">
                  <el-input
                    type="password"
                    placeholder="请再次输入密码"
                    v-model="form.verifyPassword"
                    clearable
                    show-password
                  ></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="14">
            <input type="text" name="code" class="el-col-24 code" placeholder="验证码" v-model="code" />
          </el-col>
          <el-col :span="10">
            <el-button style="width: 138px;margin-left: 10px;" v-show="timeshow" @click="getCode">{{btntext}}</el-button>
            <el-button style="width: 138px;" v-show="!timeshow">{{count}} s</el-button>
              </el-col>-->
              <!-- <el-col :span="12">
            <el-checkbox type="success" v-model="service">我同意《服务条款》</el-checkbox>
            <el-checkbox type="success" v-model="autoLoginWeek">10天内自动登录</el-checkbox>
              </el-col>-->
              <el-col :span="12">
                <el-col :span="12">
                  <!-- <p class="lost">忘记密码</p> -->
                </el-col>
                <el-col :span="12">
                  <p class="register" @click="loginAction">去登陆</p>
                </el-col>
              </el-col>
              <el-col :span="24">
                <el-form-item>
                  <el-button class="loginButton" @click="registerAction">注册</el-button>
                </el-form-item>
              </el-col>
            </el-row>
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
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!/^(\w){6,16}$/.test(value)) {
        callback(new Error("请输入6-16长的有效密码!"));
      } else {
        if (this.form.verifyPassword !== "") {
          this.$refs.checkForm.validateField("verifyPassword");
        }
        callback();
      }
      callback();
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      }
      callback();
    };
    var checkAge = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入账号"));
      }
      setTimeout(() => {
        if (!/^[0-9a-zA-Z]{5,16}$/.test(value)) {
          callback(new Error("请输入5-16位长的有效账号"));
        } else {
          callback();
        }
      }, 500);
    };
    var checkRname = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入真实姓名"));
      }
      setTimeout(() => {
        if (!/^[\u4e00-\u9fa5]{2,6}$/.test(value)) {
          callback(new Error("请输入2-6位长的真实姓名"));
        } else {
          callback();
        }
      }, 500);
    };
     var checkName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入昵称"));
      }
      // setTimeout(() => {
      //   if (!/^[\u4e00-\u9fa5]{2,6}$/.test(value)) {
      //     callback(new Error("请输入2-6位长的真实姓名"));
      //   } else {
          callback();
      //   }
      // }, 500);
    };
     var checkCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入学号"));
      }
      // setTimeout(() => {
      //   if (!/^[\u4e00-\u9fa5]{2,6}$/.test(value)) {
      //     callback(new Error("请输入2-6位长的真实姓名"));
      //   } else {
          callback();
      //   }
      // }, 500);
    };
    return {
      active: 0,
      code: "",
      autoLoginWeek: true,
      service: false,
      timeshow: true,
      count: "",
      btntext: "发送短信",
      timer: null,
      form: {
        username: "",
        password: "",
        verifyPassword: "",
        rname: "",
        aname: "",
        code: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        verifyPassword: [{ validator: validatePass2, trigger: "blur" }],
        username: [{ validator: checkAge, trigger: "blur" }],
        rname: [{ validator: checkRname, trigger: "blur" }],
        aname: [{ validator: checkName, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }],
      }
    };
  },
  methods: {
    // 倒计时
    // getCode() {
    //   // this.verification();
    //   // 注册短信验证码
    //   // console.log(res.code);
    //   // console.log(res.data.sessionId);
    //   const TIME_COUNT = 60;
    //   if (!this.timer) {
    //     this.count = TIME_COUNT;
    //     this.timeshow = false;
    //     this.timer = setInterval(() => {
    //       if (this.count > 0 && this.count <= TIME_COUNT) {
    //         this.count--;
    //       } else {
    //         this.btntext = "重发验证码";
    //         this.timeshow = true;
    //         clearInterval(this.timer);
    //         this.timer = null;
    //       }
    //     }, 1000);
    //   }
    // },
    // login() {
    //   const code = this.code.toLowerCase();
    //   const identifyCode = this.identifyCode.toLowerCase();
    //   if (code === identifyCode) {
    //     this.$store.state.dialogVisible = false;
    //     this.$store.state.isLogin = 1;
    //   } else {
    //     this.$message.error("验证码输入错误，请重新输入");
    //   }
    // },
    loginAction() {
      this.$store.commit("showRegisterModal", false);
      this.$store.commit("showLoginModal", true);
    },
    registerAction() {
      this.$refs["checkForm"].validate(valid => {
        if (valid) {
          console.log(111);
          this.api.register(this.form).then(res => {
            console.log(res);
            if (res.status === 200) {
              this.$message.success(res.message);
              this.$store.commit("showRegisterModal", false);
            } else {
              this.$message.error(res.message);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
  min-height: 450px;
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
  border: solid 1px #ccc;
  color: #333;
  padding: 0 10px;
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
