<template>
  <div class="bigbox">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <h3>{{newsDetail[0].title}}</h3>
      <div class="timeclick">
        <span>发表时间：{{newsDetail[0].add_time.slice(0,10)}}</span>
        <span>点击次数：{{newsDetail[0].click}}</span>
      </div>
      <hr />
      <div v-html="newsDetail[0].content" class="newscontent"></div>
      <h4>发表评论</h4>
      <hr />
      <!-- 评论模块 -->
      <div class="newscomment">
        <van-cell-group>
          <van-field type="textarea" v-model="postcomment" placeholder="请输入评论" />
        </van-cell-group>
      </div>
      <van-button type="info" @click="putcomment" class="putcommentbtn">
        <span class="putCommentFont">提交评论</span>
      </van-button>
      <!-- 评论列表 -->
      <van-list
        :finished="finished"
        finished-text="没有更多了"
        v-for="(item,index) in commentlist.slice(0,a)"
        :key="item.id"
      >
        <div class="one">
          <span>第{{index+1}}楼</span>
          <span>{{item.add_time.slice(0,10)}}</span>
          <span>{{item.user_name}}</span>
        </div>
        <div class="two">{{item.content}}</div>
      </van-list>
      <div class="jiazaibtn">
        <van-button
          plain
          type="info"
          class="jiazai"
          v-if="a<commentlist.length"
          @click="showMore"
        >加载更多</van-button>
        <div v-else>没有更多了</div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsDetail: [],
      postcomment: '',
      pageindex: 1,
      commentlist: [],
      loading: false,
      finished: false,
      isLoading: false,
      a: 3
    }
  },
  created() {
    this.newsId = this.$route.params.newsId
    this.getDetail()
    this.getcomment()
  },
  methods: {
    async getDetail() {
      // const { data: res } = await this.$http.get(`/api/getnew/${this.newsId}`)
      const { data: res } = await this.$http.get('/api/getnew/' + this.$store.state.newsDetailId)
      // console.log(res)

      if (res.status !== 0) {
        return this.Notify({ type: 'danger', message: '获取新闻列表失败' })
      }
      this.newsDetail = res.message
      // console.log(this.newsDetail)
    },
    async getcomment() {
      const { data: res } = await this.$http.get('/api/getcomments/' + this.$store.state.newsDetailId + '?pageindex=' + this.pageindex)
      if (res.status !== 0) {
        return this.Notify({ type: 'danger', message: '获取评论数据失败' })
      }
      this.commentlist = res.message
      console.log(this.commentlist)
    },
    async putcomment() {
      const { data: res } = await this.$http.post(`/api/postcomment/` + this.$store.state.newsDetailId, { content: this.postcomment })
      if (res.status !== 0) {
        return this.Notify({ type: 'danger', message: '添加评论数据失败' })
      }
      this.getcomment()
      this.postcomment = ''
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 1000)
    },
    showMore() {
      this.a = 20
    }
  }
}
</script>

<style lang="less" scoped>
h3 {
  font-size: 14px;
  color: #1989fa;
  text-align: center;
  line-height: 30px;
}
.timeclick {
  display: flex;
  justify-content: space-between;
}
.bigbox {
  padding: 0 20px 20px 20px;
  box-sizing: border-box;
  margin-bottom: 150px;
}
span {
  font-size: 12px;
  color: #4274cc;
}
.newscontent {
  font-size: 16px;
  color: #535353;
}
.newscomment {
  border: 1px solid #9a9a9a;
}
.putcommentbtn {
  width: 100%;
  margin: 5px 0 5px 0;
}
.putCommentFont {
  color: #fff;
  font-size: 16px;
}
.one {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  color: #535353;
  background-color: #ccc;
}
.two {
  padding-left: 20px;
  height: 30px;
  font-size: 12px;
  line-height: 30px;
}
.jiazaibtn {
  text-align: center;
}
.jiazai {
  width: 200px;
}
</style>
