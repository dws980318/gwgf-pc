<template>
  <div class="informDetails">
    <el-page-header
      class="informDetails-title"
      @back="goBack"
      :content="$route.params.id ? '活动详情' : '新增'"
    ></el-page-header>
    <div class="informDetails-main">
      <div class="img">
        <img :src="downloadfileUrl + form.coverFileId" alt />
      </div>
      <h2>{{form.activityName}}</h2>
      <div class="main-p" style="white-space:pre-line">{{form.content}}</div>

      <div class="main-bottom">
        <div class="bottom-mull"></div>
        <div class="main-message">
          <div class="main-name">发布人：{{form.issuerName}}</div>
          <div class="main-time">发布时间：{{form.publishTime}}</div>
          <div class="main-time">活动开始时间：{{form.activityStart}}</div>
          <div class="main-time">活动结束时间：{{form.activityEnt}}</div>
          <div class="main-time">报名开始时间：{{form.dateStart}}</div>
          <div class="main-time">报名结束时间：{{form.dateEnd}}</div>
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
            <div slot="tip" class="el-upload__tip">活动附件列表</div>
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
      this.api.getoneactivity({ id: id }).then(res => {
        this.form = res.data;
        this.form.publishState = parseInt(this.form.publishState);
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
    width: 100%;
    .img {
      width: 100%;
      text-align: center;
      img {
        width: 900px;
        height: 600px;
        margin: 0 auto;
      }
    }
    h2 {
      text-align: center;
      line-height: 120px;
    }
    .main-p {
      width: 100%;
      height: auto;
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