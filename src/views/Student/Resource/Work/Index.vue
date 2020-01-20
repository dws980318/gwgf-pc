<template>
  <!-- 作业管理 -->
  <div class="homework">
    <div class="homework-top">
      <div class="top-title">作业管理</div>
    </div>
    <div class="homework-select">
      <el-input clearable @keyup.enter.native="init" v-model="list_data.job_name" placeholder="请输入作业名称"></el-input>
      <el-button style="margin-left: 15px;" type="success" @click="handleSeach">搜索</el-button>
      <!-- <el-button
        style="margin-left: 15px;background-color: #617fa5;color:#fff;"
        @click="handleAdd"
      >添加作业</el-button>-->
    </div>
    <div class="dataTable_main">
      <el-table :data="tableData" v-loading="loading" style="width: 100%" border>
        <el-table-column label="序号" align="center" width="60">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="oa_img" label="缩略图" width="200" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <img class="thumbnail_big" :src="scope.row.oa_img" alt />
              <div slot="reference" class="name-wrapper">
                <img class="thumbnail" :src="scope.row.oa_img" alt />
              </div>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column prop="job_name" label="作业名称" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="publish_date" label="发布时间" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="publish_status" label="提交状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.publish_status === 0" class="warning-state">未提交</span>
            <p v-if="scope.row.publish_status === 1">
              <span class="success-state">已提交</span>
              <!-- <span
                @click="checkAction(scope.row.id)"
                style="margin-left: 20px;cursor: pointer;"
                class="warning-state"
              >查看</span>-->
            </p>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="job_desc" label="作业内容" width="180" align="center">
          <template slot-scope="scope">
            <p style="color:#617fa5;cursor:pointer" @click="contentAction(scope.row)">查看</p>
          </template>
        </el-table-column>-->
        <el-table-column prop="s" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              @click="handleCheck(scope.$index, scope.row.id)"
            >查看学生</el-button>
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row.id)">查看</el-button>
            <el-button
              size="mini"
              type="success"
              @click="handleSubmit(scope.$index, scope.row.id)"
            >提交</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog class="content" :visible.sync="contentShow" title="作业内容" width="30%">
        <div style="min-height:100px;border-top:1px solid #ccc">
          <p v-html="content"></p>
        </div>
      </el-dialog>
      <el-dialog title="提交作业" :visible.sync="dialogVisible" width="30%">
        <el-form ref="form" label-width="50px">
          <el-form-item label="作业">
            <el-upload
              class="upload-demo"
              :action="fileUrl + '/uploadfile'"
              multiple
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleAvatarSuccess"
              ref="upload"
              :file-list="fileList"
              :headers="{Authorization: tokens}"
            >
              <!-- :show-file-list="showFile" -->
              <!-- :file-list="fileList" -->
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <!-- <p style="color: red;">点击可以下载!</p>
        <p v-for="item in checkList" @click="openCheck(item)" class="CheckList">
          <span style="cursor: pointer;line-height: 30px;">{{item.name}}</span>
        </p>-->
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleWork">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="查看已提交作业" :visible.sync="checkShow" width="30%">
        <p style="color: red;">点击可以下载!</p>
        <p
          v-for="item in checkList"
          style="cursor: pointer;line-height: 30px;"
          @click="openCheck(item)"
        >{{item.name}}</p>
        <!-- <el-form ref="form" label-width="50px">
          <el-form-item label="作业">
            <el-upload
              class="upload-demo"
              :action="fileUrl + '/uploadfile'"
              multiple
              disabled
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleAvatarSuccess"
              ref="checkUpload"
              :file-list=""
            >
              <el-button disabled size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>-->
      </el-dialog>
    </div>
    <div class="panel_pagination">
      <el-pagination
        style="text-align:center"
        background
        @current-change="handleCurrentChange"
        :page-size="init_data.pageSize"
        :current-page="init_data.pageNumber"
        layout="prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      loading: false,
      contentShow: false,
      content: "",
      checkShow: false,
      check: "",
      checkList: [],
      showFile: true,
      loading: false,
      dialogVisible: false,
      input: "",
      form: {
        attach_id: "",
        father_id: ""
      },
      fileList: [],
      one: [],
      init_data: {
        pageNumber: 1,
        pageSize: 10
      },
      list_data: {
        job_name: "",
        publish_status: 1
      },
      page: {
        total: 0
      },
      tableData: []
    };
  },
  created() {
    let that = this;
    // document.onkeypress = function(e) {
    //   const keycode = document.all ? event.keyCode : e.which;
    //   if (keycode == 13) {
    //     that.init(); // 登录方法名
    //     return false;
    //   }
    // };
    that.init();
  },
  mounted() {},
  methods: {
    // 列表数据
    init() {
      this.loading = true;
      this.api.getallchajobstu(this.init_data, this.list_data).then(res => {
        this.loading = false;
        this.one = res.data;
        this.page.total = res.count;
        this.one.map(item => {
          this.api.sub_chajobstatus({ id: item.id }).then(response => {
            item.publish_status = response.data;
          });
        });
        setTimeout(() => {
          this.tableData = this.one;
          this.loading = false;
        }, 200);
      });
    },
    //点击查看已提交的作业
    checkAction(id) {
      // console.log(this.$refs.checkUpload)
      // this.$refs.checkUpload.uploadFiles = []
      this.fileList = [];
      this.checkShow = true;
      this.api.getonechajobstu({ id: id }).then(res => {
        if (res.status === 200) {
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
        }
      });
    },
    openCheck(item) {
      window.open(this.downloadfileUrl + item.url);
    },
    //点击查看内容
    contentAction(row) {
      this.contentShow = true;
      this.content = row.job_desc;
    },
    //搜索
    handleSeach() {
      this.init();
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
    handleBefore(file, fileList) {
      // this.showFile = true;
      console.log(file);
      console.log(fileList);
    },
    handleSubmit(index, id) {
      // this.showFile = false;
      this.fileList = [];
      this.dialogVisible = true;
      this.form.father_id = id;
      this.api.getonechajobstu({ id: id }).then(response => {
        if (response.status === 200) {
          if (response.data) {
            this.form = response.data;
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
        }
      });
    },
    handleWork() {
      this.form.attach_id = this.getFile();
      console.log(this.form);
      this.api.sub_chajobsave(this.form).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.dialogVisible = false;
          this.$message.success(res.message);
          this.init();
        }
      });
    },

    handleCurrentChange(val) {
      this.init_data.pageNumber = val;
      this.init();
    },
    handleEdit(index, studentId) {
      console.log(index, studentId);
      this.$router.push("/resource/work/" + studentId);
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
    handleDelete(index, row) {
      this.tableData.splice(index, 1);
    },
    handleAdd() {
      this.$router.push("/resource/work/add");
    },
    handleCheck(index, studentId) {
      this.$router.push("/resource/work/detail/" + studentId);
    }
  }
};
</script>

<style scoped lang="scss">
@mixin flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
@mixin between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.homework {
  width: 100%;
  height: auto;
  background-color: #fff;
  padding-bottom: 30px;
  .indexSwiper {
    height: 385px;
    & /deep/ .el-carousel__button {
      width: 10px;
      height: 10px;
      background-color: #fff;
      border: none;
      border-radius: 50%;
    }
    & /deep/ .el-carousel__indicator.is-active button {
      background-color: #09bdf3;
    }
    & /deep/ .el-carousel__indicators--outside button {
      opacity: 1;
    }
    .sideImg {
      width: 100%;
      height: 100%;
    }
  }
  .homework-top {
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    .top-title {
      border-bottom: 1px solid #d7d7d7;
      font-size: 18px;
      line-height: 50px;
    }
  }
  .homework-select {
    width: 600px;
    display: flex;
    margin-top: 15px;
    padding-left: 20px;
  }
  .dataTable_main {
    width: 100%;
    height: auto;
    padding: 20px;
  }
}
.CheckList {
  span {
    &:hover {
      color: #09bdf3;
    }
  }
}
.thumbnail {
  width: 120px;
  height: auto;
}
.thumbnail_big {
  width: 270px;
  height: auto;
}
.warning-state {
  color: #e3853a;
}

.success-state {
  color: #67c23a;
}
.el-carousel__item:nth-child(2n) {
  background-color: #000;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.homework .btn {
  width: 64px;
  height: 29px;
  padding: 0;
}
.homework
  /deep/
  .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: #617fa5;
}
.homework /deep/ .el-pagination.is-background .el-pager li:hover {
  color: #617fa5;
}
.homework
  /deep/
  .el-pagination.is-background
  .el-pager
  li.active:not(.disabled):hover {
  color: #fff;
}
</style>
