<template>
  <div class="contain_box">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- {{ $store.state.detailPicArray }} -->
      <!--  -->
      <van-row gutter="4">
        <van-col span="12" v-for="item in goodsList" :key="item.id">
          <a class="singleBox" @click="goDetail(item)">
            <img :src="item.img_url" alt />
            <p class="goodsName">{{ item.title }}</p>
            <div class="detailfooter">
              <i class="now-price">{{ '￥' + item.sell_price }}</i>
              <del class="market-price">{{ '￥' + item.market_price }}</del>
              <p class="price_params">
                <span class="hot_sale">热卖中</span>
                <span>剩{{ item.stock_quantity }}件</span>
              </p>
            </div>
          </a>
        </van-col>
      </van-row>
      <!-- <p>刷新次数: {{ count }}</p> -->
    </van-pull-refresh>
    <div class="finished-text">没有更多了</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 1,
      isLoading: false,
      goodsList: [],
      detailPicArray: []
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    // 获取当前页面的商品列表。
    async getGoodsList() {
      const { data: res } = await this.$http.get('api/getgoods?pageindex=' + this.count)
      console.log(res)
      if (res.status !== 0) {
        return this.$remind.fail('商品信息获取失败')
      }
      // this.$remind.success('商品信息获取成功')
      this.goodsList = res.message
      console.log(this.goodsList)
    },
    // 跳转到商品详情页面。
    async goDetail(currentItem) {
      console.log(currentItem)
      // 保存当前点击商品的信息，存储在vuex中，并将vuex中的值存储在localStore中。
      this.$store.commit('saveGoodsInfo', currentItem)
      window.localStorage.setItem('goodsId', JSON.stringify(this.$store.state.goodsId))
      window.localStorage.setItem('title', JSON.stringify(this.$store.state.title))
      window.localStorage.setItem('add_time', JSON.stringify(this.$store.state.add_time))
      window.localStorage.setItem('sell_price', JSON.stringify(this.$store.state.sell_price))
      window.localStorage.setItem('market_price', JSON.stringify(this.$store.state.market_price))
      window.localStorage.setItem('stock_quantity', JSON.stringify(this.$store.state.stock_quantity))
      // 存取商品的id,并将其添加到一个数组中，用于购物车模块中请求数据。
      // 获取图文介绍页面需要的详细数据。
      const { data: res } = await this.$http.get('api/getthumimages/' + this.$store.state.goodsId)
      console.log(res)
      if (res.status !== 0) {
        this.$remind.fail('商品图片获取失败')
      }
      this.detailPicArray = res.message
      // 数据赋值。保存到vuex中然后保存到localStore中。
      this.$store.commit('saveSwiperArray', this.detailPicArray)
      window.localStorage.setItem('saveSwiperArray', JSON.stringify(this.$store.state.detailPicArray))
      this.$router.push('/goodsdetail/' + currentItem.id)
    },
    // 下拉刷新触发的函数
    onRefresh() {
      // alert(123)
      setTimeout(() => {
        this.$remind('刷新成功')
        this.isLoading = false
        this.count++
        if (this.count > 2) {
          this.count = 1
          this.getGoodsList()
          return
        }
        this.getGoodsList()
        console.log(this.count)
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.contain_box {
  box-sizing: border-box;
  padding: 15px;
  margin-bottom: 50px;
}
.now-price {
  color: red;
  font-size: 16px;
  font-style: normal;
  margin-right: 8px;
}
.market-price {
  color: #ccc;
  font-size: 12px;
  font-style: normal;
}
.van-col {
  img {
    width: 100%;
    height: 100%;
  }
}
// 改变样式.
.singleBox {
  border: 1px solid #ccc;
  display: block;
  box-sizing: border-box;
  margin: 6px;
}
.goodsName {
  font-size: 14px;
  margin-bottom: 10px;
}
.price_params {
  margin-top: 10px;
  box-sizing: border-box;
  margin-top: 5px;
  font-size: 12px;
  color: #000;
}
.hot_sale {
  margin-right: 80px;
}
.detailfooter {
  background-color: #eee;
}
.finished-text {
  color: #ccc;
  box-sizing: border-box;
  border-top: 1px solid #ccc;
  margin-top: 5px;
  padding-top: 10px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #fff;
}
</style>
