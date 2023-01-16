// 封装axios

import axios from 'axios'
import qs from 'qs'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 创建axios实例
const instance = axios.create()

// 添加发送请求进度条
instance.interceptors.request.use(
  config => {
    // Do something before request is sent
    NProgress.start()
    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  }
)
// 接收到请求后停止
instance.interceptors.response.use(
  response => {
    // Do something before response is sent
    NProgress.done()
    return response
  },
  error => {
    // Do something with response error
    return Promise.reject(error)
  }
)

// get请求
const myaxios = {
  get(url, params) {
    //进度条
    // 用于发送ge请求  url:  params:请求参数(对象)
    // nProgress.done()

    return instance({
      url,
      method: 'get',
      params,
    })
  },

  // post请求 url:  params:请求参数(对象)
  post(url, params) {
    return instance({
      url,
      method: 'post',
      //  qs.stringify  将对象转为拼接字符串
      data: qs.stringify(params),
    })
  },
}

export default myaxios
