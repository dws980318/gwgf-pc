<template>
  <!-- 作业管理 -->
  <div class="homework">
    <div class="container">
      <el-page-header @back="goBack" content="查看学生"></el-page-header>
      <div class="homework-select">
        <el-input v-model="list_data.issuer_name" placeholder="请输入学生名称"></el-input>
        <el-button style="margin-left: 15px;" type="success" @click="handleSeach">搜索</el-button>
      </div>
      <div class="dataTable_main">
        <el-table :data="tableData" v-loading="loading" style="width: 100%" border>
          <el-table-column label="序号" align="center" width="60">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="issuer_name" label="学生名称" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="publish_date" label="提交时间" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="publish_status" label="评估状态" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.publish_status === 0" class="warning-state">待评估</span>
              <span v-if="scope.row.publish_status === 1" class="success-state">已评估</span>
            </template>
          </el-table-column>
          <el-table-column prop="s" label="操作" width="220" align="center">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.publish_status === 0"
                @click="dialogVisibleAction(scope.$index, scope.row)"
                size="mini"
                type="warning"
              >评估</el-button>
              <!-- <el-button
                v-if="scope.row.publish_status === 1"
                @click="handleAssess(scope.row.id)"
                size="mini"
                type="success"
              >查看评估</el-button> -->
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row.id)"
              >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="评估" :visible.sync="dialogVisible" width="30%">
          <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
              <el-button type="primary" @click="submitForm">确定</el-button>
              <!-- <el-button @click="resetForm('ruleForm')">删除</el-button> -->
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
      <div class="panel_pagination">
        <el-pagination
          style="text-align:center"
          background
          :page-size="init_data.strip"
          layout="prev, pager, next, jumper"
          :total="page.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      loading: false,
      dialogVisible: false,
      input: "",
      init_data: {
        pageNumber: 1,
        pageSize: 10
      },
      list_data: {
        father_id: ""
      },
      page: {
        total: 0
      },
      tableData: [],
      one: [],
      ruleForm: {
        remark: "",
        criterionOne: 0,
        criterionTwo: 0,
        criterionThree: 0,
        userName: "",
        jobId: ""
      }
    };
  },
  created() {
    console.log(this.$route.params);
    if (this.$route.params.detail) {
      this.init(this.$route.params.detail);
    }
  },
  mounted() {},
  methods: {
    // 列表数据
    init(id) {
      this.list_data.father_id = id;
      console.log(this.init_data);
      this.loading = true;
      this.api.getAllStuChaJobs(this.init_data, this.list_data).then(res => {
        this.loading = false;
        this.one = res.data;
        this.page.total = res.count;
        this.getList(this.one);
      });
    },
    getList(one) {
      one.map(item => {
        this.api.selectjobassessstatus({ id: item.id }).then(response => {
          item.publish_status = response.data;
        });
      });
      setTimeout(() => {
        this.tableData = this.one;
        this.loading = false;
      }, 200);
    },
    goBack() {
      this.$router.back();
    },
    dialogVisibleAction(index, row) {
      this.dialogVisible = true;
      this.ruleForm.userName = row.issuer_name;
      this.ruleForm.jobId = row.id;
    },
    submitForm() {
      this.api.addorupd_chajobassess(this.ruleForm).then(res => {
        if (res.status === 200) {
          this.dialogVisible = false;
          this.$message.success(res.message);
          this.init(this.$route.params.detail);
          this.ruleForm = {};
        }
      });
    },
    //搜索
    handleSeach() {
      this.init();
    },
    handleEdit(index, studentId) {
      console.log(index, studentId);
      this.$router.push("/resource/work/studDetail/" + studentId);
    },
    handleDelete(index, row) {
      this.tableData.splice(index, 1);
    },
    handleAdd() {
      this.$router.push("/resource/work/add");
    },
    handleCheck(index) {
      this.$router.push("/resource/work/detail/" + index);
    },
    handleAssess(id) {
      this.$router.push("/resource/work/teaEvaluate/" + id);
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
  .container {
    background-color: #fff;
    font-size: 12px;
    padding: 20px;
  }
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
