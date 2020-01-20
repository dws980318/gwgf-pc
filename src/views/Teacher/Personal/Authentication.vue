<template>
  <div class="authentication">
    <div class="list">
      <div class="list-left">
        <i class="el-icon-user-solid"></i>
        <span>国籍</span>
        <span>{{list.country}}</span>
      </div>
    </div>
    <div class="list">
      <div class="list-left">
        <i class="el-icon-user-solid"></i>
        <span>姓名</span>
        <span>{{list.realName}}</span>
      </div>
    </div>
    <div class="list">
      <div class="list-left">
        <i class="el-icon-user-solid"></i>
        <span>职工号</span>
        <span>{{list.userCode}}</span>
      </div>
    </div>
    <div class="list">
      <div class="list-left">
        <i class="el-icon-user-solid"></i>
        <span>所在中心</span>
        <span>{{list.centre}}</span>
      </div>
    </div>
    <div class="list">
      <div class="list-left">
        <i class="el-icon-user-solid"></i>
        <span>研究方向</span>
        <span>{{list.study}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: {}
    }
  },
  created() {
    this.list = JSON.parse(localStorage.list)
    console.log(JSON.parse(localStorage.list))
  }
};
</script>

<style lang="scss" scoped>
.authentication {
  padding: 60px 80px;
  .list {
    display: flex;
    justify-content: space-between;
    padding: 30px 0 30px 40px;
    border-bottom: 1px solid #ddd;
    position: relative;
    .list-left {
      display: flex;
      flex-direction: column;
      font-size: 14px;
      i {
        position: absolute;
        top: 34px;
        left: 0;
        font-size: 30px;
      }
      span:nth-of-type(2) {
        color: #999;
      }
    }
  }
}
</style>