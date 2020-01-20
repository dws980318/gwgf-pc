<template>
  <div class="form-box">
    <el-form ref="form" :model="form" label-width="80px">
      <!-- <el-form-item label="头像：" prop="nickname">
        <el-upload
          action="http://193.112.173.69:9095/creaUser/importExcel"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>-->
      <!-- <el-form-item label="头像：" prop="photo">
        <el-upload
          class="avatar-uploader"
          :action="fileUrl + '/uploadfile'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imgurl" :src="imgurl" class="avatar" />
          <el-avatar :size="80" v-else>img</el-avatar>
          <div class="el-upload__tip" slot="tip">点击图片上传头像，只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>-->
      <el-form-item label="头像：" prop="photo">
        <div class="avator">
          <div class="avator_main">
            <img :src="imgurl?imgurl:avator" alt />
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-upload
          :action="fileUrl + '/uploadfile'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :headers="{Authorization: tokens}"
        >
          <el-button type="primary" size="small">上传头像</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过1MB</div>
        </el-upload>
      </el-form-item>
      <el-form-item class="w-35" label="用户名">
        <el-input v-model="form.accountname"></el-input>
      </el-form-item>
      <el-form-item class="w-35" label="真实姓名">
        <el-input v-model="form.realName"></el-input>
      </el-form-item>
      <el-form-item class="w-35" label="出生年月">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.birthday"
          format="yyyy-MM-dd"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="w-65" label="个人介绍">
        <el-input type="textarea" rows="8" v-model="form.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleEdit">修改</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import userImg from "@/common/images/u267.jpg";
export default {
  data() {
    return {
      form: {
        realName: "",
        sex: "",
        birthday: "",
        remark: "",
        photo: ""
      },
      imgurl: "",
      dialogImageUrl: "",
      dialogVisible: false,
      avator: userImg
    };
  },
  created() {
    this.form = JSON.parse(localStorage.list);
    this.imgurl = this.downloadfileUrl + this.form.photo;
    console.log(this.imgurl);
  },
  methods: {
    handleEdit() {
      this.api.updateuser(this.form).then(res => {
        if (res.status === 200) {
          this.$message.success("修改成功");
          localStorage.list = JSON.stringify(res.data);
          location.reload();
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.form.photo = res.fileName;
      this.imgurl = res.fileDownloadUri;
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
    }
  }
};
</script>

<style lang="scss" scoped>
.form-box {
  width: 80%;
  margin: 0 auto;
  padding: 40px;
}
.w-35 {
  width: 350px;
}
.w-65 {
  width: 650px;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
  }
}

.avator {
  width: 100%;
  height: 80px;
}
.avator_main {
  width: 80px;
  height: 80px;
  border: 1px solid #000;
  border-radius: 50%;
}
.avator_main img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.avator_main button {
  margin: auto;
}
</style>