<template>
  <!-- 个人作品管理 -->
  <div class="production">
    <div class="production-top">
      <div class="top-title">个人作品管理</div>
    </div>
    <div class="production-select">
      <el-input clearable @keyup.enter.native="init" v-model="list_data.workName" placeholder="请输入作品名称"></el-input>
      <el-button
        style="margin-left: 15px; width: 84px; height: 40px;"
        @click="handleSeach"
        type="success"
      >搜索</el-button>
      <el-button
        style="margin-left: 15px;background-color: #617fa5;color:#fff;"
        @click="handleAdd"
      >添加作品</el-button>
    </div>
    <div class="dataTable_main">
      <el-table :data="tableData" v-loading="loading" style="width: 100%" border>
        <el-table-column label="序号" align="center" width="60">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="封面图" align="center">
          <template slot-scope="scope" v-if="scope.row.imgId">
            <el-popover trigger="hover" placement="top">
              <img class="thumbnail_big" :src="downloadfileUrl + scope.row.imgId" alt />
              <div slot="reference" class="name-wrapper">
                <img class="thumbnail" :src="downloadfileUrl + scope.row.imgId" alt />
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="workName" label="作品名称" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="publishDate" label="发布时间" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="job_desc" label="作品内容" width="180" align="center">
          <template slot-scope="scope">
            <p style="color:#617fa5;cursor:pointer" @click="contentAction(scope.row)">查看</p>
          </template>
        </el-table-column>
        <el-table-column prop="publishStatus" label="评估状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.publishStatus === 0" class="warning-state">待评估</span>
            <span v-if="scope.row.publishStatus === 1" class="success-state">已评估</span>
          </template>
        </el-table-column>
        <el-table-column prop="s" label="操作" width="240" align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.publishStatus === 0"
              @click="dialogVisibleAction(scope.$index, scope.row)"
              size="mini"
              type="success"
            >评估</el-button>
            <el-button
              v-if="scope.row.publishStatus === 1"
              @click="handleAssess(scope.row.id)"
              size="mini"
              type="success"
            >查看评估</el-button>
            <el-button @click="handleEdit(scope.$index, scope.row.id)" size="mini" type="primary">编辑</el-button>
            <el-button
              @click="handleDelete(scope.$index, scope.row.id)"
              size="mini"
              type="danger"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      <el-dialog title="评估" :visible.sync="dialogVisibles" width="30%">
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
            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            <!-- <el-button @click="resetForm('ruleForm')">删除</el-button> -->
          </el-form-item>
        </el-form>
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
      dialogVisibles: false,
      ruleForm: {
        remark: "",
        criterionOne: 0,
        criterionTwo: 0,
        criterionThree: 0,
        userName: "",
        workId: ""
      },
      input: "",
      init_data: {
        pageNumber: 1,
        pageSize: 10
      },
      list_data: {
        workName: ""
      },
      page: {
        total: 0
      },
      tableData: [],
      one: []
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    // 列表数据
    init() {
      console.log(this.init_data);
      this.loading = true;
      this.api.getallchaworks(this.init_data, this.list_data).then(res => {
        this.loading = false;
        this.one = res.data;
        this.page.total = res.count;
        this.getList(this.one);
      });
    },
    //点击查看内容
    contentAction(row) {
      this.contentShow = true;
      this.content = row.workDesc;
    },
    handleEdit(index, studentId) {
      this.$router.push("/resource/production/" + studentId);
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
    getList(one) {
      one.map(item => {
        this.api.selectassessstatus({ id: item.id }).then(response => {
          item.publishStatus = response.data;
        });
      });
      setTimeout(() => {
        this.tableData = this.one;
        this.loading = false;
      }, 200);
    },
    dialogVisibleAction(index, row) {
      this.dialogVisibles = true;
      this.ruleForm.userName = row.userName;
      this.ruleForm.workId = row.id;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.api.addorupd_chaworkassess(this.ruleForm).then(res => {
            if (res.status === 200) {
              this.dialogVisibles = false;
              this.$message.success(res.message);
              this.init();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleCurrentChange(val) {
      this.init_data.pageNumber = val;
      this.init();
    },
    handleAdd() {
      this.$router.push("/resource/production/add");
    },
    handleAssess(id) {
      this.$router.push("/resource/production/teaEvaluate/" + id);
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
