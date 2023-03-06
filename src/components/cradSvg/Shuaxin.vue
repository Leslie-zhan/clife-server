<template>
  <div>
    <!-- 返回顶部组件 -->

    <i
      class="el-icon-refresh-right shuaxin"
      :style="{
        color: `${coverC}`,
        border: `2px solid ${mColor}`,
        background: `${mColor}`,
      }"
    >
    </i>
  </div>
</template>

<script>
export default {
  data() {
    return {}
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

  methods: {},
}
</script>

<style lang="scss">
.shuaxin {
  position: fixed;
  width: 36px;
  height: 36px;
  border-radius: 84px;
  margin-top: 360px;
  margin-left: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

// 返回顶部图标
.el-icon-refresh-right {
  font-size: 30px;
}
</style>
