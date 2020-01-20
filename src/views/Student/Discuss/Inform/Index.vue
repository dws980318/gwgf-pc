<template>
  <!-- 通知 -->
  <div class="inform">
    <p>通知</p>
    <div class="inform-content">
      <div class="content-list" v-for="(item, index) in tableData" :key="index" @click="detailsAction(item.id)">
        <span>{{item.title}}</span>
        <span>{{item.publishTime}}</span>
      </div>
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
      tableData: [],
      selectIndex: 0,
      init_data: {
        pageNumber: 1,
        pageSize: 8
      },
      list_data: {
        title: "",
        publishState: '1'
      },
      page: {
        total: 0
      }
    };
  },
   created() {
    this.init();
  },
  methods: {
    // 列表数据
    init() {
      this.api.getallnotices(this.init_data, this.list_data).then(res => {
        this.tableData = res.data;
        this.page.total = res.count;
      });
    },
    detailsAction(id) {
      this.$router.push("/discuss/inform/" + id);
    },
     //分页
    handleCurrentChange(val) {
      this.init_data.pageNumber = val;
      this.init();
    },
  }
};
</script>

<style lang="scss" scoped>
.inform {
  width: 100%;
  padding: 50px 140px 0 140px;
  p {
    text-align: center;
    //   line-height: 120px;
    font-size: 26px;
  }
  .inform-content {
    margin-top: 30px;
    margin-bottom: 60px;
    .content-list {
      cursor: pointer;
      padding-top: 10px;
      min-height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e0e0e0;
      span {
        font-size: 16px;
        color: #666;
      }
    }
    p {
      margin-top: 10px;
      text-align: right;
      font-size: 16px;
    }
  }
}
.inform /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #617fa5;
}
.inform /deep/ .el-pagination.is-background .el-pager li:hover {
  color: #617fa5;
}
.inform
  /deep/
  .el-pagination.is-background
  .el-pager
  li.active:not(.disabled):hover {
  color: #fff;
}
</style>