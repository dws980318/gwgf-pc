<template>
  <!-- 通知管理 -->
  <div class="competition">
    <div class="competition-top">
      <div class="top-title">通知管理</div>
      <div>
        <el-button class="btn" @click="issueAction('form')">发布通知</el-button>
        <el-button @click="$router.back()">返回</el-button>
      </div>
    </div>
    <div class="form-box">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item class="w-35" label="通知标题" prop="title">
          <el-input clearable v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="通知类型" prop="notice_type">
          <el-select class="elnum" clearable v-model="form.notice_type" placeholder="请选择通知类型">
            <el-option
              v-for="item in options"
              :key="item.dicValue"
              :label="item.dicName"
              :value="item.dicValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item class="w-35" label="接收人">
          <el-select
            clearable
            style="width:100%;margin-bottom:10px;"
            v-model="form.value"
            placeholder="请选择课程"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select clearable style="width:100%;" v-model="form.value" placeholder="请选择学生">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="发布状态">
          <el-switch
            v-model="form.publishState"
            :active-value="1"
            :inactive-value="0"
            active-text="已发布"
            inactive-text="待发布"
            active-color="#13ce66"
            inactive-color="#999"
          ></el-switch>
        </el-form-item>
        <!-- <el-form-item label="封面图" prop="nickname">
          <div class="avator">
            <div class="avator_main">
              <img :src="form.logurl" alt />
            </div>
          </div>
        </el-form-item>
        <el-form-item prop="upload">
          <el-upload
            action="'/GatewayController/addImageManagement'"
            :limit="1"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <el-button type="primary" size="small">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              建议尺寸600*600 px；
              允许的图片格式：jpg/gif/bmp/png；
              大小不超过2M
            </div>
          </el-upload>
        </el-form-item>-->
        <el-form-item label="附件">
          <el-upload
            class="upload-demo"
            :action="fileUrl + '/uploadfile'"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleAvatarSuccess"
            multiple
            ref="upload"
            :file-list="fileList"
            :headers="{Authorization: tokens}"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">通知附件列表</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="通知详细内容" prop="content">
          <el-input type="textarea" rows="5" v-model="form.content " placeholder="请输入通知详细内容"></el-input>
        </el-form-item>
        <!-- <el-form-item class="w-65" label="通知详细内容">
          <tinymce-editor style="width: 100%;" v-model="form.content" ref="editor"></tinymce-editor>
        </el-form-item>-->
      </el-form>
    </div>
  </div>
</template>

<script>
import userImg from "@/common/images/center.jpg";
import TinymceEditor from "@/components/tinymce-editor";

export default {
  components: {
    TinymceEditor
  },
  data() {
    return {
      form: {
        title: "",
        publishState: "",
        content: "",
        fileId: "",
        notice_type: ""
      },
      fileList: [],
      options: [],
      rules: {
        title: [{ required: true, message: "请输入通知标题", trigger: "blur" }],
        notice_type: [
          { required: true, message: "请选择通知类型", trigger: "change" }
        ]
      },
      one: []
    };
  },
  created() {
    this.getActivityType();
    if (this.$route.params.id) {
      this.init(this.$route.params.id);
    }
  },
  methods: {
    getActivityType() {
      this.api.selectdic({ dictype: "通知类型" }).then(res => {
        console.log(res);
        this.options = res.data;
      });
    },
    //列表数据
    init(id) {
      this.api.getonenotice({ id: id }).then(res => {
        this.form = res.data;
        this.form.publishState = parseInt(this.form.publishState);
        if (this.form.fileId) {
          var one = this.form.fileId.split(",");
          console.log(one);
          for (let i in one) {
            let two = one[i].split("|");
            let file = {
              name: two[0],
              url: two[1]
            };
            this.fileList.push(file);
          }
        }
      });
    },
    getFile() {
      let files = this.$refs.upload.uploadFiles;
      let fileArr = [];
      files.map(item => {
        fileArr.push(item.name + "|" + item.url);
      });
      let fileStr = fileArr.join(",");
      return fileStr;
    },
    //新增 + 编辑
    issueAction(formName) {
      this.form.fileId = this.getFile();
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.$route.params.id) {
            this.api.addorupd_noticesave(this.form).then(res => {
              console.log(res);
              if (res.status === 200) {
                this.$message.success(res.message);
                this.$router.push("/discuss/notice/list");
              }
            });
          } else {
            this.api.addorupd_noticesave(this.form).then(res => {
              console.log(res);
              if (res.status === 200) {
                this.$message.success(res.message);
                this.$router.push("/discuss/notice/list");
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //附件点击下载
    handlePreview(file) {
      window.open(this.downloadfileUrl + file.url);
    },
    //删除附件
    handleRemove(file, fileList) {},
    //上传附件成功
    handleAvatarSuccess(res, file) {
      file.name = res.fileRealName;
      file.url = res.fileName;
    }
  }
};
</script>

<style lang="scss" scoped>
.competition {
  background-color: #fff;
  width: 100%;
  padding: 0 60px;
  .competition-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d7d7d7;
    .btn {
      width: 84px;
      height: 40px;
      background-color: #617fa5;
      color: #fff;
      padding: 0;
    }
    .top-title {
      font-size: 18px;
      line-height: 50px;
    }
  }
}
.form-box {
  width: 100%;
  margin: 0 auto;
  padding: 40px;
  .elnum {
    &/deep/ .el-input__inner {
      width: 350px;
    }
  }
}
.w-35 {
  width: 450px;
}
.w-65 {
  width: 800px;
}
.avator {
  width: 300px;
  height: 150px;
  border: 1px solid #617fa5;
}
.avator_main {
  width: 300px;
  height: 150px;
}
.avator_main img {
  width: 100%;
  height: 100%;
}
.avator_main button {
  margin: auto;
}
</style>
