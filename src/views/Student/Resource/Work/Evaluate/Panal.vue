<template>
  <!-- 讨论 -->
  <el-row :span="24" style="background-color: #f2f2f2;">
    <div class="container" style="font-size: 12px;background-color: #fff;">
      <el-col :span="24" style=" margin-bottom: 30px;min-height: 730px;background-color: #fff">
        <el-tabs style="padding: 0 20px;" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="教师评价" name="/resource/work/evaluate/teaEvaluate/:id"></el-tab-pane>
          <el-tab-pane label="学生评价" name="/resource/work/evaluate/stuEvaluate/:id"></el-tab-pane>
        </el-tabs>
        <router-view v-loading="loading"></router-view>
      </el-col>
    </div>
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
      loading: false,
      activeName: "/resource/work/evaluate",
    };
  },
  created() {
    console.log(this.$route.matched[1])
    if (this.$route.matched[1]) {
      this.activeName = this.$route.matched[1].path;
    }
  },
  watch: {
     $route(to, from) {
       if (this.$route.matched[1]) {
        this.activeName = this.$route.matched[1].path;
      }
    }
  },
  methods: {
    handleClick(tab, event) {
        this.loading = true;
        this.$router.push(tab.name);
        this.loading = false;
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
    height: 46px;
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
