<template>
  <div class="introduce_box">
    <!-- {{ this.$store.state.picintroduceArray }} -->
    <!-- <pre> {{ picintroduceArray }}</pre> -->
    <div class="header_goodsname" v-html="saveDetailArray[0].title"></div>
    <div class="detailTextPic" v-html="saveDetailArray[0].content"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      saveDetailArray: JSON.parse(window.localStorage.getItem('saveDetailArray'))
    }
  },
  computed: {
    ...mapState(['picintroduceArray'])
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/picIntroduce.css';
.introduce_box {
  width: 100%;
  // overflow: hidden;
  box-sizing: border-box;
  padding: 10px;
}
.header_goodsname {
  // height: 30px;
  color: blue;
  padding-bottom: 5px;
  // line-height: 30px;
  text-align: center;
  border-bottom: 1px solid #ccc;
  font-weight: 700;
  font-size: 18px;
}
</style>
