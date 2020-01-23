<template>
  <div>
    <div class="shopCarList" :class="goodsNum === 0 ? 'hide' : 'show'">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <!-- refresh系统刷新事件 -->
        <!-- 下拉刷新 -->
        <!-- 购物车商品详情列表 -->
        <van-swipe-cell v-for="item in shopCarList" :key="item.id">
          <van-card :num="item.cou" :price="item.sell_price" :title="item.title" :thumb="item.thumb_path">
            <div slot="footer">
              <van-stepper v-model="item.cou" @plus="add(item.id)" @minus="minus(item.id)" />
            </div>
          </van-card>
          <template slot="right">
            <van-button square type="danger" text="删除" @click="delGoods(item.id)" />
          </template>
        </van-swipe-cell>
      </van-pull-refresh>
    </div>

    <div class="noneGoods" :class="goodsNum === 0 ? 'show' : 'hide'">
      <!-- 购物车中没有商品时，显示去逛逛页面 -->
      <van-image round width="7rem" height="7rem" fit="cover" src="http://destiny001.gitee.io/projecttraining/img/cart_empty.9f725555.png" />
      <div class="shopCarEmpty">购物车空空如也</div>
      <!-- 去逛逛按钮 -->
      <van-button type="info" size="mini" @click="goShopList">去逛逛</van-button>
    </div>

    <!-- 底部区域 -->
    <van-submit-bar :price="goodsNum === 0 ? zero : $store.getters.totalPrice" button-text="提交订单" @submit="buyGoods" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      shopCarList: [],
      // 购物车中商品的数量
      goodsNum: 0,
      shopnum: 0,
      // isLoading为false时，表示刷新完成
      isLoading: false,
      // 获取最新的商品数量
      newGoodsNum: 1,
      zero: 0,
      // 控制数字键盘的展示
      show: true
    }
  },
  created() {
    this.getShopCarList()
  },
  methods: {
    async getShopCarList() {
      // const data = window.localStorage.getItem('saveGoodsIdArray')
      // const arr = JSON.parse(data)
      const arr = this.$store.state.cartList
      console.log(arr)

      if (arr.length !== 0) {
        // const strData = arr.join(',')

        const strData = arr.map(item => item.goodsId).join(',')

        console.log(strData)
        const { data: result } = await this.$http.get('/api/goods/getshopcarlist/' + strData)
        console.log(result)
        if (result.status === 0) {
          this.goodsNum = result.message.length

          var obj = {} // {1:10,88:22}
          arr.forEach(item => {
            obj[item.goodsId] = item.count
          })

          console.log(obj)

          var list = result.message
          list.forEach(item => {
            item.cou = obj[item.id]
          })

          console.log(list)

          this.shopCarList = list

          this.shopnum = result.message.length
          // console.log(this.shopCarList)
          // 往vuex中传送商品的种类，在home组件中的购物车的角标会用到该值
          // this.$store.commit('changeGoodsNum', this.shopnum)
          window.localStorage.setItem('shopnum', this.shopnum)
          // window.localStorage.setItem('shopnum', this.$store.state.shopCarNum)
        }
      } else {
        // session中的数组的长度为0，让goodsNum = 0，显示去逛逛页面
        this.$store.state.GoodsIdArray = []
        this.$store.state.goodsId = 0
        return (this.goodsNum = 0)
      }
    },
    goShopList() {
      this.$router.push('/goodslist')
    },
    goodsSum() {
      var sum = 0
      for (var i = 0; i < this.shopCarList.length; i++) {
        sum += this.shopCarList[i].sell_price * 100 * this.newGoodsNum
      }
      return sum
    },
    onRefresh() {
      // 下拉刷新时会触发该页面
      setTimeout(() => {
        this.$toast('刷新成功')
        this.getShopCarList()
        this.isLoading = false
      }, 1000)
    },
    async delGoods(id) {
      const res = await this.$dialog.confirm({ message: '确认删除该商品？' }).catch(err => err)
      if (res === 'confirm') {
        // const data = window.localStorage.getItem('saveGoodsIdArray')
        // var shopGoodsList = JSON.parse(data)
        // const index = shopGoodsList.findIndex(function(item) {
        //   return item === id
        // })
        // shopGoodsList.splice(index, 1)
        // // console.log(shopGoodsList)
        // window.localStorage.setItem('saveGoodsIdArray', JSON.stringify(shopGoodsList))
        this.$store.commit('delete', id)

        this.getShopCarList()
      }
    },
    buyGoods() {
      alert(11)
    },
    add(id) {
      this.$store.commit('add', id)
    },
    minus(id) {
      this.$store.commit('minus', id)
    }
  }
}
</script>

<style lang="less" scoped>
.noneGoods {
  position: relative;
  .van-image {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 10%);
  }
  .shopCarEmpty {
    text-align: center;
    font-size: 16px;
    color: #ccc;
    position: absolute;
    top: 130px;
    left: 50%;
    transform: translate(-50%, 30%);
  }
  .van-button {
    position: absolute;
    top: 160px;
    left: 50%;
    transform: translate(-50%, 50%);
  }
}

.van-button--square {
  height: 100%;
}

.van-card {
  margin-bottom: 10px;
}

.show {
  display: block;
}

.hide {
  display: none;
}
</style>
