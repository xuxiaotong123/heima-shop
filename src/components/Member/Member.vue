<template>
  <div>
    <!-- 头部信息 -->
    <div class="top">
      <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="" class="blur" />
      <van-image round width="7rem" height="7rem" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
      <span>钻石会员</span>
    </div>
    <!-- 头像下方信息条 -->
    <div class="middle">
      <van-list>
        <van-cell :border="false" title="待支付" icon="bill" />
        <van-cell :border="false" title="待收货" icon="send-gift" />
        <van-cell :border="false" title="全部订单" icon="column" class="last" />
      </van-list>
    </div>

    <van-divider :style="{ color: '#aaa', borderColor: '#aaa', padding: '0 5px', margin: '5px 0' }"></van-divider>
    <!-- 中间详细信息区 -->
    <div class="message">
      <van-list>
        <van-cell title="我的收藏" icon="invition" />
        <van-cell title="我的购物车" icon="shopping-cart" @click="goShopCar" />
        <van-cell title="会员等级" icon="diamond" />
        <van-cell title="黑马钱包" icon="card" />
        <van-cell title="现金红包" icon="gold-coin" />
        <van-cell title="配送地址" icon="location" @click="goLocation" />
      </van-list>
    </div>
    <!-- 底部手机绑定 -->
    <van-swipe-cell>
      <van-cell :border="false" title="手机绑定" icon="phone" />
    </van-swipe-cell>

    <!-- 退出登录按钮 -->
    <van-button type="info">退出登录</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    }
  },
  methods: {
    goShopCar() {
      this.$router.push('/cart')
    },
    // 添加配送地址
    goLocation() {
      this.$router.push('/address')
    }
  }
}
</script>

<style lang="less" scoped>
.top {
  background-color: rgba(217, 250, 247, 0.5);
  height: 170px;
  width: 100%;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  .van-image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -65%);
    border: 1px solid #ccc;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  }
  span {
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translate(-50%, 0);
    color: #fff;
  }
}

.van-list {
  padding: 0 15px;
  box-sizing: border-box;
  width: 100%;
}
.van-cell__left-icon {
  margin-right: 10px;
  color: #555;
  font-size: 18px;
}

.van-cell {
  border-bottom: 1px solid #ccc;
}

.van-swipe-cell {
  margin-top: 15px;
  padding: 0 15px;
  background-color: #fff;
  .van-cell {
    border: none;
  }
}

.van-button {
  width: 92%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 25px;
}

.middle {
  .van-list {
    padding: 0;
    .van-cell {
      float: left;
      width: 33.33%;
      border-bottom: none;
      box-sizing: border-box;
      padding: 10px 0px 10px 30px;
      .van-cell__title {
        border-right: 1px solid #ccc;
      }
    }
  }

  .last {
    border-right: none;
  }

  .van-cell:last-child .van-cell__title {
    background-color: #000;
  }
}

.blur {
  // 背景模糊处理
  filter: blur(10px);
}
.message {
  height: 100%;
  background-color: #fff;
}
</style>
