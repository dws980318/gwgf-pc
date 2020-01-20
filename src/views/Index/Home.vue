<template>
  <!-- 首页 -->
  <div class="content-main">
    <!-- <el-carousel :interval="5000" height="100%" arrow="hover" class="indexSwiper">
      <el-carousel-item v-for="(item, index) in slide" :key="index">
        <img class="sideImg" :src="item.image" alt />
      </el-carousel-item>
    </el-carousel>-->
    <courses></courses>
    <literature></literature>
  </div>
</template>

<script>
import imgUrl3 from "@/common/images/banner03.png";

import courses from "@/components/Index/courses";
import discuss from "@/components/Home/discuss";
import literature from "@/components/Index/literature";
import foreign from "@/components/Home/foreign";
import manoeuvre from "@/components/Home/manoeuvre";
export default {
  components: {
    courses,
    discuss,
    literature,
    foreign,
    manoeuvre
  },
  name: "Index",
  data() {
    return {
    };
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
