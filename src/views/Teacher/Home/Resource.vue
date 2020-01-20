<template>
  <!-- 精品导航 -->
  <div class="content-main">
    <div class="container">
      <div class="homework-top">
        <div class="top-title">精品资源导航管理</div>
      </div>
      <div class="homework-select">
        <el-input v-model="input" placeholder="请输入资源名称"></el-input>
        <el-button style="margin-left: 15px;">搜索</el-button>
        <el-button style="margin-left: 15px;background-color: #617fa5;color:#fff;">添加资源</el-button>
      </div>
      <div class="dataTable_main">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column prop="name" label="名称" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="oa_img" label="缩略图" width="200" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <img class="thumbnail_big" :src="scope.row.oa_img" alt />
                <div slot="reference" class="name-wrapper">
                  <img class="thumbnail" :src="scope.row.oa_img" alt />
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="date2" label="链接" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <a
                :href="scope.row.date2"
                target="_blank"
                style="color:dodgerblue;cursor:pointer"
              >{{scope.row.date2}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="成绩" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="s" label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                style="background-color: #617fa5;color:#fff;"
                @click="handleEdit(scope.$index, scope.row.id)"
              >编辑链接</el-button>
              <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除资源</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="panel_pagination">
        <el-pagination
          style="text-align:center"
          background
          :page-size="init_data.strip"
          layout="prev, pager, next, jumper"
          :total="page.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      input: "",
      init_data: {
        name: "",
        page: 1,
        strip: 1
      },
      page: {
        total: 10
      },
      tableData: [
        {
          oa_img: imgUrl2,
          date2: "www.qq.com",
          name: "王小虎",
          address: "100"
        },
        {
          oa_img: imgUrl3,
          date2: "imgUrl2",
          name: "王小虎",
          address: "78"
        },
        {
          oa_img: imgUrl4,
          date2: "imgUrl2",
          name: "王小虎",
          address: "98"
        },
        {
          oa_img: imgUrl5,
          date2: "imgUrl2",
          name: "王小虎",
          address: "78"
        },
        {
          oa_img: imgUrl2,
          date2: "imgUrl2",
          name: "王小虎",
          address: "87"
        },
        {
          oa_img: imgUrl2,
          date2: "www.baidu.com",
          name: "王小虎",
          address: "76"
        },
        {
          oa_img: imgUrl2,
          date2: "www.baidu.com",
          name: "王小虎",
          address: "76"
        },
        {
          oa_img: imgUrl2,
          date2: "www.baidu.com",
          name: "王小虎",
          address: "76"
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleEdit(index, studentId) {
      console.log(index, studentId);
    },
    handleDelete(index, row) {
      this.tableData.splice(index, 1);
    }
  }
};
</script>

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
  background-color: #eeeeee;
  padding-bottom: 30px;
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
    .sideImg {
      width: 100%;
      height: 100%;
    }
  }
  .container {
    background-color: #fff;
    padding: 0 15px 15px 15px;
    margin-top: 20px;
    .homework-top {
      display: flex;
      flex-direction: column;
      .top-title {
        border-bottom: 1px solid #d7d7d7;
        font-size: 18px;
        line-height: 50px;
      }
    }
    .homework-select {
      width: 600px;
      display: flex;
      margin-top: 15px;
    }
    .dataTable_main {
      width: 100%;
      height: auto;
      padding: 10px 0 20px 0;
    }
  }
}
.thumbnail {
  width: 120px;
  height: auto;
}
.thumbnail_big {
  width: 270px;
  height: auto;
}
.el-carousel__item:nth-child(2n) {
  background-color: #000;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
