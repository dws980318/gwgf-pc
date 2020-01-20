<template>
  <!-- 讨论 -->
  <el-row :span="24" style="background-color: #f2f2f2;">
    <v-top></v-top>
    <div class="top">
      <div class="container" style="font-size: 12px;background-color: #f2f2f2;">
        <div class="top-title">数据结构与算法</div>
        <div class="top-name">王艳，曾小华，万隆，发我，福娃五，福娃去</div>
      </div>
    </div>
    <div class="container" style="font-size: 12px;background-color: #f2f2f2;">
      <el-col :span="24" style=" margin-bottom: 50px;">
        <el-col :span="4" style="height: 647px">
          <div class="nav-top">
            <img :src="imgList[selectIndex].img" alt />
            <p>{{imgList[selectIndex].name}}</p>
          </div>
          <div class="nav-main">
            <!-- <router-link to="/discuss/notice">公告</router-link>
            <router-link to="/discuss/schedule">学习进度</router-link>
            <router-link to="/discuss/chapter">章节内容</router-link>
            <router-link to="/discuss/homework">测验与作业</router-link>
            <router-link to="/discuss/examination">考试</router-link>
            <router-link to="/discuss/discussion">讨论区</router-link>
            <router-link to="/discuss/note">笔记</router-link>
            <router-link to="/discuss/datum">学习资料</router-link>
            <router-link to="/discuss/evaluate">课程评价</router-link>
            <router-link to="/discuss/inform/index">通知</router-link>-->
            <ul>
              <div v-if="hoverTop === 0" :style="{'top': hoverTop +'px','border-top-left-radius': '15px','border-top-right-radius': '15px',}" class="active_hover"></div>
              <div v-else :style="{'top': hoverTop +'px'}" class="active_hover"></div>
              <li
                @mouseover="navHover(index)"
                @mouseout="navOut()"
                :class="index == hoverIndex ? 'active': ''"
                v-for="(item, index) in list"
                :key="index"
                @click="navAction(item.path, index)"
              >{{item.title}}</li>
            </ul>
          </div>
          <div class="nav-bottom">
            <p>
              <i class="el-icon-s-management"></i>提醒课程进度
            </p>
            <p>
              <i class="el-icon-s-management"></i>扫码下载App
            </p>
            <p>
              <i class="el-icon-s-management"></i>帮助中心
            </p>
          </div>
        </el-col>
        <el-col :span="20" style="min-height: 647px;background-color: #fff;">
          <router-view />
        </el-col>
      </el-col>
    </div>
    <v-chat></v-chat>
    <v-footer></v-footer>
  </el-row>
</template>

<script>
const Top = resolve => {
  require(["@/components/Top"], resolve);
};
const Footer = resolve => {
  require(["@/components/Footer"], resolve);
};
const Chat = resolve => {
  require(["@/components/Chat"], resolve);
};
import imgUrl from "@/common/images/center.jpg";
import imgUrl2 from "@/common/images/u267.jpg";

export default {
  name: "App",
  components: {
    "v-top": Top,
    "v-footer": Footer,
    "v-chat": Chat
  },
  data() {
    return {
      list: [
        { path: "/discuss/inform", title: "通知" },
        // { path: "/discuss/notice", title: "公告" },
        { path: "/discuss/schedule", title: "学习进度" },
        { path: "/discuss/chapter", title: "章节内容" },
        // { path: "/discuss/homework", title: "测验与作业" },
        { path: "/discuss/examination", title: "考试" },
        // { path: "/discuss/discussion", title: "讨论区" },
        { path: "/discuss/note", title: "笔记" },
        { path: "/discuss/datum", title: "学习资料" },
        { path: "/discuss/evaluate", title: "课程评价" },
      ],
      selectIndex: 0,
      hoverIndex: 0,
      imgList: [
        { name: "数据结构与算法", img: imgUrl },
        { name: "课程管理", img: imgUrl2 },
        { name: "商务英语", img: imgUrl },
        { name: "学科封面图", img: imgUrl },
        { name: "活动封面图", img: imgUrl2 },
        { name: "互动讨论区封面", img: imgUrl },
        { name: "商务英语01班", img: imgUrl },
        { name: "商务英语翻译", img: imgUrl },
        { name: "自评与互评", img: imgUrl2 },
        { name: "教师评价", img: imgUrl },
        { name: "通知管理", img: imgUrl }
      ],
      hoverTop: 0
    };
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        var nactive = 0;
        var navList = this.list;
        for (let i = 0; i < navList.length; i++) {
          // console.log(navList[i].path === val.path);
          if (navList[i].path === val.matched[1].path) {
            nactive = i;
          }
        }
        this.selectIndex = nactive;
        this.hoverIndex = nactive;
        this.hoverTop = nactive * 46;
      },
      // 深度观察监听
      deep: true
    }
  },
  created() {
    var nactive = 0;
    var navList = this.list;
    for (let i = 0; i < navList.length; i++) {
      if (navList[i].path === this.$route.matched[1].path) {
        nactive = i;
      }
    }
    this.selectIndex = nactive;
    this.hoverIndex = nactive;
    this.hoverTop = nactive * 46;
  },
  methods: {
    navHover(index) {
      this.hoverIndex = index;
      var left = index * 46;
      this.hoverTop = left;
    },
    navOut() {
      this.hoverIndex = this.selectIndex;
      var left = this.hoverIndex * 46;
      this.hoverTop = left;
    },
    navAction(path, index) {
      this.$router.push(path);
      // this.selectIndex = index;
    }
  }
};
</script>

<style lang="scss" scoped>
.top {
  height: 59px;
  width: 100%;
  line-height: 20px;
  padding: 10px 0;
  font-size: 14px;
  border-bottom: 1px solid #f2f2f2;
  .top-name {
    color: #617fa5;
  }
}
.nav-top {
  height: 155px;
  width: 203px;
  background-color: #fff;
  padding: 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  margin-bottom: 10px;
  img {
    height: 94px;
    width: 100%;
  }
  p {
    width: 100%;
    height: 38px;
    text-align: center;
    line-height: 38px;
    font-size: 18px;
  }
}
.nav-main {
  width: 203px;
  background-color: #fff;
  margin-bottom: 10px;
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
      display: block;
      position: relative;
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
.nav-bottom {
  height: 150px;
  width: 203px;
  background-color: #fff;
  img {
    height: 94px;
    width: 100%;
  }
  p {
    width: 100%;
    text-align: left;
    line-height: 50px;
    font-size: 14px;
    border-bottom: 1px solid #d7d7d7;
    padding-left: 15px;
    i {
      margin-right: 10px;
    }
  }

  p:nth-of-type(3) {
    border: none;
  }
}
</style>
