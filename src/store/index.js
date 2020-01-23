import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    newsDetailId: 0,
    // 商品的id值
    goodsId: 0,
    // 用于渲染图文介绍页面的数据
    picintroduceArray: [],
    // 新增商品数量。
    newAddNum: 1,
    title: '',
    add_time: '',
    sell_price: 0,
    market_price: 0,
    stock_quantity: 0,
    // 购物车原始商品数量。
    shopCarNum: 0,
    // 添加商品的id数组。
    GoodsIdArray: [],
    // 商品详情页面的轮播图片数组。
    detailPicArray: [],

    cartList: JSON.parse(window.localStorage.getItem('cartList') ? window.localStorage.getItem('cartList') : '[]')
  },
  mutations: {
    getDetailId(state, id) {
      state.newsDetailId = id
    },
    addCart(state, info) {
      // var index = state.cartList.findIndex(item => item.goodsId === info.goodsId)
      var exsit = state.cartList.some(item => {
        if (item.goodsId === info.goodsId) {
          item.count += info.count
          return true
        }
      })

      if (!exsit) {
        state.cartList.push(info)
      }

      window.localStorage.setItem('cartList', JSON.stringify(state.cartList))
    },
    add(state, id) {
      var index = state.cartList.findIndex(item => item.goodsId === id)
      if (index !== -1) {
        state.cartList[index].count++
      }
      window.localStorage.setItem('cartList', JSON.stringify(state.cartList))
    },
    minus(state, id) {
      var index = state.cartList.findIndex(item => item.goodsId === id)
      if (index !== -1) {
        state.cartList[index].count--
      }
      window.localStorage.setItem('cartList', JSON.stringify(state.cartList))
    },
    delete(state, id) {
      var index = state.cartList.findIndex(item => item.goodsId === id)
      if (index !== -1) {
        state.cartList.splice(index, 1)
      }
      window.localStorage.setItem('cartList', JSON.stringify(state.cartList))
    },
    saveGoodsInfo(state, info) {
      state.goodsId = info.id
      state.title = info.title
      state.add_time = info.add_time
      state.sell_price = info.sell_price
      state.market_price = info.market_price
      state.stock_quantity = info.stock_quantity
    },
    // 添加商品的id数组。
    saveGoodsIdArray(state, currentId) {
      if (state.GoodsIdArray.indexOf(currentId === -1)) {
        state.GoodsIdArray.push(currentId)
      }
      return true
    },
    // 商品图文信息的介绍。
    saveDetailArray(state, picArray) {
      state.picintroduceArray = picArray
    },
    saveGoodsNumber(state, num) {
      state.newAddNum = num
    },
    changeGoodsNum(state, goodsNum) {
      state.shopCarNum = goodsNum
      console.log(state.shopCarNum)
    },
    // 详情页面图片轮播。
    saveSwiperArray(state, picArray) {
      state.detailPicArray = picArray
    },
    // 点击加入购物车按钮,实现购物车数量的更新.
    updateGoodsNum(state) {
      // state.shopCarNum += state.newAddNum
    }
  },
  actions: {},
  modules: {},
  getters: {
    // shopCar: (state) => {

    // }
    totalPrice(state) {
      var total = 0
      state.cartList.forEach(item => {
        total += item.count * item.sell_price
      })
      return total * 100
    }
  }
})
