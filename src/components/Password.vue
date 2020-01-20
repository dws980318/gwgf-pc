<template>
  <el-dialog title="修改密码" :visible.sync="$store.state.passwordVisible" width="30%">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="新密码" prop="password">
        <el-input clearable type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="verifyPassword">
        <el-input clearable type="password" v-model="ruleForm.verifyPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (value.toString().length < 6 || value.toString().length > 18) {
        callback(new Error("新密码长度为6 - 18个字符"));
      } else if (this.ruleForm.verifyPassword !== "") {
        this.$refs.ruleForm.validateField("verifyPassword");
      }
      callback();
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      ruleForm: {
        password: "",
        verifyPassword: ""
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        verifyPassword: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    handleEdit() {
      this.dialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.api.updateuserpassword(this.ruleForm).then(res => {
            if (res.status === 200) {
              this.$message.success("修改密码成功");
              this.dialogVisible = false;
              this.ruleForm = {};
            } else {
              this.$message.success(res.message);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.safety {
  padding: 60px 80px;
  .list {
    display: flex;
    justify-content: space-between;
    padding: 30px 0 30px 40px;
    border-bottom: 1px solid #ddd;
    position: relative;
    .list-left {
      display: flex;
      flex-direction: column;
      font-size: 14px;
      i {
        position: absolute;
        top: 34px;
        left: 0;
        font-size: 30px;
      }
      span:nth-of-type(2) {
        color: #999;
      }
    }
    /deep/ .el-button {
      margin-top: 10px;
      width: 73px;
      height: 29px;
      padding: 0;
      color: #fff;
      background-color: #617fa5;
    }
  }
}
</style>