// 帖子模块接口
import myaxios from '../myAxios'
import BASEURL from '../baseUrl'
const { CLSURL } = BASEURL

const camcomInfo = {
  // 随机五个帖子数据
  upCamcom(params) {
    return myaxios.post(CLSURL + 'cam/upcamcom', params)
  },

  // 根据 帖子类型 随机五个帖子数据
  typeUpCamcom(params) {
    return myaxios.post(CLSURL + 'cam/type-upcamcom', params)
  },

  // 根据 搜索内容 随机五个帖子数据
  searchUpCamcom(params) {
    return myaxios.post(CLSURL + 'cam/search-upcamcom', params)
  },
}

export default camcomInfo
