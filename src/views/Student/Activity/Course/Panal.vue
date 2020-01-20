<template>
  <el-col :span="24" style="font-size: 12px;background-color: #f2f2f2;">
    <v-top></v-top>
    <div class="top"></div>
    <router-view :style="{minHeight: getHeight() }" />
    <v-footer></v-footer>
  </el-col>
</template>

<script>
const Top = resolve => {
  require(["@/components/Top"], resolve);
};
const Footer = resolve => {
  require(["@/components/Footer"], resolve);
};

export default {
  components: {
    "v-top": Top,
    "v-footer": Footer
  },
  data() {
    return {};
  },
  methods: {
    getHeight() {
      var cHeight = document.documentElement.clientHeight;
      var bHeight = cHeight - 271;
      return bHeight + "px";
    }
  }
};
</script>

<style scoped>
.top {
  height: 59px;
  width: 100%;
  line-height: 20px;
  padding: 10px 0;
  font-size: 14px;
  border-bottom: 1px solid #e6e2e2;
}
</style>


