<template>
  <div>
    <!-- 发新帖子组件 -->
    <!-- 打开按钮 -->
    <!--  @click=showcard=true   showcard为true时，返回flase -->
    <i
      @click="showCrad = true"
      class="el-icon-plus newcard"
      :style="{
        color: `${coverC}`,
        border: `2px solid ${mColor}`,
        background: `${mColor}`,
      }"
    >
    </i>

    <!-- 新帖子编辑界面 -->
    <div>
      <el-dialog
        fullscreen
        title="发表新帖"
        width="640px"
        :visible.sync="showCrad"
        top="10px"
        class="newcarddialog"
        center
      >
        <div class="newCMain">
          <!-- 表单 -->
          <div class="main1">
            <div class="cardTitle">
              <i class="ncfs">标题：</i>
              <el-input
                v-model="publishInfo.title"
                placeholder=""
                style="width: 64%"
              ></el-input>
            </div>
            <div class="cardType">
              <i class="ncfs">类型：</i>
              <el-radio
                :label="i.msg"
                v-model="publishInfo.type"
                v-for="i in types"
                :key="i.i"
                >{{ i.msg }}</el-radio
              >
            </div>
            <div class="newContent">
              <i class="ncfs">内容：</i>
              <el-input
                rows="8"
                type="textarea"
                v-model="publishInfo.content"
                placeholder=""
                style="width: 64%; height: 240px"
              >
              </el-input>
            </div>
            <div class="load">
              <i class="ncfs">配图：</i>
              <Upload ref="toUpload" />
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="newCard()">发布</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Upload from './Upload.vue'
export default {
  components: {
    Upload,
  },
  data() {
    return {
      // 控制模态对话框是否显示
      showCrad: false,
      // 表单双向绑定
      publishInfo: {
        title: '',
        type: '资讯',
        content: '',
        pics: '',
        userid: '',
      },
      types: [
        { id: 1, msg: '资讯' },
        { id: 2, msg: '校园' },
        { id: 3, msg: '人物' },
        { id: 4, msg: '互助' },
        { id: 5, msg: '风景' },
        { id: 6, msg: '情感' },
        { id: 7, msg: '运动' },
        { id: 8, msg: '互动' },
        { id: 9, msg: '学习' },
      ],
    }
  },
  computed: {
    mColor() {
      // 全局动态响应的背景颜色
      return this.$store.state.mainColor
        ? this.$store.state.mainColor
        : '#625B57'
    },
    // 反差主题颜色
    coverC() {
      return this.$store.state.coverColor
        ? this.$store.state.coverColor
        : '#f5f5f5'
    },
  },

  mounted() {
    this.publishInfo.userid = sessionStorage.getItem('clsUser')
      ? JSON.parse(sessionStorage.getItem('clsUser')).userid
      : ''
  },

  methods: {
    //1.打开发帖
    createNew() {
      this.showCrad = true
    },
    // 2.发布新帖子
    newCard() {
      this.publishInfo.pics = this.$refs.toUpload.avatarUrl
      if (!this.publishInfo.userid) {
        this.$router.push('/login')
      }
      if (!this.publishInfo.pics) {
        this.myNotify('照片不能为空', '请上传照片')
        return
      }
      if (!this.publishInfo.title) {
        this.myNotify('标题不能为空', '输入标题')
        return
      }
      if (!this.publishInfo.content) {
        this.myNotify('内容不能为空', '请输入内容')
        return
      }
      this.$https.camcomInfo.addNewCard(this.publishInfo).then(res => {
        console.log(res.data.data)
        if (res.data.data.affectedRows == 1)
          this.$message({
            center: true,
            duration: 1200,
            message: '发布成功',
            type: 'success',
          })
        this.showCrad = false
      })
      console.log('上传子组件的地址：', this.$refs.toUpload.avatarUrl)
    },
    // 3.myNotify
    myNotify(x, y) {
      this.$notify({
        title: x,
        message: y,
        type: 'error',
        duration: 1200,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.ncfs {
  font-size: 14px !important;
  font-family: '宋体' !important;
  font-weight: 700 !important;
  font-style: normal !important;
  color: rgb(148, 145, 145);
}
.newcard {
  position: fixed;
  width: 36px;
  height: 36px;
  border-radius: 84px;
  margin-top: 420px;
  margin-left: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
/* 返回顶部图标 */
.el-icon-plus {
  font-size: 36px;
}
.newcarddialog {
  backdrop-filter: blur(10px);
}
// 主体部分
.newCMain {
  width: 100%;
  height: 510px;
  display: flex;
  justify-content: center;
  .main1 {
    width: 72%;
    height: 100%;
    background: whitesmoke;
  }
}

.cardTitle,
.newContent,
.cardType,
.load {
  margin-top: 24px;
  margin-left: 24px;
  i {
    height: 40px;
  }
}

.newContent {
  display: flex;
  justify-content: start;
}
.load {
  margin-top: -36px;
  display: flex;
  justify-content: start;
}
</style>
