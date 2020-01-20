<template>
  <!-- 作品管理 -->
  <div class="competition">
    <div class="container">
      <el-page-header @back="goBack" :content="$route.params.id ? '编辑' : '新增'"></el-page-header>
      <div class="form-box">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
          <el-form-item class="w-35" label="作品名称" prop="workName">
            <el-input clearable v-model="form.workName " placeholder="请输入作品名称"></el-input>
          </el-form-item>
          <el-form-item class="w-35" label="课程" prop="lessonId">
            <el-select clearable style="width:100%;" v-model="form.lessonId " placeholder="请选择课程">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.lessonName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item class="w-35" label="完成时间">
            <el-date-picker
              type="datetime"
              placeholder="选择时间"
              v-model="form.finishTime"
              format="yyyy-MM-dd HH:mm:ss"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>-->
          <el-form-item label="封面图" prop="nickname">
            <div class="avator">
              <div class="avator_main">
                <img :src="imgurl" alt />
              </div>
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
                建议尺寸600*600 px；
                允许的图片格式：jpg/gif/bmp/png；
                大小不超过2M
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
              <div slot="tip" class="el-upload__tip">作品附件列表</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="作品详细内容">
            <el-input type="textarea" rows="5" v-model="form.workDesc " placeholder="请输入作品详细内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="issueAction">确 定</el-button>
            <el-button size="small" @click="$router.back()">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import userImg from "@/common/images/center.jpg";

export default {
  data() {
    return {
      form: {
        workName: "",
        lessonId: "",
        workDesc: "",
        attachId: ""
      },
      imgurl: "",
      options: [],
      fileList: [],
      one: [],
      rules: {
        workName: [
          { required: true, message: "请输入作业名称", trigger: "blur" }
        ],
        lessonId: [{ required: true, message: "请选择课程", trigger: "change" }]
      }
    };
  },
  created() {
    this.selectall();
    console.log(this.$route.params);
    if (this.$route.params.id) {
      this.init(this.$route.params.id);
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    selectall() {
      this.api.selectalllesson().then(res => {
        console.log(res);
        this.options = res.data;
      });
    },
    //列表数据
    init(id) {
      this.api.getonechawork({ id: id }).then(res => {
        this.form = res.data;
        if (this.form.attachId) {
          var one = this.form.attachId.split(",");
          for (let i in one) {
            let two = one[i].split("|");
            let file = {
              name: two[0],
              url: two[1]
            };
            this.fileList.push(file);
          }
        }
        if (this.form.imgId) {
          this.imgurl = this.downloadfileUrl + this.form.imgId;
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
    issueAction() {
      this.form.attachId = this.getFile();
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.api.addorupd_chaworksave(this.form).then(res => {
            console.log(res);
            if (res.status === 200) {
              this.$message.success(res.message);
              this.$router.push("/resource/production/list");
            } else {
              this.$message.error(res.message);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs["form"].resetFields();
      this.fileList = [];
      this.form.job_desc = "";
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
      this.form.imgId = res.fileName;
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
    }
  }
};
</script>

<style lang="scss" scoped>
.competition {
  background-color: #fff;
  width: 100%;
  .container {
    background-color: #fff;
    font-size: 12px;
    padding: 20px;
  }
}
.form-box {
  width: 100%;
  margin: 0 auto;
  padding: 40px;
}
.w-35 {
  width: 450px;
}
.w-65 {
  width: 800px;
}
.avatar {
  width: 240px;
  height: 240px;
  border-radius: 50%;
  overflow: hidden;
  display: block;
}
.avator_main {
  width: 300px;
  height: 200px;
  border: 1px solid #617fa5;
}
.avator_main img {
  width: 100%;
  height: 100%;
}
</style>
