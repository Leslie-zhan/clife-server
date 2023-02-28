<template>
  <div>
    <!-- 返回顶部组件 -->

    <i
      @click="toTop"
      class="el-icon-caret-top totop"
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

  methods: {
    // 返回顶部方法：将滚动距离清空为零
    toTop() {
      // 第一种方法直接清空滚动距离，但是没有过度动画
      // document.documentElement.scrollTop = 0

      // 第二种方法：有过度动画
      var t = document.documentElement.scrollTop || document.body.scrollTop
      var timerId = setInterval(function () {
        // 执行一次性计时器，一直减小滚动距离  当t为0时，计时器销毁
        t -= 5
        document.documentElement.scrollTop = document.body.scrollTop = t
        if (t <= 0) {
          clearInterval(timerId)
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.totop {
  position: fixed;
  width: 40px;
  height: 40px;
  border-radius: 84px;
  margin-top: 480px;
  margin-left: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

// 返回顶部图标
.el-icon-caret-top {
  font-size: 36px;
}
</style>
