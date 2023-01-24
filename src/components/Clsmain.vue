<template>
  <div style="display: flex; justify-content: center">
    <div :style="`backgroundColor:${mColor}`" class="allindexmain">1111111</div>
  </div>
</template>

<script>
export default {
  props: {
    what: {
      default: 'xxxxx',
    },
  },
  computed: {
    mColor() {
      // 全局动态响应的背景颜色
      return this.$store.state.mainColor
        ? this.$store.state.mainColor
        : '#4b4453'
    },
  },
}
</script>

<style lang="scss" scoped>
.allindexmain {
  height: 720px;
  width: 80%;
  box-shadow: -4px -4px whitesmoke;
  border-right: 4px solid whitesmoke;
}
</style>
