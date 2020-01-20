<template>
  <!-- 全部精品资源管理 -->
  <div class="course">
    <div class="container">
      <div>
        <el-row>
          <el-col :span="24">
            <div style="width: 100%;height: auto">
              <div class="course-top">
                <div class="top-title">全部精品资源管理</div>
              </div>
              <div class="course-select">
                <el-input
                  clearable
                  @keyup.enter.native="init"
                  v-model="list_data.title"
                  placeholder="请输入资源名称"
                ></el-input>
                <el-button style="margin-left: 15px;" type="success" @click="hanldeSeach">搜索</el-button>
                <!-- <el-button
                  style="margin-left: 15px;background-color: #617fa5;color:#fff;"
                  @click="hanldeAdd"
                >添加精品资源</el-button>-->
              </div>
            </div>
            <div class="table">
              <!--          :row-class-name="tableRowClassName"-->
              <!-- 根据状态选择样式-->
              <el-table
                :data="tableData"
                border
                v-loading="loading"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column label="序号" align="center" width="60">
                  <template slot-scope="scope">
                    <span>{{ scope.$index + 1 }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="封面图" align="center">
                  <template slot-scope="scope" v-if="scope.row.img_id">
                    <el-popover trigger="hover" placement="top">
                      <img class="thumbnail_big" :src="downloadfileUrl + scope.row.img_id" alt />
                      <div slot="reference" class="name-wrapper">
                        <img class="thumbnail" :src="downloadfileUrl + scope.row.img_id" alt />
                      </div>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column label="标题" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.title }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="URL" align="center">
                  <template slot-scope="scope">
                    <p
                      style="cursor: pointer;color: #748fcc;"
                      @click="openAction(scope.row.link)"
                    >{{ scope.row.link }}</p>
                    <!-- <a :href="scope.row.link" target="_blank">{{ scope.row.link }}</a> -->
                  </template>
                </el-table-column>
                <el-table-column label="精品资源类型" align="center">
                  <template slot-scope="scope">
                    <span>{{ aaa(scope.row.btrType) }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="content" label="精品资源内容" width="180" align="center">
                  <template slot-scope="scope">
                    <p style="color:#617fa5;cursor:pointer" @click="contentAction(scope.row)">查看</p>
                  </template>
                </el-table-column>
                <el-table-column label="发布时间" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.publish_time }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="发布状态" width="100" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.publish_state  === 0" class="warning-state">待发布</span>
                    <span v-if="scope.row.publish_state  === 1" class="success-state">已发布</span>
                  </template>
                </el-table-column>
                <!-- <el-table-column label="审核状态" width="100" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.check_state === 0" class="warning-state">待审核</span>
                    <span v-if="scope.row.check_state === 1" class="success-state">已审核</span>
                  </template>
                </el-table-column>-->
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
              <el-dialog class="content" :visible.sync="contentShow" title="精品资源内容" width="30%">
                <div style="min-height:100px;border-top:1px solid #ccc">
                  <p v-html="content"></p>
                </div>
              </el-dialog>
            </div>
          </el-col>
        </el-row>
      </div>
      <div>
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
  </div>
</template>


<script>
export default {
  name: "List",
  data() {
    return {
      visible: false,
      loading: false,
      contentShow: false,
      content: "",
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
      options: [
        {
          id: 1,
          name: "视频讲课"
        },
        {
          id: 2,
          name: "普通教学"
        },
        {
          id: 3,
          name: "实践教学"
        }
      ],
      formrules: {},
      state_list: {
        2: "已撤销",
        1: "已发布",
        0: "待发布"
      },
      selection: [],
      tableData: [], // 用于存放数据
      selectDate: [],
      init_data: {
        pageNumber: 1,
        pageSize: 8
      },
      list_data: {
        title: "",
        publish_state: 1
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
    let that = this;
    // document.onkeypress = function(e) {
    //   const keycode = document.all ? event.keyCode : e.which;
    //   if (keycode == 13) {
    //     that.init(); // 登录方法名
    //     return false;
    //   }
    // };
    that.init();
    that.getbtrType();
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
    openAction(url) {
      if (url.indexOf("http://") >= 0 || url.indexOf("https://") >= 0) {
        window.open(url);
      } else {
        window.open("http://" + url);
        console.log(url);
      }
    },
    aaa(val) {
      this.options.map(j => {
        if (val === j.dicValue) {
          this.one = j.dicName;
        }
      });
      return this.one;
    },
    getbtrType() {
      this.api.selectdic({ dictype: "精品资源类型" }).then(res => {
        console.log(res);
        // this.options = res.data;
        var one = { dicName: "全部", dicValue: "" };
        this.options = [one, ...res.data];
      });
    },
    init() {
      this.loading = true;
      this.api.getallbtqress(this.init_data, this.list_data).then(res => {
        this.loading = false;
        this.tableData = res.data;
        this.page.total = res.count;
      });
    },
    // 搜索
    hanldeSeach() {
      this.init();
    },
    hanldeAdd() {
      // 添加
      this.$router.push("/assess/checked/add");
    },
    handleEdit(index, id) {
      this.$router.push("/assess/unchecked/" + id);
    },
    handleDelete(index, id) {
      this.tableData.splice(index, 1);
      this.$message.success("删除成功！");
    },
    //点击查看内容
    contentAction(row) {
      this.contentShow = true;
      this.content = row.content;
    },
    // 分页
    handleSizeChange(val) {
      this.init_data.pageNumber = 1;
      this.init_data.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.init_data.pageNumber = val;
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
.course {
  width: 100%;
  height: auto;
  background-color: #f2f2f2;
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
.course-top {
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
.thumbnail {
  width: 120px;
  height: auto;
}
.thumbnail_big {
  width: 270px;
  height: auto;
}
.course-select {
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
.course /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #617fa5;
}
.course /deep/ .el-pagination.is-background .el-pager li:hover {
  color: #617fa5;
}
.course
  /deep/
  .el-pagination.is-background
  .el-pager
  li.active:not(.disabled):hover {
  color: #fff;
}
</style>

