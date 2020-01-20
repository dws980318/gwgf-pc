<template>
  <!-- 课程教学 -->
  <div>
    <div class="container" style="font-size: 12px;background-color: #f2f2f2;">
      <el-col :span="24" style=" margin-bottom: 50px;">
        <el-col :span="4">
          <div class="nav-main">
            <!-- <router-link to="/activity/course/list">个人信息</router-link>
            <router-link to="/activity/study/list">账户安全</router-link>-->
            <ul>
              <div
                v-if="hoverTop === 0"
                :style="{'top': hoverTop +'px','border-top-left-radius': '15px','border-top-right-radius': '15px',}"
                class="active_hover"
              ></div>
              <div v-else :style="{'top': hoverTop +'px'}" class="active_hover"></div>
              <li
                @mouseover="navHover(index)"
                @mouseout="navOut()"
                :class="index == hoverIndex ? 'active': ''"
                v-for="(item, index) in options"
                :key="index"
                @click="navAction(item.dicValue, index)"
              >{{item.dicName}}</li>
            </ul>
          </div>
        </el-col>
        <el-col :span="20" style="min-height: 730px;background-color: #fff;">
          <div class="study">
            <div>
              <el-row>
                <el-col :span="24">
                  <div style="width: 100%;height: auto">
                    <div class="study-top">
                      <div class="top-title">课程教学管理</div>
                    </div>
                    <div class="study-select">
                      <el-input clearable @keyup.enter.native="init" v-model="list_data.lessonName" placeholder="请输入课程名称"></el-input>
                      <el-button style="margin-left: 15px;" type="success" @click="hanldeSeach">搜索</el-button>
                      <el-button
                        style="margin-left: 15px;background-color: #617fa5;color:#fff;"
                        @click="hanldeAdd"
                      >添加课程</el-button>
                    </div>
                  </div>
                  <div class="table">
                    <!--          :row-class-name="tableRowClassName"-->
                    <!-- 根据状态选择样式-->
                    <el-table
                      :data="tableData"
                      border
                      :header-cell-style="{background:'#fafafa'}"
                      v-loading="loading"
                      style="width: 100%"
                      @selection-change="handleSelectionChange"
                    >
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
                      <el-table-column label="课程名称" align="center">
                        <template slot-scope="scope">
                          <span>{{ (scope.row.lessonName) }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        v-if="selectIndex === 0"
                        label="课程分类"
                        align="center"
                      >
                        <template slot-scope="scope">
                          <span>{{ aaa(scope.row.lessonClassId) }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="发布人" align="center">
                        <template slot-scope="scope">
                          <span>{{ scope.row.issuerName }}</span>
                        </template>
                      </el-table-column>
                      <!-- <el-table-column label="课程时长" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.lessonLength }}</span>
                  </template>
                      </el-table-column>-->
                      <el-table-column label="发布时间" align="center">
                        <template slot-scope="scope">
                          <span>{{ scope.row.uploadTime }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="发布状态" width="100" align="center">
                        <template slot-scope="scope">
                          <span v-if="scope.row.checkState  === 0" class="warning-state">待发布</span>
                          <span v-if="scope.row.checkState  === 1" class="success-state">已发布</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作" fixed="right" width="160px" align="center">
                        <template slot-scope="scope">
                          <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit(scope.$index, scope.row.id)"
                          >编辑</el-button>
                          <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row.id)"
                          >删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
                      <p style="font-size: 20px;">点击确定将删除该条数据</p>
                      <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogDelete">确 定</el-button>
                      </span>
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
        </el-col>
      </el-col>
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
      dialogVisible: false,
      ids: "",
      indexs: "",
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
      contentShow: false,
      content: "",
      selectIndex: 0,
      hoverIndex: 0,
      hoverTop: 0,
      selection: [],
      tableData: [], // 用于存放数据
      selectDate: [],
      init_data: {
        pageNumber: 1,
        pageSize: 8
      },
      list_data: {
        lessonName: "",
        lessonClassId: ""
      },
      page: {
        total: 0
      },
      upload: {
        typeid: ""
      },
      options: []
    };
  },
  computed: {},
  created() {
    this.selectIndex = localStorage.lessonIndex ? localStorage.lessonIndex : 0;
    this.hoverIndex = localStorage.lessonIndex ? localStorage.lessonIndex : 0;
    this.list_data.lessonClassId = localStorage.lessonClassId;
    this.hoverTop =
      (localStorage.lessonIndex ? localStorage.lessonIndex : 0) * 46;
    this.init();
    // this.keyupSubmit();
    this.getActivityType();
  },
  methods: {
    aaa(val) {
      this.options.map(j => {
        if (val === j.dicValue) {
          this.one = j.dicName;
        }
      });
      return this.one;
    },
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
    getActivityType() {
      this.api.selectdic({ dictype: "课程分类" }).then(res => {
        // this.options = res.data;
        var one = { dicName: "全部", dicValue: "" };
        this.options = [one, ...res.data];
      });
    },
    keyupSubmit() {
      document.onkeydown = e => {
        let _key = window.event.keyCode;
        if (_key === 13) {
          this.init();
        }
      };
    },
    navHover(index) {
      this.hoverIndex = index;
      var top = index * 46;
      this.hoverTop = top;
    },
    navOut() {
      this.hoverIndex = this.selectIndex;
      var top = this.hoverIndex * 46;
      this.hoverTop = top;
    },
    navAction(id, index) {
      this.selectIndex = index;
      localStorage.lessonIndex = this.selectIndex;
      localStorage.lessonClassId = id;
      this.list_data.lessonClassId = id;
      this.init();
    },
    // 列表数据
    init() {
      this.loading = true;
      this.api.getalllessons(this.init_data, this.list_data).then(res => {
        this.tableData = res.data;
        this.page.total = res.count;
        this.loading = false;
      });
    },
    hanldeSeach() {
      // 搜索
      this.init();
    },
    hanldeAdd() {
      // 添加
      this.$router.push("/teach/add");
    },
    handleEdit(index, id) {
      this.$router.push("/teach/" + id);
    },
    handleSuccess(data) {
      this.visible = false;
      this.upload.typeid = "";
      this.$refs.upload.clearFiles();
      // this.form.img = URL.createObjectURL(file.raw)
      // this.form.banner = data.data
    },
    //删除
    handleDelete(index, row) {
      this.dialogVisible = true;
      this.ids = row;
      this.indexs = index;
    },
    dialogDelete() {
      this.api.del_lesson({ ids: this.ids }).then(res => {
        if (res.status === 200) {
          this.dialogVisible = false;
          this.$message.success(res.message);
          this.tableData.splice(this.indexs, 1);
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
.nav-main {
  width: 203px;
  background-color: #fff;
  margin-bottom: 10px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  ul {
    position: relative;
    .active_hover {
      position: absolute;
      left: 0;
      width: 100%;
      height: 46px;
      background-color: #617fa5;
      transition: all 0.3s;
    }
    li {
      position: relative;
      display: block;
      width: 100%;
      text-align: center;
      line-height: 46px;
      color: #000;
      cursor: pointer;
      transition: color 0.2s;
      transition-delay: 0.15s;
      &.active {
        color: #fff;
      }
    }
    li:nth-of-type(1) {
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
    }
    a {
      display: block;
      width: 100%;
      text-align: center;
      line-height: 46px;
      color: #000;
      cursor: pointer;
      &.router-link-active {
        background-color: #617fa5;
        color: #fff;
      }
    }
    a:nth-of-type(1) {
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
    }
  }
}
.study {
  width: 100%;
  height: auto;
  // background-color: #f2f2f2;
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
.study /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
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

