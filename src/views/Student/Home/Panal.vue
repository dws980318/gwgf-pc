<template>
  <el-row :span="24">
    <v-head></v-head>
    <!-- <v-login></v-login> -->
    <!-- <v-register></v-register> -->
    <router-view />
    <v-footer></v-footer>
  </el-row>
</template>

<script>
const Head = resolve => {
  require(["@/components/Head"], resolve);
};
const Footer = resolve => {
  require(["@/components/Footer"], resolve);
};
const Login = resolve => {
  require(["@/components/Login"], resolve);
};
const Register = resolve => {
  require(["@/components/Register"], resolve);
};

export default {
  name: "App",
  components: {
    "v-head": Head,
    "v-footer": Footer,
    // "v-login": Login,
    // "v-register": Register
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>
