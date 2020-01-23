<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- <p>刷新次数: {{ count }}</p> -->
      <van-card
        v-for="item in newsList"
        :key="item.id"
        :title="item.title"
        :thumb="item.img_url"
        @click="toDetail(item.id)"
      >
        <div slot="bottom" class="newsbuttom">
          <span>发表时间：{{item.add_time.slice(0,10)}}</span>
          <span>点击次数{{item.click}}</span>
        </div>
      </van-card>
      <!-- <p>刷新成功</p> -->
    </van-pull-refresh>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newsList: [],
      isLoading: false
    }
  },
  created() {
    this.getNewsList()
  },
  methods: {
    async getNewsList() {
      const { data: res } = await this.$http.get('/api/getnewslist')
      // console.log(res)
      if (res.status !== 0) {
        return this.Notify({ type: 'danger', message: '获取新闻列表失败' })
      }
      var rows = res.message
      rows.sort(function(a, b) {
        return Date.parse(b.add_time) - Date.parse(a.add_time)
      })
      this.newsList = rows
      // this.newsList = res.message
    },
    toDetail(id) {
      // this.$router.push({ name: 'detail', params: { newsId: id } })
      this.$router.push(`/news/detail/${id}`)
      this.$store.commit('getDetailId', id)
      // console.log(id)
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped>
.van-card__title {
  font-size: 14px;
  font-weight: 800 !important;
}
.newsbuttom {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #23aaf2;
}
</style>
