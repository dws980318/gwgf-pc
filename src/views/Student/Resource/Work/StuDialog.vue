<template>
  <!-- 学生评价 -->
  <el-row :span="24">
    <el-dialog title="提示" :visible.sync="$store.state.stuVisible" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAction">取 消</el-button>
        <el-button type="primary" @click="showAction">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>


<script>
export default {
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    showAction() {
      this.$store.commit('showStuModal', false)
    }
  }
};
</script>

<style lang="scss" scoped>
</style>