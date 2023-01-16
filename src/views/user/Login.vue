<template>
  <div id="loginPage">
    <el-row>
      <el-col :span="12" style="padding: 18vh">
        <h2 style="width: 560px; text-align: center; margin-bottom: 12px">
          校园生活服务系统
        </h2>

        <!-- 动画标签 -->
        <transition name="el-zoom-in-center">
          <!-- 卡片 -->
          <el-card v-show="show" class="card transition-box" shadow="hover">
            <!-- logo -->
            <el-image
              class="logoImg"
              :src="require('../../../public/img/login/logo.jpeg')"
            />
            <div class="toFrom">
              <!-- 登录注册表单 -->
              <el-form :model="loginInfo" :rules="fromrules" ref="rulesFrom">
                <el-form-item label="账号:" prop="phone">
                  <el-input
                    v-model="loginInfo.phone"
                    style="width: 80%"
                    placeholder="请输入账号"
                    maxlength="11"
                  />
                </el-form-item>

                <el-form-item label="密码:" prop="pwd">
                  <el-input
                    v-model="loginInfo.pwd"
                    style="width: 80%"
                    placeholder="请输入密码"
                    maxlength="16"
                    show-password
                  />
                </el-form-item>

                <!-- 用户名 -->
                <el-form-item prop="uname" label="昵称：" v-if="!fromShow">
                  <el-input
                    v-model="loginInfo.uname"
                    placeholder="请输入昵称"
                    style="width: 80%"
                    maxlength="8"
                  />
                </el-form-item>
              </el-form>

              <!-- 记住密码  忘记密码 -->
              <!-- 不加v-bind会警告 -->
              <!-- 
                  @change="remberPwd($event)" 数值改变事件
               -->
              <div class="radio" v-if="fromShow">
                <el-switch
                  class="switch"
                  v-model="switchValue"
                  active-color="#13ce66"
                  inactive-color="lightgray"
                  v-bind:width="36"
                  @change="remberPwd($event)"
                  inactive-text="记住密码"
                >
                </el-switch>

                <!-- 忘记密码 跳转至忘记密码页面 -->
                <span class="wjmm" @click="$router.push('/')">忘记密码?</span>
              </div>
              <!-- 登录注册按钮 -->
              <!-- vue自带过度动画 -->
              <transition name="fade">
                <el-button
                  class="login-register"
                  type="primary"
                  round
                  v-if="fromShow"
                  @click="toLoginOrRegister"
                  >登录</el-button
                >

                <el-button
                  class="login-register"
                  type="danger"
                  v-if="!fromShow"
                  @click="toLoginOrRegister"
                  >注册</el-button
                >
              </transition>

              <!-- 切换按钮 -->
              <div id="changeButton" @click="changeFromShow">
                登录<img src="../../../public/img/login/切换mini.png" />注册
              </div>
            </div>
          </el-card>
        </transition>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BASEURL from '../../https/baseUrl'
const { CLSURL } = BASEURL
export default {
  data() {
    return {
      // element变量：控制动画
      show: false,
      // 控制登录注册按钮显示以及接口
      fromShow: true,
      // 记住密码
      switchValue: false,

      loginInfo: {
        uname: '',
        phone: '13263017708',
        pwd: 'cls123456',
      },
      fromrules: {
        phone: [
          { required: true, message: '账号(手机号)不能为空', trigger: 'blur' },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号码格式非法',
            trigger: 'blur',
          },
        ],
        pwd: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
            message: '密码必须为8-16位、且包含数、字母',
            trigger: 'blur',
          },
        ],
        uname: [
          { required: true, message: '昵称不能为空', trigger: 'blur' },
          {
            pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]{4,8}$/,
            message: '昵称必须为4-8位,只允许包含中文、大小写字母',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  mounted() {
    this.show = true

    // this.$https.userLogin.qsaUserid({ userid: 643201 }).then(res => {
    //   console.log(res.data)
    // })
  },
  methods: {
    // 控制显示、切换---登录\注册
    changeFromShow() {
      this.fromShow = this.fromShow ? false : true
    },

    //记住密码开关事件
    remberPwd(val) {
      if (val) {
        console.log('真', this.switchValue)
      } else {
        console.log('假', this.switchValue)
      }
    },
    // 登录注册方法
    toLoginOrRegister() {
      // element表单提供的rules验证方法
      this.$refs.rulesFrom.validate(valid => {
        if (valid) {
          if (this.fromShow) {
            localStorage.setItem('ser', JSON.stringify({ xxx: '111' }))

            // 登录请求
            this.$https.userLogin.toLogin(this.loginInfo).then(res => {
              console.log('登录验证', res)
              if (res.data.code == 200) {
                this.$message({
                  message: '欢迎回来：' + res.data.data[0].uname,
                  type: 'success',
                  center: true,
                  showClose: true,
                  duration: 1600,
                })
                // 存储用户信息---需要转为json
                sessionStorage.setItem(
                  'clsUser',
                  JSON.stringify(res.data.data[0])
                )

                this.$router.push('/cls/index')
                return
              }
              if (res.data.code == 301) {
                this.$message({
                  message: '登陆失败：' + res.data.msg,
                  type: 'error',
                  center: true,
                  showClose: true,
                  duration: 1600,
                })
                return
              }
            })
          } else {
            // 注册请求
            this.$https.userLogin.toRegister(this.loginInfo).then(res => {
              console.log(res.data)
              if (res.data.code != 200) {
                this.$message({
                  message: '注册错误:' + res.data.msg,
                  type: 'error',
                  center: true,
                  duration: 1200,
                })
                return
              }
              if (res.data.code == 200) {
                this.$message({
                  message: '注册成功',
                  type: 'success',
                  center: true,
                  duration: 1600,
                })
                this.fromShow = true
              }
            })
          }
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
// 背景颜色
#loginPage {
  height: 100vh;
  background-image: linear-gradient(125deg, #fbeaff, #e2f4fb, #fefedf, #e2f4fb);
  background-size: 500%;
  animation: animate 20s infinite;
  display: flex;
  justify-content: center;
  // align-items: center;
}
// 背景动画
@keyframes animate {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
// element内置动画
.transition-box {
  text-align: center;
  box-sizing: border-box;
}

//卡片
.card {
  width: 560px;
  height: 300px;
  position: relative;
}
// logo
.logoImg {
  width: 140px;
  margin-left: -420px;
  margin-top: 64px;
  border-right: 1px solid gainsboro;
}
// 表单区域
.toFrom {
  position: absolute;
  height: 240px;
  width: 360px;
  right: 42px;
  top: 10%;
  font-weight: bold;

  // 登录注册按钮
  > .login-register {
    width: 180px;
    position: absolute;
    left: 30.5%;
    top: 78%;
  }
}
// 切换登录注册按钮
#changeButton {
  text-align: center;
  height: 24px;
  width: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 98%;
  left: 43.5%;
  border-radius: 16px;
  border: 3px grey solid;
  font-weight: 500;
  background-color: whitesmoke;
  font-size: 14px;
}
#changeButton:active {
  opacity: 0.7;
}
// 记住密码  忘记密码区域
.radio {
  position: relative;
  > .switch {
    position: absolute;
    left: 20%;
    color: gray !important;
  }
  > .wjmm {
    position: absolute;
    left: 75%;
    font-weight: 100;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    cursor: pointer;
    color: lightgrey;
  }
}
</style>
