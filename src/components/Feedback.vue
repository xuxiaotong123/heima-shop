<template>
  <div class="biggbox">
    <!-- 提交留言反馈模块 -->
    <div class="mesput">
      <h2>留言反馈</h2>
    </div>
    <van-notice-bar
      color="#1989fa"
      background="#ecf9ff"
      left-icon="info-o"
    >提供联系方式，工作人员将优先处理您的反馈,您宝贵的意见和建议， 你呢1我们会认真听取哒~~~</van-notice-bar>
    <van-cell-group>
      <div tipborder>
        <van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请写下您宝贵的意见和建议"
          show-word-limit
        />
      </div>
      <div class="lianxifangshi">
        <span>联系方式</span>
      </div>
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="username" placeholder="请输入用户名" />
      <van-field v-model="phone" placeholder="请输入手机号" />
    </van-cell-group>
    <van-button type="info" @click="putbtn">
      提交
      <van-icon name="edit" />
    </van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: [],
      username: '',
      phone: ''
    }
  },
  created() {},
  methods: {
    putbtn() {
      this.$toast('提交成功')
      this.message = ''
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../assets/feedback.css');

.mesput {
  text-align: center;
}
.tipborder {
  border: 2px solid #999 !important;
}
.lianxifangshi {
  background-color: #f8fcfd;
  height: 50px;
  line-height: 50px;
  padding-left: 30px;
}
.van-button {
  width: 100%;
}
// .biggbox {
//   padding: 0 10px 0 10px;
// }
</style>
