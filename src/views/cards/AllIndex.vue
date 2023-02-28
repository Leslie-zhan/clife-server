<template>
  <div style="display: flex; justify-content: center; flex-wrap: wrap">
    <!-- 返回顶部按钮 -->
    <BackTop />
    <!-- 发帖按钮 -->
    <NewCards />
    <div
      :style="{ backgroundColor: `${mColor}`, color: `${coverC}` }"
      class="allindexmain"
    >
      <!-- 轮播图组件 -->
      <Banner
        :queryInfo="queryInfo"
        :querylink="`考试入口快速链接 >>`"
      ></Banner>

      <div class="allmain"></div>
    </div>
  </div>
</template>

<!-- 帖子列表页----首页嵌套路由默认页 -->
<script>
// 引入轮播图自定义组件
import Banner from '@/components/Banner.vue'
// 返回顶部组件
import BackTop from '@/components/BackTop.vue'
// 发送新帖组件
import NewCards from '@/components/NewCards'
export default {
  components: {
    Banner,
    BackTop,
    NewCards,
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
.allmain {
  height: 640px;
  width: 100%;
  border: 4px solid whitesmoke;
  // border-width: 0px 4px 4px 4px;
}
</style>
