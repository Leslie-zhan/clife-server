<!-- 用户信息页面 -->
<template>
  <div style="display: flex; justify-content: center; align-items: center">
    <div class="main">
      <div style="position: absolute; margin-top: 56px; margin-left: 100px">
        <i>头像：</i>
        <button @click="toUpload" v-if="showUpload" class="uploadButton">
          上传
        </button>
      </div>
      <el-form
        ref="setInfoForm"
        :rules="formSetInfo"
        style="margin-left: 100px; margin-top: 32px; width: 240px"
      >
        <el-form-item
          label=""
          prop="userAvatar"
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
            accept=".jpg,.png"
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
        <el-form-item label="昵称:" prop="uname" style="margin-top: 32px">
          <el-input
            v-model="setInfo.uname"
            placeholder=""
            style="width: 80%"
            :disabled="toChange"
          />
        </el-form-item>
        <!-- 性别框 -->
        <el-form-item label="性别:" prop="sexRadio" style="margin-top: 32px">
          <el-radio label="男" v-model="setInfo.sexRadio" :disabled="toChange"
            >男</el-radio
          >
          <el-radio label="女" v-model="setInfo.sexRadio" :disabled="toChange"
            >女</el-radio
          >
        </el-form-item>
        <!-- email框 -->
        <el-form-item label="邮箱:" prop="email" style="margin-top: 32px">
          <el-input
            v-model="setInfo.email"
            placeholder=""
            style="width: 80%"
            :disabled="toChange"
          />
        </el-form-item>
        <!-- 个人简介 -->
        <el-form-item label="简介:" prop="detail" style="margin-top: 32px">
          <el-input
            v-model="setInfo.detail"
            style="width: 80%"
            type="textarea"
            :disabled="toChange"
          />
        </el-form-item>
      </el-form>
      <div class="control">
        <el-button @click="toChange = false">修改</el-button>
        <el-button style="margin: 0">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 控制各项信息是否能修改
      toChange: true,
      // 控制上传头像按钮显示
      showUpload: false,
      // 存放上传文件列表
      fileList: [],
      setInfo: {
        // 提交的头像访问地址
        userAvatar: '',
        uname: '',
        sexRadio: '男',
        email: '',
        detail: '',
      },
      // 返回的头像访问地址
      avatarUrl: '',
      // 验证表单规则
      formSetInfo: {},
    }
  },
  mounted() {
    // sessionStorage.setItem('clsUser', { xxx: '111' })
  },
  methods: {
    // 上传成功回调函数
    handleAvatarSuccess(res, file) {
      console.log('上传成功后  服务器返回地址', res)
      // 将服务器返回地址给图片显示地址(this.$uploadUrl:放入Vue原型的上传文件请求地址前缀)
      this.avatarUrl = this.$uploadUrl + res
      // 把服务器返回地址赋值给表单提交的存储地址
      this.setInfo.userAvatar = this.avatarUrl
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

// 上传按钮
.uploadButton {
  position: absolute;
  margin-top: 73px;
  width: 36px;
  margin-left: -45px;
}

.control {
  position: absolute;
  top: 50%;
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
