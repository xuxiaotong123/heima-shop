<template>
  <div>
    <!-- 轮播图区域 -->
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in list" :key="item.id">
        <img :src="item.img" alt="图片加载失败..." />
      </van-swipe-item>
    </van-swipe>

    <van-grid :border="false" :column-num="3">
      <van-grid-item to="news">
        <img src="../assets/images/menu1.png" alt />
        <p>新闻资讯</p>
      </van-grid-item>
      <van-grid-item @click="getPhoto">

      <img src="../assets/images/menu2.png" alt="" />
        <p>图片分享</p>
      </van-grid-item>
      <van-grid-item to="/goodslist">
        <img src="../assets/images/menu3.png" alt />
        <p>商品购买</p>
      </van-grid-item>
      <van-grid-item to="feedback">
        <img src="../assets/images/menu4.png" alt />
        <p>留言反馈</p>
      </van-grid-item>
      <van-grid-item to="/professionvideo">
        <img src="../assets/images/menu5.png" alt />
        <p>视频专区</p>
      </van-grid-item>
      <van-grid-item to="/contact">
        <img src="../assets/images/menu6.png" alt />
        <p>联系我们</p>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getSwiperData()
  },
  methods: {
    async getSwiperData() {
      const { data: res } = await this.$http.get('api/getlunbo')
      if (res.status !== 0) {
        return this.$toast('获取轮播图数据失败')
      }
      this.list = res.message
    },
    getPhoto() {
      this.$router.push('/photo/list')
    }
  }
}
</script>

<style lang="less" scoped>
.van-swipe {
  height: 210px;
  img {
    width: 100%;
    height: 100%;
  }
}
.van-grid-item__content {
  width: 33.33%;
  img {
    width: 55%;
  }
  p {
    font-size: 14px;
  }
}
</style>
