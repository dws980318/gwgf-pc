<template>
  <el-col :span="24">
    <v-top></v-top>
    <v-studyDialog></v-studyDialog>
    <router-view :style="{minHeight: getHeight() }" />
    <v-footer></v-footer>
  </el-col>
</template>

<script>
const Top = resolve => {
  require(["@/components/Top"], resolve);
};
const StudyDialog = resolve => {
  require(["./studyDialog"], resolve);
};
const Footer = resolve => {
  require(["@/components/Footer"], resolve);
};

export default {
  components: {
    "v-top": Top,
    "v-footer": Footer,
    "v-studyDialog": StudyDialog
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    getHeight() {
      var cHeight = document.documentElement.clientHeight;
      var bHeight = cHeight - 271;
      return bHeight + "px";
    }
  }
};
</script>

<style>
</style>
