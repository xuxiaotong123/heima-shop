<template>
  <div>
    <!-- 添加商品输入框 -->
    <van-cell-group>
      <van-field v-model="addGoodsName" placeholder="请输入用户名" />
    </van-cell-group>

    <!-- 添加商品按钮 -->
    <van-button type="info" size="large" @click="addSearchGoods">添加商品</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 新增商品的名称
      addGoodsName: ''
    }
  },
  methods: {
    async addSearchGoods() {
      // 发送请求，添加搜索商品
      const { data: result } = await this.$http.post('/api/addproduct', { name: this.addGoodsName })
      console.log(result)
      if (result.status === 0) {
        this.addGoodsName = ''
        this.$notify({ type: 'success', message: '添加商品成功' })
      } else {
        this.$notify({ type: 'danger', message: '添加商品失败' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
body {
  background-color: #fff !important;
}
div {
  padding: 0 10px;
  box-sizing: border-box;
}

.van-cell-group {
  padding: 0;
}

.van-field {
  height: 40px;
  width: 100%;
  line-height: 40px;
  border-bottom: 1px solid #eee;
  padding-left: 10px;
  font-size: 14px;
}

.van-swipe-cell__right {
  .van-button--danger {
    height: 100%;
  }
}

.van-button {
  margin: 40px 0;
}
</style>
