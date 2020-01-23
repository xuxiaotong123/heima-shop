<template>
  <div>
    <!-- 下面的所有的v-show有关的变量都是控制相应的控件的显示与隐藏 -->
    <!-- 顶部区域 -->
    <header class="header">
      <span class="leftBack" @click="onClickLeft" v-show="left">
        <van-icon name="arrow-left" />
        返回
      </span>
      <span class="title">黑马程序员vant</span>
      <span class="add" @click="onClickRight" v-show="right">添加</span>
    </header>
    <!-- 中间的区域 -->
    <router-view></router-view>
    <!-- 底部区域 -->
    <van-tabbar v-model="active" route v-show="footer">
      <van-tabbar-item to="/home">
        <span>首页</span>
        <i slot="icon" class="iconfont">&#xe626;</i>
      </van-tabbar-item>
      <van-tabbar-item to="/member">
        <span>会员</span>
        <i slot="icon" class="iconfont">&#xeb8a;</i>
      </van-tabbar-item>
      <van-tabbar-item to="/cart" icon="cart-o" :info="getGoodsNum()">购物车</van-tabbar-item>
      <van-tabbar-item to="/search" icon="search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      left: false,
      right: false,
      footer: true
    }
  },
  created() {
    this.routeChange()
    const data = localStorage.getItem('saveGoodsIdArray')
    if (data === null) {
      this.$store.state.GoodsIdArray = []
    } else {
      this.$store.state.GoodsIdArray = JSON.parse(localStorage.getItem('saveGoodsIdArray'))
    }
  },
  mounted() {
    this.getGoodsNum()
  },
  watch: {
    $route(now, old) {
      // 监控路由变换，控制返回按钮的显示
      if (now.path === '/home') {
        this.left = false
      } else {
        this.left = true
      }

      if (now.path === '/search') {
        this.right = true
      } else {
        this.right = false
      }

      if (now.path === '/cart') {
        this.footer = false
      } else {
        this.footer = true
      }
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {
      this.$router.push('/addgoods')
    },
    routeChange() {
      if (this.$route.path !== '/home') {
        this.left = true
      } else {
        this.left = false
      }

      if (this.$route.path === '/search') {
        this.right = true
      } else {
        this.right = false
      }

      if (this.$route.path === '/cart') {
        this.footer = false
      } else {
        this.footer = true
      }
    },
    getGoodsNum() {
      // return this.$store.state.shopCarNum
      return window.localStorage.getItem('shopnum')
      // return window.localStorage.getItem('iconNum')
      // // console.log(num)
      // // return this.$store.commit('changeGoodsNum', num)
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  position: relative;
  height: 40px;
  width: 100%;
  background-color: #1989fa;
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  .title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .leftBack {
    float: left;
    margin-left: 10px;
  }
  .add {
    float: right;
    margin-right: 10px;
  }

  .van-icon {
    vertical-align: middle;
  }
}
</style>
