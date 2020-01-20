<template>
  <!-- 精品导航 -->
  <div class="content-main">
    <!-- <div class="slide_swiper-box">
      <div class="slide_swiper">
        <swiper :options="swiperOption" ref="mySwiper" class="mySlider">
          <swiper-slide v-for="item of slide" :key="item.id">
            <img class="swiper-img" :src="item.image" alt />
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
    </div>-->
    <el-carousel :interval="5000" height="100%" arrow="hover" class="indexSwiper">
      <el-carousel-item v-for="(item, index) in slide" :key="index">
        <img class="sideImg" :src="item.image" alt />
      </el-carousel-item>
    </el-carousel>
    <courses></courses>
    <!-- <discuss></discuss> -->
    <literature></literature>
    <!-- <foreign></foreign>  -->
  </div>
</template>

<script>
import imgUrl4 from "@/common/images/banner03.png";

import courses from "@/components/Resource/courses";
import discuss from "@/components/Home/discuss";
import literature from "@/components/Resource/literature";
import foreign from "@/components/Home/foreign";
export default {
  components: {
    courses,
    discuss,
    literature,
    foreign
  },
  name: "Index",
  data() {
    return {
      slide: [
        {
          image: imgUrl4
        },
        {
          image: imgUrl4
        },
        {
          image: imgUrl4
        },
        {
          image: imgUrl4
        },
        {
          image: imgUrl4
        }
      ],
      swiperOption: {
        autoplay: {
          delay: 3000, //  自动切换的时间间隔，单位ms
          stopOnLastSlide: false, //  当切换到最后一个slide时停止自动切换
          disableOnInteraction: true, //  用户操作swiper之后，是否禁止autoplay。
          reverseDirection: false, //  开启反向自动轮播。
          waitForTransition: true //  等待过渡完毕。自动切换会在slide过渡完毕后才开始计时。
        },
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next", //  前进按钮的css选择器或HTML元素。
          prevEl: ".swiper-button-prev", //  后退按钮的css选择器或HTML元素。
          hideOnClick: true, //  点击slide时显示/隐藏按钮
          disabledClass: "my-button-disabled", //  前进后退按钮不可用时的类名。
          hiddenClass: "my-button-hidden" //  按钮隐藏时的Class
        },
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  },
  computed: {
    // swiper() {
    //   return this.$refs.mySwiper.swiper;
    // }
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@mixin flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
@mixin between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content-main {
  width: 100%;
  height: auto;
  background-color: #333;
  .slide_swiper-box {
    position: relative;
    .slide_swiper {
      overflow: hidden;
      width: 100%;
      height: 390px;
      background: #eee;
      .mySlider {
        width: 100%;
        height: 100%;
        .swiper-img {
          width: 100%;
          height: 100%;
        }
        .swiper-button-next {
          font-size: 14px;
          border-radius: 50%;
        }
      }
    }
    .container-head-box {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: auto;
      width: 1270px;
      height: 390px;
      .container-head {
        width: 100%;
        height: 390px;
        position: relative;
        .head-notice {
          position: absolute;
          right: 0;
          top: 0;
          height: 37px;
          width: 1070px;
          background-color: #fff;
          opacity: 0.6;
          z-index: 10;
          .notice-nav {
            display: flex;
            line-height: 37px;
            .notice-nav-img {
              width: 37px;
              height: 37px;
              @include flex;

              img {
                width: 16px;
                height: 16px;
              }
            }
            p {
              flex: 1;
            }
          }
        }
        .head-nav {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 200px;
          z-index: 10;
          background-color: #000;
          ul {
            height: 100%;
            display: flex;
            flex-direction: column;
            text-align: center;
            li {
              line-height: 43px;
              font-size: 16px;
              color: #fff;
            }
          }
        }
        .head-login {
          position: absolute;
          right: 0;
          top: 13%;
          background-color: #d6d2d2;
          width: 200px;
          z-index: 10;
          height: 75%;
          .login-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            p:nth-of-type(1) {
              margin-top: 15px;
              font-size: 16px;
            }
            p:nth-of-type(2) {
              font-size: 16px;
              line-height: 22px;
            }
            p:nth-of-type(3) {
              width: 161px;
              height: 35px;
              background-color: #13a4d6;
              cursor: pointer;
              font-size: 18px;
              line-height: 35px;
              color: #fff;
              margin-top: 36px;
            }
            p:nth-of-type(4) {
              line-height: 22px;
              margin-top: 14px;
            }
            .login-radius {
              height: 82px;
              width: 82px;
              margin-top: 40px;
              border-radius: 50%;
              border: 1px solid #333;
              background-color: #fff;
            }
          }
        }
      }
    }
  }
  .indexSwiper {
    height: 385px;
    & /deep/ .el-carousel__button {
      width: 10px;
      height: 10px;
      background-color: #fff;
      border: none;
      border-radius: 50%;
    }
    & /deep/ .el-carousel__indicator.is-active button {
      background-color: #09bdf3;
    }
    & /deep/ .el-carousel__indicators--outside button {
      opacity: 1;
    }
  }
  .sideImg {
    width: 100%;
    height: 100%;
  }
}
.el-carousel__item:nth-child(2n) {
  background-color: #000;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
