<template>
  <div>
    <h1>这是</h1>
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
  mounted() {
    let camcomid = this.$route.params.id
    console.log(camcomid)
  },
}
</script>

<style lang="scss" scoped></style>
