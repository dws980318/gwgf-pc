<template>
  <el-col :span="24">
    <router-view />
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
    "v-footer": Footer,
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>


