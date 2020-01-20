<template>
  <div class="container-literature">
    <div class="container">
      <div class="literature">
        <el-col :span="24">
          <h2 class="h2">
            <span>
              <i></i>优秀作品展示
            </span>
            <span class="h2-span" @click="$router.push('/resource/production/list')">查看更多>></span>
          </h2>
          <div
            style=" display: flex;justify-content: space-between;align-items: center;margin-top: 15px;"
          >
            <div class="mySlider">
              <div class="swiper-slide" v-for="item in list" :key="item.id">
                <div class="courses-li-top">
                  <img :src="downloadfileUrl + item.imgId" alt />
                </div>
                <p class="solid-reds"></p>
                <div class="courses-li-bottom">
                  <div>
                    <p>{{item.userName}}</p>
                  </div>
                  <p class="over" @click="$router.push('/resource/production/' + item.id)">{{item.workDesc}}</p>
                  <p class="solid-red"></p>
                  <p class="solid"></p>
                  <el-rate class="rate" disabled v-model="item.criterionOne"></el-rate>
                </div>
              </div>
            </div>
          </div>
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
      list: [],
      init_data: {
        pageNumber: 1,
        pageSize: 10
      },
      list_data: {
        id: "",
        type: 2
      }
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    // 列表数据
    init() {
      this.api.getallchaworks(this.init_data).then(res => {
        // this.works(res.data);
        for (let i = 0; i < res.data.length; i++) {
          if (i > 5) {
            return false;
          } else {
            this.list_data.id = res.data[i].id;
            this.api.getworkassess(this.list_data).then(response => {
              this.list[i].criterionOne = response.data.criterionOne;
            });
            this.list.push(res.data[i]);
          }
        }
      });
    },
    works(data) {
      for (let i in data) {
        console.log(i);
      }
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

      .mySlider {
        width: 100%;
        display: flex;
        flex-flow: wrap;
        padding: 5px 0;
        box-sizing: border-box;
        .swiper-slide {
          margin-bottom: 40px;
          margin-right: 46px;
          width: 392px;
          background-color: #fff;
          font-size: 14px;
          display: flex;
          box-sizing: border-box;
          flex-direction: column;
          border-radius: 3px;
          box-shadow: 0px 0px 5px #ccc;
          transition: all 0.4s;
          overflow: hidden;
          &:nth-of-type(3n) {
            margin-right: 0;
          }
          &:hover {
            transform: translateY(-2%);
            box-shadow: 1px 4px 10px 2px #ccc;
          }
          .courses-li-top {
            height: 283px;
            width: 100%;
            img {
              width: 100%;
              height: 100%;
            }
            .topTime {
              width: 160px;
              background-color: #55a8ff;
              line-height: 30px;
              color: #fff;
              i {
                display: inline-block;
                height: 11px;
                width: 11px;
                border-radius: 50%;
                background-color: #fff;
              }
            }
            h2 {
              padding: 20px 7px;
              font-weight: 400;
              font-size: 24px;
              color: #fff;
            }
          }
          .solid-reds {
            width: 100%;
            margin: 0 auto;
            height: 5px;
            background: rgba(202, 0, 0, 1);
          }
          .courses-li-bottom {
            height: 232px;
            padding: 10px;
            overflow: hidden;
            padding: 0 10px;
            box-sizing: border-box;
            div {
              margin-top: 20px;
              margin-bottom: 20px;
              p:nth-of-type(1) {
                color: #000;
                font-size: 14px;
                text-align: center;
                font-size: 22px;
              }
              p:nth-of-type(2) {
                color: #0cb7ea;
                font-size: 12px;
              }
            }
            .over {
              text-align: center;
              color: #000;
              margin-bottom: 20px;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
              overflow: hidden;
              &:hover {
                color: #0cb7ea;
                cursor: pointer;
              }
            }

            .solid {
              height: 1px;
              width: 80%;
              margin: 0 auto;
              background-color: #999;
            }
            .solid-red {
              width: 20%;
              margin: 0 auto;
              height: 5px;
              background: rgba(202, 0, 0, 1);
            }
            .rate {
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>