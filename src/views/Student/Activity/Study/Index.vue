<template>
  <!-- 活动管理 -->
  <div class="study">
    <div class="container">
      <div>
        <el-row>
          <el-col :span="24">
            <div style="width: 100%;height: auto">
              <div class="study-top">
                <div class="top-title">课外活动管理</div>
              </div>
              <div class="study-select">
                <el-input v-model="searchData.name" placeholder="请输入活动名称"></el-input>
                <el-button style="margin-left: 15px;" type="success">搜索</el-button>
              </div>
            </div>
            
           <div class="table">
              <el-table
                :data="tableData"
                border
                v-loading="loading"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column label="标题" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.title }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="活动类型" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.type }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="发件人" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.send }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="发布时间" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.creatTime}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="发布状态" width="100" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.state === 0" class="warning-state">待发布</span>
                    <span v-if="scope.row.state === 1" class="success-state">已发布</span>
                    <span v-if="scope.row.state === 2" class="error-state">已撤销</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="160px" align="center">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="primary"
                      @click="handleEdit(scope.$index, scope.row.id)"
                    >查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-pagination
          style="text-align:center"
          background
          :page-size="searchData.currentPage"
          layout="prev, pager, next, jumper"
          :total="page.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      visible: false,
      loading: false,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      formrules: {},
      state_list: {
        1: "已上架",
        0: "已下架"
      },
      selection: [],
      tableData: [], // 用于存放数据
      selectDate: [],
      searchData: {
        startDate: "",
        endDate: "",
        name: "",
        state: "",
        department: "",
        currentPage: 1,
        pageSize: 10
      },
      page: {
        total: 0
      },
      upload: {
        typeid: ""
      }
    };
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    // tableRowClassName({row, rowIndex}) {
    //   console.log({row, rowIndex})
    //   if (row.state === 1) {
    //     return 'warning-row';
    //   } else if (rowIndex === 2) {
    //     return 'success-row';
    //   } else if (rowIndex === 2) {
    //     return 'error-row';
    //   }
    //   return '';
    // },
   init() {
      console.log(this.searchData);
      this.loading = true;
      let newData = [
        {
          id: 1,
          title: "“南粤青年说”活动讲座",
          type: "第二课堂活动",
          send: "张三",
          review: "李四",
          url: "http://baidu.com",
          creatTime: "2019-03-06 09:45:55",
          state: 0
        },
        {
          id: 2,
          title: "“南粤青年说”活动讲座",
          type: "第二课堂活动",
          send: "张三",
          review: "李四",
          url: "http://baidu.com",
          creatTime: "2019-03-06 09:45:55",
          state: 1
        },
        {
          id: 3,
          title: "“南粤青年说”活动讲座",
          type: "第二课堂活动",
          send: "张三",
          review: "李四",
          url: "http://baidu.com",
          creatTime: "2019-03-06 09:45:55",
          state: 1
        },
        {
          id: 4,
          title: "“南粤青年说”活动讲座",
          type: "第二课堂活动",
          send: "张三",
          review: "李四",
          url: "http://baidu.com",
          creatTime: "2019-03-06 09:45:55",
          state: 2
        },
        {
          id: 5,
          title: "“南粤青年说”活动讲座",
          type: "第二课堂活动",
          send: "张三",
          review: "李四",
          url: "http://baidu.com",
          creatTime: "2019-03-06 09:45:55",
          state: 1
        },
        {
          id: 5,
          title: "“南粤青年说”活动讲座",
          type: "第二课堂活动",
          send: "张三",
          review: "李四",
          url: "http://baidu.com",
          creatTime: "2019-03-06 09:45:55",
          state: 1
        },
        {
          id: 5,
          title: "“南粤青年说”活动讲座",
          type: "第二课堂活动",
          send: "张三",
          review: "李四",
          url: "http://baidu.com",
          creatTime: "2019-03-06 09:45:55",
          state: 1
        },
        {
          id: 5,
          title: "“南粤青年说”活动讲座",
          type: "第二课堂活动",
          send: "张三",
          review: "李四",
          url: "http://baidu.com",
          creatTime: "2019-03-06 09:45:55",
          state: 1
        },
        {
          id: 5,
          title: "“南粤青年说”活动讲座",
          type: "第二课堂活动",
          send: "张三",
          review: "李四",
          url: "http://baidu.com",
          creatTime: "2019-03-06 09:45:55",
          state: 1
        },
        {
          id: 5,
          title: "“南粤青年说”活动讲座",
          type: "第二课堂活动",
          send: "张三",
          review: "李四",
          url: "http://baidu.com",
          creatTime: "2019-03-06 09:45:55",
          state: 1
        },
        {
          id: 5,
          title: "“南粤青年说”活动讲座",
          type: "第二课堂活动",
          send: "张三",
          review: "李四",
          url: "http://baidu.com",
          creatTime: "2019-03-06 09:45:55",
          state: 1
        }
      ];
      this.tableData = newData;
      this.page.total = newData.length;
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    },
    selectOptions(id) {
      let name = "";
      this.options.map((item, index, array) => {
        if (item.id === id) {
          name = item.name;
        }
      });
      return name;
    },
    hanldeSeach() {
      // 搜索
      this.init();
    },
    hanldeAdd() {
      // 添加
      this.$router.push("/activity/study/add");
    },
    showModal() {
      this.visible = true;
    },
    download() {
      location.href = "http://gzlouvre.globalviewcco.com/file/游戏中奖名单.xls";
      // this.$message.success('下载成功！')
    },
    getOptions(department) {
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].id == department) {
          return this.options[i].name;
        }
      }
      return "加载所属系部错误";
    },
    handleEdit(index, id) {
      // this.$message.success('核销成功！')
      // this.tableData[index].state = 1
      this.$router.push("/activity/study/" + id);
    },
    handleSuccess(data) {
      console.log(data);
      this.visible = false;
      this.upload.typeid = "";
      this.$refs.upload.clearFiles();
      // this.form.img = URL.createObjectURL(file.raw)
      // this.form.banner = data.data
    },
    handleDelete(index, id) {
      this.tableData.splice(index, 1);
      this.$message.success("删除成功！");
    },
    handleSizeChange(val) {
      this.searchData.currpage = 1;
      this.searchData.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.searchData.currpage = val;
      this.init();
    },
    handleSelectionChange(val) {
      this.selection = val;
    },
    hanldeSomeDelete() {
      this.selection.map(item => {
        if (this.tableData.indexOf(item) != -1) {
          this.tableData.splice(this.tableData.indexOf(item), 1);
        }
      });
      this.$message.success("批量删除成功");
    }
  }
};
</script>

<style scoped lang="scss">
.study {
  width: 100%;
  height: auto;
  background-color: #f2f2f2;
  padding-bottom: 30px;
}
.top {
  height: 59px;
  width: 100%;
  line-height: 20px;
  padding: 10px 0;
  font-size: 14px;
  border-bottom: 1px solid #e6e2e2;
  .top-name {
    color: #617fa5;
  }
}
.container {
  background-color: #fff;
  padding-bottom: 20px;
}
.study-top {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  .top-title {
    border-bottom: 1px solid #d7d7d7;
    font-size: 18px;
    line-height: 50px;
  }
}
.table {
  width: 100%;
  height: auto;
  padding: 20px;
}
.study-select {
  width: 600px;
  display: flex;
  margin-top: 15px;
  padding-left: 20px;
}
.preview {
  width: 240px;
  height: auto;
}

.warning-state {
  color: #e3853a;
}

.success-state {
  color: #67c23a;
}

.error-state {
  color: #f56c6c;
  padding: 0 5px;
}
.study
  /deep/
  .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: #617fa5;
}
.study /deep/ .el-pagination.is-background .el-pager li:hover {
  color: #617fa5;
}
.study
  /deep/
  .el-pagination.is-background
  .el-pager
  li.active:not(.disabled):hover {
  color: #fff;
}
</style>

