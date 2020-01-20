<template>
  <!-- 通知管理 -->
  <div class="notice">
    <div class="notice-top">
      <div class="top-title">通知管理</div>
      <el-button class="btn" @click="handleAdd">添加通知</el-button>
    </div>
    <div class="notice-select">
      <el-input @keyup.enter.native="init" style="width:250px;" clearable v-model="list_data.title" placeholder="请输入通知标题"></el-input>
      <el-button style="margin-left: 15px;" type="success" @click="handleSeach">搜索</el-button>
    </div>
    <div class="dataTable_main">
      <el-table :data="tableData" style="width: 100%">
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
        <el-table-column prop="title" label="通知标题" width="180" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="通知类型" align="center">
          <template slot-scope="scope">
            <span>{{ aaa(scope.row.notice_type) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="通知内容" align="center">
          <template slot-scope="scope">
            <p style="color:#617fa5;cursor:pointer" @click="contentAction(scope.row)">查看</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="publishTime"
          label="发布时间"
          width="180"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <!-- <el-table-column prop="publishState" label="发布状态" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.publishState"
              :active-value="'1'"
              :inactive-value="'0'"
              active-color="#13ce66"
              inactive-color="#999"
              :disabled="true"
            ></el-switch>
          </template>
        </el-table-column> -->
        <el-table-column label="发布状态" width="100" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.publishState === '0'" class="warning-state">待发布</span>
            <span v-if="scope.row.publishState === '1'" class="success-state">已发布</span>
          </template>
        </el-table-column>
        <el-table-column prop="s" label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row.id)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog class="content" :visible.sync="contentShow" title="通知内容" width="30%">
        <div style="min-height:100px;border-top:1px solid #ccc">
          <p v-html="content"></p>
        </div>
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
  data() {
    return {
      contentShow: false,
      content: "",
      value: "",
      init_data: {
        pageNumber: 1,
        pageSize: 8
      },
      list_data: {
        title: ""
      },
      page: {
        total: 0
      },
      tableData: [],
      options: []
    };
  },
  created() {
    this.init();
    // this.keyupSubmit();
    this.getActivityType();
  },
  methods: {
    keyupSubmit() {
      document.onkeydown = e => {
        let _key = window.event.keyCode;
        if (_key === 13) {
          this.init();
        }
      };
    },
    aaa(val) {
      this.options.map(j => {
        if (val === j.dicValue) {
          this.one = j.dicName;
        }
      });
      return this.one;
    },
    getActivityType() {
      this.api.selectdic({ dictype: "活动类型" }).then(res => {
        // this.options = res.data;
        var one = { dicName: "全部", dicValue: "" };
        this.options = [one, ...res.data];
      });
    },
    // 列表数据
    init() {
      const params = new URLSearchParams();
      for (let [k, v] of Object.entries(this.init_data)) {
        params.append(k, v);
      }
      // Object.keys(this.init_data).forEach((key)=> {
      //   console.log(key, this.init_data[key])
      // params.append(key, this.init_data[key]);
      // })
      // params.append("page", this.init_data.page);
      // params.append("limit", this.init_data.limit);
      this.api.getallnotices(this.init_data, this.list_data).then(res => {
        this.tableData = res.data;
        this.page.total = res.count;
      });
    },
    //跳转到新增
    handleAdd() {
      this.$router.push("/discuss/notice/add");
    },
    //跳转到编辑
    handleEdit(index, row) {
      this.$router.push("/discuss/notice/" + row);
    },
    //删除
    handleDelete(index, row) {
      this.api.del_notice({ ids: row }).then(res => {
        if (res.status === 200) {
          this.$message.success(res.message);
          this.tableData.splice(index, 1);
          this.init();
        }
      });
    },
    //点击查看内容
    contentAction(row) {
      this.contentShow = true;
      this.content = row.content;
    },
    //分页
    handleCurrentChange(val) {
      this.init_data.pageNumber = val;
      this.init();
    },
    //搜索
    handleSeach() {
      this.init();
    }
  }
};
</script>

<style lang="scss" scoped>
.notice {
  background-color: #fff;
  width: 100%;
  padding: 0 60px;
  .notice-top {
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
  .notice-select {
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
.warning-state {
  color: #e3853a;
}

.success-state {
  color: #67c23a;
}

.notice /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #617fa5;
}
.notice /deep/ .el-pagination.is-background .el-pager li:hover {
  color: #617fa5;
}
.notice
  /deep/
  .el-pagination.is-background
  .el-pager
  li.active:not(.disabled):hover {
  color: #fff;
}
.notice /deep/ .btn {
  background-color: #617fa5;
  color: #fff;
  width: 73px;
  height: 29px;
  padding: 0;
}
</style>
