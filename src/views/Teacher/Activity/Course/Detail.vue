
           
<template>
  <div class="courseDetails">
    <div class="container" style="font-size: 12px;background-color: #fff;">
      <div class="details">
        <el-page-header @back="goBack" :content="$route.params.id ? '编辑课程活动' : '新增课程活动'"></el-page-header>
        <div class="form">
          <el-form ref="checkForm" :rules="rules" :model="form" label-width="150px">
            <div style="display: flex;">
              <div>
                <el-form-item label="标题" prop="activityName">
                  <el-input clearable type="text" v-model="form.activityName" placeholder="请输入活动名称"></el-input>
                </el-form-item>
                <el-form-item label="活动类型" prop="activityType">
                  <el-select clearable v-model="form.activityType" placeholder="请选择活动类型">
                    <el-option
                      v-for="item in options"
                      :key="item.dicValue"
                      :label="item.dicName"
                      :value="item.dicValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="地点" prop="address">
                  <el-input clearable type="text" v-model="form.address " placeholder="请输入地点"></el-input>
                </el-form-item>
                <el-form-item label="名额" prop="number">
                  <el-input clearable type="text" v-model.number="form.number " placeholder="请输入名额"></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="报名开始时间" prop="activityStart">
                  <el-date-picker
                    type="datetime"
                    @change="startTimeStatus"
                    :picker-options="pickerActivityStartOptions"
                    value-format="yyyy-MM-dd HH:mm"
                    format="yyyy-MM-dd HH:mm"
                    placeholder="请选择报名开始时间"
                    v-model="form.activityStart"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="报名结束时间" prop="activityEnt">
                  <el-date-picker
                    type="datetime"
                    @change="endTimeStatus"
                    :picker-options="pickerActivityEntOptions"
                    value-format="yyyy-MM-dd HH:mm"
                    format="yyyy-MM-dd HH:mm"
                    placeholder="请选择报名结束时间"
                    v-model="form.activityEnt"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="开始时间" prop="dateStart">
                  <el-date-picker
                    type="datetime"
                    :picker-options="pickerDateStartOptions"
                    value-format="yyyy-MM-dd HH:mm"
                    format="yyyy-MM-dd HH:mm"
                    placeholder="请选择开始时间"
                    v-model="form.dateStart"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" prop="dateEnd">
                  <el-date-picker
                    type="datetime"
                    :picker-options="pickerDateEndOptions"
                    value-format="yyyy-MM-dd HH:mm"
                    format="yyyy-MM-dd HH:mm"
                    placeholder="请选择结束时间"
                    v-model="form.dateEnd"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </div>
            <el-form-item label="状态">
              <el-switch
                v-model="form.state"
                :active-value="'1'"
                :inactive-value="'0'"
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
            <!-- <el-form-item label="封面图">
              <el-upload
                class="avatar-uploader"
                :action="fileUrl + '/uploadfile'"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                drag
              >
                <div v-if="imgurl" class="avator">
                  <img :src="imgurl" />
                </div>
                <div v-else>
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                  <div class="el-upload__text">
                    将文件拖到此处，或
                    <em>点击上传</em>
                  </div>
                </div>
                <div slot="tip" class="el-upload__tip">
                  建议尺寸300*200 px；
                  大小不超过1M
                </div>
              </el-upload>
            </el-form-item>-->
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
                <div slot="tip" class="el-upload__tip">活动附件列表</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="内容" prop="content">
              <el-input rows="5" type="textarea" v-model="form.content" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="dialogFormEdit('checkForm')">确 定</el-button>
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
      pickerActivityStartOptions: this.disableActivityStart(),
      pickerActivityEntOptions: this.disableActivityEnt(),
      pickerDateStartOptions: this.disableDateStart(),
      pickerDateEndOptions: this.disableDateEnd(),
      createDate: "",
      overDate: "",
      options: [],
      formrules: {},
      fileList: [],
      one: [],
      form: {
        state: 1,
        accessoryId: "",
        activityName: "",
        activityStart: "",
        activityEnt: "",
        activityType: "",
        address: "",
        content: "",
        coverFileId: "",
        dateStart: "",
        dateEnd: "",
        number: ""
      },
      imgurl: "",
      rules: {
        activityName: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        activityType: [
          { required: true, message: "请选择活动类型", trigger: "change" }
        ],
        address: [{ required: true, message: "请输入地点", trigger: "blur" }],
        number: [
          {
            type: "number",
            required: true,
            message: "请输入名额,只能是数字",
            trigger: "blur"
          }
        ],
        activityStart: [
          { required: true, message: "请选择报名开始时间", trigger: "blur" }
        ],
        activityEnt: [
          { required: true, message: "请选择报名结束时间", trigger: "blur" }
        ],
        dateStart: [
          { required: true, message: "请选择开始时间", trigger: "blur" }
        ],
        dateEnd: [
          { required: true, message: "请选择结束时间", trigger: "blur" }
        ],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }]
      }
    };
  },
  watch: {},
  created() {
    this.getActivityType();
    if (this.$route.params.id) {
      this.init(this.$route.params.id);
    }
  },
  methods: {
    disableDateStart() {
      let that = this;
      return {
        disabledDate(time) {
          let _now = Date.now();
          let bean =
            that.form.dateEnd &&
            time.getTime() > new Date(that.form.dateEnd).getTime();
          return time.getTime() < _now || bean;
        }
      };
    },
    disableDateEnd() {
      let that = this;
      return {
        disabledDate(time) {
          let _now = Date.now();
          let dateStart = that.form.dateStart
            ? new Date(that.form.dateStart).getTime()
            : _now;
          return time.getTime() < dateStart;
        }
      };
    },
    disableActivityStart() {
      let that = this;
      return {
        disabledDate(time) {
          let _now = Date.now();
          let bean =
            that.form.activityEnt &&
            time.getTime() > new Date(that.form.activityEnt).getTime();
          return time.getTime() < _now || bean;
        }
      };
    },
    disableActivityEnt() {
      let that = this;
      return {
        disabledDate(time) {
          let _now = Date.now();
          let activityStart = that.form.activityStart
            ? new Date(that.form.activityStart).getTime()
            : _now;
          return time.getTime() < activityStart;
        }
      };
    },
    goBack() {
      this.$router.push("/activity/course/list");
    },
    getActivityType() {
      this.api.selectdic({ dictype: "活动类型" }).then(res => {
        console.log(res);
        this.options = res.data;
      });
    },
    // 时间开始选择器
    startTimeStatus: function(value) {
      this.createDate = value;
    },
    // 时间结束选择器
    endTimeStatus: function(value) {
      this.overDate = value;
    },
    //列表数据
    init(id) {
      this.api.getoneactivity({ id: id }).then(res => {
        if (res.status === 200) {
          this.form = res.data;
          this.form.activityType = this.form.activityType + "";
          if (this.form.accessoryId) {
            var one = this.form.accessoryId.split(",");
            for (let i in one) {
              let two = one[i].split("|");
              let file = {
                name: two[0],
                url: two[1]
              };
              this.fileList.push(file);
            }
          }
          if (this.form.coverFileId) {
            //  this.api.selectfile(this.form.coverFileId).then(res => {
            this.imgurl = this.downloadfileUrl + this.form.coverFileId;
            // });
          }
        }
      });
    },
    //秒转换成时间
    getTime(datetime) {
      var date = new Date(datetime);
      Date.prototype.format = function(format) {
        var o = {
          "M+": this.getMonth() + 1, //month
          "d+": this.getDate(), //day
          "h+": this.getHours(), //hour
          "m+": this.getMinutes(), //minute
          "s+": this.getSeconds(), //second
          "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
          S: this.getMilliseconds() //millisecond
        };

        if (/(y+)/.test(format)) {
          format = format.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        }

        for (var k in o) {
          if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
          }
        }
        return format;
      };
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
    // 新增 + 编辑
    dialogFormEdit(formName) {
      this.form.accessoryId = this.getFile();
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.api.addorupd_activitysave(this.form).then(res => {
            console.log(res);
            if (res.status === 200) {
              this.$message.success(res.message);
              this.$router.push("/activity/course/list");
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.fileList = [];
      this.imgurl = "";
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
      this.form.coverFileId = res.fileName;
    },
    //上传附件的限制
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式或者 PNG 格式");
      }
      if (!isLt1M) {
        this.$message.error("上传图片大小不能超过 1MB!");
      }
      return isJPG && isLt1M;
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
.courseDetails {
  width: 100%;
  background-color: #f2f2f2;
  margin-bottom: 50px;
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
  .form {
    margin-top: 20px;
  }
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
    &/deep/ .avatar-uploader-icon {
      font-size: 67px;
      color: #c0c4cc;
      margin: 50px 0 16px;
      line-height: 50px;
    }
    &/deep/ .avatar-uploader {
      .el-upload {
        width: 300px;
        height: auto;
        .el-upload-dragger {
          height: 200px;
          width: auto;
        }
      }
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
.avator {
  width: 300px;
  height: 200px;
}
.avator img {
  width: 100%;
  height: 100%;
}
</style>