import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 用于配置全局响应式数据
  state: {
    // 存储主题颜色
    mainColor: JSON.parse(sessionStorage.getItem('mainColor')),
  },
  getters: {},

  // 修改或添加state的状态数据
  mutations: {
    // update方法用于通知Vuex{请你执行update命令  同时传参}
    updateColor(state, payload) {
      state.mainColor = payload
      // 同时更新到临时存储
      sessionStorage.setItem('mainColor', JSON.stringify(payload))
    },
  },
  actions: {},
  modules: {},
})
