<template>
  <div class="videoBox">
    <div>
      <!-- <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <a href="https://v.youku.com/v_show/id_XNDAzNTA1NzMyOA==.html?refer=seo_operation.liuxiao.liux_00003303_3000_Qzu6ve_19042900">
            <van-icon name="play-circle-o" size="50px" color="skyblue" />
            <img src="./11.jpg" alt="" />
          </a>
        </van-swipe-item>
        <van-swipe-item>
          <a href="https://haokan.baidu.com/v?pd=wisenatural&vid=1807468201010631239">
            <van-icon name="play-circle-o" size="50px" color="skyblue" />
            <img src="./22.jpg" alt="" />
          </a>
        </van-swipe-item>
      </van-swipe> -->
      <!-- <a href="https://tv.sohu.com/v/dXMvMzMxNzcxODEwLzEwODA1MjczNC5zaHRtbA==.html">
        <van-icon name="play-circle-o" size="50px" color="skyblue" />
        <img src="./44.jpg" alt="" />
      </a> -->
      <a href="javascript:;">
        <van-icon name="play-circle-o" size="50px" color="skyblue" @click="playAdvertise" class="hideIcon"/>
        <img src="./11.jpg" alt="" class="firstImg"/>
        <video src="./小米.mp4" :autoplay="false" class="firstVideo"></video>
      </a>
      <!-- <a href="javascript:;">
        <van-icon name="play-circle-o" size="50px" color="skyblue" />
        <img src="./22.jpg" alt="" />
        <video src="./小米.mp4"></video>
      </a>
      <a href="javascript:;">
        <van-icon name="play-circle-o" size="50px" color="skyblue" />
        <img src="./44.jpg" alt="" />
        <video src="./小米.mp4"></video>
      </a>
      <a href="javascript:;">
        <van-icon name="play-circle-o" size="50px" color="skyblue" />
        <img src="./55.jpg" alt="" />
        <video src="./小米.mp4"></video>
      </a> -->
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    playAdvertise() {}
  }
}
</script>

<style lang="less" scoped>
.videoBox {
  // width: 414px;
  // height: 650px;
  background-color: #f3f3f3;
  // background: url('./3.jpg');
}
a {
  position: relative;
  display: block;
  box-sizing: border-box;
  margin: 6px 17px 10px 17px;
  width: 380px;
  height: 200px;
  background-color: #fff;
  text-align: center;
  .van-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: transparent;
  }
  video {
    width: 100%;
    height: 100%;
  }
}
</style>
