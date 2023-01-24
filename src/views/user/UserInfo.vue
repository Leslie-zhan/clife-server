<!-- 用户信息页面 -->
<template>
  <div>
    <div style="display: flex; justify-content: center; align-items: center">
      <div class="main">
        <div style="position: absolute; margin-top: 56px; margin-left: 100px">
          <i class="avatarText">头像：</i>
          <button @click="toUpload" v-if="showUpload" class="uploadButton">
            上传
          </button>
        </div>
        <el-form
          :model="setInfo"
          ref="setInfoForm"
          :rules="formSetInfo"
          style="margin-left: 100px; margin-top: 32px; width: 300px"
        >
          <el-form-item
            label=""
            prop="avatarurl"
            style="margin-left: 64px; height: 120px; overflow: hidden"
          >
            <!-- accept=".jpg,.png":限制上传文件类型 -->
            <!-- 
            :on-success="handleAvatarSuccess"：上传成功的回调函数
           -->
            <!-- :before-upload="beforeUpload"：限制文件上传格式、大小、数量的回调函数 -->
            <el-upload
              :disabled="toChange"
              class="avatar-uploader"
              action="http://localhost:9432/upload"
              :on-success="handleAvatarSuccess"
              :show-file-list="true"
              name="avatar"
              accept=".jpg,.png,.jpeg"
              :before-upload="beforeUpload"
              ref="upload"
              :auto-upload="false"
              :file-list="fileList"
              :on-change="fileChange"
            >
              <!-- 根据上传后有无返回访问地址   控制上传框或返回图片框显示 -->
              <img v-if="avatarUrl" :src="avatarUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!-- 昵称框 -->
          <el-form-item
            label="昵称:"
            prop="uname"
            label-width="64px"
            style="margin-top: 36px"
          >
            <el-input v-model="setInfo.uname" :disabled="toChange" />
          </el-form-item>
          <!-- 性别框 -->
          <el-form-item
            label="性别:"
            prop="sex"
            label-width="64px"
            style="margin-top: 36px"
          >
            <el-radio label="男" v-model="setInfo.sex" :disabled="toChange"
              >男</el-radio
            >
            <el-radio label="女" v-model="setInfo.sex" :disabled="toChange"
              >女</el-radio
            >
          </el-form-item>
          <!-- email框 -->
          <el-form-item
            label="邮箱:"
            prop="email"
            label-width="64px"
            style="margin-top: 36px"
          >
            <el-input
              v-model="setInfo.email"
              placeholder=""
              :disabled="toChange"
            />
          </el-form-item>
          <!-- 个人简介 -->
          <el-form-item
            label="简介:"
            prop="detail"
            label-width="64px"
            style="margin-top: 36px"
          >
            <el-input
              v-model="setInfo.detail"
              type="textarea"
              :disabled="toChange"
            />
          </el-form-item>
        </el-form>
        <div class="control">
          <el-button
            @click="toChange = false"
            style="border: 2px gray solid"
            :disabled="!toChange"
            >修改</el-button
          >
          <el-button
            style="margin: 0; border: 2px gray solid"
            @click="toSetInfo"
            :disabled="toChange"
            >提交</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 读取临时存储用户信息
      getUserInfo: '',
      // 控制各项信息是否能修改
      toChange: true,
      // 控制上传头像按钮显示
      showUpload: false,
      // 存放上传文件列表
      fileList: [],
      setInfo: {
        // 提交的头像访问地址
        avatarurl: '',
        uname: '',
        sex: '男',
        email: '',
        detail: '',
        phone: '',
      },
      // 返回的头像访问地址
      avatarUrl: '',
      // 验证表单规则
      formSetInfo: {
        uname: [
          { required: true, message: '昵称不能为空', trigger: 'blur' },
          {
            pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]{4,8}$/,
            message: '昵称必须为4-8位,只允许包含中文、大小写字母',
            trigger: 'blur',
          },
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: '非法邮箱',
            trigger: 'blur',
          },
        ],
        detail: [{ required: true, message: '简介不能为空', trigger: 'blur' }],
      },
    }
  },
  mounted() {
    this.toSessionInfo()
  },
  methods: {
    // 读取session用户信息方法
    toSessionInfo() {
      //读取临时存储的用户信息
      this.getUserInfo = JSON.parse(sessionStorage.getItem('clsUser'))
      console.log('session用户信息：', this.getUserInfo)
      // 从用户信息，结构出需要显示(允许修改)的属性
      const { avatarurl, uname, detail, sex, email, phone } = this.getUserInfo
      // 再将这些属性赋值给表单对象
      this.setInfo = { avatarurl, uname, detail, sex, email, phone }
      this.avatarUrl = this.getUserInfo.avatarurl
      console.log('头像地址：', this.avatarUrl)
    },
    // 上传成功回调函数
    handleAvatarSuccess(res, file) {
      console.log('上传成功后  服务器返回地址', res)
      // 将服务器返回地址给图片显示地址(this.$uploadUrl:放入Vue原型的上传文件请求地址前缀)
      this.avatarUrl = this.$uploadUrl + res
      // 把服务器返回地址赋值给表单提交的存储地址
      this.setInfo.avatarurl = this.avatarUrl
    },
    // 在上传之前，限制上传文件大小、尺寸、数量回调函数
    beforeUpload(file) {
      if (file.status !== 'ready') return
      if (!file) return
      const isLt2M = file.size / 1024 / 1024 < 1
      if (!isLt2M) {
        // 去除文件列表
        // this.$refs.upload.clearFiles()
        this.$message({
          message: '上传文件大小不能超过 1MB!',
          type: 'warning',
        })
        return false
      }
    },
    // 文件状态改变时回调函数
    fileChange() {
      // 检测到选择成功上传文件时候,让上传按钮显示
      this.showUpload = true
    },
    toUpload() {
      // 关闭自动上传后，需要该方法进行上传
      this.$refs.upload.submit()
    },
    toSetInfo() {
      // 修改个人信息方法
      this.$refs.setInfoForm.validate(valid => {
        if (valid) {
          console.log(valid)
          this.$https.userLogin.toSetInfo(this.setInfo).then(res => {
            console.log(res.data)
            if (res.data.code == 200) {
              this.$message({
                message: '信息修改成功',
                type: 'success',
                duration: 1200,
                center: true,
              })
              this.toChange = true
              // 重新获取最新用户信息
              this.$https.userLogin
                .qsaPhone({ phone: this.getUserInfo.phone })
                .then(res => {
                  // console.log(this.setInfo.phone, this.getUserInfo.phone)

                  console.log('新的用户信息：', res)
                  // 将修改好的新信息存入session
                  // 存储用户信息-- - 需要转为json
                  // sessionStorage.setItem(
                  //   'clsUser',
                  //   JSON.stringify(res.data.data[0])
                  // )
                  // 存入Vuex
                  this.$store.commit('updateInfo', res.data.data[0])
                  // 将avatarUrl重置
                  this.avatarUrl = ''
                  // 再将页面上的信息更新
                  this.toSessionInfo()
                  setTimeout(() => {
                    this.$notify({
                      title: '提示',
                      message: '本地信息已同步',
                      duration: 1200,
                    })
                  }, 1600)
                })
            }
          })
        }
      })
    },
  },
}
</script>

<style lang="scss">
// 主要区域
.main {
  width: 86%;
  height: 80vh;
  margin-top: 5vh;
  box-shadow: lightgray 10px 10px 10px 10px;
  font-style: italic;
  font-size: 16px;
}

.avatar-uploader .el-upload {
  border: 3px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 64px;
  height: 64px;
  line-height: 64px;
  text-align: center;
}

.el-upload-list__item-name {
  width: 100px;
  background-color: lightblue;
}

.avatar {
  width: 64px;
  height: 64px;
  display: block;
}
// 头像文字
.avatarText {
  padding-left: 10px;
}
// 上传按钮
.uploadButton {
  position: absolute;
  margin-top: 73px;
  width: 36px;
  margin-left: -45px;
}

.control {
  position: absolute;
  top: 56%;
  left: 72%;
  transform: translateY(-50%);
  width: 64px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
