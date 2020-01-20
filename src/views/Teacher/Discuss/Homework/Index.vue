<template>
  <!-- 作业管理 -->
  <div class="homework">
    <div class="homework-top">
      <div class="top-title">作业管理</div>
      <el-button class="btn" @click="handleAdd">添加作业</el-button>
    </div>
    <div class="homework-select">
      <el-input style="width:250px;" clearable v-model="value" placeholder="请输入作业名称"></el-input>
      <el-button style="margin-left: 15px;" type="success">搜索</el-button>
    </div>
    <div class="dataTable_main">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="作业名称" width="180" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="date" label="开始时间" width="180" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column
          prop="finishTime"
          label="截止时间"
          width="180"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="address" label="成绩" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="s" label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.$index, scope.row.id)" size="mini"
                      type="primary">管理</el-button>
          </template>
        </el-table-column>
      </el-table>
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
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      init_data: {
        name: "",
        page: 1,
        strip: 1
      },
      page: {
        total: 10
      },
      tableData: [
        {
          date: "2016-05-04",
          finishTime: "2016-05-02",
          title: "作业一",
          address: "100"
        },
        {
          date: "2016-05-04",
          finishTime: "2016-05-02",
          title: "作业一",
          address: "100"
        },
        {
          date: "2016-05-04",
          finishTime: "2016-05-02",
          title: "作业一",
          address: "100"
        },
        {
          date: "2016-05-04",
          finishTime: "2016-05-02",
          title: "作业一",
          address: "100"
        },
        {
          date: "2016-05-04",
          finishTime: "2016-05-02",
          title: "作业一",
          address: "100"
        },
        {
          date: "2016-05-04",
          finishTime: "2016-05-02",
          title: "作业一",
          address: "100"
        },
        {
          date: "2016-05-04",
          finishTime: "2016-05-02",
          title: "作业一",
          address: "100"
        },
        {
          date: "2016-05-04",
          finishTime: "2016-05-02",
          title: "作业一",
          address: "100"
        },
        {
          date: "2016-05-04",
          finishTime: "2016-05-02",
          title: "作业一",
          address: "100"
        }
      ]
    };
  },
  methods: {
    handleAdd() {
      this.$router.push("/discuss/homework/add");
    },
    handleEdit(index, row) {
      this.$router.push("/discuss/homework/" + index);
    },
    handleCurrentChange(val) {
      this.init_data.page = val;
      //   this.init();
    }
  }
};
</script>

<style lang="scss" scoped>
.homework {
  background-color: #fff;
  width: 100%;
  padding: 0 60px;
  .homework-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d7d7d7;
    .btn {
      width: 84px;
      height: 40px;
    }
    .top-title {
      font-size: 18px;
      line-height: 50px;
    }
  }
  .homework-select {
    margin-top: 10px;
    .btn {
      width: 84px;
      height: 40px;
      margin-left: 10px;
    }
  }
  .dataTable_main {
    width: 100%;
    height: auto;
    padding: 10px 0 20px 0;
  }
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
.homework /deep/ .btn {
  background-color: #617fa5;
  color: #fff;
  width: 73px;
  height: 29px;
  padding: 0;
}
</style>
