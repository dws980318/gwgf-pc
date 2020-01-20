<template>
  <el-col :span="24" style="font-size: 12px;background-color: #f2f2f2;">
    <v-top></v-top>
    <div class="top"></div>
    <router-view />
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
