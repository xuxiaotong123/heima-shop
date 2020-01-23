import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Photo from '../components/Photo/List.vue'
import Info from '../components/Photo/Info.vue'
import Newslist from '../components/news/Newslist.vue'
import Detail from '../components/news/Detail.vue'
import shopCar from '../components/shopCar/shopCar.vue'
import Search from '../components/Search/Search.vue'
import addGoods from '../components/Search/addGoods.vue'
import Goodslist from '../components/goodsList/GoodsList.vue'
import GoodsDetail from '../components/goodsList/GoodsDetail.vue'
import GoodsIntroduce from '../components/goodsList/GoodsIntroduce.vue'
import GoodsComment from '../components/goodsList/GoodsComment.vue'
import Address from '../components/Member/Address.vue'
import Contact from '../components/Contact.vue'
import Feedback from '../components/Feedback.vue'
import Member from '../components/Member/Member.vue'
import addressEdit from '../components/Member/addressEdit.vue'
import ProfessionVideo from '../components/video/Video.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/news', component: Newslist },
  { path: '/news/detail/:newsId', component: Detail },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/photo/list',
    component: Photo
  },
  {
    path: '/photo/Info/:id',
    component: Info,
    props: true
  },
  {
    path: '/cart',
    component: shopCar
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/addgoods',
    component: addGoods
  },
  {
    path: '/goodslist',
    component: Goodslist
  },
  {
    path: '/goodsdetail/:id',
    component: GoodsDetail
  },
  {
    path: '/goodsintroduce',
    component: GoodsIntroduce
  },
  {
    path: '/goodcomment',
    component: GoodsComment
  },
  {
    path: '/contact',
    component: Contact
  },
  {
    path: '/feedback',
    component: Feedback
  },
  { path: '/member', component: Member },
  {
    path: '/professionvideo',
    component: ProfessionVideo
  },
  { path: '/address', component: Address },
  { path: '/addressEdit', component: addressEdit }
]

const router = new VueRouter({
  routes
})

export default router
