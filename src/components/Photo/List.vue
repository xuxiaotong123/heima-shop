<template>
  <div>
    <van-tabs @change="getId">
      <van-tab v-for="item in queryInfo" :title="item.title" :key="item.id">
      </van-tab>
      <div
        v-for="item in photoList"
        :title="item.title"
        v-lazy:background-image="item.img_url"
        :key="item.id"
        class="tupian"
        @click="changePage(item)"
      >
        <p>{{ item.title }}</p>
        <span>{{ item.zhaiyao }}</span>
      </div>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        id: '',
        title: ''
      },
      id: 0,
      photoList: []
    }
  },
  created() {
    this.getPhotoData()
    this.getPhotoList(0)
  },
  methods: {
    // 获取标签分类数据
    async getPhotoData() {
      const { data: res } = await this.$http.get('/api/getimgcategory', {
        params: this.queryInfo
      })
      if (res.status !== 0) {
        return this.$toast('获取分类数据失败')
      }
      this.queryInfo = res.message
      // console.log(this.queryInfo)
      // 添加全部模块
      this.queryInfo.unshift({ title: '全部', id: 0 })
    },
    getId(index) {
      this.id = this.queryInfo[index].id
      // console.log(this.id)
      this.getPhotoList(this.id)
    },
    // 获取图片懒加载数据
    async getPhotoList(id) {
      // console.log(item)
      const { data: res } = await this.$http.get(`/api/getimages/${this.id}`)
      if (res.status !== 0) {
        return this.$toast('获取数据失败')
      }
      this.photoList = res.message
      console.log(this.photoList)
    },
    // 点击进入详情
    changePage(item) {
      console.log(item)
      this.$router.push(`/photo/info/${item.id}`)
    }
  },
  computed: {}
}
</script>

<style lang="less" scoped>
.tupian {
  height: 300px;
  margin: 10px 10px 10px 10px;
  background-size: cover;
  background-position: center 0 top 50%;
  border-radius: 10px;
  position: relative;
  p {
    position: absolute;
    margin-top: 58%;
    margin-left: 5px;
    font-size: 12px;
    color: white;
  }
  span {
    position: absolute;
    margin-top: 63%;
    margin-left: 5px;
    font-size: 12px;
    color: white;
  }
}
</style>
