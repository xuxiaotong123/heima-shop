<template>
  <div>
    <!-- <pre>{{ this.$store.state.GoodsIdArray }}</pre> -->
    <!-- {{ $store.state.detailPicArray }} -->
    <div class="swiper_detail">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in saveSwiperArray" :key="index">
          <img :src="item.src" alt="" style="height:50%;width:50%" v-lazy="item.src" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="add_goods">
      <div>{{ goodsInfo.title }}</div>
      <div>
        <p>
          市场价:<del>{{ '￥' + goodsInfo.market_price }}</del> 销售价:<em>{{ '￥' + goodsInfo.sell_price }}</em>
        </p>
        <div class="paynumber">
          <span>购买数量:</span><span><van-stepper v-model="value"/></span>
        </div>
        <van-button type="info">立即购买</van-button>
        <van-button type="danger" @click="addToShopCar">加入购物车</van-button>
      </div>
    </div>
    <div class="goods_params">
      <div class="goodsParams">商品参数</div>
      <div class="params_detail">
        <p>商品货号:后台没有给货号</p>
        <p>库存情况:{{ goodsInfo.stock_quantity }}</p>
        <p>上架时间:{{ goodsInfo.add_time }}</p>
      </div>
      <van-button plain type="primary" @click="goPictureIntroduce" class="introducePic">图文介绍</van-button><br />
      <van-button plain type="info" @click="goodsCommentList" class="introducePic">商品评论</van-button>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  data() {
    return {
      value: 1,
      pictureIntroduce: [],
      goodsInfo: {
        goodsId: window.localStorage.getItem('goodsId') - 0,
        title: window.localStorage.getItem('title'),
        add_time: window.localStorage.getItem('add_time'),
        sell_price: window.localStorage.getItem('sell_price'),
        market_price: window.localStorage.getItem('market_price'),
        stock_quantity: window.localStorage.getItem('stock_quantity')
      },
      saveSwiperArray: JSON.parse(window.localStorage.getItem('saveSwiperArray'))
    }
  },
  created() {
    // console.log(this.goodsInfo.goodsId)
    console.log(this.$route.params.id)
  },
  methods: {
    // 图文介绍
    async goPictureIntroduce() {
      // console.log(this.$store.state.goodsId)
      const { data: res } = await this.$http.get('api/goods/getdesc/' + this.goodsInfo.goodsId)
      console.log(res)
      if (res.status !== 0) {
        return this.$remind.fail('商品图文信息获取失败')
      }
      // this.$remind.success('商品图文信息获取成功')
      this.pictureIntroduce = res.message
      this.$store.commit('saveDetailArray', this.pictureIntroduce)
      window.localStorage.setItem('saveDetailArray', JSON.stringify(this.$store.state.picintroduceArray))
      this.$router.push('/goodsintroduce')
      // console.log(this.pictureIntroduce)
    },
    // 点击商品评论按钮触发
    goodsCommentList() {
      this.$router.push('/goodcomment')
    },
    // 添加商品按钮
    addToShopCar() {
      // console.log(this.value)
      // this.$store.commit('saveGoodsNumber', this.value)
      // this.$store.commit('updateGoodsNum')
      this.goodsInfo.count = this.value
      this.$store.commit('addCart', this.goodsInfo)
      this.$remind.success('已成功加入购物车')
      // console.log(this.$store.state.goodsId)
    }
  }
}
</script>

<style lang="less" scoped>
.swiper_detail {
  height: 200px;
  border: 1px solid #ccc;
  margin: 10px;
}
.add_goods {
  height: 220px;
  border: 1px solid #ccc;
  margin: 10px;
  box-sizing: border-box;
  padding: 15px;
}
.goods_params {
  height: 300px;
  border: 1px solid #ccc;
  margin: 15px 10px 110px;
  box-sizing: border-box;
  padding: 15px;
}
.params_detail {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.van-swipe-item {
  text-align: center;
}
.van-stepper {
  display: inline-block;
}
.paynumber {
  margin-bottom: 20px;
}
.van-button {
  margin-right: 10px;
}
em {
  font-style: normal;
  color: red;
}
.goodsParams {
  font-size: 18px;
  height: 40px;
  line-height: 40px;
}
.introducePic {
  width: 100%;
  margin-top: 10px;
}
</style>
