<template>
  <div class="container-literature">
    <div class="container">
      <div class="literature">
        <el-col :span="24" style="display:flex;justify-content: space-between;">
          <el-col :span="16">
            <h2 class="h2">
              <span>
                <i></i>互动空间
              </span>
              <span class="h2-span" @click="$router.push('/assess/unchecked/list')">查看更多>></span>
            </h2>
            <el-carousel :interval="5000" height="100%" arrow="hover" class="indexSwiper">
              <el-carousel-item v-for="(item, index) in list" :key="item.id">
                <img class="sideImg" :src="item.imgId" />
                <div class="carousel-text">
                  <div>{{item.lessonName}}</div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </el-col>
          <el-col class="literature-text-box" :span="7" :offset="1">
            <h2 class="h2">
              <span>通知</span>
              <span class="h2-span" @click="$router.push('/discuss/inform/list')">查看更多>></span>
            </h2>
            <div>
              <ul>
                <li
                  v-for="(itema, index) in itemList"
                  :key="index"
                  @click="$router.push('/discuss/inform/' + itema.id)"
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
  </div>
</template>


<script>
import imgUrl from "@/common/images/center.jpg";
export default {
  name: "literature",
  data() {
    return {
      list: [
        {
          imgId:
            "http://193.112.76.40:8090/downloadfile/2e21f534-9965-4ea8-ab3c-a090e05ed2fd",
          lessonName: "一对多"
        },
        {
          imgId:
            "http://193.112.76.40:8090/downloadfile/67abf8ec-5dd9-44fd-ae22-41797d3eeed8",
          lessonName: "多对一"
        },
        {
          imgId:
            "http://193.112.76.40:8090/downloadfile/ebd28fb5-3024-4cf7-99fb-92319ff5a753",
          lessonName: "多对多"
        }
      ],
      img: imgUrl,
      itemList: []
    };
  },
  created() {
    this.itemInit();
  },
  methods: {
    itemInit() {
      this.api.getnotices({ count: 11 }).then(res => {
        this.itemList = res.data;
      });
    },
    detailsAction(item) {
      let url = item.link;
      if (url.indexOf("http://") >= 0 || url.indexOf("https://") >= 0) {
        window.open(url);
      } else {
        window.open("http://" + url);
      }
      // localStorage.detailsId = id;
      // this.$router.push("/home/resources/" + id);
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
.container-literature {
  width: 100%;
  background-color: #fff;
  .container {
    background-color: #fff;
    padding-bottom: 20px;
    font-size: 14px;
    .h2 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 60px;
      height: 60px;
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
    .literature {
      @include between;
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
      .literature-text-box {
        // height: 600px;
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
}
</style>