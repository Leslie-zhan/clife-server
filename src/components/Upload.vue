<template>
  <div class="upload">
    <i @click="toUpload()" v-if="showUpload" class="uploadButton"> 上传 </i>
    <el-upload
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
      <img
        v-if="avatarUrl"
        :src="avatarUrl"
        class="avatar"
        style="border-radius: 12px"
      />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 控制上传头像按钮显示
      showUpload: false,
      // 存放上传文件列表
      fileList: [],
      // 返回的头像访问地址
      avatarUrl: '',
    }
  },
  methods: {
    // 上传成功回调函数
    handleAvatarSuccess(res, file) {
      console.log('上传成功后  服务器返回地址', res)
      // 将服务器返回地址给图片显示地址(this.$uploadUrl:放入Vue原型的上传文件请求地址前缀)
      this.avatarUrl = this.$uploadUrl + res
      this.$refs.upload.clearFiles()
    },
    // 在上传之前，限制上传文件大小、尺寸、数量回调函数
    beforeUpload(file) {
      if (file.status !== 'ready') return
      if (!file) return
      let isLt2M = file.size / 1024 / 1024 < 1
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

<style lang="scss" scoped>
.upload {
  position: relative;
  width: 240px;
  height: 160px;
  background: lightgoldenrodyellow;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 12px;
}

.avatar-uploader .el-upload {
  border: 3px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
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

.avatar {
  width: 64px;
  height: 64px;
  display: block;
}

// 上传按钮
.uploadButton {
  position: absolute;
  left: 12px;
  width: 36px;
  font-size: 14px !important;
  font-family: '宋体' !important;
  font-weight: 700 !important;
  font-style: normal !important;
  color: rgb(123, 121, 121);
  height: 24px;
  line-height: 24px;
  border: 1px solid rgb(207, 204, 204);
  opacity: 0.6;
  text-align: center;
  cursor: pointer;
  animation: flipInX 1s;
}
</style>
