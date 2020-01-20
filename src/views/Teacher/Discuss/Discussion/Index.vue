<template>
  <!-- 讨论区 -->
  <div class="discussion">
    <div class="discussion-top">
      <div class="title">
        <span>讨论区</span>
        <span>平台讨论区使用规则</span>
      </div>
      <div class="search">
        <el-select clearable class="w-16" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input class="w-20" v-model="input" placeholder="搜索该课程下主题/回复/评论等"></el-input>
        <el-button>搜索</el-button>
      </div>
    </div>
    <div
      class="discussion-welcome"
    >欢迎大家来到讨论区！本讨论区供各位同学就课程问题进行交流学习。请同学们认真阅读下面的【讨论区使用规则】，然后再进行相关发表，谢谢！</div>
    <div class="discussion-inform">
      <p>
        <img src="@/common/images/horn.png" alt />
        <span>管理员公告</span>
        <span>关于倡导诚信学习的课程公告</span>
      </p>
      <p>2019年06月25日 14:03</p>
    </div>
    <div class="discussion-sponsor">
      <el-button>发起主题</el-button>
    </div>
    <div class="discussion-section">
      <div class="section-top">
        <span>子版块</span>
        <span>
          <i class="el-icon-s-unfold"></i>发帖排行榜top100
        </span>
      </div>
      <div class="section-invitation" v-for="(item, index) in 3" :key="index">
        <i class="el-icon-document-copy"></i>
        <p>老师答疑区</p>
        <p>
          <span>发表关于作业、测试、课件内容希望能够得到老师回答的疑问。</span>
          <span>计算机真的好难啊（35分钟前）</span>
        </p>
      </div>
    </div>
    <div class="discussion-theme">
      <div class="theme-top">
        <span class="top-title">全部主题</span>
        <div class="top-tabList">
          <span
            v-for="(item, index) in tabList"
            :class="{active: selectIndex === index}"
            @click="selectAction(index)"
            :key="index"
          >{{item.title}}</span>
        </div>
      </div>
      <div
        class="theme-bottom"
        @click="detailsAction(index)"
        v-for="(item, index) in 5"
        :key="index"
      >
        <div
          style="min-height: 40px;padding-top: 15px;padding-bottom: 15px;"
        >计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊计算机真的好难啊</div>
        <div>
          <p>
            <span>eqDQWQ张晓...</span>
            <span>于2019年6月24日发表</span>
          </p>
          <p>
            <span>浏览：0</span>
            <span>回复：0</span>
            <span>投票：0</span>
          </p>
        </div>
      </div>
    </div>
    <div class="panel_pagination" style="margin-top:20px;">
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
      input: "",
      selectIndex: 0
    };
  },
  methods: {
    detailsAction(id) {
      this.$router.push("/discuss/discussion/" + id);
    },
    handleCurrentChange(val) {
      this.init_data.page = val;
    },
    selectAction(index) {
      this.selectIndex = index;
      console.log(this.selectIndex);
    }
  }
};
</script>

<style lang="scss" scoped>
.discussion {
  background-color: #fff;
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
    line-height: 44px;
    color: #666;
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
    &/deep/.el-button {
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
      padding-left: 40px;
      border-bottom: 1px solid #999;
      min-height: 66px;
      margin-top: 20px;
      padding-bottom: 10px;
      i {
        position: absolute;
        top: 14px;
        left: 0;
        font-size: 32px;
      }
      p {
        line-height: 30px;
      }
      p:nth-of-type(1) {
        font-size: 14px;
      }
      p:nth-of-type(2) {
        color: #999;
        line-height: 24px;
        display: flex;
        justify-content: space-between;
        span:nth-of-type(1) {
          display: inline-block;
          min-height: 20px;
          width: 70%;
        }
        span:nth-of-type(2) {
          color: #617fa5;
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
      cursor: pointer;
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
.w-20 {
  width: 240px;
}
.w-16 {
  width: 160px;
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