<template>
  <div class="comment_box">
    <h3>发表评论</h3>
    <textarea name="" id="" cols="30" rows="10" v-model="commentContent"></textarea>
    <van-button type="info" @click="publishComment">发表评论</van-button>
    <van-button plain type="danger" @click="loadMore">加载更多</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentContent: ''
    }
  },
  methods: {
    publishComment() {
      this.$remind.fail('服务器请求失败！')
      this.commentContent = ''
    },
    loadMore() {
      this.$remind.fail('服务器请求失败！')
    }
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.comment_box {
  box-sizing: border-box;
  padding: 10px;
  h3 {
    border-bottom: 1px solid #000;
    padding-bottom: 15px;
  }
}
textarea {
  width: 100%;
  height: 100px;
  margin-top: 10px;
  border: 1px solid #ccc;
}
.van-button {
  width: 100%;
  margin-top: 15px;
}
</style>
