<template>
  <!-- 作业管理 -->
  <div class="competition">
    <div class="container">
      <el-page-header @back="goBack" :content="$route.params.id ? '编辑' : '新增'"></el-page-header>
      <div class="form-box">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
          <el-form-item class="w-35" label="作业名称" prop="job_name">
            <el-input clearable v-model="form.job_name " placeholder="请输入作业名称"></el-input>
          </el-form-item>
          <el-form-item class="w-35" label="课程" prop="lesson_id">
            <el-select clearable style="width:100%;" v-model="form.lesson_id " placeholder="请选择课程">
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
          </el-form-item>
          <el-form-item label="封面图" prop="nickname">
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
          <el-form-item label="发布状态">
            <el-switch
              v-model="form.publish_status "
              :active-value="1"
              :inactive-value="0"
              active-text="已发布"
              inactive-text="待发布"
              active-color="#13ce66"
              inactive-color="#999"
            ></el-switch>
          </el-form-item>
          <el-form-item label="附件">
            <el-upload
              class="upload-demo"
              :action="fileUrl + '/uploadfile'"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleAvatarSuccess"
              multiple
              :headers="{Authorization: tokens}"
              ref="upload"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">作业附件列表</div>
            </el-upload>
          </el-form-item>
          <!-- <el-form-item class="w-65" label="作业详细内容">
            <tinymce-editor style="width: 100%;" v-model="form.job_desc" ref="editor"></tinymce-editor>
          </el-form-item>-->
          <el-form-item label="作业详细内容" prop="job_desc">
            <el-input type="textarea" rows="5" v-model="form.job_desc " placeholder="请输入作业详细内容"></el-input>
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
import TinymceEditor from "@/components/tinymce-editor";

export default {
  components: {
    TinymceEditor
  },
  data() {
    return {
      form: {
        job_name: "",
        lesson_id: "",
        publish_status: "",
        attach_id: "",
        job_desc: ""
      },
      fileList: [],
      one: [],
      two: [],
      options: [
        {
          id: 0,
          lessonName: "黄金糕"
        },
        {
          id: 1,
          lessonName: "双皮奶"
        }
      ],
      rules: {
        job_name: [
          { required: true, message: "请输入作业名称", trigger: "blur" }
        ],
        lesson_id: [
          { required: true, message: "请选择课程", trigger: "change" }
        ]
      }
    };
  },
  computed: {
    token() {
      return {
        Authorization: JSON.parse(localStorage.list).token
      };
    }
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
      this.api.getonechajob({ id: id }).then(res => {
        this.form = res.data;
        if (this.form.attach_id) {
          var one = this.form.attach_id.split(",");

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
    issueAction() {
      this.form.attach_id = this.getFile();
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.api.addorupd_chajobsave(this.form).then(res => {
            if (res.status === 200) {
              this.$message.success(res.message);
              this.$router.push("/resource/work/list");
            }
          });
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
    },
    resetForm() {
      this.$refs["form"].resetFields();
      this.fileList = [];
      this.form.job_desc = "";
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
