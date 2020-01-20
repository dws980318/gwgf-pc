<template>
  <!-- 作业管理 -->
  <div class="homework">
    <div class="homework-top">
      <div class="top-title">作业管理</div>
    </div>
    <div class="homework-select">
      <el-input clearable @keyup.enter.native="init" v-model="list_data.job_name" placeholder="请输入作业名称"></el-input>
      <!-- <el-select clearable style="width:100%;" v-model="init_data.job_name" placeholder="请选择作业名称">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>-->
      <el-button style="margin-left: 15px;" type="success" @click="handleSeach">搜索</el-button>
      <el-button
        style="margin-left: 15px;background-color: #617fa5;color:#fff;"
        @click="handleAdd"
      >添加作业</el-button>
    </div>
    <div class="dataTable_main">
      <el-table :data="tableData" v-loading="loading" style="width: 100%" border>
        <!-- <el-table-column label="id" align="center" width="60">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>-->
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
        <el-table-column label="发布状态" width="100" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.publish_status === 0" class="warning-state">待发布</span>
            <span v-if="scope.row.publish_status === 1" class="success-state">已发布</span>
          </template>
        </el-table-column>
        <el-table-column prop="job_desc" label="作业内容" width="180" align="center">
          <template slot-scope="scope">
            <p style="color:#617fa5;cursor:pointer" @click="contentAction(scope.row)">查看</p>
          </template>
        </el-table-column>
        <el-table-column prop="s" label="操作" width="280" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="handleCheck(scope.$index, scope.row.id)"
            >查看学生作业</el-button>
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row.id)">编辑</el-button>
            <el-button
              @click="handleDelete(scope.$index, scope.row.id)"
              size="mini"
              type="danger"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog class="content" :visible.sync="contentShow" title="作业内容" width="30%">
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
      contentShow: false,
      content: "",
      loading: false,
      input: "",
      dialogVisible: false,
      ids: "",
      indexs: "",
      init_data: {
        pageNumber: 1,
        pageSize: 10
      },
      list_data: {
        job_name: ""
      },
      page: {
        total: 0
      },
      options: [],
      tableData: []
    };
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        console.log(val);
      },
      // 深度观察监听
      deep: true
    }
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
    that.init_data.pageNumber = that.$store.state.pageNumber
      ? that.$store.state.pageNumber
      : 1;
    that.init();
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
      this.loading = true;
      this.api.getallchajobs(this.init_data, this.list_data).then(res => {
        this.loading = false;
        this.tableData = res.data;
        this.page.total = res.count;
      });
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
    handleEdit(index, studentId) {
      this.$router.push("/resource/work/" + studentId);
    },
    //删除
    handleDelete(index, row) {
      this.dialogVisible = true;
      this.ids = row;
      this.indexs = index;
    },
    dialogDelete() {
      this.api.del_chajob({ ids: this.ids }).then(res => {
        if (res.status === 200) {
          this.dialogVisible = false;
          this.$message.success(res.message);
          this.tableData.splice(this.indexs, 1);
          this.init();
        }
      });
    },
    handleCurrentChange(val) {
      this.init_data.pageNumber = val;
      this.$store.commit("getPageNumber", val);
      this.init();
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
