<template>
  <!-- 公告 -->
  <div class="notice">
    <div class="notice-top">
      <div class="top-left">
        <p>亲爱的王艳</p>
        <p>欢迎你加入课程《数据结构与算法》，赶快开启学习之旅</p>
      </div>
      <div class="top-right">开始学习</div>
    </div>
    <div class="natice-main">
      <div class="main-top">
        <div class="main-top-title">公告</div>
        <div class="main-top-img">
          <p>成大事不在于力量的大小，而在于能坚持多久</p>
          <img src="@/common/images/img02.png" alt />
          <div>2019年06月19日 19:53</div>
        </div>
      </div>
      <div class="main-bottom">
        <div class="main-bottom-title">第三章课程内容</div>
        <div class="main-bottom-introduce">
          <p>感谢大家对课程的喜爱和对团队的支持！</p>
          <p>一下是第三章课程内容</p>
        </div>
        <div class="main-bottom-catalog">
          <p>第三章 栈和队列</p>
          <p>第1讲 栈的概念及其基本操作（总时长13分06秒）</p>
          <p>第2讲 栈的概念及其基本操作—双端栈（总时长12分10秒）</p>
          <p>第3讲 栈的应用—递归及汉诺塔问题（总时长16分27秒）</p>
          <p>第4讲 栈的应用—递归及汉诺塔问题（总时长16分27秒）</p>
          <p>第5讲 栈的应用—递归及汉诺塔问题（总时长16分27秒）</p>
          <p>第6讲 栈的应用—递归及汉诺塔问题（总时长16分27秒）</p>
          <p>第7讲 栈的应用—递归及汉诺塔问题（总时长16分27秒）</p>
          <p>第8讲 栈的应用—递归及汉诺塔问题（总时长16分27秒）</p>
          <p>实验内容</p>
        </div>
        <div class="main-bottom-epilogue">
          <p>大家可以根据所公布的知识点进行学习，我们也力争做到更好...</p>
          <p>2019年06月19日 19:53</p>
        </div>
      </div>
    </div>
    <div class="natice-bottom">
      <div class="natice-bottom-title">欢迎走进《数据结构与算法》的殿堂</div>
      <p>
        小伙伴们，我们的《数据结构与算法》课程，于
        <span>2019年6月18日</span>准时开课，每周定期发布课程新内容，敬请关注！
      </p>
      <p>课程将系统介绍软件开发中常用的数据结构、存储结构和操作算法；简要介绍算法设计与分析中的设计策略，包括贪心法、分治法等。通过学习，使你能解决实际复杂工程问题，成为程序分析和设计“达人”。</p>
      <p>最后，祝大家学习愉快！谢谢大家。</p>
      <p>2019年06月19日 19:53</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
.notice {
  background-color: #fff;
  width: 100%;
  padding: 40px;
  .notice-top {
    height: 56px;
    background-color: #f2f2f2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    .top-left {
      p {
        font-size: 16px;
        line-height: 24px;
      }
      p:nth-of-type(1) {
        font-size: 16px;
      }
    }
    .top-right {
      width: 140px;
      background-color: #617fa5;
      font-size: 20px;
      color: #fff;
      text-align: center;
      line-height: 43px;
      border-radius: 5px;
      cursor: pointer;
    }
  }
  .natice-main {
    display: flex;
    flex-direction: column;
    .main-top {
      margin-top: 20px;
      .main-top-title {
        border-bottom: 1px solid #d7d7d7;
        font-size: 16px;
        line-height: 40px;
      }
      .main-top-img {
        border-bottom: 1px solid #d7d7d7;
        p {
          font-size: 16px;
          line-height: 80px;
        }
        div {
          color: #999;
          margin-bottom: 5px;
          text-align: right;
        }
      }
    }
    .main-bottom {
      padding-top: 20px;
      border-bottom: 1px solid #d7d7d7;
      .main-bottom-title {
        font-size: 20px;
        line-height: 80px;
      }
      .main-bottom-introduce {
        color: #666;
        font-size: 14px;
        margin-bottom: 20px;
      }
      .main-bottom-catalog {
        p {
          line-height: 24px;
          color: #999;
        }
        p:nth-of-type(1) {
          line-height: 28px;
        }
      }
      .main-bottom-epilogue {
        p:nth-of-type(1) {
          line-height: 60px;
          color: #999;
        }
        p:nth-of-type(2) {
          color: #999;
          text-align: right;
          margin-bottom: 5px;
        }
      }
    }
  }
  .natice-bottom {
    padding-top: 20px;
    border-bottom: 1px solid #d7d7d7;
    .natice-bottom-title {
      font-size: 18px;
      line-height: 80px;
    }
    p:nth-of-type(1) {
      font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑";
      font-weight: 700;
      font-style: normal;
      font-size: 14px;
      line-height: 14px;
      margin-bottom: 20px;
      span {
        color: #617fa5;
      }
    }
    p:nth-of-type(2) {
      font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑";
      font-weight: 700;
      font-style: normal;
      font-size: 14px;
      line-height: 14px;
      padding-right: 20px;
      margin-bottom: 20px;
    }
    p:nth-of-type(3) {
      font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑";
      font-weight: 700;
      font-style: normal;
      font-size: 14px;
      line-height: 14px;
      margin-bottom: 20px;
    }
    p:nth-of-type(4) {
      color: #999;
      text-align: right;
      margin-bottom: 5px;
    }
  }
}
</style>
