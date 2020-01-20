<template>
  <!-- 课程教学 -->
  <div class="study">
    <div class="top"></div>
    <div class="container">
      <div class="discussion">
        <div class="discussion-top">
          <div class="title">
            <span>讨论区</span>
            <span>平台讨论区使用规则</span>
          </div>
          <div class="search">
            <el-button @click="noticeShowAction" style="margin-right: 20px;" type="primary">修改公告</el-button>
            <!-- <el-input class="w-20" v-model="input" placeholder="搜索该课程下帖子/回复/评论等"></el-input>
            <el-button type="success">搜索</el-button>-->
          </div>
        </div>
        <div class="discussion-welcome">{{notice.centent}}</div>
        <div class="discussion-sponsor">
          <el-button @click="bbspostShow = true">发起帖子</el-button>
        </div>
        <div class="discussion-section">
          <div class="section-top">
            <span>子版块</span>
            <span>
              <i class="el-icon-s-unfold"></i>发帖排行榜top100
            </span>
          </div>
          <div
            :key="index"
            @click="sectionAction(item.id)"
            class="section-invitation"
            v-for="(item, index) in initList"
          >
            <img :src="downloadfileUrl + item.photo" alt />
            <div class="section-modelName">{{item.modelName}}</div>
            <div class="section-content">
              <span>{{item.centent}}</span>
              <p>
                <span>{{item.updateBy}}</span>
                {{item.updateDate}}
              </p>
            </div>
          </div>
          <div class="panel_pagination" style="margin-top:20px;">
            <el-pagination
              :current-page="init_data.pageNumber"
              :page-size="init_data.pageSize"
              :total="init_page.total"
              @current-change="handleCurrentChange"
              background
              layout="prev, pager, next, jumper"
              style="text-align:center"
            ></el-pagination>
          </div>
        </div>
        <div class="discussion-theme">
          <div class="theme-top">
            <span class="top-title">全部帖子</span>
            <!-- <div class="top-tabList">
                          <span
                            v-for="(item, index) in tabList"
                            :class="{active: selectIndex === index}"
                            @click="selectAction(index)"
                            :key="index"
                          >{{item.title}}</span>
            </div>-->
          </div>
          <div :key="index" class="theme-bottom" v-for="(item, index) in bbsList">
            <div class="theme-title">
              <span @click="detailsAction(item.id)">{{item.title}}</span>
              <p>{{item.content}}</p>
            </div>
            <div>
              <p>
                <span style="padding: 0 10px 0 0;">{{item.formUid}}</span>
                <span>{{item.updateDate}}</span>
              </p>
              <p>
                <!-- <span>浏览：0</span> -->
                <span>回复：{{item.replyNum}}</span>
                <!-- <span>投票：0</span> -->
              </p>
            </div>
          </div>
        </div>
        <div class="panel_pagination" style="margin-top:20px;">
          <el-pagination
            :current-page="bbspost_data.pageNumber"
            :page-size="bbspost_data.pageSize"
            :total="bbspost_page.total"
            @current-change="handleCurrentChangeBbspost"
            background
            layout="prev, pager, next, jumper"
            style="text-align:center"
          ></el-pagination>
        </div>
        <el-dialog :visible.sync="noticeShow" title="修改公告" width="30%">
          <textarea rows="10" style="width: 100%;" v-model="centent"></textarea>
          <span class="dialog-footer" slot="footer">
            <el-button @click="noticeShow = false">取 消</el-button>
            <el-button @click="updateNotice" type="primary">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog :visible.sync="bbspostShow" title="发表新帖子" width="30%">
          <el-form :model="bbsPost" :rules="rules" ref="bbsPostForm">
            <el-form-item label="帖子标题" prop="title">
              <el-input placeholder="请输入帖子标题" style="width: 80%;" v-model="bbsPost.title"></el-input>
            </el-form-item>
            <el-form-item label="帖子类型" prop="modelId">
              <el-select
                clearable
                placeholder="请选择帖子类型"
                style="width: 80%;"
                v-model="bbsPost.modelId"
              >
                <el-option
                  :key="item.id"
                  :label="item.modelName"
                  :value="item.id"
                  v-for="item in options"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="帖子内容" prop="content">
              <el-input placeholder="请输入帖子内容" rows="10" type="textarea" v-model="bbsPost.content"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="bbspostShow = false">取 消</el-button>
              <el-button @click="updateBbspost" type="primary">确 定</el-button>
            </el-form-item>
            <!-- <el-input style="width: 100%;" v-model="bbsPost.title"></el-input>
            <textarea rows="10" style="width: 100%;" v-model="bbsPost.content"></textarea>-->
          </el-form>
          <!--                    <span class="dialog-footer" slot="footer">-->
          <!--                      <el-button @click="bbspostShow = false">取 消</el-button>-->
          <!--                      <el-button @click="updateBbspost" type="primary">确 定</el-button>-->
          <!--                    </span>-->
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      init_data: {
        name: "",
        page: 1,
        strip: 1
      },
      page: {
        total: 10
      },
      tabList: [
        {
          title: "最新发表"
        },
        {
          title: "最后回复"
        },
        {
          title: "回复数"
        },
        {
          title: "投票数"
        }
      ],
      value: "",
      input: "",
      selectIndex: 0,
      notice: {
        centent: ""
      },
      centent: "",
      noticeShow: false,
      bbspostShow: false,
      init_data: {
        pageNumber: 1,
        pageSize: 3
      },
      init_page: {
        total: 0
      },
      initList: [],
      bbspost_data: {
        pageNumber: 1,
        pageSize: 10
      },
      bbspost_json: {
        modelId: ""
      },
      bbspost_page: {
        total: 0
      },
      bbsPost: {
        title: "",
        content: "",
        modelId: ""
      },
      bbsList: {},
      options: [],
      rules: {
        title: [{ required: true, message: "请输入帖子标题", trigger: "blur" }],
        modelId: [
          { required: true, message: "请选择帖子类型", trigger: "change" }
        ],
        content: [
          { required: true, message: "请输入帖子内容", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.init();
    this.selectbbsnotice();
    this.bbspostList();
  },
  methods: {
    //查询讨论模块
    init() {
      this.api.selectbbsmodel(this.init_data).then(res => {
        this.initList = res.data;
        this.init_page.total = res.count;
        this.options = res.data;
      });
    },
    //查询论讨单个论坛模块
    sectionAction(id) {
      this.bbspost_json.modelId = id;
      this.bbspostList();
      // this.api.selectbbsmodelbyid({ id: id }).then(res => {
      //   console.log(res);
      // });
    },
    //查询帖子page
    bbspostList() {
      this.api.selectbbspost(this.bbspost_data, this.bbspost_json).then(res => {
        this.bbsList = res.data;
        this.bbspost_page.total = res.count;
      });
    },
    detailsAction(id) {
      this.$router.push("/comment/" + id);
    },
    handleCurrentChange(val) {
      this.init_data.pageNumber = val;
      this.init();
    },
    handleCurrentChangeBbspost(val) {
      this.bbspost_data.pageNumber = val;
      this.bbspostList();
    },
    //查询讨论区公告
    selectbbsnotice() {
      this.api.selectbbsnotice().then(res => {
        this.notice = res.data[0];
      });
    },
    //修改讨论区公告
    noticeShowAction() {
      this.noticeShow = true;
      this.centent = this.notice.centent;
    },
    updateNotice() {
      this.api.updatebbsnotice({ centent: this.centent }).then(res => {
        if (res.status === 200) {
          this.$message.success("修改公告成功!");
          this.noticeShow = false;
          this.selectbbsnotice();
        }
      });
    },
    //添加/更新帖子
    updateBbspost() {
      this.$refs["bbsPostForm"].validate(valid => {
        if (valid) {
          this.api.updatebbspost(this.bbsPost).then(res => {
            if (res.status === 200) {
              this.$message.success("新增帖子成功!");
              this.bbspostShow = false;
              this.bbspostList();
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.study {
  width: 100%;
  background-color: #f2f2f2;
  padding-bottom: 30px;

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
    font-size: 12px;
    background-color: #fff;

    .discussion {
      width: 100%;
      padding: 0 60px 20px 60px;

      .discussion-top {
        display: flex;
        justify-content: space-between;
        height: 60px;
        width: 100%;
        border-bottom: 1px solid #999;
        align-items: center;

        .title {
          line-height: 40px;
          padding-top: 10px;

          span {
            font-size: 18px;
            margin-right: 20px;
          }

          span:nth-of-type(2) {
            font-size: 12px;
            color: #617fa5;
          }
        }

        .search {
          width: auto;
        }
      }

      .discussion-welcome {
        min-height: 44px;
        line-height: 24px;
        color: #666;
        text-indent: 24px;
        margin-top: 10px;
      }

      .discussion-inform {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #333;
        padding: 20px 10px;

        p:nth-of-type(1) {
          position: relative;

          img {
            position: absolute;
            top: 0;
            left: -2px;
            width: 20px;
            height: 20px;
          }

          span {
            font-size: 14px;
          }

          span:nth-of-type(1) {
            margin-left: 25px;
            margin-right: 40px;
          }
        }

        p:nth-of-type(2) {
          color: #999;
        }
      }

      .discussion-sponsor {
        text-align: center;
        line-height: 150px;

        & /deep/ .el-button {
          background-color: #617fa5;
          color: #fff;
        }
      }

      .discussion-section {
        .section-top {
          border-bottom: 1px solid #999;
          line-height: 40px;
          display: flex;
          justify-content: space-between;

          span:nth-of-type(1) {
            font-size: 14px;
          }

          span:nth-of-type(2) {
            color: #617fa5;
          }
        }

        .section-invitation {
          position: relative;
          border-bottom: 1px solid #999;
          min-height: 66px;
          padding: 10px 0 10px 40px;
          cursor: pointer;

          img {
            position: absolute;
            top: 14px;
            left: 0;
            width: 32px;
            height: 32px;
          }

          .section-modelName {
            line-height: 30px;
            font-size: 14px;
          }

          .section-content {
            color: #999;
            line-height: 24px;
            display: flex;
            justify-content: space-between;

            span:nth-of-type(1) {
              display: inline-block;
              min-height: 20px;
            }

            p {
              color: #617fa5;

              span:nth-of-type(1) {
                padding: 0 20px;
              }
            }
          }
        }
      }

      .discussion-theme {
        margin-top: 50px;

        .theme-top {
          border-bottom: 1px solid #999;
          line-height: 40px;
          display: flex;
          justify-content: space-between;

          .top-title {
            font-size: 14px;
          }

          .top-tabList {
            text-align: center;
            line-height: 27px;

            span {
              width: 64px;
              display: inline-block;
              background-color: #f2f2f2;
              color: #666;
              cursor: pointer;
            }
          }
        }

        .theme-bottom {
          border-bottom: 1px solid #999;

          .theme-title {
            min-height: 40px;
            padding-top: 10px;
            padding-bottom: 10px;
            color: #666;

            p {
              line-height: 18px;
              margin-top: 5px;
            }

            span {
              &:hover {
                color: #617fa5;
                border-bottom: 1px solid #617fa5;
                cursor: pointer;
              }
            }
          }

          div:nth-of-type(2) {
            display: flex;
            justify-content: space-between;

            p:nth-of-type(1) {
              height: 30px;
              text-align: center;

              span:nth-of-type(1) {
                color: #617fa5;
              }

              span:nth-of-type(2) {
                color: #999;
              }
            }

            p:nth-of-type(2) {
              color: #999;

              span {
                margin-left: 40px;
              }
            }
          }
        }
      }
    }
  }
}

.w-20 {
  width: 240px;
  margin-right: 20px;
}

.w-16 {
  width: 160px;
  margin-right: 20px;
}

.discussion
  /deep/
  .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: #617fa5;
}

.discussion /deep/ .el-pagination.is-background .el-pager li:hover {
  color: #617fa5;
}

.discussion
  /deep/
  .el-pagination.is-background
  .el-pager
  li.active:not(.disabled):hover {
  color: #fff;
}

.discussion .active {
  background-color: #617fa5 !important;
  color: #fff !important;
}
</style>

