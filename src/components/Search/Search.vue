<template>
  <div>
    <!-- 搜索区域 -->
    <form action="/">
      <van-search v-model="searchValue" placeholder="请输入搜索关键词" show-action @search="onSearch" @cancel="onCancel" />
    </form>

    <!-- 中部搜索历史区域 -->
    <div class="searchHistory" :class="searchList.length === 0 ? 'show' : 'hide'">
      <div class="searchTab">
        <span>搜索历史</span>
        <van-icon name="delete" @click="delSearchHistory" />
      </div>
      <div class="searchBottom">
        <!-- 暂无搜索数据区域 -->
        <div class="none" :class="this.searchHistoryList.length === 0 ? 'show' : 'hide'">
          <!-- 若有搜索历史，则该区域隐藏，否则就显示 -->
          <van-divider>暂无搜索历史</van-divider>
        </div>
      </div>
      <div class="searchHistoryArea" :class="this.searchHistoryList.length === 0 ? 'hide' : 'show'">
        <van-tag v-for="(item, index) in searchHistoryList" :key="index">{{ item }}</van-tag>
      </div>
    </div>

    <!-- 中部搜索列表区域 -->
    <van-swipe-cell v-for="item in searchList" :key="item.id" :class="searchList.length === 0 ? 'hide' : 'show'">
      <van-cell :border="false" :title="item.name" :value="'商品上架时间：' + item.ctime" />
      <template slot="right">
        <van-button square type="danger" text="删除" @click="delGoods(item.id)" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchValue: '',
      // 存储搜索请求数据的数组
      searchList: [],
      // 存储搜索历史数据的数组
      searchHistoryList: [],
      // 点击取消按钮操作时，保存输入框中内容的桥梁
      searchValue2: ''
    }
  },
  created() {
    var data = sessionStorage.getItem('searchHistory')
    if (data === null) {
      this.searchHistoryList = []
    } else {
      this.searchHistoryList = JSON.parse(data)
    }
  },
  methods: {
    async onSearch() {
      // 判断用户输入的内容是否为空，若不为空就发送请求，若为空就弹出提示框
      if (this.searchValue.trim().length === 0) {
        return this.$toast('输入的内容不能为空')
      } else {
        // 用户输入的内容不为空
        this.searchValue2 = this.searchValue
        const { data: result } = await this.$http.get('/api/getprodlist')
        if (result.status === 0) {
          this.searchList = result.message
          this.searchHistoryList.push(this.searchValue2)
          var data = JSON.stringify(this.searchHistoryList)
          sessionStorage.setItem('searchHistory', data)
        } else {
          // 数据获取失败
          return this.$toast.fail('获取数据失败')
        }
      }
    },
    onCancel() {
      if (this.searchValue2.trim().length !== 0) {
        // console.log(this.searchHistoryList)
        this.searchList.length = 0
        this.searchValue2 = ''
      }
      // console.log(this.searchHistoryList)
    },
    // 删除全部搜索历史
    delSearchHistory() {
      this.searchHistoryList = []
      window.sessionStorage.clear()
    },
    // 删除搜索列表里面的商品
    async delGoods(id) {
      // 发送请求删除商品
      const res = await this.$dialog
        .confirm({
          message: '确认删除该商品？'
        })
        .catch(err => err)
      if (res === 'confirm') {
        // 发送请求，删除商品
        const { data: result } = await this.$http.get('/api/delproduct/' + id)
        if (result.status === 0) {
          const index = this.searchList.findIndex(function(item) {
            return item.id === id
          })
          this.searchList.splice(index, 1)
          this.$notify({ type: 'success', message: '商品删除成功' })
        } else {
          return this.$notify({ type: 'danger', message: '商品删除失败' })
        }
      } else {
        return this.$notify({ type: 'warning', message: '取消删除' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-search {
  padding: 10px 5px;
}

.searchHistory {
  margin: 10px;
  .searchTab {
    span {
      height: 20px;
    }
    .van-icon {
      float: right;
      line-height: 20px;
      vertical-align: middle;
    }
  }
  .searchBottom {
    padding: 15px;
  }
}

.van-tag {
  margin: 8px;
}

.show {
  display: block;
}

.hide {
  display: none;
}
</style>
