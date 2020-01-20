
<template>
  <div class="informDetails">
    <el-page-header
      class="informDetails-title"
      @back="goBack"
      :content="$route.params.id ? '作业详情' : '新增'"
    ></el-page-header>
    <div class="informDetails-main">
      <h2>{{form.job_name}}</h2>
      <div class="main-p" style="white-space:pre-line">{{form.workDesc}}</div>

      <div class="main-bottom">
        <div class="bottom-mull"></div>
        <div class="main-message">
          <div class="main-name">发布人：{{form.issuer_name}}</div>
          <div class="main-time">时间：{{form.publish_date}}</div>
          <div class="main-time">课程：{{form.lesson_id}}</div>
        </div>
      </div>
      <el-form style="margin-top:20px;">
        <el-form-item>
          <el-upload
            class="upload-demo"
            :action="fileUrl + '/uploadfile'"
            multiple
            :on-preview="handlePreview"
            ref="upload"
            :file-list="fileList"
          >
            <div slot="tip" class="el-upload__tip">作业附件列表</div>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "",
        publishState: "",
        content: "",
        fileId: ""
      },
      fileList: []
    };
  },
  created() {
    if (this.$route.params.id) {
      this.init(this.$route.params.id);
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    selectall(data) {
      this.api.selectalllesson().then(res => {
        console.log(res);
        res.data.map(j => {
          if (data === j.id) {
            this.form.lesson_id = j.lessonName;
            console.log(111);
          }
        });
      });
    },
    //列表数据
    init(id) {
      this.api.getonechawork({ id: id }).then(res => {
        this.selectall(res.data.lesson_id);
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
      });
    },
    //附件点击下载
    handlePreview(file) {
      window.open(this.downloadfileUrl + file.url);
    }
  }
};
</script>
<style lang="scss" scoped>
.informDetails {
  background-color: #fff;
  width: 100%;
  padding: 0 20px;
  .informDetails-title {
    font-size: 18px;
    line-height: 50px;
  }
  .informDetails-main {
    padding: 10px 110px;
    h2 {
      text-align: center;
      line-height: 120px;
    }
    .main-p {
      width: 100%;
      height: auto;
      font-size: 14px;
      margin-bottom: 20px;
      overflow-wrap: break-word;
      text-indent: 25px;
      text-align: justify;
    }
    .main-bottom {
      display: flex;
      justify-content: space-between;
      margin-top: 50px;
      .bottom-mull {
        width: 70%;
      }
      .main-message {
        line-height: 26px;
      }
    }
  }
}
</style>