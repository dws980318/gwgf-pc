<template>
  <!-- 讨论 -->
  <el-row :span="24" style="background-color: #f2f2f2;">
    <v-top></v-top>
    <div class="top">
    </div>
    <div class="container" style="font-size: 12px;background-color: #f2f2f2;">
      <el-col :span="24" style=" margin-bottom: 50px;">
        <el-col :span="4">
          <div class="nav-main">
             <router-link to="/personal/index">个人信息</router-link>
            <router-link to="/personal/safety">账户安全</router-link>
            <router-link to="/personal/authentication">认证信息</router-link>
            <!-- <ul>
              <li
                @mouseover="navHover(index)"
                @mouseout="navOut()"
                :class="index == hoverIndex ? 'active': ''"
                v-for="(item, index) in list"
                :key="index"
                @click="navAction(item.path, index)"
              >{{item.title}}</li>
            </ul> -->
          </div>
        </el-col>
        <el-col :span="20" style="min-height: 730px;background-color: #fff;">
          <router-view />
        </el-col>
      </el-col>
    </div>
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

export default {
  name: "App",
  components: {
    "v-top": Top,
    "v-footer": Footer
  },
  data() {
    return {
      list: [
        { path: "/personal/index", title: "个人信息" },
        { path: "/personal/safety", title: "账户安全" },
        { path: "/personal/authentication", title: "认证信息" }
      ],
      selectIndex: 0,
      hoverIndex: 0
    };
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        console.log(val);
        var nactive = 0;
        var navList = this.list;
        for (let i = 0; i < navList.length; i++) {
          // console.log(navList[i].path === val.path);
          if (navList[i].path === val.path) {
            nactive = i;
            console.log(nactive);
          }
        }
        this.selectIndex = nactive;
        this.hoverIndex = nactive;
        console.log(this.selectIndex);
      },
      // 深度观察监听
      deep: true
    }
  },
  methods: {
    navHover(index) {
      this.hoverIndex = index;
    },
    navOut() {
      this.hoverIndex = this.selectIndex;
    },
    navAction(path, index) {
      this.$router.push(path);
      // this.selectIndex = index;
      console.log(index);
      console.log(this.selectIndex);
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
  border-bottom: 1px solid #e6e2e2;
  .top-name {
    color: #617fa5;
  }
}
.nav-main {
  width: 203px;
  height: 138px;
  background-color: #fff;
  margin-bottom: 10px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  li {
    display: block;
    width: 100%;
    text-align: center;
    line-height: 46px;
    color: #000;
    cursor: pointer;
    &.active {
      background-color: #617fa5;
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
</style>
