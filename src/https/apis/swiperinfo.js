// 轮播图信息查询api

import myaxios from '../myAxios'
// 引入url前缀
// 引入URL前缀
import BASEURL from '../baseUrl'
const { CLSURL } = BASEURL

const swInfo = {
  // 首页快速链接轮播图信息api
  indexSwInfo(params) {
    return myaxios.get(CLSURL + 'swinfo/querylink', params)
  },

  // 每日一句古诗词接口
  // everyday(params) {
  //   return myaxios.get(`${CLSURL}dailyword/?date=${params}`, params)
  // },
  everyday(params) {
    return myaxios.get('https://v1.jinrishici.com/all.json', params)
  },
}

export default swInfo
