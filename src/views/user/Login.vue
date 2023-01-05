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
              <el-form :model="loginInfo">
                <el-form-item label="账号:" prop="name">
                  <el-input
                    v-model="loginInfo.name"
                    style="width: 80%"
                    placeholder="请输入账号"
                  />
                </el-form-item>

                <el-form-item label="密码:" prop="pwd">
                  <el-input
                    v-model="loginInfo.pwd"
                    style="width: 80%"
                    placeholder="请输入密码"
                  />
                </el-form-item>
              </el-form>

              <!-- 记住密码  忘记密码 -->
              <!-- 不加v-bind会警告 -->
              <div class="radio">
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
                  >登录</el-button
                >

                <el-button class="login-register" type="danger" v-if="!fromShow"
                  >注册</el-button
                >
              </transition>

              <!-- 切换按钮 -->
              <div id="changeButton" @click="changeFromShow">
                登录<img src="../../../public/img/login/切换mini.png" />注册
              </div>
            </div>
            <!-- <el-from v-show="fromShow">1111</el-from> -->
            <!-- <el-from v-show="!fromShow">2222</el-from> -->

            <!-- 登录注册切换按钮 -->
            <!-- <button @click="changeFromShow">登录注册切换按钮</button> -->
          </el-card>
        </transition>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      fromShow: true,
      // 记住密码
      switchValue: false,

      loginInfo: {
        name: '',
        phone: '',
        pwd: '',
      },
    }
  },
  mounted() {
    this.show = true
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
  width: 340px;
  right: 42px;
  top: 10%;
  font-weight: bold;

  // 登录注册按钮
  > .login-register {
    width: 180px;
    position: absolute;
    left: 30.5%;
    top: 70%;
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
  top: 90%;
  left: 44%;
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
