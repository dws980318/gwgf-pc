<template>
  <div class="footer">
    <div class="container">
      <div class="foot_left">
        <div class="logo">
          <img src="../common/images/footer.png" alt />
        </div>
          <p style="margin-top: 20px;width: 350px;">由广外高翻学院推出，让每个有提升愿望的用户能够学到有用的课程，并加以应用</p>
      </div>
      <div class="foot_right">
        <div class="foot_address">
          <p>关于我们</p>
          <p>
            <span>关于我们</span>
            <span>学校云</span>
          </p>
          <p>
            <span>联系我们</span>
            <span>常见问题</span>
          </p>
          <p>
            <span>意见反馈</span>
            <span>法律条款</span>
          </p>
        </div>
        <div class="foot_pay">
          <p>关注我们</p>
          <div class="foot_pay_img">
            <img src="../common/images/QQ.png" alt="">
            <img src="../common/images/weixin.png" alt="">
          </div>
        </div>
        <div class="foot_link">
          <p>友情链接</p>
          <p>网易云课堂</p>
          <p>百度云课堂</p>
          <p>腾讯课堂</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>
/*脚部*/
.footer {
  width: 100%;
  height: 220px;
  background-color: #333;
  display: flex;
  align-items: center;
}
.footer .container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 220px;
  font-size: 14px;
}
.foot_left {
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 180px;
  padding: 0 0 0 100px;
}
.foot_left .logo {
  display: inline-block;
  width: 260px;
  height: 60px;
}
.foot_left p {
  line-height: 20px;
  color: #ccc;
}
.foot_left .logo img {
  width: 100%;
  height: 100%;
}
.foot_right {
  display: flex;
  flex: 1;
  height: 180px;
  justify-content: space-around;
  padding: 0 100px 0 0;

}
.foot_right .foot_address, .foot_link {
  font-size: 14px;
  line-height: 28px;
  color: #ccc;
}
.foot_right .foot_address p:nth-of-type(1), .foot_pay p, .foot_link p:nth-of-type(1) {
  line-height: 60px;
  font-size: 20px;
  color: #ccc;
}
.foot_right .foot_pay {
  width: 104px;
  display: flex;
  flex-direction: column;
}
.foot_right .foot_pay .foot_pay_img {
  display: flex;
  justify-content: space-between;
  align-items: center;
 
}
.foot_right .foot_pay .foot_pay_img img {
   width: 50px;
  height: 50px;
}
/* .foot_right:before{
    content: '';
    position: absolute;
    top: 0;
    left: 1px;
    width: 1px;
    height: 120px;
    background-color: #f0f0f0;
  } */

/*脚部.end*/
</style>
