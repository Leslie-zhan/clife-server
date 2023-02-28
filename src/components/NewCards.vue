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
        title="发表新帖"
        width="420px"
        :visible.sync="showCrad"
        top="200px"
        class="newcarddialog"
      >
        <li>sds</li>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 控制模态对话框是否显示
      showCrad: false,
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

  mounted() {},

  methods: {
    //打开发帖
    createNew() {
      this.showCrad = true
    },
  },
}
</script>

<style lang="scss" scoped>
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
</style>
