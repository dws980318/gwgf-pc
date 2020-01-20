<template>
  <!-- 课程资源管理 -->
  <div class="note">
    <div class="note-top">
      <div class="top-title">课程资源</div>
      <el-upload
        action="'/GatewayController/addImageManagement'"
        :limit="1"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <el-button type="primary" class="btn">上传资源</el-button>
      </el-upload>
    </div>
    <div class="note-select">
       <el-input style="width:250px;" clearable v-model="value" placeholder="请输入文件名"></el-input>
      <el-button style="margin-left: 15px;" type="success">搜索</el-button>
    </div>
    <div class="dataTable_main">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="文件名" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="date" label="上传时间" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="date2" label="类型" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="大小" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="下载次数" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="s" label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                      type="danger" @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="panel_pagination">
      <el-pagination
        style="text-align:center"
        background
        @current-change="handleCurrentChange"
        :page-size="init_data.pageSize"
        :current-page="init_data.pageNumber"
        layout="prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
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
          date: "2016-05-04",
          date2: "2016-05-02",
          name: "第三章学习详解.pdf",
          address: "100"
        },
        {
          date: "2016-05-04",
          date2: "2016-05-04",
          name: "第三章学习详解.pdf",
          address: "78"
        },
        {
          date: "2016-05-01",
          date2: "2016-05-04",
          name: "第三章学习详解.pdf",
          address: "98"
        },
        {
          date: "2016-05-03",
          date2: "2016-05-04",
          name: "第三章学习详解.pdf",
          address: "78"
        },
        {
          date: "2016-05-03",
          date2: "2016-05-04",
          name: "第三章学习详解.pdf",
          address: "87"
        },
        {
          date: "2016-05-03",
          date2: "2016-05-04",
          name: "第三章学习详解.pdf",
          address: "76"
        },
        {
          date: "2016-05-03",
          date2: "2016-05-04",
          name: "第三章学习详解.pdf",
          address: "90"
        },
        {
          date: "2016-05-03",
          date2: "2016-05-04",
          name: "第三章学习详解.pdf",
          address: "91"
        }
      ],
      list: [
        {
          title: "绪论",
          courseList: [
            { catalogue: "绪论(视频)" },
            { catalogue: "绪论(课件)" },
            { catalogue: "课程内容" }
          ]
        },
        {
          title: "第一章  社会实践",
          courseList: [
            { catalogue: "绪论(视频)" },
            { catalogue: "绪论(视频)" },
            { catalogue: "绪论(视频)" },
            { catalogue: "绪论(课件)" },
            { catalogue: "绪论(课件)" },
            { catalogue: "绪论(课件)" },
            { catalogue: "课程内容" },
            { catalogue: "课程内容" },
            { catalogue: "课程内容" }
          ]
        }
      ]
    };
  },
  methods: {
    handleDelete(index, row) {
      this.tableData.splice(index, 1);
    },
     handleAvatarSuccess(res, file) {
      // this.information.logurl = URL.createObjectURL(file.raw);
      this.form.logurl = res.data;
    },
      beforeAvatarUpload(file) {
      const isIMG = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/pjpeg",
        "image/gif",
        "image/bmp",
        "image/x-png"
      ];
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (isIMG.indexOf(file.type) === -1) {
        this.$message.error("上传文件只能是 图片 格式!");
        return false;
      }
      if (!isLt1M) {
        this.$message.error("上传图片大小不能超过 1MB!");
        return false;
      }
      return isIMG && isLt1M;
    },
    handleCurrentChange(val) {
      this.init_data.page = val;
      //   this.init();
    }
  }
};
</script>

<style lang="scss" scoped>
.note {
  background-color: #fff;
  width: 100%;
  padding: 0 60px;
  .note-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d7d7d7;
    .btn {
      width: 84px;
      height: 40px;
    }
    .top-title {
      font-size: 18px;
      line-height: 50px;
    }
  }
  .note-select {
     margin-top: 10px;
     .btn {
      width: 84px;
      height: 40px;
      margin-left: 10px;
    }
  }
  .dataTable_main {
    width: 100%;
    height: auto;
    padding: 10px 0 20px 0;
    .btn {
      background-color: #fff;
      border: 1px solid #617fa5;
      color: #617fa5;
    }
  }
}
.note /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #617fa5;
}
.note /deep/ .el-pagination.is-background .el-pager li:hover {
  color: #617fa5;
}
.note
  /deep/
  .el-pagination.is-background
  .el-pager
  li.active:not(.disabled):hover {
  color: #fff;
}
.note /deep/ .btn {
  background-color: #617fa5;
  color: #fff;
  width: 73px;
  height: 29px;
  padding: 0;
}
</style>
