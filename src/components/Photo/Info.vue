<template>
  <div>
    <!-- 标题 -->
    <div v-for="item in xiangQing" :key="item.id">
      <h3>{{ item.title }}</h3>
      <p>
        <span class="time">发表时间:{{ item.add_time.slice(0, 10) }}</span>
        <span class="dianji">点击:{{ item.click }}</span>
      </p>
    </div>
    <hr />
    <!-- 图片 -->
    <div>
      <van-grid :column-num="3">
        <van-grid-item v-for="item in photoZu" :key="item.id">
          <van-image :src="item.src" @click="onChange(images, index)" />
        </van-grid-item>
      </van-grid>
    </div>
    <!-- content详情介绍 -->
    <div v-for="item in xiangQing" :key="item.i" v-html="item.content"></div>
    <h4>发表评论</h4>
    <hr />
    <!-- 评论模块 -->
    <div class="pinglun">
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
        v-for="(item,index) in commentlist"
        :key="item.id"
      >
        <div class="one">
          <span>第{{index+1}}楼</span>
          <span>{{item.add_time.slice(0,10)}}</span>
          <span>{{item.user_name}}</span>
        </div>
        <div class="two">{{item.content}}</div>
      </van-list>
    </div>
    <!-- <div class="jiazaibtn"> -->
    <van-button plain type="info">加载更多</van-button>
    <!-- <div v-else>没有更多了</div> -->
    <!-- </div> -->
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
export default {
  props: ['id'],
  data() {
    return {
      // show: false,
      index: 0,
      // 详情数据
      xiangQing: {},
      //   图片地址数据
      photoZu: [],
      images: [],
      pageindex: 1,
      finished: false,
      postcomment: [],
      commentlist: []
      // a: 3
    }
  },
  created() {
    this.xiangqing()
    this.tupian()
    this.getcomment()
  },
  methods: {
    // 获取图片详情
    async xiangqing() {
      // console.log(this.photoZu)

      const { data: res } = await this.$http.get('/api/getimageInfo/' + this.id)
      if (res.status !== 0) {
        return this.$toast('获取分类数据失败')
      }
      this.$toast('获取分类数据成功')
      this.xiangQing = res.message
      //   console.log(this.xiangQing)
    },
    // 获取图片地址
    async tupian() {
      const { data: res } = await this.$http.get('/api/getthumimages/' + this.id)
      this.photoZu = res.message
      this.photoZu.forEach(i => {
        // console.log(i.src)
        this.images.push(i.src)
        // console.log(this.images)
      })
      // console.log(this.photoZu)
    },
    onChange(images, index) {
      ImagePreview({
        images: this.images,
        startPosition: this.index
      })
    },
    async getcomment() {
      const { data: res } = await this.$http.get('/api/getcomments/' + this.id + '?pageindex=' + this.pageindex)
      if (res.status !== 0) {
        return this.Notify({ type: 'danger', message: '获取评论数据失败' })
      }
      this.commentlist = res.message
      console.log(this.commentlist)
    },
    async putcomment() {
      const { data: res } = await this.$http.post(`/api/postcomment/` + this.id, { content: this.postcomment })
      if (res.status !== 0) {
        return this.Notify({ type: 'danger', message: '添加评论数据失败' })
      }
      this.getcomment()
      this.postcomment = ''
    }
    // showMore() {
    //   this.a = 20
    // }
  }
}
</script>

<style lang="less" scoped>
h3 {
  text-align: center;
  font-size: 15px;
  color: #26a2ff;
}
p {
  overflow: hidden;
}
.time {
  float: left;
  color: gray;
  font-size: 13px;
}
.dianji {
  float: right;
  color: gray;
  font-size: 13px;
}
.newscomment {
  border: 1px solid #9a9a9a;
}
.putcommentbtn {
  width: 100%;
  margin-bottom: 5px;
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
.van-field {
  height: 50px;
}
.jiazaibtn {
  text-align: center;
}
// .jiazai {
//   width: 200px;
// }
</style>
