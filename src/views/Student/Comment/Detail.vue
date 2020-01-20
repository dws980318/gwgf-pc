<template>
  <div class="courseDetails">
    <div class="top"></div>
    <div class="container">
      <div class="details" style="min-height: 730px;background-color: #fff;">
        <el-page-header
          :content="$route.params.id ? '查看贴子' : '新增'"
          @back="goBack"
          style="margin-bottom: 20px;"
        ></el-page-header>
        <div class="title">
          <p>{{details.title}}</p>
          <div class="message">
            <div class="name">
              <span>{{details.updateDate}}</span>
              <span>回复：{{details.replyNum}}</span>
            </div>
            <div class="btn">
              <el-button @click="deleteAction" style="color: #fff;;background: red;" v-if="show">删除</el-button>
              <el-button @click="replyAction">回复</el-button>
            </div>
          </div>
        </div>
        <el-row class="master">
          <el-col :span="24">
            <el-col :span="4" class="master-img">
              <img :src="imgUrl ? imgUrl:avator" alt />
              <p class="name">{{name}}楼主</p>
              <p class="time">{{details.updateDate}}</p>
            </el-col>
            <el-col :span="20">
              <!-- <img style="width: 100%;" src="@/common/images/banner01.png" alt /> -->
              <div
                style="line-height: 22px;font-size: 14px;padding-right: 10px;"
              >{{details.content}}</div>
            </el-col>
          </el-col>
        </el-row>
        <el-row :key="index" class="main" v-for="(item, index) in details.replys">
          <el-col :span="24">
            <el-col :span="4" class="main-img">
              <img :src="downloadfileUrl + item.formUPhoto" alt />
              <p class="name">{{item.formUName}}</p>
              <!-- <p class="time">2019年6月24日</p> -->
            </el-col>
            <el-col :span="20" class="main-comment">
              <div class="meReply">
                <div class="meReply-content">{{item.content}}</div>
                <div class="time">
                  <span>{{item.createDate}}</span>
                  <el-button @click="replysAction(item)">回复</el-button>
                </div>
              </div>
              <el-col
                :key="rListIndex"
                :span="24"
                class="reply-box"
                v-for="(rListItem, rListIndex) in item.rList"
              >
                <el-col :span="3" class="reply">
                  <img :src="downloadfileUrl + rListItem.formUPhoto" alt />
                  <p class="name">{{rListItem.formUName}}</p>
                </el-col>
                <el-col :span="21" class="reply-main">
                  <div>
                    <span style="color:#169bd5">{{rListItem.formUName}}</span>
                    回复
                    <span style="color:#169bd5">{{rListItem.toUName}}</span>
                    :
                    {{rListItem.content}}
                  </div>
                  <div class="time">
                    <span>{{rListItem.createDate}}</span>
                    <el-button @click="replysAction(rListItem)">回复</el-button>
                  </div>
                  <!-- <el-col
                                      :span="24"
                                      class="replys-box"
                                      v-for="(rListItem, rListIndex) in rListItem.rList"
                                      :key="rListIndex"
                                    >
                                      <el-col :span="4" class="reply">
                                        <img :src="downloadfileUrl + rListItem.formUPhoto" alt />
                                        <p class="name">{{rListItem.formUName}}</p>
                                      </el-col>
                                      <el-col :span="20" class="reply-main">
                                        <p>{{rListItem.content}}</p>
                                        <div class="time">
                                          <span>{{rListItem.createDate}}</span>
                                          <el-button>回复</el-button>
                                        </div>
                                      </el-col>
                  </el-col>-->
                </el-col>
              </el-col>
            </el-col>
          </el-col>
        </el-row>
        <!-- <div class="panel_pagination" style="margin-top:20px;">
                  <el-pagination
                    style="text-align:center"
                    background
                    @current-change="handleCurrentChange"
                    :page-size="init_data.pageSize"
                    :current-page="init_data.pageNumber"
                    layout="prev, pager, next, jumper"
                    :total="page.total"
                  ></el-pagination>
        </div>-->

        <el-dialog :visible.sync="dialogVisible" title="回复" width="30%">
          <textarea rows="15" v-model="bbsReply.content"></textarea>
          <span class="dialog-footer" slot="footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button @click="replySubmit" type="primary">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog :visible.sync="replysDialogVisible" title="回复" width="30%">
          <textarea rows="15" v-model="replysbbsReply.content"></textarea>
          <span class="dialog-footer" slot="footer">
            <el-button @click="replysDialogVisible = false">取 消</el-button>
            <el-button @click="replysSubmit" type="primary">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import userImg from "@/common/images/u267.jpg";

export default {
  data() {
    return {
      init_data: {
        pageNumber: 1,
        pageSize: 5,
        id: this.$route.params.id
      },
      page: {
        total: 0
      },
      details: {
        content: "",
        formUid: "",
        createDate: "",
        updateDate: "",
        title: ""
      },
      dialogVisible: false,
      replysDialogVisible: false,
      bbsReply: {
        content: "",
        replyType: 1,
        postId: this.$route.params.id,
        formUid: ""
      },
      replysbbsReply: {
        content: "",
        replyType: 1,
        replyId: "",
        formUid: "",
        toUid: "",
        postId: this.$route.params.id
      },
      avator: userImg,
      leafCount: [],
      show: false,
      imgUrl: "",
      name: ""
    };
  },
  created() {
    if (this.$route.params.id) {
      this.init();
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    init() {
      this.api.selectbbspostreplybyid(this.init_data).then(res => {
        this.details = res.data;
        this.leafCount = [];
        this.api.selectuserbyid({ id: this.details.formUid }).then(res => {
          this.imgUrl = this.downloadfileUrl + res.data.photo;
          this.name = res.data.accountname;
          if (JSON.parse(localStorage.list).id === res.data.id) {
            this.show = true;
          }
        });
        console.log(this.details);
        res.data.replys.map(item => {
          console.log(item.rList);
          if (item.rList) {
            this.getLeafCountTree(item);
          }
        });
      });
    },
    getLeafCountTree(data) {
      if (!data.rList) {
        return 1;
      } else {
        let rList = [];
        let rList2 = data.rList;

        for (let i = 0; i < rList2.length; i++) {
          rList.push(rList2[i]);
          let rList3 = this.getLeafCountTree(rList2[i]);
          for (let j = 0; j < rList3.length; j++) {
            rList.push(rList3[j]);
          }
        }
        console.log(rList);
        data.rList = rList;
        return rList;
      }
    },
    deleteAction() {
      this.api.deletebbspost({ ids: this.$route.params.id }).then(res => {
        this.$message.success(res.message);
        this.$router.push("/comment");
      });
    },
    replyAction() {
      this.dialogVisible = true;
    },
    replySubmit() {
      this.bbsReply.formUid = this.details.formUid;
      this.api.updatebbsreply(this.bbsReply).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.$message.success("评论成功!");
          this.dialogVisible = false;
          this.init();
          this.bbsReply.content = "";
        }
      });
    },
    replysAction(item) {
      this.replysDialogVisible = true;
      this.replysbbsReply.replyId = item.id;
      this.replysbbsReply.formUid = this.details.formUid;
      this.replysbbsReply.toUid = item.formUid;
    },
    replysSubmit() {
      this.api.updatebbsreply(this.replysbbsReply).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.$message.success("评论成功!");
          this.replysDialogVisible = false;
          this.init();
          this.replysbbsReply = {
            content: "",
            replyType: 1,
            replyId: "",
            formUid: "",
            toUid: ""
          };
        }
      });
    },
    handleCurrentChange(val) {
      this.init_data.pageNumber = val;
      this.init();
    }
  }
};
</script>


<style lang="scss" scoped>
.courseDetails {
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

    .details {
      padding: 15px 70px;

      .title {
        border-bottom: 1px solid #999;
        padding: 10px 0;

        p {
          line-height: 26px;
          font-size: 14px;
        }

        .message {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-right: 10px;

          & /deep/ .el-button {
            height: 27px;
            background-color: rgba(22, 155, 213, 1);
            padding: 0 20px;
            color: #fff;
          }

          .name {
            span {
              margin-right: 15px;
              color: #999;
            }

            span:nth-of-type(1) {
              margin-right: 55px;
              color: #617fa5;
            }
          }
        }
      }

      .master {
        padding: 20px 0 0 0;
        border-bottom: 1px solid #999;

        .master-img {
          img {
            width: 102px;
            height: 102px;
          }

          .name {
            margin-top: 20px;
            font-size: 18px;
          }

          .time {
            color: #999;
          }
        }
      }

      .main {
        padding: 20px 0 0 0;
        border-bottom: 1px solid #000;

        .main-img {
          img {
            width: 102px;
            height: 102px;
          }

          .name {
            margin-top: 20px;
            font-size: 18px;
          }

          .time {
            color: #999;
          }
        }

        .main-comment {
          padding-bottom: 10px;

          .meReply {
            min-height: 100px;
            font-size: 14px;
            margin-bottom: 5px;
            padding-right: 10px;

            .meReply-content {
              min-height: 80px;
            }

            .time {
              text-align: right;
              margin-bottom: 5px;

              span {
                color: #999;
                margin-right: 25px;
              }

              & /deep/ .el-button {
                color: #fff;
                background-color: #169bd5;
                height: 25px;
                padding: 0 20px;
              }
            }
          }

          .reply-box {
            background-color: #f2f2f2;
            width: 100%;
            padding: 20px 10px 10px 20px;
            display: flex;
            border-bottom: 1px dashed #999;
            // justify-content: space-between;
            // flex-direction: column;
            .reply {
              img {
                width: 40px;
                height: 40px;
                margin-right: 10px;
              }
            }

            .reply-main {
              line-height: 24px;
              font-size: 14px;

              p:nth-of-type(1) {
                font-size: 16px;
                margin-bottom: 10px;
              }

              .time {
                text-align: right;

                span {
                  color: #999;
                  margin-right: 25px;
                }

                & /deep/ .el-button {
                  color: #fff;
                  background-color: #169bd5;
                  height: 25px;
                  padding: 0 20px;
                }
              }
            }

            .replys-box {
              margin-top: 10px;
              background-color: #ffffff;
              min-height: 100px;
              width: 100%;
              padding: 20px 10px 10px 20px;
              display: flex;
              // justify-content: space-between;
              // flex-direction: column;
              .reply {
                img {
                  width: 65px;
                  height: 65px;
                  margin-right: 10px;
                }
              }

              .reply-main {
                line-height: 24px;
                font-size: 14px;

                p:nth-of-type(1) {
                  min-height: 80px;
                  font-size: 16px;
                }

                .time {
                  text-align: right;

                  span {
                    color: #999;
                    margin-right: 25px;
                  }

                  & /deep/ .el-button {
                    color: #fff;
                    background-color: #169bd5;
                    height: 25px;
                    padding: 0 20px;
                  }
                }
              }
            }
          }
        }
      }

      textarea {
        width: 100%;
      }
    }
  }
}

.details
  /deep/
  .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: #617fa5;
}

.details /deep/ .el-pagination.is-background .el-pager li:hover {
  color: #617fa5;
}

.details
  /deep/
  .el-pagination.is-background
  .el-pager
  li.active:not(.disabled):hover {
  color: #fff;
}
</style>
