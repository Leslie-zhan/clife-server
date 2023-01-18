// 用户登录、注册api
import myaxios from '../myAxios'
// 引入URL前缀
import BASEURL from '../baseUrl'
const { CLSURL } = BASEURL

const userLogin = {
  // 登录api
  toLogin(params) {
    return myaxios.post(CLSURL + 'user/login', params)
  },
  // 通过用户ipone查询用户信息
  qsaPhone(params) {
    return myaxios.post(CLSURL + 'user/phoneinfo', params)
  },
  // 通过用户id查询用户信息
  qsaUserid(params) {
    return myaxios.post(CLSURL + 'user/infos', params)
  },
  // 注册api
  toRegister(params) {
    return myaxios.post(CLSURL + 'user/register', params)
  },
  // 修改密码接口
  toSetPwd(params) {
    return myaxios.post(CLSURL + 'user/setpwd', params)
  },
  // 修改个人信息接口
  toSetInfo(params) {
    return myaxios.post(CLSURL + 'user/setinfo', params)
  },
}

export default userLogin
