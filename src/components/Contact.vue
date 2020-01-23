<template>
  <div>
    <header>
      <div class="topimg"></div>
    </header>
    <p class="kefu">Hi,我是智能客服小王</p>
    <p class="bbb">亲，点击下方业务类型，咨询更快捷哦~~~</p>
    <div class="leixing">
      <van-row type="flex" justify="center">
        <van-col span="10">
          <div class="one">
            <van-icon name="fire" />
            <span>热门课程</span>
          </div>
        </van-col>
        <van-col span="10">
          <div class="one">
            <van-icon name="friends" />
            <span>个人业务</span>
          </div>
        </van-col>
      </van-row>
      <van-row type="flex" justify="center">
        <van-col span="10">
          <div class="one">
            <van-icon name="phone" />
            <span>联系电话</span>
          </div>
        </van-col>
        <van-col span="10">
          <div class="one">
            <van-icon name="gold-coin" />
            <span>报名费用</span>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="main">
      <ul>
        <li class="z">
          <h4>JavaEE</h4>
          <p>世界第一编程语言</p>
          <div class="go">14天基础班免费学习</div>
        </li>
        <li class="x">
          <h4>Python</h4>
          <p>人工只能主流语言</p>
          <div class="go">15天基础班免费学习</div>
        </li>
        <li class="c">
          <h4>前端开发</h4>
          <p>互联网时代职业黑马</p>
          <div class="go">15天基础班免费学习</div>
        </li>
        <li class="v">
          <h4>C/C++</h4>
          <p>具备多种语言的优势</p>
          <div class="go">20天基础班免费学习</div>
        </li>
        <li class="b">
          <h4>软件测试</h4>
          <p>软件质量的捍卫者</p>
          <div class="go">8天基础班免费学习</div>
        </li>
        <li class="n">
          <h4>UI/UE设计</h4>
          <p>打造懂代码的设计师</p>
          <div class="go">14天基础班免费学习</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}
@import url('../assets/contact.css');
.topimg {
  width: 100%;
  height: 150px;
  background-repeat: no-repeat;
  background-color: #fff;
  background-image: url('../assets/chuanzhi.jpg');
  // background-size: cover;
  overflow: hidden;
}
.kefu {
  font-size: 18px;
  font-weight: 700;
}
.bbb {
  margin-top: 10px;
  font-size: 12px;
  color: #555;
}
.leixing {
  width: 100%;
  height: 120px;
  // background-color:red;
  margin-top: 10px;
}
.leixing.ul {
  height: 120px;
  position: relative;
}
ul.li {
  width: 175px;
  height: 100px;
  background-color: #fff;
}
.one {
  border: 1px solid #0567a2;
  width: 80px;
  height: 40px;
  margin-right: 45px;
  margin-bottom: 18px;
  border-radius: 10px;
  position: relative;
  margin-left: 35px;
  background-color: #b8d4e5;
}
.van-icon {
  font-size: 24px;
  line-height: 36px;
  margin-top: 5px;
}
span {
  position: absolute;
  width: 50px;
  height: 30px;
  font-size: 12px;
  margin-top: 14px;
  margin-left: 3px;
}
.main {
  width: 100%;
  height: 250px;
  // background-color: red;
}
.main li {
  float: left;
  width: 110px;
  height: 110px;
  border: 1px solid #ccc;
  margin-left: 10px;
  margin-bottom: 10px;
  position: relative;
}
.main h4 {
  text-align: center;
}
.main p {
  font-size: 12px;
  color: #000;
  text-align: center;
}
.main .go {
  position: absolute;
  width: 100px;
  height: 40px;
  border: 1px solid #ccc;
  left: 50%;
  transform: translate(-50%);
  margin-top: 20px;
  border-radius: 10px;
  font-size: 14px;
  text-align: center;
}
.main .z {
  background-color: #4c95ea;
}
.main .x {
  background-color: #c286ec;
}
.main .c {
  background-color: #fda458;
}
.main .v {
  background-color: #eeba43;
}
.main .b {
  background-color: #ff6d5d;
}
.main .n {
  background-color: #35dbbf;
}
</style>
