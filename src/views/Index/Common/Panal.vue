<template>
  <el-row :span="24">
    <v-head></v-head>
    <div class="content-main">
      <router-view></router-view>
    </div>
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
import imgUrl3 from "@/common/images/banner03.png";

import courses from "@/components/Index/courses";
import discuss from "@/components/Home/discuss";
import literature from "@/components/Index/literature";
import foreign from "@/components/Home/foreign";
import manoeuvre from "@/components/Home/manoeuvre";
export default {
  components: {},
  name: "Index",
  components: {
    "v-head": Head,
    "v-footer": Footer,
    courses,
    discuss,
    literature,
    foreign,
    manoeuvre
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
