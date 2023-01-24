import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 用于配置全局响应式数据
  state: {
    // 存储主题颜色
    mainColor: JSON.parse(sessionStorage.getItem('mainColor')),
    // 存储反差主题色
    coverColor: JSON.parse(sessionStorage.getItem('coverColor')),
    // 存储用户信息
    clsInfo: JSON.parse(sessionStorage.getItem('clsUser')),
  },
  getters: {},

  // 修改或添加state的状态数据
  mutations: {
    // update方法用于通知Vuex{请你执行update命令  同时传参}
    // 主题色
    updateColor(state, payload) {
      state.mainColor = payload
      // 同时更新到临时存储
      sessionStorage.setItem('mainColor', JSON.stringify(payload))
    },

    // 反差主题色
    updateCoverse(state, payload) {
      state.coverColor = payload
      sessionStorage.setItem('coverColor', JSON.stringify(payload))
    },

    updateInfo(state, payload) {
      state.clsInfo = payload
      // 更新到临时存储
      sessionStorage.setItem('clsUser', JSON.stringify(payload))
    },
  },
  actions: {},
  modules: {},
})
