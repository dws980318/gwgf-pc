<template>
  <div class="container-literature">
    <div class="container">
      <div class="literature">
        <el-col :span="24" style="display:flex;justify-content: space-between;">
          <el-col
            :span="16"
            style="display:flex;flex-direction: column;justify-content: space-between;"
          >
            <h2 class="h2">
              <span v-if="$store.state.isLogin === '0'">
                <i></i>作业管理
              </span>
              <span v-else>
                <i></i>课程评估
              </span>
              <span class="h2-span" @click="$router.push('/resource/work/list')">查看更多>></span>
            </h2>
            <div style="display:flex;justify-content: space-between;">
              <div v-for="listItem in list" :key="listItem.id" class="swiper-slide">
                <div class="courses-li-top">
                  <img :src="listItem.comStatus" alt />
                </div>
                <div class="courses-li-bottom">
                  <div>
                    <p @click="$router.push('/resource/work/' + listItem.id)">{{listItem.job_name}}</p>
                  </div>
                  <div class="over">{{listItem.job_desc}}</div>
                  <p class="over">{{listItem.publish_date}}</p>
                </div>
              </div>
              <div class="literature-img-box">
                <div class="literature-img" v-for="item in rightList" :key="item.id">
                  <img :src="item.comStatus" alt />
                  <div class="literature-txt" style="flex:1;">
                    <div class="overs">
                      <!-- <span>{{item.lesson_id}}</span> -->
                      <span @click="$router.push('/resource/work/' + item.id)">{{item.job_name}}</span>
                    </div>
                    <div class="over">{{item.job_desc}}</div>
                    <p class="over">{{item.publish_date}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              style="margin-top: 10px; display: flex;justify-content: space-between;align-items: center;margin-top: 25px;"
            >
              <div class="mySlider">
                <div class="swiper-slide" v-for="items in bottomList" :key="items.id">
                  <div class="courses-li-top">
                    <img :src="items.comStatus" alt />
                    <!-- <img src="" alt /> -->
                  </div>
                  <div class="courses-li-bottom">
                    <p>{{items.issuer_name}}</p>
                    <div
                      class="over"
                      @click="$router.push('/resource/work/' + items.id)"
                    >{{items.job_desc}}</div>
                    <p class="over">{{items.publish_date}}</p>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="7" :offset="1" class="comment-box">
            <h2 class="h2">
              <span>互动空间</span>
              <span class="h2-span" @click="$router.push('/comment/list')">查看更多>></span>
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
      list: [],
      imgList: [],
      init_data: {
        pageNumber: 1,
        pageSize: 10
      },
      list_data: {
        job_name: "",
        publish_status: 1
      },
      rightList: [],
      bottomList: [],
      options: []
    };
  },
  created() {
    this.inits();
    this.init();
  },
  methods: {
    selectall(data) {
      this.api.selectalllesson().then(res => {
        if (res.count !== 0) {
          this.options = res.data;
          data.map(item => {
            res.data.map(j => {
              if (item.lesson_id === j.id) {
                item.lesson_id = j.lessonName;
                item.comStatus = this.downloadfileUrl + j.imgId;
              }
              if (this.list.lesson_id === j.id) {
                this.list.comStatus = this.downloadfileUrl + j.imgId;
              }
            });
          });
        }
      });
    },
    init() {
      this.api.getallchajobstu(this.init_data, this.list_data).then(res => {
        if (res.count !== 0) {
          this.list.push(res.data[0]);
          this.selectall(res.data);
          for (let i = 1; i < res.data.length; i++) {
            if (i > 4) {
              return false;
            } else {
              this.rightList.push(res.data[i]);
            }
          }
        }
      });
    },
    inits() {
      this.api.getallchajobstu(this.init_data, this.list_data).then(res => {
        if (res.count !== 0) {
          this.selectall(res.data);
          if (res.data.length >= 4) {
            for (let i = 5; i < res.data.length; i++) {
              if (i > 7) {
                return false;
              } else {
                this.bottomList.push(res.data[i]);
              }
            }
          }
        }
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
          color: #0cb7ea;
          cursor: pointer;
        }
      }
    }
    .literature {
      @include between;
      .swiper-slide {
        height: 100%;
        width: 400px;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        // cursor: pointer;
        overflow: hidden;
        transition: all 0.4s;
        // box-shadow: 0px 0px 5px #ccc;
        border-radius: 3px;
        background-color: #fff;
        // &:hover {
        //   transform: translateY(-2%);
        //   box-shadow: 1px 4px 10px 2px #ccc;
        // }
        .courses-li-top {
          height: 250px;
          width: 400px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .courses-li-bottom {
          height: 170px;
          padding: 10px;
          div {
            margin-bottom: 2px;
            p:nth-of-type(1) {
              font-size: 18px;
              font-family: Roboto;
              font-weight: 500;
              color: #333;
              font-weight: 600;
              overflow: hidden;
              text-overflow: -o-ellipsis-lastline;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              &:hover {
                color: #0cb7ea;
                cursor: pointer;
              }
            }
            p:nth-of-type(2) {
              color: #a9a4a4;
              margin-top: 10px;
            }
          }
          .over {
            margin-top: 10px;
            overflow: hidden;
            text-overflow: -o-ellipsis-lastline;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            color: #999;
            width: 380px;
          }
        }
      }
      .literature-img-box {
        display: flex;
        flex-direction: column;
        width: 400px;
        margin-left: 50px;
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
            height: 84px;
            border-radius: 5px;
          }
          .literature-txt {
            margin-left: 20px;
            position: relative;
            overflow: hidden;
            p {
              line-height: 28px;
              color: #999;
            }
            .over {
              margin-top: 5px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              // text-overflow: -o-ellipsis-lastline;
              // display: -webkit-box;
              // -webkit-line-clamp: 2;
              // -webkit-box-orient: vertical;
              color: #999;
              width: 250px;
            }
            .overs {
              display: flex;
              align-items: center;
              margin-bottom: 5px;
              // span:nth-of-type(1) {
              //   margin-right: 6px;
              //   color: #000;
              //   border-radius: 5px;
              //   font-size: 12px;
              //   padding: 5px;
              //   background-color: #0cb7ea;
              //   color: #fff;
              // }
              span:nth-of-type(1) {
                flex: 1;
                overflow: hidden;
                text-overflow: -o-ellipsis-lastline;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                font-weight: 600;
                font-size: 14px;
                &:hover {
                  color: #0cb7ea;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
      .comment-box {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        .comment-img {
          margin-bottom: 20px;
          height: 240px;
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
          &:nth-of-type(3n) {
            margin-bottom: 0;
          }
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

      .mySlider {
        width: 100%;
        display: flex;
        padding: 5px 0;
        box-sizing: border-box;
        .swiper-slide {
          margin-right: 46px;
          height: 100%;
          width: 254px;
          background-color: #fff;
          font-size: 14px;
          display: flex;
          flex-direction: column;
          border-radius: 3px;
          // box-shadow: 0px 0px 5px #ccc;
          transition: all 0.4s;
          overflow: hidden;
          &:nth-of-type(3n) {
            margin-right: 0;
          }
          // &:hover {
          //   // box-shadow: 2px 2px 15px #ccc;
          //   transform: translateY(-2%);
          //   box-shadow: 1px 4px 10px 2px #ccc;
          // }
          .courses-li-top {
            height: 159px;
            width: 254px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .courses-li-bottom {
            padding: 10px;
            height: 150px;
            overflow: hidden;
            p:nth-of-type(1) {
              margin-bottom: 2px;
              font-size: 12px;
              font-family: Roboto;
              font-weight: 500;
              color: #0cb7ea;
              font-weight: 600;
              overflow: hidden;
              text-overflow: -o-ellipsis-lastline;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            div:nth-of-type(1) {
              font-weight: 600;
              color: #333;
              &:hover {
                color: #0cb7ea;
                cursor: pointer;
              }
            }
            .over {
              margin-top: 10px;
              overflow: hidden;
              text-overflow: -o-ellipsis-lastline;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              color: #999;
              width: 234px;
            }
          }
        }
      }
    }
  }
}
</style>