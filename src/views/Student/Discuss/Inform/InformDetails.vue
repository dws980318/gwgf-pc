<template>
  <div class="informDetails">
    <el-page-header
      class="informDetails-title"
      @back="goBack"
      :content="$route.params.id ? '通知详情' : '新增'"
    ></el-page-header>
    <div class="informDetails-main">
      <h2>{{form.title}}</h2>
      <div class="main-p" style="white-space:pre-line">{{form.content}}</div>

      <div class="main-bottom">
        <div class="bottom-mull"></div>
        <div class="main-message">
          <div class="main-name">发布人：{{form.issuer_name}}</div>
          <div class="main-time">时间：{{form.publishTime}}</div>
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
            <div slot="tip" class="el-upload__tip">通知附件列表</div>
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
    //列表数据
    init(id) {
      this.api.getonenotice({ id: id }).then(res => {
        this.form = res.data;
        this.form.publishState = parseInt(this.form.publishState);
        if (this.form.fileId) {
          var one = this.form.fileId.split(",");
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
  padding: 0 60px 20px 60px;
  .informDetails-title {
    border-bottom: 1px solid #d7d7d7;
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