<template>
  <!-- 作业管理 -->
  <div class="competition">
    <div class="container">
      <el-page-header @back="goBack" :content="$route.params.id ? '查看' : '新增'"></el-page-header>
      <div class="form-box">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="附件">
            <el-upload
              disabled
              class="upload-demo"
              :action="fileUrl + '/uploadfile'"
              multiple
              :on-preview="handlePreview"
              :file-list="fileList"
            >
              <el-button disabled size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">作业附件列表</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      fileList: [],
      one: []
    };
  },
  created() {
    console.log(this.$route.params);
    if (this.$route.params.id) {
      this.init(this.$route.params.id);
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    //列表数据
    init(id) {
      this.api.getonechajob({ id: id }).then(res => {
        this.form = res.data;
        if (this.form.attach_id) {
          var one = this.form.attach_id.split(",");
          for (let i in one) {
            let two = one[i].split("|");
            let file = {
              name: two[0],
              url: two[1]
            };
            this.fileList.push(file);
          }
        }
      });
    },
    //附件点击下载
    handlePreview(file) {
      window.open(this.downloadfileUrl + file.url);
    },
  }
};
</script>

<style lang="scss" scoped>
.competition {
  background-color: #fff;
  width: 100%;
  .container {
    background-color: #fff;
    font-size: 12px;
    padding: 20px;
  }
}
.form-box {
  width: 100%;
  margin: 0 auto;
  padding: 40px;
}
.w-35 {
  width: 450px;
}
.w-65 {
  width: 800px;
}
.avator {
  width: 300px;
  height: 150px;
  border: 1px solid #617fa5;
}
.avator_main {
  width: 300px;
  height: 150px;
}
.avator_main img {
  width: 100%;
  height: 100%;
}
.avator_main button {
  margin: auto;
}
</style>
