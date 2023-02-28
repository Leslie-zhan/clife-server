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
      class="allswiper"
    >
      <div
        class="day"
        :style="{
          marginLeft: '18px',
          border: `4px inset ${coverC}`,
          background: `${coverC}`,
          color: `${mColor}`,
        }"
      >
        <li>{{ ancientPoetry.origin }}</li>
        <li>{{ ancientPoetry.author ? `--${ancientPoetry.author}` : '' }}</li>
        <li>{{ ancientPoetryMain[0] ? `${ancientPoetryMain[0]}，` : '' }}</li>
        <li>{{ ancientPoetryMain[1] ? ancientPoetryMain[1] : '' }}</li>
      </div>

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

      <div
        class="day"
        :style="{
          marginRight: '18px',
          border: `4px outset ${coverC}`,
          background: `${coverC}`,
          color: `${mColor}`,
        }"
      ></div>
      <div
        class="title"
        :style="{
          backgroundColor: `${mColor}`,
          border: `${coverC} 2px solid`,
        }"
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
    return {
      // 古诗词信息
      ancientPoetry: '',
      // 古诗词主体
      ancientPoetryMain: [],
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
    // 获取古诗词
    this.getAncient()

    // 获取轮播图数据
    // 由于vue生命周期快于请求，所以使用v-for渲染swiper时，需要给swiper添加时延
    setTimeout(() => {
      this.$nextTick(() => {
        // 初始化swiper
        new Swiper('.swiper-container', {
          autoplay: {
            delay: 6400,
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

    setInterval(() => {
      this.getAncient()
    }, 100000)
  },
  methods: {
    getAncient() {
      // 获取每日一古诗词数据
      this.$https.swInfo.everyday().then(res => {
        this.ancientPoetry = res.data
        this.ancientPoetryMain = this.ancientPoetry.content.split('，')
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.allswiper {
  width: 900px;
  border: 4px solid whitesmoke;
  // backdrop-filter: blur(50px);
}
.swiper-container {
  width: 56%;
  height: 186px;
  border-radius: 24px;
  margin-bottom: 12px;
  margin-top: 12px;
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
  margin-bottom: 0.5px;
}

// 两个小展示框样式
.day {
  box-sizing: border-box;
  width: 140px;
  height: 120px;
  font-family: Operator Mono ssm, '楷体';
  font-size: 12px;
  font-style: italic;
  border-radius: 16px;
  padding: 2px;
  position: relative;
  > li {
    position: absolute;
    border-radius: 16px;
    list-style: none;
    width: 100%;
    text-align: center;
    // 只显示一行
    display: inline-block;
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  :nth-child(1) {
    top: 10%;
  }
  :nth-child(2) {
    top: 30%;
    width: 50%;
    right: 0%;
  }
  :nth-child(3) {
    top: 50%;
  }
  :nth-child(4) {
    top: 75%;
  }
  :nth-child(n + 3) {
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    font-style: normal;
  }
  :nth-child(-n + 2) {
    font-weight: bold;
  }
}
</style>
