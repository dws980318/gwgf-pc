<template>
  <div id="app">
    <!-- <v-head></v-head> -->
    <v-login></v-login>
    <v-register></v-register>
    <v-password></v-password>
    <router-view />
    <!-- <v-footer></v-footer> -->
  </div>
</template>

<script>
const Head = resolve => {
  require(["./components/Head"], resolve);
};
const Footer = resolve => {
  require(["./components/Footer"], resolve);
};
const Login = resolve => {
  require(["@/components/Login"], resolve);
};
const Register = resolve => {
  require(["@/components/Register"], resolve);
};
const Password = resolve => {
  require(["@/components/Password"], resolve);
};
export default {
  name: "App",
  components: {
    "v-head": Head,
    "v-footer": Footer,
     "v-login": Login,
    "v-register": Register,
    "v-password": Password
  },
  data() {
    return {};
  }
};
</script>

<style>
@import "./common/css/common.css";
@import "./common/css/iconfont.css";
#app {
  padding: 0;
  margin: 0 auto;
  background: #ffffff;
}
</style>
