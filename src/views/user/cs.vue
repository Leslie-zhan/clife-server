<template>
  <div>
    <button @click="zc">注册</button> <button @click="zc1">注册1</button>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  // 测试 自己的毕业设计项目
  mounted() {
    // 查询用户信息
    // let params = qs.stringify({ userid: 643201 })
    // let url = 'http://localhost:9432/user/infos'
    // axios.post(url, params).then(res => {
    //   console.log(res)
    // })
    console.log(1)
    //同时查询电话  用户名
    let params1 = qs.stringify({ uname: '阿飞', phone: '13263017701' })
    let url1 = 'http://localhost:9432/user/moreinfos'
    axios.post(url1, params1).then(res => {
      console.log(res)
    })
  },
  methods: {
    zc() {
      let params1 = qs.stringify({
        userid: '',
        uname: 'af04',
        phone: '13263017711',
        email: '2434@123',
        sex: '1',
        detail: 'sefsfsfff',
      })
      let url1 = 'http://localhost:9432/user/registers'
      axios.post(url1, params1).then(res => {
        console.log(res)
      })
    },
    zc1() {
      let params1 = qs.stringify({
        userid: '',
        uname: 'af205',
        phone: '13263017714',
        email: '2434@123',
        sex: '1',
        detail: 'sefsfsfff',
      })
      let url1 = 'http://localhost:9432/user/register'
      axios.post(url1, params1).then(res => {
        console.log('结果：', res)
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
