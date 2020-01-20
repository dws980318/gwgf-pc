<template>
  <!-- 学习情况 -->
  <div class="condition">
    <div class="condition-top">
      <div class="top-title">学生情况</div>
      <el-button class="btn">添加学生</el-button>
    </div>
    <div class="condition-select">
      <el-input style="width:250px;" clearable v-model="value" placeholder="请输入学生姓名"></el-input>
      <el-button style="margin-left: 15px;" type="success">搜索</el-button>
    </div>
    <div class="dataTable_main">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="学生姓名" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="date" label="所在系" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="date2" label="所在班级" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="在线时长" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="作业情况" align="center" show-overflow-tooltip>
          <template>
            <el-button class="btn">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="课程进度" align="center" show-overflow-tooltip>
          <template>
            <el-button class="btn">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="状态" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="s" label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row.id)"
            >删除</el-button>
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
          date2: "2016-05-02",
          name: "第三章学习详解.pdf",
          address: "100"
        },
        {
          date: "2016-05-04",
          date2: "2016-05-04",
          name: "第三章学习详解.pdf",
          address: "78"
        },
        {
          date: "2016-05-01",
          date2: "2016-05-04",
          name: "第三章学习详解.pdf",
          address: "98"
        },
        {
          date: "2016-05-03",
          date2: "2016-05-04",
          name: "第三章学习详解.pdf",
          address: "78"
        },
        {
          date: "2016-05-03",
          date2: "2016-05-04",
          name: "第三章学习详解.pdf",
          address: "87"
        },
        {
          date: "2016-05-03",
          date2: "2016-05-04",
          name: "第三章学习详解.pdf",
          address: "76"
        },
        {
          date: "2016-05-03",
          date2: "2016-05-04",
          name: "第三章学习详解.pdf",
          address: "90"
        },
        {
          date: "2016-05-03",
          date2: "2016-05-04",
          name: "第三章学习详解.pdf",
          address: "91"
        }
      ],
      list: [
        {
          title: "绪论",
          courseList: [
            { catalogue: "绪论(视频)" },
            { catalogue: "绪论(课件)" },
            { catalogue: "课程内容" }
          ]
        },
        {
          title: "第一章  社会实践",
          courseList: [
            { catalogue: "绪论(视频)" },
            { catalogue: "绪论(视频)" },
            { catalogue: "绪论(视频)" },
            { catalogue: "绪论(课件)" },
            { catalogue: "绪论(课件)" },
            { catalogue: "绪论(课件)" },
            { catalogue: "课程内容" },
            { catalogue: "课程内容" },
            { catalogue: "课程内容" }
          ]
        }
      ]
    };
  },
  methods: {
    handleDelete(index, row) {
      this.tableData.splice(index, 1);
    },
    handleCurrentChange(val) {
      this.init_data.page = val;
      //   this.init();
    }
  }
};
</script>

<style lang="scss" scoped>
.condition {
  background-color: #fff;
  width: 100%;
  padding: 0 60px;
  .condition-top {
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
  .condition-select {
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
    .btn {
      background-color: #fff;
      border: 1px solid #617fa5;
      color: #617fa5;
    }
  }
}
.condition
  /deep/
  .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: #617fa5;
}
.condition /deep/ .el-pagination.is-background .el-pager li:hover {
  color: #617fa5;
}
.condition
  /deep/
  .el-pagination.is-background
  .el-pager
  li.active:not(.disabled):hover {
  color: #fff;
}
.condition /deep/ .btn {
  background-color: #617fa5;
  color: #fff;
  width: 73px;
  height: 29px;
  padding: 0;
}
</style>
