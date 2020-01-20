<template>
  <div class="informDetails">
    <el-page-header
      class="informDetails-title"
      @back="goBack"
      :content="$route.params.id ? '作业详情' : '新增'"
    ></el-page-header>
    <div class="informDetails-main">
      <h2 class="h2">{{form.job_name}}</h2>
      <div class="main-p" style="white-space:pre-line">{{form.job_desc}}</div>

      <div class="main-bottom">
        <div class="bottom-mull"></div>
        <div class="main-message">
          <div class="main-name">发布人：{{form.issuer_name}}</div>
          <div class="main-time">发布时间：{{form.publish_date}}</div>
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
        <el-form-item>
          <el-upload
            class="upload-demo"
            :action="fileUrl + '/uploadfile'"
            multiple
            :on-preview="handlePreview"
            ref="upload"
            :file-list="stuFileList"
          >
            <div slot="tip" class="el-upload__tip">学生文本作业附件列表</div>
          </el-upload>
        </el-form-item>
        <div class="evaluate">
          <p class="p">
            <span>学生文本作业评价</span>
            <span>
              <el-button
                style="margin-left: 20px;"
                size="mini"
                type="success"
                @click="seeAction"
              >查看评估</el-button>
            </span>
          </p>
          <div class="evaluate-main">
            <div class="main-rate">
              总体评价:
              <el-rate class="el-rate" disabled v-model="evaluateList.criterionOne"></el-rate>
            </div>
            <div class="main-rate">总体评分:95分</div>
          </div>
          <div class="main-p" style="white-space:pre-line">评论：{{evaluateList.remark}}</div>
        </div>
        <el-form-item>
          <el-upload
            class="upload-demo"
            :action="fileUrl + '/uploadfile'"
            multiple
            :on-preview="handlePreview"
            ref="upload"
            :file-list="stuFileList"
          >
            <div slot="tip" class="el-upload__tip">学生音频作业附件列表</div>
          </el-upload>
        </el-form-item>
        <div class="evaluate">
          <p class="p">
            <span>学生音频作业评价</span>
            <span>
              <el-button
                style="margin-left: 20px;"
                size="mini"
                type="success"
                @click="seeAction"
              >查看评估</el-button>
            </span>
          </p>
          <div class="evaluate-main">
            <div class="main-rate">
              总体评价:
              <el-rate class="el-rate" disabled v-model="stuEvaluateList.criterionOne"></el-rate>
            </div>
            <div class="main-rate">总体评分:94分</div>
          </div>
          <div class="main-p" style="white-space:pre-line">评论：{{stuEvaluateList.remark}}</div>
        </div>
      </el-form>
      <v-studialog></v-studialog>
    </div>
  </div>
</template>

<script>
const StuDialog = resolve => {
  require(["./StuDialog"], resolve);
};
export default {
  components: {
    "v-studialog": StuDialog
  },
  data() {
    return {
      form: {
        job_name: "",
        issuer_name: "",
        job_desc: "",
        publish_date: "",
        lesson_id: ""
      },
      evaluate_data: {
        id: "",
        type: 1
      },
      evaluateList: {
        criterionOne: 5
      },
      stuEvaluate_data: {
        id: "",
        type: 2
      },
      stuEvaluateList: {
        criterionOne: 5
      },
      fileList: [],
      stuFileList: []
    };
  },
  created() {
    if (this.$route.params.id) {
      this.init(this.$route.params.id);
      this.evaluateInit(this.$route.params.id);
      this.stuEvaluateInit(this.$route.params.id);
    }
  },
  methods: {
    seeAction() {
      this.$store.commit("showStuModal", true);
    },
    evaluateInit(id) {
      this.evaluate_data.id = id;
      this.api.getjobassess(this.evaluate_data).then(res => {
        if (res.data) {
          this.evaluateList = res.data;
        }
      });
    },
    stuEvaluateInit(id) {
      this.stuEvaluate_data.id = id;
      this.api.getjobassess(this.stuEvaluate_data).then(res => {
        if (res.data) {
          this.stuEvaluateList = res.data;
        }
      });
    },
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
    stuInit(id) {
      this.api.getonechajob({ id: id }).then(res => {
        if (res.status === 200) {
          this.form = res.data;
          this.selectall(res.data.lesson_id);
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
        }
      });
    },
    //列表数据
    init(id) {
      this.api.getonechajob({ id: id }).then(res => {
        this.stuInit(res.data.father_id);
        if (res.data.attach_id) {
          var one = res.data.attach_id.split(",");
          for (let i in one) {
            let two = one[i].split("|");
            let file = {
              name: two[0],
              url: two[1]
            };
            this.stuFileList.push(file);
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
  padding: 5px 20px;
  font-size: 14px;
  .informDetails-title {
    font-size: 18px;
    line-height: 50px;
  }
  .informDetails-main {
    padding: 10px 110px;
    .h2 {
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
    .evaluate {
      .p {
        font-weight: 600;
      }
      .evaluate-main {
        display: flex;
        .main-rate {
          margin-right: 50px;
          display: flex;
        }
      }
      .main-p {
        width: 100%;
        height: auto;
        margin-bottom: 20px;
        overflow-wrap: break-word;
        text-indent: 0;
        text-align: justify;
      }
    }
  }
}
.informDetails /deep/ .el-form-item__content {
  line-height: 0;
}
</style>