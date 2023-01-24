<template>
  <div>
    <div
      :style="{
        backgroundColor: `${mColor}`,
        color: `${coverC}`,
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'center',
      }"
      class="allindexmain"
    >
      <div class="day"></div>
      <div class="swiper-container" :style="{ border: `${coverC} 2px solid` }">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="i in queryInfo" :key="i.id">
            <a :href="i.link_info">
              <img class="border" :src="i.imgurl" alt="" />
            </a>
            <div style="font-size: 14px; margin-left: 12px">
              {{ i.detail }}
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <!-- :style="{ width: `${isCollapse ? 65 : 240}px`, transition: '0.4s' }" -->

      <div class="day"></div>
      <div
        class="title"
        :style="{ backgroundColor: `${mColor}`, border: `${coverC} 2px solid` }"
      >
        {{ querylink }}
      </div>
    </div>
  </div>
</template>

<!-- 帖子列表页----首页嵌套路由默认页 -->
<script>
import Swiper from 'swiper'
export default {
  props: {
    querylink: {
      default: '快速链接 >>',
      type: String,
    },

    // 轮播图数据
    queryInfo: {
      default: [],
    },
    // 轮播图图片地址
    bannerImg: {
      default: '',
    },

    // 轮播图信息简介
    bannerDetail: {
      default: '',
    },
  },
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
    // 获取轮播图数据
    // 由于vue生命周期快于请求，所以使用v-for渲染swiper时，需要给swiper添加时延
    setTimeout(() => {
      this.$nextTick(() => {
        // 初始化swiper
        new Swiper('.swiper-container', {
          autoplay: {
            delay: 1600,
          },
          effect: 'cube',
          loop: true,
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
            clickable: true, // 分页器可以点击
          },
        })
      })
    }, 2400)
  },
}
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 64%;
  height: 186px;
  border-radius: 24px;
}
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
}

.day {
  box-sizing: border-box;
  width: 120px;
  height: 100px;
  background-color: lightblue;
  border: 2px solid lightcoral;
}
</style>
