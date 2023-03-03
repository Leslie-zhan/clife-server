// 帖子模块接口
import myaxios from '../myAxios'
import BASEURL from '../baseUrl'
const { CLSURL } = BASEURL

const camcomInfo = {
  // 随机五个帖子数据
  upCamcom(params) {
    return myaxios.post(CLSURL + 'cam/upcamcom', params)
  },
}

export default camcomInfo
