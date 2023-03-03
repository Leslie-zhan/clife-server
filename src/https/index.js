// 将所有的api请求业务封装以便调用
// 当前模块整合所有的子api模块

// 用户中心api
import userLogin from './apis/userLogin'
// 轮播图信息api
import swInfo from './apis/swiperinfo'
// 帖子模块api
import camcomInfo from './apis/camcomApi'
const httpsAPi = {
  userLogin,
  swInfo,
  camcomInfo,
}

export default httpsAPi
