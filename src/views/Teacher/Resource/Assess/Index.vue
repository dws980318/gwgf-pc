<template>
  <!-- 学生作品管理 -->
  <div class="production">
    <div class="production-top">
      <div class="top-title">作品评估管理</div>
    </div>
    <div class="production-select">
      <el-input v-model="list_data.userName" placeholder="请输入学生名称"></el-input>
      <el-button
        style="margin-left: 15px; width: 84px; height: 40px;"
        @click="handleSeach"
        type="success"
      >搜索</el-button>
      <!-- <el-button
        style="margin-left: 15px;background-color: #617fa5;color:#fff;"
        @click="handleAdd"
      >添加作业</el-button>-->
    </div>
    <div class="dataTable_main">
      <el-table :data="tableData" v-loading="loading" style="width: 100%" border>
        <el-table-column prop="userName" label="学生名称" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="workName" label="作品名称" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="assessTime" label="评定时间" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="job_desc" label="评语" width="180" align="center">
          <template slot-scope="scope">
            <p style="color:#617fa5;cursor:pointer" @click="contentAction(scope.row)">查看</p>
          </template>
        </el-table-column>
        <el-table-column prop="s" label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleSee(scope.$index, scope.row.id)" size="mini" type="primary">查看</el-button>
            <el-button
              @click="handleDelete(scope.$index, scope.row.id)"
              size="mini"
              type="danger"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="评估" :visible.sync="dialogVisible" width="30%">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="知识量">
            <el-rate class="el-rate" v-model="ruleForm.criterionOne"></el-rate>
          </el-form-item>
          <el-form-item label="教师互动">
            <el-rate class="el-rate" v-model="ruleForm.criterionTwo"></el-rate>
          </el-form-item>
          <el-form-item label="课程设计">
            <el-rate class="el-rate" v-model="ruleForm.criterionThree"></el-rate>
          </el-form-item>
          <el-form-item label="评语" prop="remark">
            <el-input type="textarea" v-model="ruleForm.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">删除</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog class="content" :visible.sync="contentShow" title="作品内容" width="30%">
        <div style="min-height:100px;border-top:1px solid #ccc">
          <p v-html="content"></p>
        </div>
      </el-dialog>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <p style="font-size: 20px;">点击确定将删除该条数据</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogDelete">确 定</el-button>
        </span>
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
      dialogVisible: false,
      ids: "",
      indexs: "",
      ruleForm: {
        remark: "",
        criterionOne: 0,
        criterionTwo: 0,
        criterionThree: 0,
        userName: "",
        workId: ""
      },
      one: [],
      rules: {
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        assess: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
        // remark: [{ required: true, m essage: "请填写活动形式", trigger: "blur" }]
      },
      init_data: {
        pageNumber: 1,
        pageSize: 10
      },
      list_data: {
        userName: ""
      },
      page: {
        total: 0
      },
      tableData: []
    };
  },
  created() {
    this.init();
    this.keyupSubmit();
  },
  mounted() {},
  methods: {
    keyupSubmit() {
      document.onkeypress = function(e) {
        const keycode = document.all ? event.keyCode : e.which;
        if (keycode == 13) {
          that.init(); // 登录方法名
          return false;
        }
      };
    },
    // 列表数据
    init() {
      console.log(this.init_data);
      this.loading = true;
      this.api.getallworkassess(this.init_data, this.list_data).then(res => {
        this.page.total = res.count;
        this.tableData = res.data;
        this.loading = false;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log();
          this.api.addorupd_chaworkassess(this.ruleForm).then(res => {
            if (res.status === 200) {
              this.dialogVisible = false;
              this.$message.success(res.message);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.api.del_workassess({ ids: this.ruleForm.id }).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.ruleForm = {};
          this.dialogVisible = false;
          this.$message.success(res.message);
        }
      });
    },
    //点击查看内容
    contentAction(row) {
      this.contentShow = true;
      this.content = row.workDesc;
    },
    //删除
    handleDelete(index, row) {
      this.dialogVisible = true;
      this.ids = row;
      this.indexs = index;
    },
    dialogDelete() {
      this.api.del_chawork({ ids: this.ids }).then(res => {
        if (res.status === 200) {
          this.dialogVisible = false;
          this.$message.success(res.message);
          this.tableData.splice(this.indexs, 1);
          this.init();
        }
      });
    },
    //搜索
    handleSeach() {
      this.init();
    },
    handleCurrentChange(val) {
      this.init_data.pageNumber = val;
      this.init();
    },
    handleSee(index, studentId) {
      this.$router.push("/resource/assess/" + studentId);
    },
    handleAdd() {
      this.$router.push("/resource/assess/add");
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
.production {
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
  .production-top {
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    .top-title {
      border-bottom: 1px solid #d7d7d7;
      font-size: 18px;
      line-height: 50px;
    }
  }
  .production-select {
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
.production .btn {
  width: 64px;
  height: 29px;
  padding: 0;
}
.production
  /deep/
  .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: #617fa5;
}
.production /deep/ .el-pagination.is-background .el-pager li:hover {
  color: #617fa5;
}
.production
  /deep/
  .el-pagination.is-background
  .el-pager
  li.active:not(.disabled):hover {
  color: #fff;
}
</style>
