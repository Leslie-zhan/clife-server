// 点赞 收藏模块接口
import myaxios from '../myAxios'
import BASEURL from '../baseUrl'
const { CLSURL } = BASEURL

const hudong = {
  // 帖子点赞api
  addLikes(params) {
    return myaxios.post(CLSURL + 'hd/addlike', params)
  },
  // 帖子收藏api
  addStar(params) {
    return myaxios.post(CLSURL + 'hd/addstar', params)
  },
  // 查询所有收藏帖子
  starCardList(params) {
    return myaxios.post(CLSURL + 'hd/starlist', params)
  },
}

export default hudong
