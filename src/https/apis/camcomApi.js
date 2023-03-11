// 帖子模块接口
import myaxios from '../myAxios'
import BASEURL from '../baseUrl'
const { CLSURL } = BASEURL

const camcomInfo = {
  // 发布新帖子
  addNewCard(params) {
    return myaxios.post(CLSURL + 'cam/add-newcard', params)
  },
  // 随机五个帖子数据
  upCamcom(params) {
    return myaxios.post(CLSURL + 'cam/upcamcom', params)
  },
  // 根据帖子id查询相关信息
  theCardId(params) {
    return myaxios.post(CLSURL + 'cam/cardid-upcamcom', params)
  },

  // 根据 帖子类型 随机五个帖子数据
  typeUpCamcom(params) {
    return myaxios.post(CLSURL + 'cam/type-upcamcom', params)
  },

  // 根据 搜索内容 随机五个帖子数据
  searchUpCamcom(params) {
    return myaxios.post(CLSURL + 'cam/search-upcamcom', params)
  },

  // 根据发帖人加载对应粉丝量，发帖量消息，获赞量消息
  makeCardInfo(params) {
    return myaxios.post(CLSURL + 'cam/makeinfo-detail', params)
  },

  // 取消关注
  qxFollow(params) {
    return myaxios.post(CLSURL + 'cam/cencel--follow', params)
  },
  // 进行关注
  toFollow(params) {
    return myaxios.post(CLSURL + 'cam/to--follow', params)
  },

  // 一级评论表数据
  onePl(params) {
    return myaxios.post(CLSURL + 'cam/one--pl', params)
  },

  // 查询帖子回复数量
  howManyCamcom(params) {
    return myaxios.post(CLSURL + 'cam/howmany--camcom', params)
  },

  // 根据id查询一级评论表的所有二级评论
  oneAllTwoPl(params) {
    return myaxios.post(CLSURL + 'cam/one--twopl', params)
  },

  // 发表帖子一级评论接口
  addYjPl(params) {
    return myaxios.post(CLSURL + 'cam/add--pl', params)
  },
  // 添加二级评论接口
  addEjPl(params) {
    return myaxios.post(CLSURL + 'cam/add-one-twopl', params)
  },
}

export default camcomInfo
