import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugin/vant.js'
import './assets/font/iconfont.css'
import axios from 'axios'

Vue.config.productionTip = false

// axios.defaults.baseURL = 'http://www.liulongbin.top:3005/'
axios.defaults.baseURL = 'http://127.0.0.1:8082/'
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
