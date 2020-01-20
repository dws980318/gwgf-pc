<template>
  <div class="courseDetails">
    <div class="container">
      <div class="details">
        <el-page-header @back="goBack" :content="$route.params.id ? '编辑' : '新增'"></el-page-header>
        <div class="form">
          <el-form ref="checkForm" :rules="rules" :model="form" label-width="150px">
            <el-form-item label="标题" prop="title">
              <el-input type="text" v-model="form.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="精品资源类型" prop="btrType">
              <el-select clearable v-model="form.btrType" placeholder="请选择精品资源类型">
                <el-option
                  v-for="item in options"
                  :key="item.dicValue"
                  :label="item.dicName"
                  :value="item.dicValue"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="URL" prop="link">
              <el-input type="text" v-model="form.link" placeholder="请输入URL"></el-input>
            </el-form-item>
            <el-form-item label="发布状态">
              <el-switch
                v-model="form.publish_state"
                :active-value="1"
                :inactive-value="0"
                active-text="已发布"
                inactive-text="待发布"
                active-color="#13ce66"
                inactive-color="#999"
              ></el-switch>
            </el-form-item>
            <el-form-item label="封面图" prop="nickname">
              <div class="avator_main">
                <img :src="form.img_id ? (downloadfileUrl + form.img_id) : imgurl" alt />
              </div>
            </el-form-item>
            <el-form-item prop="upload">
              <el-upload
                :action="fileUrl + '/uploadfile'"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :headers="{Authorization: tokens}"
              >
                <el-button type="primary" size="small">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                  建议尺寸300*200 px；
                  大小不超过1M
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item label="附件">
              <el-upload
                class="upload-demo"
                :action="fileUrl + '/uploadfile'"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                multiple
                ref="upload"
                :file-list="fileList"
                :headers="{Authorization: tokens}"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">精品资源附件列表</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="内容" prop="content">
              <el-input rows="5" type="textarea" v-model="form.content" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="dialogFormEdit()">确 定</el-button>
              <el-button size="small" @click="$router.back()">返回</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Details",
  data() {
    return {
      options: [],
      formrules: {},
      fileList: [],
      form: {
        title: "",
        publish_state: 1,
        content: "",
        file_id: "",
        link: "",
        btrType: "",
        img_id: ""
      },
      one: [],
      imgurl: "",
      rules: {
        title: [{ required: true, message: "请输入公告标题", trigger: "blur" }],
        btrType: [
          { required: true, message: "请选择精品资源类型", trigger: "change" }
        ],
        link: [{ required: true, message: "请输入链接", trigger: "blur" }]
      }
    };
  },
  watch: {},
  created() {
    this.getActivityType();
    if (this.$route.params.id) {
      this.init(this.$route.params.id);
    }
    console.log(this.one);
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    getActivityType() {
      this.api.selectdic({ dictype: "精品资源类型" }).then(res => {
        console.log(res);
        this.options = res.data;
      });
    },
    init(id) {
      this.api.getonebtqres({ id: id }).then(res => {
        this.form = res.data;
        if (this.form.file_id) {
          var one = this.form.file_id.split(",");
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
    //附件点击下载
    handlePreview(file) {
      window.open(this.downloadfileUrl + file.url);
    },
    //删除附件
    handleRemove(file, fileList) {},
    //上传附件成功
    handleSuccess(res, file) {
      file.name = res.fileRealName;
      file.url = res.fileName;
    },
    //上传附件成功
    handleAvatarSuccess(res, file) {
      this.imgurl = res.fileDownloadUri;
      this.form.img_id = res.fileName;
    },
    //上传附件的限制
    beforeAvatarUpload(file) {
      const isIMG = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/pjpeg",
        "image/gif",
        "image/bmp",
        "image/x-png"
      ];
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (isIMG.indexOf(file.type) === -1) {
        this.$message.error("上传文件只能是 图片 格式!");
        return false;
      }
      if (!isLt1M) {
        this.$message.error("上传图片大小不能超过 1MB!");
        return false;
      }
      return isIMG && isLt1M;
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
    dialogFormEdit() {
      this.form.file_id = this.getFile();
      this.$refs["checkForm"].validate(valid => {
        if (valid) {
          this.api.addorupd_btqressave(this.form).then(res => {
            console.log(res);
            if (res.status === 200) {
              this.$message.success(res.message);
              this.$router.push("/assess/checked/list");
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs["checkForm"].resetFields();
      this.fileList = [];
    }
  }
};
</script>


<style lang="scss" scoped>
.courseDetails {
  width: 100%;
  background-color: #f2f2f2;
  .container {
    background-color: #fff;
    font-size: 12px;
    padding: 20px;
    &/deep/ .el-input {
      width: 350px;
    }
    .elnum {
      &/deep/ .el-input {
        width: 100%;
      }
    }
    .form {
      margin-top: 20px;
    }
  }
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.form /deep/ .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  font-size: 90px;
  line-height: 240px;
  text-align: center;
}
// .avatar {
//   width: 240px;
//   height: 240px;
//   border-radius: 50%;
//   overflow: hidden;
//   display: block;
// }
.avator_main {
  width: 300px;
  height: 200px;
  border: 1px solid #617fa5;
}
.avator_main img {
  width: 100%;
  height: 100%;
}
// .avator_main button {
//   margin: auto;
// }
</style>