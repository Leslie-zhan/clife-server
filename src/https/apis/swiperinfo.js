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
}

export default swInfo
