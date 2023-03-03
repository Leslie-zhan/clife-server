import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 将api模块请求变成全局变量
import httpsAPi from './https/index'
// Element组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入swiper css
import 'swiper/dist/js/swiper'
import 'swiper/dist/css/swiper.css'

// 全局共享统一变量(非响应式)
import clsGlobla from './globla'

// use()方法将组件库所有组件都引入当前项目的Vue对象中   便于随时随地使用组件库
// 当Vue.use()执行时  ，Vue会寻找Element的核心js文件(index.js),然后执行
Vue.use(ElementUI)

// 事件日期过滤器
import moment from 'moment/moment'
// 引入中文格式
import 'moment/locale/zh-cn'
Vue.filter('changeTime', function (data, formatStr) {
  // 转换为中文格式
  moment.locale()
  return moment(data).format(formatStr)
})

// 将httpsApi放入Vue原型  变为全局变量
Vue.prototype.$https = httpsAPi
// 将全局共享统一变量放入Vue原型
Vue.prototype.$clsGlobla = clsGlobla
// 将上传文件地址前缀放入原型变量
Vue.prototype.$uploadUrl = 'http://localhost:9432/'

Vue.config.productionTip = false

// 引入自定义全局css
import './assets/css/base.scss'

new Vue({
  router,
  store,
  data() {
    return {
      gloColor: '#dcdcdc',
    }
  },
  render: h => h(App),
}).$mount('#app')
