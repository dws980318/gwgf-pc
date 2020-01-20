<template>
  <div class="courseDetails">
    <div class="container">
      <div class="details">
        <el-page-header @back="goBack" :content="$route.params.id ? '编辑' : '新增'"></el-page-header>
        <div class="form">
          <el-form ref="checkForm" :rules="rules" :model="form" label-width="150px">
            <el-form-item label="课程名称" prop="lessonName">
              <el-input clearable type="text" v-model="form.lessonName " placeholder="请输入课程名称"></el-input>
            </el-form-item>
            <el-form-item label="课程类型" prop="lessonClassId">
              <el-select clearable v-model="form.lessonClassId" placeholder="请选择课程类型">
                <el-option
                  v-for="item in options"
                  :key="item.dicValue"
                  :label="item.dicName"
                  :value="item.dicValue"
                ></el-option>
              </el-select>
              <el-upload
                style="margin-left: 20px;display: inline-block;"
                :action="fileUrl + '/lesson/intoStudent'"
                multiple
                :on-success="handleStudentSuccess"
                :file-list="fileList"
                :show-file-list="false"
                :headers="{Authorization: tokens}"
              >
                <el-button type="primary">导入学生</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="学生" prop="studentId">
              <el-transfer
                class="transfer"
                filterable
                filter-placeholder="请输入学生姓名"
                v-model="value"
                :props="{
                  key: 'id',
                  label: 'realName'
                }"
                :titles="['未选择', '已选择']"
                :data="studentOptions"
              ></el-transfer>
            </el-form-item>
            <!-- <el-form-item label="课程大小" prop="lessonSize">
              <el-input
                clearable
                type="text"
                v-model.number="form.lessonSize"
                placeholder="请输入课程大小"
              ></el-input>
            </el-form-item>
            <el-form-item label="课程时长" prop="lessonLength">
              <el-input
                clearable
                type="text"
                v-model.number="form.lessonLength"
                placeholder="请输入课程时长"
              ></el-input>
            </el-form-item>-->
            <el-form-item label="发布状态">
              <el-switch
                v-model="form.checkState"
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
                <img :src="imgurl" alt />
              </div>
            </el-form-item>
            <el-form-item prop="upload">
              <el-upload
                :action="fileUrl + '/uploadfile'"
                :limit="1"
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
                <div slot="tip" class="el-upload__tip">课程附件列表</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="课程内容" prop="lessonContent">
              <el-input
                type="textarea"
                rows="5"
                cors="20"
                v-model="form.lessonContent"
                placeholder="请输入课程内容"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item label="状态">
              <el-switch
                v-model="form.state"
                :active-value="1"
                :inactive-value="0"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </el-form-item>-->
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
      value: [],
      options: [
        {
          id: 1,
          name: "影视艺术系"
        },
        {
          id: 2,
          name: "外语系"
        }
      ],
      formrules: {},
      rules: {
        lessonName: [
          { required: true, message: "请输入课程名称", trigger: "blur" }
        ],
        lessonClassId: [
          { required: true, message: "请选择课程类型", trigger: "change" }
        ],
        // studentId: [
        //   { required: true, message: "请选择课程类型", trigger: "change" }
        // ],
        lessonSize: [
          {
            type: "number",
            required: true,
            message: "请输入课程大小,只能是数字",
            trigger: "blur"
          }
        ],
        lessonLength: [
          {
            type: "number",
            required: true,
            message: "请输入课程时长,只能是数字",
            trigger: "blur"
          }
        ],
        lessonContent: [
          { required: true, message: "请输入课程内容", trigger: "blur" }
        ]
      },
      form: {
        lessonName: "",
        lessonClassId: "",
        lessonSize: "",
        lessonLength: "",
        lessonContent: "",
        accessory_id: "",
        studentId: "",
        checkState: ""
      },
      fileList: [],
      imgurl: "",
      one: [],
      studentOptions: []
    };
  },
  watch: {},
  created() {
    this.getActivityType();
    this.getStudent();
    if (this.$route.params.id) {
      this.init(this.$route.params.id);
    }
  },
  methods: {
    generateData() {},
    goBack() {
      this.$router.back();
    },
    getActivityType() {
      this.api.selectdic({ dictype: "课程分类" }).then(res => {
        console.log(res);
        this.options = res.data;
      });
    },
    getStudent() {
      this.api.selectallstudent().then(res => {
        for (let i = 0; i < 15; i++) {
          this.studentOptions = res.data;
        }
      });
    },
    //列表数据
    init(id) {
      this.api.getonelesson({ id: id }).then(res => {
        this.form = res.data;
        this.form.lessonLength = parseInt(this.form.lessonLength);
        this.form.lessonSize = parseInt(this.form.lessonSize);
        this.form.lessonClassId = this.form.lessonClassId + "";
        if (this.form.accessory_id) {
          var one = this.form.accessory_id.split(",");
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
        if (this.form.studentId) {
          this.value = this.form.studentId.split(",");
        }
        console.log(this.value);
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
    dialogFormEdit() {
      this.form.accessory_id = this.getFile();
      this.$refs["checkForm"].validate(valid => {
        if (valid) {
          if (this.value.length > 0) {
            this.form.studentId = this.value.join(",");
            this.api.addorupd_lessonsave(this.form).then(res => {
              console.log(res);
              if (res.status === 200) { 
                this.$message.success(res.message);
                this.$router.push("/teach/list");
              }
            });
          } else {
            this.$message.error("请选择学生！");
          }
        } else {
          return false;
        }
      });
    },
    //导入学生成功
    handleStudentSuccess(res, file) {
      console.log(res);
      for (let i in res.data) {
        console.log(i);
        for (let j in this.studentOptions) {
          console.log(j);
          if (res.data[i].id === this.studentOptions[j].id) {
            console.log(this.studentOptions[j]);
            // this.studentOptions.splice(, 1)
            this.value.push(res.data[i].id);
          }
        }
      }
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
  padding-bottom: 30px;
  .top {
    height: 59px;
    width: 100%;
    line-height: 20px;
    padding: 10px 0;
    font-size: 14px;
    border-bottom: 1px solid #e6e2e2;
    .top-name {
      color: #617fa5;
    }
  }
  .container {
    background-color: #fff;
    font-size: 12px;
    padding: 20px;
    &/deep/ .el-input {
      width: 350px;
    }
    .transfer {
      &/deep/ .el-input {
        width: auto;
      }
      &/deep/ .el-transfer-panel__body {
        height: 400px;
      }
      &/deep/ .el-transfer-panel__list.is-filterable {
        height: 350px;
      }
      &/deep/ .el-transfer-panel__item {
        margin-left: 0;
        display: inline-block !important;
      }
      &/deep/ .el-transfer-panel__item.el-checkbox .el-checkbox__label {
        display: inline-block;
      }
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