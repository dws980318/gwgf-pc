<template>
  <!-- 活动管理 -->
  <div class="competition">
    <div class="competition-top">
      <div class="top-title">活动管理</div>
      <el-button class="btn" @click="handleAdd">添加活动</el-button>
    </div>
    <div class="competition-select">
      <el-input style="width:250px;" clearable v-model="value" placeholder="请输入活动名称"></el-input>
      <el-button style="margin-left: 15px;" type="success">搜索</el-button>
    </div>
    <div class="dataTable_main">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="活动名称" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="activityTime" label="活动时间" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="活动地点" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="活动类别" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="desc" label="活动介绍" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="width: 360px;height: auto;" v-html="scope.row.desc"></p>
              <div slot="reference" class="name-wrapper">
                <p style="color:dodgerblue;cursor:pointer">详情</p>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="astrictNumber" label="报名限制名额" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="resource" label="发布状态" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.resource"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#999"
              :disabled="true"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="s" label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row.id)">编辑</el-button>
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
          title: "活动一",
          value: "选项1",
          activityTime: "2019-12-04 10:46:02",
          address: "广州东站",
          startTime: "2019-12-04 10:46:02",
          endTime: "2019-12-04 10:46:02",
          astrictNumber: "120",
          resource: 0,
          desc: "这是一个活动，oh mygod"
        },
        {
          title: "活动一",
          value: "选项1",
          activityTime: "2019-12-04 10:46:02",
          address: "广州东站",
          startTime: "2019-12-04 10:46:02",
          endTime: "2019-12-04 10:46:02",
          astrictNumber: "120",
          resource: 1,
          desc: "这是一个活动，oh mygod"
        },
        {
          title: "活动一",
          value: "选项1",
          activityTime: "2019-12-04 10:46:02",
          address: "广州东站",
          startTime: "2019-12-04 10:46:02",
          endTime: "2019-12-04 10:46:02",
          astrictNumber: "120",
          resource: 0,
          desc: "这是一个活动，oh mygod"
        },
        {
          title: "活动一",
          value: "选项1",
          activityTime: "2019-12-04 10:46:02",
          address: "广州东站",
          startTime: "2019-12-04 10:46:02",
          endTime: "2019-12-04 10:46:02",
          astrictNumber: "120",
          resource: 1,
          desc: "这是一个活动，oh mygod"
        },
        {
          title: "活动一",
          value: "选项1",
          activityTime: "2019-12-04 10:46:02",
          address: "广州东站",
          startTime: "2019-12-04 10:46:02",
          endTime: "2019-12-04 10:46:02",
          astrictNumber: "120",
          resource: 0,
          desc: "这是一个活动，oh mygod"
        },
        {
          title: "活动一",
          value: "选项1",
          activityTime: "2019-12-04 10:46:02",
          address: "广州东站",
          startTime: "2019-12-04 10:46:02",
          endTime: "2019-12-04 10:46:02",
          astrictNumber: "120",
          resource: 0,
          desc: "这是一个活动，oh mygod"
        },
        {
          title: "活动一",
          value: "选项1",
          activityTime: "2019-12-04 10:46:02",
          address: "广州东站",
          startTime: "2019-12-04 10:46:02",
          endTime: "2019-12-04 10:46:02",
          astrictNumber: "120",
          resource: 1,
          desc:
            "这是一个活动，oh mygod这是一个活动，oh mygod这是一个活动，oh mygod这是一个活动，oh mygod这是一个活动，oh mygod"
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
    handleAdd() {
      this.$router.push("/discuss/competition/add");
    },
    handleEdit(index, row) {
      this.$router.push("/discuss/competition/" + index);
    },
    handleCurrentChange(val) {
      this.init_data.page = val;
      //   this.init();
    }
  }
};
</script>

<style lang="scss" scoped>
.competition {
  background-color: #fff;
  width: 100%;
  padding: 0 60px;
  .competition-top {
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
  .competition-select {
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
.competition
  /deep/
  .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: #617fa5;
}
.competition /deep/ .el-pagination.is-background .el-pager li:hover {
  color: #617fa5;
}
.competition
  /deep/
  .el-pagination.is-background
  .el-pager
  li.active:not(.disabled):hover {
  color: #fff;
}
.competition /deep/ .btn {
  background-color: #617fa5;
  color: #fff;
  width: 73px;
  height: 29px;
  padding: 0;
}
</style>
