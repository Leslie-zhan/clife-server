<template>
  <div style="display: flex; justify-content: center; flex-wrap: wrap">
    <div
      :style="{ backgroundColor: `${mColor}`, color: `${coverC}` }"
      class="allindexmain"
    >
      <Banner
        :queryInfo="queryInfo"
        :querylink="`考试入口快速链接 >>`"
      ></Banner>
    </div>
  </div>
</template>

<!-- 帖子列表页----首页嵌套路由默认页 -->
<script>
// 引入轮播图自定义组件
import Banner from '@/components/Banner.vue'
export default {
  components: {
    Banner,
  },
  data() {
    return {
      queryInfo: '',
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
    console.log(this.mColor, this.coverC, this.$store.state.coverColor)
    // 轮播图数据
    this.$https.swInfo.indexSwInfo().then(res => {
      this.queryInfo = res.data.data
    })
  },
}
</script>

<style lang="scss" scoped>
// 轮播图项的图片样式
.border {
  border-radius: 24px 24px 0 0;
  width: 100%;
  height: 160px;
}
//快速链接容器框样式
.title {
  text-align: center;
  width: 100%;
  border-radius: 0 0 24px 24px;
  // border: #f5f5f5 2px solid;
}
</style>
