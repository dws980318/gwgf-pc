<template>
  <div class="courseDetails">
    <div class="container">
      <el-page-header
        :content="$route.params.id ? '课程详情' : '新增'"
        @back="goBack"
        style="padding: 15px 45px;"
      ></el-page-header>
      <div class="courseDetails-title">
        <div class="title-img" style="margin-right: 20px;">
          <img :src="form.imgId" alt />
        </div>
        <div class="title">
          <h2>{{ form.lessonName }}</h2>
          <div class="time">
            <p>开课时间：{{ form.uploadTime }}</p>
            <!-- <p>课程时长：{{form.lessonLength}}</p> -->
          </div>
          <div class="btn">
            <!-- <el-button @click="lectureAction">进入课程</el-button> -->
            <!-- <p>
              <span>已学习</span>
              <span>6人</span>
            </p>-->
          </div>
        </div>
        <div class="title-img" style="border: none;"></div>
      </div>
    </div>
    <div class="course">
      <div class="courseDetails-introduction">
        <div style="background-color: #fff;flex:1;margin-top: 20px;white-space:pre-line">
          <div class="title">
            <p>课程简介</p>
          </div>
          <div class="content">{{ form.lessonContent }}</div>
        </div>
        <div style="background-color: #fff;flex:1;margin-top: 20px;white-space:pre-line">
          <div class="title">
            <p>课堂活动</p>
          </div>
          <div class="content">
            <el-table :data="activityData" border v-loading="activityLoading" style="width: 100%;">
              <el-table-column label="标题" width="200" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.activityName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="报名时间" align="center">
                <template slot-scope="scope">
                  <p>{{ scope.row.activityStart }}</p>
                  <p class="success-state">-</p>
                  <p>{{ scope.row.activityEnt }}</p>
                </template>
              </el-table-column>
              <el-table-column label="报名状态" prop="activityType" width="160" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.activityType === 0" class="warning-state">未报名</span>
                  <span v-if="scope.row.activityType === 1" class="success-state">已报名</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" fixed="right" width="200" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleEditActivity(scope.$index, scope.row.id)"
                  >查看</el-button>
                  <el-button
                    v-if="scope.row.activityType === 0"
                    size="mini"
                    type="success"
                    @click="handleApply(scope.$index, scope.row.id)"
                  >点击报名</el-button>
                  <el-button
                    v-if="scope.row.activityType === 1"
                    size="mini"
                    type="danger"
                    @click="handleCancel(scope.$index, scope.row.id)"
                  >取消报名</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
              <span>点击确定将报名该活动</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmApply">确 定</el-button>
              </span>
            </el-dialog>
            <el-dialog title="提示" :visible.sync="cancelDialogVisible" width="30%">
              <span>点击确定将取消报名该活动</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="cancelDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="cancelApply">确 定</el-button>
              </span>
            </el-dialog>
          </div>
          <div
            class="panel_pagination"
            style="text-align:center;margin: 0 auto;margin-bottom: 10px;"
          >
            <el-pagination
              style="text-align:center"
              background
              @current-change="handleActivityCurrentChange"
              :page-size="activity_data.pageSize"
              :current-page="activity_data.pageNumber"
              layout="prev, pager, next, jumper"
              :total="activity_page.total"
            ></el-pagination>
          </div>
        </div>
        <div style="background-color: #fff;flex:1;margin-top: 20px;white-space:pre-line">
          <div class="title">
            <p>作业任务</p>
          </div>
          <div class="content">
            <el-table :data="workData" v-loading="loading" style="width: 100%" border>
              <el-table-column prop="job_name" label="作业名称" align="center" show-overflow-tooltip></el-table-column>
              <el-table-column
                prop="publish_date"
                label="发布时间"
                align="center"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column prop="publish_status" label="提交状态" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.publish_status === 0" class="warning-state">未提交</span>
                  <p v-if="scope.row.publish_status === 1">
                    <span class="success-state">已提交</span>
                  </p>
                </template>
              </el-table-column>
              <el-table-column prop="s" label="操作" width="260" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="warning"
                    @click="handleCheck(scope.$index, scope.row.id)"
                  >查看学生</el-button>
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleEdit(scope.$index, scope.row.id)"
                  >查看</el-button>
                  <el-button
                    size="mini"
                    type="success"
                    @click="handleSubmit(scope.$index, scope.row.id)"
                  >提交</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-dialog title="提交作业" :visible.sync="checkShow" width="30%">
              <el-form ref="form" label-width="80px">
                <el-form-item label="作业">
                  <el-upload
                    class="upload-demo"
                    :action="fileUrl + '/uploadfile'"
                    multiple
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="handleAvatarSuccess"
                    ref="upload"
                    :file-list="fileListS"
                    :headers="{Authorization: tokens}"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="checkShow = false">取 消</el-button>
                <el-button type="primary" @click="handleWork">确 定</el-button>
              </span>
            </el-dialog>
          </div>
          <div
            class="panel_pagination"
            style="text-align:center;margin: 0 auto;margin-bottom: 10px;"
          >
            <el-pagination
              style="text-align:center"
              background
              @current-change="handleWorkCurrentChange"
              :page-size="work_data.pageSize"
              :current-page="work_data.pageNumber"
              layout="prev, pager, next, jumper"
              :total="work_page.total"
            ></el-pagination>
          </div>
        </div>
        <div style="background-color: #fff;min-height: 50px;margin-top: 20px;">
          <div class="title">
            <p>
              附件
              <span style="margin-left: 20px;color:red;font-size: 12px;">(点击可以下载)</span>
            </p>
          </div>
          <div class="file">
            <div v-for="item in fileList">
              <span @click="open(item)">{{ item.name }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="courseDetails-name">
        <div class="img">
          <img :src="img" alt />
        </div>
        <div class="name">
          <span>{{ teacherList.realName }}</span>
          <!-- <span>副教授</span> -->
        </div>
        <div class="college">{{ teacherList.sex }}</div>
        <div class="remark">{{ teacherList.remark }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import imgUrl from "@/common/images/center.jpg";
export default {
  data() {
    return {
      selectIndex: 0,
      loading: false,
      activityLoading: false,
      dialogVisible: false,
      cancelDialogVisible: false,
      confirmIds: "",
      cancelIds: "",
      checkShow: false,
      form: {
        lessonName: "",
        lessonClassId: "",
        lessonSize: "",
        lessonLength: "",
        lessonContent: "",
        accessory_id: "",
        imgId: imgUrl
      },
      work_data: {
        pageNumber: 1,
        pageSize: 5
      },
      work_page: {
        total: 0
      },
      workData: [],
      activity_data: {
        pageNumber: 1,
        pageSize: 5
      },
      activity_page: {
        total: 0
      },
      activityData: [],
      fileList: [],
      fileListS: [],
      teacherList: {},
      img: imgUrl,
      one: [],
      two: [],
      forms: {
        attach_id: "",
        father_id: ""
      }
    };
  },
  created() {
    if (this.$route.params.id) {
      this.init(this.$route.params.id);
    }
    this.workInit();
    this.activityInit();
  },
  methods: {
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
    handleSubmit(index, id) {
      this.fileListS = [];
      this.checkShow = true;
      this.forms.father_id = id;
      this.api.getonechajobstu({ id: id }).then(response => {
        if (response.status === 200) {
          if (response.data) {
            this.forms = response.data;
            if (this.forms.attach_id) {
              var one = this.forms.attach_id.split(",");
              for (let i in one) {
                let two = one[i].split("|");
                let file = {
                  name: two[0],
                  url: two[1]
                };
                this.fileListS.push(file);
              }
            }
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
    handleWork() {
      this.forms.attach_id = this.getFile();
      console.log(this.forms);
      this.api.sub_chajobsave(this.forms).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.checkShow = false;
          this.$message.success(res.message);
          this.workInit();
        }
      });
    },

    //报名
    handleApply(index, row) {
      this.dialogVisible = true;
      this.confirmIds = row;
    },
    confirmApply() {
      var form = {
        id: this.confirmIds,
        apply_type: 1
      };
      this.api.apply_activity(form).then(res => {
        if (res.status === 200) {
          this.$message.success(res.message);
          this.dialogVisible = false;
          this.activityInit();
        }
      });
    },
    //取消报名
    handleCancel(index, row) {
      this.cancelDialogVisible = true;
      this.cancelIds = row;
    },
    cancelApply() {
      var form = {
        id: this.cancelIds,
        apply_type: 2
      };
      this.api.apply_activity(form).then(res => {
        if (res.status === 200) {
          this.$message.success(res.message);
          this.cancelDialogVisible = false;
          this.activityInit();
        }
      });
    },
    handleWorkCurrentChange(val) {
      this.work_data.pageNumber = val;
      this.workInit();
    },
    handleActivityCurrentChange(val) {
      this.activity_data.pageNumber = val;
      this.activityInit();
    },
    goBack() {
      this.$router.back();
    },
    // 列表数据
    activityInit() {
      this.activityLoading = true;
      this.api.getallactivitys(this.activity_data).then(res => {
        this.two = res.data;
        this.activity_page.total = res.count;
        this.two.map(item => {
          this.api.apply_activityStatus({ id: item.id }).then(response => {
            item.activityType = response.data;
          });
        });
        setTimeout(() => {
          this.activityData = this.two;
          this.activityLoading = false;
        }, 200);
      });
    },
    // 列表数据
    workInit() {
      this.loading = true;
      this.api.getallchajobstu(this.work_data).then(res => {
        this.loading = false;
        this.one = res.data;
        this.work_page.total = res.count;
        this.one.map(item => {
          this.api.sub_chajobstatus({ id: item.id }).then(response => {
            item.publish_status = response.data;
          });
        });
        setTimeout(() => {
          this.workData = this.one;
          this.loading = false;
        }, 200);
      });
    },
    //列表数据
    init(id) {
      this.api.getonelesson({ id: id }).then(res => {
        this.form = res.data;
        this.form.imgId = this.downloadfileUrl + res.data.imgId;
        this.api.selectuserbyid({ id: res.data.issuerId }).then(response => {
          this.teacherList = response.data;
          console.log(response.data.photo);
          this.img = this.downloadfileUrl + response.data.photo;
        });
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
      });
    },
    lectureAction() {
      this.$router.push(`/teach/${this.$route.params.id}/lecture`);
    },
    open(item) {
      window.open(this.downloadfileUrl + item.url);
    },
    handleEdit(index, studentId) {
      console.log(index, studentId);
      this.$router.push("/resource/work/" + studentId);
    },
    handleCheck(index, studentId) {
      this.$router.push("/resource/work/detail/" + studentId);
    },
    handleEditActivity(index, id) {
      this.$router.push("/activity/course/" + id);
    }
  }
};
</script>

<style lang="scss" scoped>
.courseDetails {
  padding: 20px;
  width: 100%;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  .container {
    background-color: #fff;
    font-size: 14px;
    .courseDetails-title {
      display: flex;
      justify-content: space-between;
      padding: 10px 50px;
      border-bottom: 1px solid #f2f2f2;
      background-color: #fff;
      .title {
        width: 324px;
        h2 {
          font-size: 36px;
          font-weight: 400;
          margin-bottom: 40px;
        }
        .time {
          margin-bottom: 15px;
          p {
            color: #999;
            line-height: 30px;
          }
        }
        .btn {
          display: flex;
          text-align: center;
          line-height: 43px;
          justify-content: space-between;
          color: #999;
          &/deep/ .el-button {
            width: 140px;
            height: 43px;
            background-color: #617fa5;
            color: #fff;
          }
          span:nth-of-type(2) {
            margin-left: 15px;
          }
        }
      }
      .title-img {
        width: 337px;
        height: 240px;
        border: 1px solid #617fa5;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .courseDetails-label {
      height: 56px;
      background-color: #fff;
      span {
        font-size: 18px;
        font-weight: 700;
        line-height: 52px;
        margin-left: 60px;
        cursor: pointer;
        //   width: 240px;
        display: inline-block;
        //   text-align: center;
      }
    }
  }
  .course {
    width: 1270px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    flex: 1;
    .courseDetails-introduction {
      width: 927px;
      // background-color: #fff;
      padding-right: 50px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        height: 40px;
        font-size: 16px;
        padding-left: 50px;
        border-bottom: 1px solid #f2f2f2;
        p {
          //   border-bottom: 4px solid #617fa5;
          display: inline-block;
          line-height: 40px;
          position: relative;
          padding-left: 10px;
        }
        p:before {
          content: "";
          position: absolute;
          top: 4px;
          left: 0;
          width: 4px;
          height: 80%;
          background-color: #617fa5;
        }
      }
      .content {
        text-indent: 20px;
        text-align: justify;
        color: #333;
        height: auto;
        padding: 20px;
      }
      .file {
        padding: 20px 20px 40px 50px;
        span {
          line-height: 24px;
          &:hover {
            color: red;
            cursor: pointer;
          }
        }
      }
      .main {
        padding: 0 0 20px 50px;
        p {
          margin-top: 20px;
        }
      }
    }
    .courseDetails-name {
      margin-top: 20px;
      width: 327px;
      min-height: 230px;
      background-color: #fff;
      font-size: 12px;
      padding: 40px;
      .img {
        width: 88px;
        height: 88px;
        border: 1px solid #617fa5;
        // background-color: #617fa5;
        border-radius: 50%;
        margin: 0 auto;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .name {
        text-align: center;
        line-height: 30px;
        span:nth-of-type(1) {
          font-size: 14px;
          color: #617fa5;
        }
      }
      .college {
        height: 31px;
        background-color: #f2f2f2;
        line-height: 31px;
        text-align: center;
        font-size: 14px;
        margin: 0 auto;
      }
      .remark {
        text-indent: 20px;
        font-size: 14px;
        margin: 0 auto;
        text-align: justify;
      }
    }
  }
}
.warning-state {
  color: #e3853a;
}

.success-state {
  color: #67c23a;
}
.active {
  color: #617fa5;
  border-bottom: 4px solid #617fa5;
}
.course /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #617fa5;
}
.course /deep/ .el-pagination.is-background .el-pager li:hover {
  color: #617fa5;
}
.course
  /deep/
  .el-pagination.is-background
  .el-pager
  li.active:not(.disabled):hover {
  color: #fff;
}
</style>
