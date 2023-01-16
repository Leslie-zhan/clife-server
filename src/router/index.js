import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/user/Login.vue'

Vue.use(VueRouter)

const routes = [
  // 首页是只有index的父组件，。不包含子组件
  {
    path: '/cls',
    name: 'cls',
    component: () => import('../views/index.vue'),

    children: [
      // 设置重定向，进入 ’/‘时，自动跳转到'/cls/index' ---包含子组件帖子列表页’的首页
      {
        path: 'index',
        name: '/cls/index',
        component: () => import('../views/cards/AllIndex.vue'),
      },
      //二手市场
      {
        path: 'fmarket-list',
        name: '/cls/fmarket-list',
        component: () => import('../views/fleaMarket/MarketList.vue'),
      },
      // 用户信息页面
      {
        path: 'user-setinfo',
        name: '/cls/user-setinfo',
        component: () => import('../views/user/UserInfo.vue'),
      },
    ],
  },
  // 配置重定向，进入 / 时候，默认进入'/cls/index'
  {
    path: '/',
    redirect: '/cls/index',
  },

  // 登录页
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/user/Login.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  // {
  //   path: '/vue',
  //   name: 'vue',
  //   component: HomeView,
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
