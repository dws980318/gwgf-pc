<template>
  <!-- 笔记 -->
  <div class="note">
    <div class="note-title">笔记</div>
    <div class="note-btn-box">
      <el-button class="note-btn">新建笔记</el-button>
    </div>
    <div class="note-whole">
      <div class="whole-left">
        <span
          v-for="(item, index) in tabList"
          :class="{active: selectIndex === index}"
          :key="index"
          @click="tabAction(index)"
        >{{item.title}}</span>
      </div>
      <div class="whole-right">
        <span>
          我的比较
          <i></i>
        </span>
        <span>我的收藏</span>
      </div>
    </div>
    <div class="note-search">
      <div class="search-screen">
        <span>
          排序
          <i></i>
        </span>
        <span>最新发表</span>
      </div>
      <div class="search-input">
        <el-select class="w-16" v-model="value" placeholder="请选择章节">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div class="search-input-right">
          <el-input class="w-20" v-model="input" placeholder="输入关键词"></el-input>
          <div
            style="position: absolute;top:0;right:0; cursor: pointer;text-align: center;width:40px;background-color: #f2f2f2;"
          >
            <i style="line-height:40px;font-size: 20px;" class="el-icon-search"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="note-main" v-for="item in 4" :key="item">
      <p class="main-title">这是笔记标题</p>
      <div
        class="main-content"
      >这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容这是笔记内容</div>
      <p class="main-bottom">
        <img src="@/common/images/u267.jpg" alt />
        <span>阿华来了</span>
        <span>2019-06-24 17:25:55</span>
        <span>章节：第一张 电路基本概念</span>
      </p>
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
      tabList: [
        {
          title: "全部"
        },
        {
          title: "最新"
        }
      ],
      init_data: {
        name: "",
        page: 1,
        strip: 1
      },
      page: {
        total: 10
      },
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
    tabAction(index) {
      this.selectIndex = index;
    },
    handleCurrentChange(val) {
      this.init_data.page = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.note {
  background-color: #fff;
  width: 100%;
  padding: 0 60px 20px 60px;
  .note-title {
    border-bottom: 1px solid #d7d7d7;
    font-size: 18px;
    line-height: 50px;
  }
  .note-btn-box {
    height: 120px;
    text-align: right;
    line-height: 120px;
    .note-btn {
      text-align: center;
      line-height: 28px;
      width: 86px;
      height: 28px;
      padding: 0;
      background-color: #617fa5;
      color: #fff;
    }
  }
  .note-whole {
    display: flex;
    justify-content: space-between;
    .whole-left {
      text-align: center;
      line-height: 27px;
      span {
        width: 86px;
        display: inline-block;
        background-color: #f2f2f2;
        color: #666;
        cursor: pointer;
      }
    }
    .whole-right {
      font-size: 14px;
      color: #617fa5;
      span:nth-of-type(1) {
        position: relative;
        margin-right: 10px;
        i {
          position: absolute;
          right: -5px;
          top: 0;
          width: 2px;
          height: 17px;
          background: inherit;
          background-color: rgba(242, 242, 242, 1);
        }
      }
    }
  }
  .note-search {
    display: flex;
    justify-content: space-between;
    height: 60px;
    border-bottom: 1px solid #d7d7d7;
    .search-screen {
      line-height: 60px;
      font-size: 14px;
      span:nth-of-type(1) {
        position: relative;
        margin-right: 10px;
        i {
          position: absolute;
          right: -5px;
          top: 0;
          width: 2px;
          height: 17px;
          background: inherit;
          background-color: rgba(242, 242, 242, 1);
        }
      }
    }
    .search-input {
      display: flex;
      .search-input-right {
        margin-left: 10px;
        position: relative;
      }
    }
  }
  .note-main {
    min-height: 150px;
    border-bottom: 1px solid #d7d7d7;
    padding-bottom: 10px;
    .main-title {
      line-height: 60px;
      color: #617fa5;
      font-size: 14px;
    }
    .main-content {
      height: auto;
      padding: 0 0 10px 0;
    }
    .main-bottom {
      min-width: 500px;
      display: flex;
      margin-left: 0;
      line-height: 30px;
      vertical-align: middle;
      img {
        width: 24px;
        height: 24px;
        display: inline-block;
        margin-right: 10px;
      }
      span {
        display: inline-block;
        line-height: 24px;
        margin-right: 20px;
        color: #999;
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
.note /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #617fa5;
}
.note /deep/ .el-pagination.is-background .el-pager li:hover {
  color: #617fa5;
}
.note
  /deep/
  .el-pagination.is-background
  .el-pager
  li.active:not(.disabled):hover {
  color: #fff;
}
.active {
  background-color: #617fa5 !important;
  color: #fff !important;
}
</style>