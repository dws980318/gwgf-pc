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
              <span class="h2-span" @click="$router.push('/assess/unchecked/list')">查看更多>></span>
            </h2>
            <div style="display:flex;flex-wrap: wrap;height: 600px">
              <div class="swiper-slide" v-for="item in list" :key="item.id">
                <img
                  :src="item.img_id ? (downloadfileUrl + item.img_id) : img"
                  @click="detailsAction(item)"
                  alt
                />
              </div>
            </div>
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
import imgUrl from "../../common/images/center.jpg";
export default {
  name: "literature",
  data() {
    return {
      list: [],
      img: imgUrl,
      itemList: []
    };
  },
  created() {
    this.init();
    this.itemInit();
  },
  methods: {
    init() {
      this.api.getbtqress({ count: 24 }).then(res => {
        this.list = res.data;
      });
    },
    itemInit() {
      this.api.getnotices({ count: 15 }).then(res => {
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
      .literature-text-box {
        // height: 600px;
        ul {
          width: 100%;
          li {
            font-size: 16px;
            line-height: 38px;
            &:hover {
              color: #0cb7ea  ;
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