<template>
  <div class="container-courses">
    <div class="container">
      <el-col :span="24" style="display:flex;justify-content: space-between;">
        <el-col :span="16">
          <div class="mySlider-box">
            <h2 class="h2">
              <span>
                <i></i>活动
              </span>
              <span class="h2-span" @click="$store.commit('showLoginModal', true);">查看更多>></span>
            </h2>
            <el-carousel :interval="5000" height="100%" arrow="hover" class="indexSwiper">
              <el-carousel-item v-for="(item, index) in imgList" :key="index">
                <img
                  class="sideImg"
                  @click="detailsAction(item.id)"
                  :src="item.coverFileId ? (downloadfileUrl + item.coverFileId) : img"
                  alt
                />
                <div class="carousel-text">
                  <div>{{item.activityName}}</div>
                </div>
              </el-carousel-item>
            </el-carousel>
            <div style="margin-top: 30px;">
              <div class="mySlider">
                <div class="swiper-slide" v-for="item in list" :key="item.id">
                  <div class="courses-li-top">
                    <!-- <img src="" alt /> -->
                    <img :src="item.coverFileId ? (downloadfileUrl + item.coverFileId) : img" alt />
                  </div>
                  <div class="courses-li-bottom">
                    <div>
                      <p>{{item.activityName}}</p>
                      <span v-if="item.number">
                        <i class="el-icon-user"></i>
                        {{item.number}}
                      </span>
                    </div>
                    <p class="over" @click="detailsAction(item.id)">{{item.content}}</p>
                    <p>{{item.publishTime}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col class="literature-text-box" :span="7" :offset="1">
          <h2 class="h2">
            <span>通知</span>
            <span class="h2-span" @click="$store.commit('showLoginModal', true);">查看更多>></span>
          </h2>
          <div>
            <ul style="height: auto;overflow: hidden;">
              <li
                v-for="(itema, index) in itemList"
                @click="itemDetailsAction(itema.id)"
                :key="itema.id"
              >
                <el-col :span="15" class="over">
                  <span>{{itema.title}}</span>
                </el-col>
                <el-col :span="9" class="youth">
                  <span>{{itema.publishTime}}</span>
                </el-col>
              </li>
            </ul>
          </div>
        </el-col>
      </el-col>
    </div>
  </div>
</template>


<script>
import imgUrl from "../../common/images/center.jpg";
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
      itemList: [],
      imgList: []
    };
  },
  created() {
    this.init();
    this.itemInit();
  },
  methods: {
    navAction(index) {
      this.selectIndex = index;
    },
    init() {
      this.api.getactivitys({ count: 9 }).then(res => {
        if (res.data.length >= 5) {
          // this.list.push(res.data[res.data.length - 4]);
          // this.list.push(res.data[res.data.length - 3]);

          // this.list.push(res.data[res.data.length - 1]);
          for (let i = 5; i <= res.data.length - 1; i++) {
            if (i > 8) {
              return false;
            } else {
              this.list.push(res.data[i]);
            }
          }
        }
        for (let i = 0; i <= res.data.length - 1; i++) {
          if (i > 4) {
            return false;
          } else {
            this.imgList.push(res.data[i]);
          }
        }
      });
    },
    itemInit() {
      this.api.getnotices({ count: 18 }).then(res => {
        this.itemList = res.data;
      });
    },
    detailsAction(id) {
      localStorage.detailsId = id;
      this.$router.push("/home/activity/" + id);
    },
    itemDetailsAction(id) {
      localStorage.detailsId = id;
      this.$router.push("/home/inform/" + id);
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
          color: #0cb7ea;
          cursor: pointer;
        }
      }
    }
    .mySlider-box {
      overflow: hidden;
      height: auto;
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
        display: flex;
        padding: 5px 5px;
        box-sizing: border-box;
        .swiper-slide {
          width: 180px;
          background-color: #fff;
          font-size: 14px;
          margin-right: 38px;
          display: flex;
          flex-direction: column;
          border-radius: 3px;
          // box-shadow: 0px 0px 5px #ccc;
          transition: all 0.4s;
          overflow: hidden;
          // &:hover {
          //   // box-shadow: 2px 2px 15px #ccc;
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
            overflow: hidden;
            div {
              margin-bottom: 2px;
              p:nth-of-type(1) {
                color: #0cb7ea;
                font-size: 14px;
                @include between;
                padding-right: 10px;
              }
            }
            p {
              color: #a9a4a4;
              // @include between;
              font-size: 12px;
              margin-top: 5px;
              i {
                display: inline-block;
                color: #ddd;
                height: 16px;
                width: 16px;
                font-size: 16px;
              }
            }
            .over {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 160px;
              // text-overflow: -o-ellipsis-lastline;
              // display: -webkit-box;
              // -webkit-line-clamp: 3;
              // -webkit-box-orient: vertical;
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
    .literature-text-box {
      height: auto;
      ul {
        width: 100%;
        li {
          font-size: 16px;
          line-height: 38px;
          &:hover {
            color: #0cb7ea;
            cursor: pointer;
          }
          .over {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .youth {
            display: inline-block;
            text-align: right;
          }
        }
      }
    }
  }
}
</style>