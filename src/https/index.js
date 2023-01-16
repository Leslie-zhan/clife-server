// 将所有的api请求业务封装以便调用
// 当前模块整合所有的子api模块

import axios from 'axios'
import userLogin from './apis/userLogin'
const httpsAPi = {
  userLogin,
}

export default httpsAPi
