<template>
  <div>
    <el-skeleton :animated="true" :throttle="600" :loading="skeletonLoading" />
    <el-skeleton :animated="true" :throttle="600" :loading="skeletonLoading" />
    <el-skeleton :animated="true" :throttle="600" :loading="skeletonLoading" />
    <el-skeleton :animated="true" :throttle="600" :loading="skeletonLoading" />
    <el-skeleton :animated="true" :throttle="600" :loading="skeletonLoading" />

    <!-- router:开启路由跳转模式 -->
    <el-menu
      router
      :default-active="$route.path"
      mode="horizontal"
      :color="indexCoverColor"
      :background-color="indexThemeColor"
      v-if="!skeletonLoading"
      class="mainNav"
      id="Topmenu"
    >
      <!-- 
        style="text-shadow: 0.5em 0.5em 0.5em lightblue"
        文字阴影
     -->
      <el-menu-item index="/cls/index">首页</el-menu-item>
      <el-menu-item index="/cls/fmarket-list">二手市场</el-menu-item>

      <el-submenu index="2">
        <template slot="title">
          {{
            $route.path == '/cls/user-setinfo' ? '个人信息' : '个人中心'
          }}</template
        >

        <el-menu-item index="/cls/user-setinfo">个人信息</el-menu-item>
        <el-menu-item @click="$router.push(`/cls/card-list/${nowUserid}`)"
          >我的帖子</el-menu-item
        >
        <el-menu-item index="/cls/user-star">我的收藏</el-menu-item>
        <el-menu-item index="" @click="showDialog = true"
          >修改密码</el-menu-item
        >
      </el-submenu>

      <!-- 更改主题 -->
      <el-dropdown
        placement="top-start"
        style="margin-left: 640px"
        @command="changeCommand()"
      >
        <span class="el-dropdown-link">
          切换主题<i
            class="el-icon-brush el-icon--right"
            style="margin-top: 1px"
          ></i>
        </span>
        <!-- 内容 -->
        <el-dropdown-menu slot="dropdown">
          <div class="dropitems">
            <div
              class="changeColorItem"
              style="background-color: lightblue"
              data-themeColor="0"
              @click="changeCommand($event)"
            >
              亮蓝色
            </div>
            <div
              class="changeColorItem"
              style="background-color: #f9d9b8"
              data-themeColor="1"
              @click="changeCommand($event)"
            >
              亮橘色
            </div>
            <div
              class="changeColorItem"
              style="background-color: #4b4453"
              data-themeColor="2"
              @click="changeCommand($event)"
            >
              默认
            </div>
            <div
              class="changeColorItem"
              style="background-color: #4b4453"
              data-themeColor="3"
              @click="changeCommand($event)"
            >
              静谧黑
            </div>
            <div
              class="changeColorItem"
              style="background-color: #fff"
              data-themeColor="4"
              @click="changeCommand($event)"
            >
              纯洁白
            </div>
          </div>
        </el-dropdown-menu>
      </el-dropdown>

      <!-- 登录按钮 -->
      <el-button
        v-if="!avatarInfo"
        type=""
        style="margin-left: 90px"
        @click="$router.push('/login')"
        >登录</el-button
      >
      <!-- 头像框 -->
      <img
        v-if="avatarInfo"
        style="
          height: 32px;
          width: 32px;
          border-radius: 16px;
          margin-left: 62px;
        "
        :src="avatarInfo"
        @click="$router.push('/cls/user-setinfo')"
      />
    </el-menu>

    <div v-if="!skeletonLoading" id="main">
      <!-- 二级路由 -->
      <router-view />
    </div>

    <!-- 修改密码对话框 -->
    <!-- :visible.sync="showDialog":控制是否显示 -->
    <el-dialog title="修改密码" :visible.sync="showDialog" center width="390px">
      <el-form :model="changePwd" :rules="pwdRules" ref="rulesPwd">
        <el-form-item label="现密码:" prop="oldPwd">
          <el-input
            v-model="changePwd.oldPwd"
            style="width: 240px"
            placeholder="请输入现密码"
            maxlength="16"
            show-password
          />
        </el-form-item>
        <el-form-item label="现密码:" prop="newPwd">
          <el-input
            v-model="changePwd.newPwd"
            style="width: 240px"
            placeholder="请输入新密码"
            maxlength="16"
            show-password
          />
        </el-form-item>
      </el-form>
      <div slot="footer" style="margin-top: -24px">
        <el-button
          type="error"
          style="margin-right: 18px"
          @click="showDialog = flase"
          >取消</el-button
        >
        <el-button type="success" style="margin-left: 18px" @click="setPwd"
          >修改</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  // 声明自定义组件
  components: {},
  data() {
    return {
      // 控制当前nav选中项
      activeIndex: '/cls/index',
      // 控制骨架屏是否显示
      skeletonLoading: true,
      // 控制主题色
      indexThemeColor: this.$clsGlobla.themeColor[2],
      // 控制反差主题色
      indexCoverColor: this.$clsGlobla.reverseColor[2],
      // 控制修改密码对话框显示
      showDialog: false,
      changePwd: {
        // 修改密码---当前密码
        oldPwd: 'cls123456',
        // 新密码
        newPwd: 'cls123456',
      },
      // rules
      pwdRules: {
        oldPwd: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
            message: '密码必须为8-16位、且包含数、字母',
            trigger: 'blur',
          },
        ],
        newPwd: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
            message: '密码必须为8-16位、且包含数、字母',
            trigger: 'blur',
          },
        ],
      },
      // 当前登录用户
      nowUserid: '',
    }
  },
  computed: {
    // 响应式主题颜色
    colored() {
      return this.$store.state.mainColor
    },
    coverC() {
      return this.$store.state.coverColor
    },
    // 响应式头像地址
    // 用户未设置头像时，默认的显示头像地址------->
    // : 'http://localhost:9432/fa59b927-b722-4c49-8818-90f3d69b5c76.jpg'
    // 首先判断用户信息是否存在，不存在则返回underfind,让登录按钮显示
    // 如果用户信息存在，则判断头像地址是否存在。若不存在则返回默认的ikun头像
    avatarInfo() {
      return this.$store.state.clsInfo
        ? this.$store.state.clsInfo.avatarurl
          ? this.$store.state.clsInfo.avatarurl
          : 'http://localhost:9432/fa59b927-b722-4c49-8818-90f3d69b5c76.jpg'
        : undefined
    },
  },
  mounted() {
    // 获取当前登录用户id
    this.nowUserid = sessionStorage.getItem('clsUser')
      ? JSON.parse(sessionStorage.getItem('clsUser')).userid
      : ''
    console.log('用户的响应式头像信息：', this.avatarInfo)
    console.log(this.$route.path)
    // 控制骨架屏与真实内容显示
    setTimeout(() => {
      this.skeletonLoading = false
    }, 1200)
    // 在刷新后，恢复到原来的主题颜色(存在则使用Vuex存储颜色  否则恢复默认颜色)
    this.indexThemeColor = this.colored ? this.colored : this.indexThemeColor
    this.indexCoverColor = this.coverC ? this.coverC : this.indexCoverColor
  },
  methods: {
    // 切换主题方法
    changeCommand(event) {
      // event.currentTarget.getAttribute('data-themeColor')
      // 读取原生html标签的自定义属性，通过下标切换不同的颜色
      this.indexThemeColor =
        this.$clsGlobla.themeColor[
          event.currentTarget.getAttribute('data-themeColor')
        ]
      this.indexCoverColor =
        this.$clsGlobla.reverseColor[
          event.currentTarget.getAttribute('data-themeColor')
        ]
      // 将颜色同步至Vuex
      this.$store.commit('updateColor', this.indexThemeColor)
      this.$store.commit('updateCoverse', this.indexCoverColor)
    },

    // 修改密码
    setPwd() {
      this.$refs.rulesPwd.validate(valid => {
        if (valid) {
          if (this.changePwd.oldPwd == this.changePwd.newPwd) {
            this.$message({
              message: '两次密码不能一致',
              type: 'error',
              center: true,
              duration: 1200,
              showClose: true,
            })
          } else {
            // 取出临时存储的用户电话号码信息---并转为对象
            this.changePwd.phone = JSON.parse(
              sessionStorage.getItem('clsUser')
            ).phone
            // 修改密码接口
            this.$https.userLogin.toSetPwd(this.changePwd).then(res => {
              // console.log('修改密码验证', res.data.code)
              if (res.data.code == 200) {
                this.$message({
                  message: res.data.msg,
                  type: 'success',
                  center: true,
                  duration: 1200,
                })
                this.showDialog = false
              }
              if (res.data.code == 301) {
                this.$message({
                  message: res.data.msg,
                  type: 'error',
                  duration: 1200,
                  center: true,
                })
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
.mainNav {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  z-index: 1000;
  color: var(--indexCoverColor);
}
// 伪元素：用于修饰元素，并不挂载dom.(可以实现背景虚化效果)
// .mainNav::before {
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 72px;
//   background: var(--color);
//   filter: blur(15px);
//   contain: '';
// }
// 导航栏的更改主题色下拉菜单---图标容器
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-icon-arrow-down {
  font-size: 12px;
}
// 下拉菜单颜色选项(五个颜色选项div)
.changeColorItem {
  display: block;
  cursor: pointer;
  font-size: 12px;
  width: 56px;
  height: 36px;
  border-radius: 12px;
  line-height: 36px;
  text-align: center;
  border: 1px solid black;
}
// 修改主体下拉框
.dropitems {
  width: 320px;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
}
</style>
