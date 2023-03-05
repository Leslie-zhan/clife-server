<template>
  <div style="display: flex; justify-content: center; flex-wrap: wrap">
    <!-- 返回顶部按钮 -->
    <BackTop />
    <!-- 发帖按钮 -->
    <NewCards />
    <div :style="{ backgroundColor: `${mColor}`, color: `${coverC}` }">
      <!-- 轮播图组件 -->
      <Banner
        :queryInfo="queryInfo"
        :querylink="`考试入口快速链接 >>`"
      ></Banner>

      <div class="allmain" :style="{ height: `${cardsHeight}px` }">
        <!-- 标题 -->
        <div class="cardtitle" :style="{ color: `${coverC}` }">帖子中心</div>

        <!-- 帖子类型导航栏：包括搜索框和类型选项卡 -->
        <div
          class="cardnav"
          :style="{ border: `${coverC} 2px solid`, borderRadius: '16px' }"
        >
          <!-- 帖子类型导航栏 -->
          <div class="typecard">
            <ul @click="handleClick($event)">
              <!-- 行内style判断 -->
              <li
                v-for="i in typeList"
                :key="i.id"
                :typeId="i.id"
                :style="{
                  'background-color': i.id == xxxx ? `${coverC}` : ``,
                  color: i.id == xxxx ? `${mColor}` : ``,
                }"
              >
                {{ i.msg }}
              </li>
            </ul>
          </div>

          <!-- 搜索框 -->
          <!-- :style="{ border: `${coverC} 2px solid` }" -->
          <!-- :style="{ backgroundColor: `${coverC}` }" -->
          <div class="search">
            <div class="searchmain">
              <el-input
                size="mini"
                v-model="input"
                placeholder="请输入内容"
                style="height: 26px; border-radius: 18px"
              ></el-input>
            </div>
            <div class="searchlow" :style="{ border: `${coverC} 1px solid` }">
              搜寻
            </div>
          </div>
        </div>

        <!-- 帖子列表内容展示区 -->
        <div class="cardshowlist">
          <!-- 小卡片个体 -->
          <div
            class="onecard"
            v-for="i in cardsList"
            :key="i.xx"
            :style="{ color: `${mColor}`, background: `${coverC}` }"
          >
            <!--头像、昵称、发表时间 栏 -->
            <div class="cardtitle">
              <div class="t1">
                <img class="cardtx" :src="i.avatarurl" />
                <div class="cardname">{{ i.uname }}</div>
              </div>
              <!-- <button @click="xx">
               {{ time | changeTime('llll') }}
              </button> -->
              <i class="times">{{ i.camcomtime | changeTime('llll') }}</i>
            </div>

            <!-- 分割线 fgx是全局css -->
            <el-divider class="fgx"> 内容 </el-divider>

            <!-- 帖子图 -->
            <img
              :src="i.pics"
              alt=""
              style="width: 90px; height: 90px"
              class="cardimg"
            />

            <!-- 帖子文本neir disabled="true"：禁止文本域编辑-->
            <textarea
              class="cardtext"
              disabled="true"
              :style="{
                boxShadow: ` 2px 2px 2px 2px ${mColor}`,
              }"
              v-model="i.content"
            ></textarea>

            <!-- 帖子点赞等操作栏 -->
            <div
              class="hudong"
              :style="{
                border: `2px ${mColor} solid`,
              }"
            >
              <!-- 转发 -->
              <div class="zf" :style="{ color: `${mColor}` }">
                <li @click="caozuo()">
                  <Tzf :zfcolor="`${mColor}`" />
                </li>
                <i>{{ i.forwarding }}</i>
              </div>

              <!-- 收藏 -->
              <div class="sc">
                <li @click="caozuo()">
                  <Tsc :sccolor="`${mColor}`" />
                </li>
                <i>{{ i.star }}</i>
              </div>
              <!-- 评论 -->
              <div class="pl">
                <li @click="caozuo()">
                  <Tpl :plcolor="`${mColor}`" />
                </li>
                <i>{{ i.comments }}</i>
              </div>
              <!-- 点赞 -->
              <div class="dz">
                <li @click="caozuo()">
                  <Tdz :dzcolor="`${mColor}`" />
                </li>
                <i>{{ i.likes }}</i>
              </div>
            </div>
          </div>
        </div>

        <!-- 未找到相关帖子提示页面 -->
        <div
          v-show="!havecard"
          class="nocard"
          :style="{
            background: `${coverC}`,
            boxShadow: `2px 2px 2px 2px ${mColor}`,
          }"
        >
          <img src="../../../public/img/cards/没有更多笔记.png" alt="" />
          <i :style="{ color: `${mColor}` }">未找到相关帖子</i>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- 帖子列表页----首页嵌套路由默认页 -->
<script>
// 转发svg组件
import Tzf from '@/components/cradSvg/Tzf.vue'
// 收藏svg组件
import Tsc from '@/components/cradSvg/Tsc.vue'
// 评论svg组件
import Tpl from '@/components/cradSvg/Tpl.vue'
// 点赞svg组件
import Tdz from '@/components/cradSvg/Tdz.vue'
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
    Tzf,
    Tsc,
    Tpl,
    Tdz,
  },
  data() {
    return {
      queryInfo: '',
      time: '',
      // 控制帖子类型选项卡是否激活
      xxxx: 0,
      // 搜索框内容绑定
      input: '',
      // 控制帖子或没有相关帖子内容显示
      havecard: true,
      // 帖子列表高度
      cardsHeight: 800,
      typeList: [
        { id: 0, msg: '全部' },
        { id: 1, msg: '资讯' },
        { id: 2, msg: '校园' },
        { id: 3, msg: '人物' },
        { id: 4, msg: '互助' },
        { id: 5, msg: '风景' },
        { id: 6, msg: '情感' },
        { id: 7, msg: '运动' },
      ],
      // 帖子列表内容
      cardsList: [],
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

    // 时间
    this.$https.camcomInfo.upCamcom().then(res => {
      console.log(res.data.data)
      if (res.data.data.length == 0) {
        this.havecard = false
      }
      this.cardsList = res.data.data
    })
  },
  methods: {
    // 帖子类型是否激活委托事件
    handleClick(event) {
      this.xxxx = event.target.getAttribute('typeId')
    },

    caozuo() {
      console.log('111111')
    },
  },
}
</script>

<style lang="scss" scoped>
.allmain {
  width: 900px;
  border: 6px solid whitesmoke;
  position: relative;
  cursor: pointer;
}
// 帖子中心标题
.cardtitle {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  font-family: '宋体';
  font-weight: bold;
}
// card导航栏
.cardnav {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 896px;
  height: 36px;
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  // 帖子类型列表
  .typecard {
    width: 50%;
    height: 100%;
    > ul {
      margin-left: 12px;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      justify-items: center;
      > li {
        text-align: center;
        height: 26px;
        width: 48px;
        list-style: none;
        line-height: 26px;
        border-radius: 8px;
        transition: all 0.2s linear;

        &:active {
          opacity: 0.2;
        }
      }
    }
  }

  .search {
    width: 180px;
    height: 28px !important;
    margin-right: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    justify-items: center;
    border-radius: 12px;
    transition: all 0.2s linear;

    > .searchmain {
      width: 75%;
      height: 100%;
      border-radius: 12px 0 0 12px;
    }

    > .searchlow {
      width: 20%;
      height: 26px !important;
      // border-radius: 0 12px 12px 0;
      border-radius: 8px;
      text-align: center;
      line-height: 26px;
      font-size: 14px;

      &:active {
        opacity: 0.5;
      }
    }
  }
}

// 没有相关帖子页面
.nocard {
  position: absolute;
  width: 80%;
  height: 270px;
  top: 90px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 12px;

  > i {
    width: 100%;
    text-align: center;
    font-family: '宋体';
    font-style: normal;
  }
}

//帖子列表页面
.cardshowlist {
  position: absolute;
  width: 80%;
  height: 560px;
  top: 90px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

// 小卡片个体
.onecard {
  width: 80%;
  height: 240px;
  margin-top: 12px;
  border-radius: 16px;
  position: relative;
  animation: flipInX 1s;

  // 标题栏
  .cardtitle {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    font-size: 12px;

    // 头像、昵称部分
    .t1 {
      width: 170px;
      height: 40px;
      display: flex;
      justify-content: space-between;

      // 头像
      .cardtx {
        width: 40px;
        height: 40px;
        border-radius: 24px;
      }
      // 发帖人昵称
      .cardname {
        width: 120px;
        height: 100%;
        text-align: left;
      }
    }

    // 发帖时间部分
    .times {
      width: 160px;
      height: 40px;
      text-align: center;
    }
  }

  //帖子图片
  .cardimg {
    position: absolute;
    top: 80px;
    left: 5%;
  }

  // 帖子文章内容域
  .cardtext {
    position: absolute;
    top: 80px;
    right: 5%;
    width: 240px;
    height: 80px;
    padding: 4px;
    // 禁止文本域缩放
    resize: none;
    border-radius: 12px;
    font-size: 12px;
  }
  // 帖子互动栏
  .hudong {
    width: 90%;
    height: 48px;
    position: absolute;
    top: 180px;
    // background: lightcoral;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 0 12px 0 12px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 14px;

    > div {
      width: 16%;
      height: 72%;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0.6;

      &:hover {
        opacity: 1;
      }

      > li {
        list-style: none;
      }

      > i {
        margin-left: 5px;
        font-style: normal !important;
        font-family: '宋体';
        font-weight: bold;
      }
    }
  }
}
</style>
