<template>
  <div class="courseDetails">
    <div class="container">
      <div class="details">
        <el-page-header @back="goBack" :content="$route.params.id ? '查看课外活动' : '新增'"></el-page-header>
        <div class="form">
          <el-form ref="checkForm" :model="form" label-width="150px">
            <el-form-item label="标题">
              <el-input disabled type="text" v-model="form.name" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="教学类型">
              <el-select disabled v-model="form.type" placeholder="请选择活动类型">
                <el-option label="第二课堂活动" :value="1"></el-option>
                <el-option label="社会服务活动" :value="2"></el-option>
                <el-option label="竞赛活动" :value="3"></el-option>
                <el-option label="其他活动" :value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发布时间">
              <el-date-picker
                type="date"
                disabled
                value-format="yyyy-MM-dd"
                placeholder="选择发布时间"
                v-model="form.time"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="正文">
              <el-input disabled type="textarea" v-model="form.textarea" placeholder="请输入正文内容"></el-input>
            </el-form-item>
            <el-form-item label="附件">
              <el-upload
                class="upload-demo"
                disabled
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                multiple
                :file-list="form.fileList"
                :headers="{Authorization: tokens}"
              >
                <el-button disabled size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">活动附件列表</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="状态">
              <el-switch
                v-model="form.state"
                disabled
                :active-value="1"
                :inactive-value="0"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
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
      form: {
        num: 1,
        hour: 1,
        state: 1
      }
    };
  },
  watch: {},
  created() {
    if (this.$route.params.id) {
      this.init(this.$route.params.id);
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    init(id) {
      this.form = {
        id: 1,
        name: "“南粤青年说”活动讲座",
        type: 1,
        time: "2020-01-01",
        url: "http://baidu.com",
        textarea: "南粤青年说”活动讲座将在2020-01-24在家里举行",
        fileList: [
          {
            name: "food.jpeg",
            url:
              "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
          },
          {
            name: "food2.jpeg",
            url:
              "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
          }
        ],
        state: 1
      };
    },
    handlePreview(file) {
      window.open(this.downloadfileUrl + file.url);
    },
    handleRemove(file, fileList) {
      this.$message.success("移除附件成功！");
    },
    dialogFormEdit() {
      this.$refs["checkForm"].validate(valid => {
        if (valid) {
          if (this.form.id) {
            this.$message.success("编辑成功");
          } else {
            this.$message.success("新增成功");
          }
          this.$router.back();
        } else {
          return false;
        }
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.courseDetails {
  width: 100%;
  background-color: #f2f2f2;
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
</style>