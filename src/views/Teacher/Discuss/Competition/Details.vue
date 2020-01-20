<template>
  <!-- 活动管理 -->
  <div class="competition">
    <div class="competition-top">
      <div class="top-title">活动管理</div>
      <div>
        <el-button class="btn" @click="issueAction">发布活动</el-button>
        <el-button @click="$router.back()">返回</el-button>
      </div>
    </div>
    <div class="form-box">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item class="w-35" label="活动标题">
          <el-input v-model="form.title" clearable></el-input>
        </el-form-item>
        <el-form-item class="w-35" label="活动类别">
          <el-select clearable style="width:100%;" v-model="form.value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="w-35" label="活动时间">
          <el-date-picker
            type="datetime"
            placeholder="选择时间"
            v-model="form.activityTime"
            format="yyyy-MM-dd HH:mm:ss"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="w-35" label="活动地址">
          <el-input clearable v-model="form.address" placeholder="请输入活动地址"></el-input>
        </el-form-item>
        <el-form-item class="w-35" label="报名开始时间">
          <el-date-picker
            type="datetime"
            placeholder="选择时间"
            v-model="form.startTime"
            format="yyyy-MM-dd HH:mm:ss"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="w-35" label="报名结束时间">
          <el-date-picker
            type="datetime"
            placeholder="选择时间"
            v-model="form.endTime"
            format="yyyy-MM-dd HH:mm:ss"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="w-35" label="限制学生名额">
          <el-input clearable v-model="form.astrictNumber" placeholder="请输入学生人数"></el-input>
        </el-form-item>
        <!-- <el-form-item label="状态">
          <el-radio-group v-model="form.resource">
            <el-radio label="0">发布</el-radio>
            <el-radio label="1">下架</el-radio>
          </el-radio-group>
        </el-form-item>-->
        <el-form-item label="发布状态" prop="resource">
          <el-switch
            v-model="form.resource"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#999"
          ></el-switch>
        </el-form-item>
        <el-form-item label="封面图" prop="nickname">
          <div class="avator">
            <div class="avator_main">
              <img :src="form.logurl" alt />
            </div>
          </div>
        </el-form-item>
        <el-form-item prop="upload">
          <el-upload
            action="'/GatewayController/addImageManagement'"
            :limit="1"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <el-button type="primary" size="small">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              建议尺寸600*600 px；
              允许的图片格式：jpg/gif/bmp/png；
              大小不超过2M
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item class="w-65" label="活动详细内容">
          <tinymce-editor style="width: 100%;" v-model="form.desc" ref="editor"></tinymce-editor>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import userImg from "@/common/images/center.jpg";
import TinymceEditor from "@/components/tinymce-editor";

export default {
  components: {
    TinymceEditor
  },
  data() {
    return {
      form: {
        title: "",
        value: "",
        activityTime: "",
        address: "",
        startTime: "",
        endTime: "",
        astrictNumber: "",
        resource: "",
        desc: "",
        logurl: ""
      },
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
      ]
    };
  },
  created() {
    console.log(this.$route.params);
    if (this.$route.params.id) {
      this.init(this.$route.params.id);
    }
  },
  methods: {
    init() {
      this.form = {
        title: "活动一",
        value: "选项1",
        activityTime: "2019-12-04 10:46:02",
        address: "广州东站",
        startTime: "2019-12-04 10:46:02",
        endTime: "2019-12-04 10:46:02",
        astrictNumber: "120",
        resource: 1,
        desc: "这是一个活动，oh mygod",
        logurl: userImg
      };
    },
    issueAction() {
      var one;
      if (this.$route.params.id) {
        one = true;
      } else {
        one = false;
      }
      console.log(one);
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
  }
};
</script>

<style lang="scss" scoped>
.competition {
  background-color: #fff;
  width: 100%;
  padding: 0 60px;
  .competition-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d7d7d7;
    .btn {
      width: 84px;
      height: 40px;
      background-color: #617fa5;
      color: #fff;
      padding: 0;
    }
    .top-title {
      font-size: 18px;
      line-height: 50px;
    }
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
