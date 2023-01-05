import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// Element组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// use()方法将组件库所有组件都引入当前项目的Vue对象中   便于随时随地使用组件库
// 当Vue.use()执行时  ，Vue会寻找Element的核心js文件(index.js),然后执行
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
