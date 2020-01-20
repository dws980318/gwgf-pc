<template>
  <!-- 首页 -->
  <div class="content-main">
    <!-- <el-carousel :interval="5000" height="100%" arrow="hover" class="indexSwiper">
      <el-carousel-item v-for="(item, index) in slide" :key="index">
        <img class="sideImg" :src="item.image" alt />
      </el-carousel-item>
    </el-carousel>-->
    <!-- <courses></courses>
    <literature></literature> -->
    <inform></inform>
    <manoeuvre></manoeuvre>
    <!-- <foreign></foreign>
    <discuss></discuss> -->
  </div>
</template>

<script>
import imgUrl3 from "@/common/images/banner03.png";

import courses from "@/components/Home/courses";
import discuss from "@/components/Home/discuss";
import literature from "@/components/Home/literature";
import foreign from "@/components/Home/foreign";
import manoeuvre from "@/components/Home/manoeuvre";
import inform from "@/components/Home/inform";
export default {
  components: {
    courses,
    discuss,
    literature,
    foreign,
    manoeuvre,
    inform
  },
  name: "Index",
  data() {
    return {
      slide: [
        {
          image: imgUrl3
        },
        {
          image: imgUrl3
        },
        {
          image: imgUrl3
        },
        {
          image: imgUrl3
        },
        {
          image: imgUrl3
        }
      ],
      list: [
        {
          title: "讨论区",
          curriculum: "学问讨论区",
          content: "学问讨论区，一起分享知识",
          img: imgUrl3,
          backColor: "#f7f8f0"
        },
        {
          title: "精品资源",
          curriculum: "20堂高能搜索修炼课",
          content: "助你提升效率，为人生赋能",
          img: imgUrl3,
          backColor: "#e3ebfe"
        },
        {
          title: "精品资源",
          curriculum: "20堂高能搜索修炼课",
          content: "助你提升效率，为人生赋能",
          img: imgUrl3,
          backColor: "#c1ebe7"
        }
      ],
      navList: [
        { title: "商务英语" },
        { title: "同声翻译" },
        { title: "高级翻译" },
        { title: "高级口语" },
        { title: "商务翻译" },
        { title: "四六级英语" },
        { title: "外语" },
        { title: "英语文学" },
        { title: "更多" }
      ],
      navList2: [
        { title: "计算机" },
        { title: "经济学" },
        { title: "管理" },
        { title: "化学生物" },
        { title: "考研宝典" },
        { title: "四六级" },
        { title: "外语" },
        { title: "历史文学" },
        { title: "更多" }
      ],
      selectIndex: 2,
      hoverIndex: 0,
      hoverTop: 0
    };
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
  .indexSwiper {
    height: 385px;
    position: relative;
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
    .container-top {
      position: relative;
      width: 1270px;
      margin: 0 auto;
      // position: absolute;
      // top: 50%;
      // left: 50%;
      // transform: translate(-50%, -50%);
      // width: 1270px;
      // height: 100%;
      // font-size: 12px;
      // z-index: 10;
      // display: flex;
      .nav-box {
        position: absolute;
        z-index: 10;
        .nav {
          width: 203px;
          height: 385px;
          overflow: hidden;
          position: relative;
          .active-hover {
            position: absolute;
            left: 0;
            width: 100%;
            height: 43px;
            background-color: rgba(255, 255, 255, 1);
            transition: all 0.3s;
          }
          li {
            position: relative;
            background-color: rgba(0, 0, 0, 0.7);
            color: #a7a7a7;
            text-align: center;
            line-height: 43px;
            font-size: 14px;
            cursor: pointer;
            &.active {
              color: #fff;
            }
          }
        }
      }
      .login-right {
        width: 200px;
        height: 282px;
        background-color: #d5d5d7;
        text-align: center;
        padding: 22px;
        position: absolute;
        right: 0;
        top: 54px;
        z-index: 10;
        p:nth-of-type(1) {
          font-size: 16px;
        }
        .circle {
          width: 81px;
          height: 81px;
          background-color: #fff;
          border-radius: 50%;
          border: 1px solid #333;
          margin: 25px auto;
        }
        /deep/ .el-button {
          background-color: #617fa5;
          color: #fff;
          width: 161px;
          height: 35px;
          padding: 0;
          margin-bottom: 20px;
        }
      }
      .horn {
        position: absolute;
        left: 0;
        width: 100%;
        display: flex;
        line-height: 43px;
        background-color: rgba(0, 0, 0, 0.3);
        vertical-align: middle;
        font-size: 12px;
        z-index: 10;
        p {
          color: #fff;
        }
        .icon {
          width: 32px;
          height: 43px;
          text-align: center;
          color: #fff;
        }
      }
    }
    .sideImg {
      width: 100%;
      height: 100%;
    }
  }
  .container-nav {
    width: 100%;
    background-color: #fff;
    .container {
      height: 80px;
      background-color: #fff;
      ul {
        width: 100%;
        height: 100%;
        @include between;
        padding: 5px 0;
        li {
          width: 244px;
          text-align: center;
          line-height: 58px;
          background-color: #5c839c;
          color: #fff;
          font-size: 20px;
          border-radius: 2px;
          cursor: pointer;
        }
      }
    }
  }
  .container-elective {
    width: 100%;
    background-color: #fafafa;
    .container {
      height: 103px;
      background-color: #fafafa;
      @include between();
      font-size: 12px;
      .elective-left {
        width: 409px;
        height: 103px;
        background-color: #f7f8f0;
        p {
          span {
            text-align: center;
            color: #fff;
            display: inline-block;
            width: 61px;
            height: 19px;
            background-color: #55a8ff;
            border: none;
            border-radius: 10px;
            border-top-left-radius: 0px;
            border-bottom-left-radius: 0px;
          }
        }
        .elective-left-box {
          display: flex;
          justify-content: space-around;
          .elective-left-text {
            padding: 0 20px;
            p:nth-of-type(1) {
              font-size: 24px;
              width: 220px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            p:nth-of-type(2) {
              font-size: 14px;
              line-height: 28px;
            }
          }
          .elective-left-img {
            width: 73px;
            height: 73px;
            img {
              height: 100%;
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
