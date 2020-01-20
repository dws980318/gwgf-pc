<template>
  <div class="container-courses">
    <div class="container">
      <el-col :span="24" style="display:flex;justify-content: space-between;">
        <el-col :span="16">
          <div class="mySlider-box">
            <h2 class="h2">
              <span v-if="$store.state.isLogin === '0'">
                <i></i>课程学习
              </span>
              <span v-else>
                <i></i>课程教学
              </span>
              <span class="h2-span" @click="$router.push('/teach')">查看更多>></span>
            </h2>
            <el-carousel :interval="5000" height="100%" arrow="hover" class="indexSwiper">
              <el-carousel-item v-for="(item, index) in list" :key="item.id">
                <img
                  class="sideImg"
                  @click="$router.push('/teach/' + item.id)"
                  :src="item.imgId ? (downloadfileUrl + item.imgId) : img"
                />
                <div class="carousel-text">
                  <div>{{item.lessonName}}</div>
                </div>
              </el-carousel-item>
            </el-carousel>
            <div style="margin-top: 30px;">
              <div class="mySlider">
                <div class="swiper-slide" v-for="item in lessList" :key="item.id">
                  <div class="courses-li-top">
                    <img :src="item.imgId ? (downloadfileUrl + item.imgId) : img" alt />
                    <!-- <img src="" alt /> -->
                  </div>
                  <div class="courses-li-bottom">
                    <p>
                      {{item.teacherName}}
                      <span v-if="item.number">
                        <i class="el-icon-user"></i>
                        {{item.number}}
                      </span>
                    </p>
                    <div
                      class="over"
                      @click="$router.push('/teach/' + item.id)"
                    >{{item.lessonContent}}</div>
                    <p>{{item.uploadTime}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="7" :offset="1">
          <div class="literature-box">
            <h2 class="h2">
              <span>专业活动</span>
              <span class="h2-span" @click="$router.push('/activity/course/list')">查看更多>></span>
            </h2>
            <div class="literature-img-box">
              <div class="literature-img" v-for="item in imgList" :key="item.id">
                <img :src="item.coverFileId ? (downloadfileUrl + item.coverFileId) : img" alt />
                <div class="literature-txt" style="flex:1;">
                  <div class="overSpan">
                    <span @click="$router.push('/activity/course/' + item.id)">{{item.activityName}}</span>
                  </div>
                  <!-- <p>{{item.content}}</p> -->
                  <p>{{item.publishTime}}</p>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-col>
    </div>
  </div>
</template>


<script>
import imgUrl from "@/common/images/center.jpg";
import imgUrl3 from "@/common/images/banner03.png";
export default {
  name: "courses",
  data() {
    return {
      img: imgUrl,
      slide: [
        {
          text: "第一张",
          image: imgUrl3
        },
        {
          text: "电饭锅电饭锅",
          image: imgUrl3
        },
        {
          text: "第发鬼地方个的一张",
          image: imgUrl3
        },
        {
          text: "沃尔沃二",
          image: imgUrl3
        },
        {
          text: "佛挡杀佛",
          image: imgUrl3
        }
      ],
      navList: [{ title: "物理" }, { title: "化学" }, { title: "英语" }],
      list: [],
      selectIndex: 0,
      lessList: [],
      options: [],
      one: [],
      init_data: {
        count: 6,
        lessonClassId: ""
      },
      imgList: []
    };
  },
  created() {
    this.selectdic();
    this.init();
  },
  methods: {
    init() {
      this.api.getlessons({ count: 9 }).then(res => {
        if (res.data.length >= 5) {
          for (let i = 5; i <= res.data.length - 1; i++) {
            if (i > 8) {
              return false;
            } else {
              this.lessList.push(res.data[i]);
            }
          }
        }
        for (let i = 0; i <= res.data.length - 1; i++) {
          if (i > 4) {
            return false;
          } else {
            this.list.push(res.data[i]);
          }
        }
      });
    },
    lessInit() {
      this.api.getactivitys(this.init_data).then(res => {
        this.imgList = res.data;
      });
    },
    selectdic() {
      this.api.selectdic({ dictype: "课程分类" }).then(res => {
        this.options = res.data;
        this.init_data.lessonClassId = res.data[0].dicValue;
        this.lessInit();
        this.one.push(res.data[0]);
        this.one.push(res.data[1]);
        this.one.push(res.data[2]);
      });
    }
  }
};
</script>


<style lang="scss" scoped>
@mixin between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.container-courses {
  width: 100%;
  background-color: #fff;
  .container {
    background-color: #fff;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 30px;
    .h2 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 60px;
      height: 82px;
      font-size: 24px;
      font-weight: 400;
      span {
        display: flex;
        justify-content: space-between;
        align-items: center;
        i {
          margin-right: 10px;
          display: inline-block;
          width: 5px;
          height: 31px;
          background: rgba(15, 141, 226, 1);
        }
      }
      .h2-span {
        font-size: 16px;
        color: #999;
        &:hover {
          color: #0c82ff;
          cursor: pointer;
        }
      }
    }
    .mySlider-box {
      overflow: hidden;
      .indexSwiper {
        height: 424px;
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
        .sideImg {
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
        .carousel-text {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 40px;
          font-size: 14px;
          line-height: 40px;
          text-align: left;
          padding-left: 20px;
          color: #fff;
          background: rgba(51, 51, 51, 0.44);
          div {
            width: 60%;
          }
        }
      }
      .mySlider {
        width: 100%;
        @include between;
        padding: 5px 5px;
        box-sizing: border-box;
        .swiper-slide {
          width: 180px;
          background-color: #fff;
          font-size: 14px;
          display: flex;
          flex-direction: column;
          border-radius: 3px;
          // box-shadow: 0px 0px 5px #ccc;
          transition: all 0.4s;
          overflow: hidden;
          // &:hover {
          // box-shadow: 2px 2px 15px #ccc;
          //   transform: translateY(-2%);
          //   box-shadow: 1px 4px 10px 2px #ccc;
          // }
          .courses-li-top {
            height: 114px;
            // background: url("../../common/images/center.jpg") no-repeat;
            // background-size: cover;
            // background-position: 50%;
            // text-align: center;
            width: 180px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .courses-li-bottom {
            padding: 10px;
            height: 94px;
            overflow: hidden;
            margin-bottom: 2px;
            p:nth-of-type(1) {
              color: #0cb7ea;
              @include between;
              padding-right: 10px;
              margin-top: 5px;
            }
            p {
              color: #a9a4a4;
              font-size: 12px;
              margin-top: 5px;
            }
            .over {
              overflow: hidden;
              width: 160px;
              margin-top: 5px;
              font-weight: 600;
              text-overflow: -o-ellipsis-lastline;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              color: #000;
              &:hover {
                color: #0cb7ea;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
    .literature-box {
      .literature-ul {
        padding: 0 5px;
        overflow-x: auto;
        ul {
          display: flex;
          // justify-content: space-around;
          // align-items: center;
          li {
            width: 33.33%;
            height: 49px;
            text-align: center;
            line-height: 49px;
            background-color: #dedada;
            box-sizing: border-box;
            border: 2px solid #dedada;
            &.active {
              background-color: #fff;
              border: 2px solid #dedada;
            }
          }
        }
      }
      .literature-img-box {
        padding: 0 5px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .literature-img {
          display: flex;
          width: 100%;
          padding: 10px 5px;
          box-sizing: border-box;
          background-color: #fff;
          box-sizing: border-box;
          transition: all 0.4s;
          border-bottom: 2px solid #dedada;
          // &:hover {
          //   transform: translateY(-2%);
          //   box-shadow: 1px 4px 10px 2px #ccc;
          //   cursor: pointer;
          // }
          img {
            width: 124px;
            height: 83px;
            border-radius: 5px;
          }
          .literature-txt {
            margin-left: 20px;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p {
              padding: 5px 0;
              color: #999;
            }
            .overSpan {
              overflow: hidden;
              span {
                overflow: hidden;
                color: #000;
                text-overflow: -o-ellipsis-lastline;
                display: -webkit-box;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
                margin-right: 6px;
                color: #000;
                border-radius: 5px;
                font-size: 14px;
                font-weight: 600;
                &:hover {
                  color: #0cb7ea;
                  cursor: pointer;
                }
              }
            }
            p:nth-of-type(3) {
              position: absolute;
              bottom: 0;
              left: 0;
            }
          }
        }
      }
    }
  }
}
</style>