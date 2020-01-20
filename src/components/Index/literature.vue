<template>
  <div class="container-literature">
    <div class="container">
      <div class="literature">
        <el-col :span="24" style="display:flex;justify-content: space-between;">
          <el-col :span="16">
            <h2 class="h2">
              <span>
                <i></i>精品资源
              </span>
              <span class="h2-span" @click="$store.commit('showLoginModal', true);">查看更多>></span>
            </h2>
            <div style="display:flex;flex-wrap: wrap;height: auto">
              <div class="swiper-slide" v-for="item in list" :key="item.id">
                <img
                  @click="detailsAction(item)"
                  :src="item.img_id ? (downloadfileUrl + item.img_id) : img"
                  alt
                />
              </div>
            </div>
          </el-col>
          <el-col :span="7" :offset="1" class="comment-box">
            <h2 class="h2">
              <span>互动讨论</span>
              <span class="h2-span" @click="$store.commit('showLoginModal', true);">查看更多>></span>
            </h2>
            <div class="comment-img">
              <img
                src="http://193.112.76.40:8090/downloadfile/2e21f534-9965-4ea8-ab3c-a090e05ed2fd"
                alt
              />
              <span>一对多</span>
            </div>
            <div class="comment-img">
              <img
                src="http://193.112.76.40:8090/downloadfile/d647ef45-f384-4e84-90a7-5e87f7fbc696"
                alt
              />
              <span>多对一</span>
            </div>
            <div class="comment-img">
              <img
                src="http://193.112.76.40:8090/downloadfile/2f42e630-88da-4b44-8d30-ba53f7616e97"
                alt
              />
              <span>多对多</span>
            </div>
          </el-col>
        </el-col>
      </div>
    </div>
  </div>
</template>


<script>
import imgUrl from "../../common/images/center.jpg";
export default {
  name: "literature",
  data() {
    return {
      img: imgUrl,
      list: [],
      imgList: [
        {
          id: 1,
          time: "2019-03-06 09:45:55",
          field: "“南粤青年说”活动讲座",
          name: "张三",
          college: "第二课堂活动",
          content: "南粤青年说”活动讲座将在2020-01-24在家里举行",
          img: imgUrl
        },
        {
          id: 2,
          time: "2019-03-06 09:45:55",
          field: "“南粤青年说”活动讲座",
          name: "张三",
          college: "第二课堂活动",
          content: "南粤青年说”活动讲座将在2020-01-24在家里举行",
          img: imgUrl
        },
        {
          id: 3,
          time: "2019-03-06 09:45:55",
          field: "“南粤青年说”活动讲座",
          name: "张三",
          college: "第二课堂活动",
          content: "南粤青年说”活动讲座将在2020-01-24在家里举行",
          img: imgUrl
        }
      ]
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.api.getbtqress({ count: 24 }).then(res => {
        this.list = res.data;
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
      .comment-box {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        height: auto;
        .comment-img {
          margin-bottom: 20px;
          height: 172px;
          width: 100%;
          border-radius: 3px;
          // box-shadow: 0px 0px 5px #ccc;
          transition: all 0.4s;
          cursor: pointer;
          overflow: hidden;
          position: relative;
          // &:hover {
          //   // box-shadow: 2px 2px 15px #ccc;
          //   transform: translateY(-2%);
          //   box-shadow: 1px 4px 10px 2px #ccc;
          // }
          img {
            width: 100%;
            height: 100%;
          }
          span {
            position: absolute;
            left: 15px;
            bottom: 46px;
            font-size: 24px;
            color: #fff;
          }
        }
      }
      .swiper-slide {
        height: 124px;
        width: 124px;
        background-color: #fff;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        box-shadow: 0px 0px 5px #ccc;
        cursor: pointer;
        transition: all 0.4s;
        border-radius: 5px;
        overflow: hidden;
        margin-bottom: 20px;
        margin-right: 20px;
        &:nth-of-type(6n) {
          margin-right: 0;
        }
        &:hover {
          transform: translateY(-2%);
          box-shadow: 1px 4px 10px 2px #ccc;
        }

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>