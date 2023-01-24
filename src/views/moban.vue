<template>
  <div style="display: flex; justify-content: center">
    <div :style="`backgroundColor:${mColor}`" class="allindexmain">
      <el-button>xxxxxxxx</el-button>
    </div>
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
        : '#dcdcdc'
    },
  },
  mounted() {},
}
</script>

<style lang="scss" scoped></style>
