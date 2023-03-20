<template>
  <div style="display: flex; justify-content: center; flex-wrap: wrap">
    <div class="starhead">
      <li
        @click="cardStar()"
        :style="{
          'background-color': showStar ? `black` : `gray`,
        }"
      >
        帖子收藏
      </li>
      <el-divider direction="vertical"></el-divider>
      <li
        @click="cardCommodity()"
        :style="{
          'background-color': !showStar ? `black` : `gray`,
        }"
      >
        商品收藏
      </li>
    </div>
    <div class="main1" v-if="showStar">
      <div
        class="starcard"
        v-for="i in starCardList"
        :key="i.xx"
        v-show="!notstar"
      >
        <img :src="i.pics" alt="" />
        <i class="allfont">{{ i.camtitle }}</i>
        <i class="allfont">类型：{{ i.camcomtype }}</i>
        <i class="allfont">被收藏量：{{ i.star }}</i>

        <ul>
          <el-button
            type=""
            @click="$router.push(`/cls/card-detail/${i.camcomid}|${i.cuserid}`)"
            >详情</el-button
          >
          <el-button type="primary" @click="cancelStar(i)">取消收藏</el-button>
        </ul>
      </div>
      <div class="notstar" v-if="notstar">
        <img src="../../../public/img/cards/星,星星,星形,半星.svg" alt="" />
        <i class="allfont">您还没有收藏哦</i>
      </div>
    </div>

    <div class="main2" v-if="!showStar"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 控制页面显示
      showStar: true,
      // 当前登录用户
      nowUserid: '',
      starCardList: [],
      // 没有收藏提示
      notstar: false,
    }
  },
  mounted() {
    // 获取当前登录用户id
    this.nowUserid = sessionStorage.getItem('clsUser')
      ? JSON.parse(sessionStorage.getItem('clsUser')).userid
      : ''
    this.allStarCard()
  },
  methods: {
    // 1.查询所有的收藏帖子
    allStarCard() {
      this.$https.hudong.starCardList({ userid: this.nowUserid }).then(res => {
        console.log(res)
        this.starCardList = res.data.data
        if (!this.starCardList.length) this.notstar = true
      })
    },
    // 2.取消帖子收藏
    cancelStar(x) {
      this.$https.hudong
        .addStar({
          collectorid: this.nowUserid,
          starcamid: x.camcomid,
          starNum: x.star,
        })
        .then(res => {
          console.log('取消收藏', res.data.data)
          if (res.data.data.x == false) {
            this.$message({
              message: `取消 ${x.camtitle} 收藏成功`,
              duration: 1000,
              type: 'success',
              center: true,
            })
            this.allStarCard()
          }
        })
    },
    cardStar() {
      this.showStar = true
    },
    cardCommodity() {
      this.showStar = false
    },
  },
}
</script>

<style lang="scss" scoped>
.starhead {
  width: 900px;
  height: 64px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: rgb(129, 123, 123);
  cursor: pointer;
  el-divider {
    height: 100px;
  }
  li {
    list-style: none;
    color: rgb(219, 214, 214);
    width: 100px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    border-radius: 6px;
    transition: all linear 0.7s;
    // background-color: lightcyan;
  }
}

.main1,
.main2 {
  width: 900px;
  min-height: 560px;
  transition: all linear 0.8s;
  display: flex;
  flex-direction: column;
  justify-content: start;
  flex-wrap: wrap;
  align-items: center;
  padding-bottom: 18px;
  margin-bottom: 18px;
  border-radius: 0 0 12px 12px;
  background: rgb(245, 242, 242);
}

.main1 {
  height: auto;

  // 没有收藏
  .notstar {
    width: 160px;
    height: 160px;
    display: flex;
    align-items: start;
    flex-wrap: wrap;
    justify-content: center;
    i {
      width: 100%;
      text-align: center;
    }
  }
}

.main2 {
  font-size: 12px;
}

.starcard {
  width: 720px;
  height: 48px;
  background: rgb(233, 228, 228);
  margin-top: 24px;
  animation: fadeInUp 1s;
  display: flex;
  justify-content: space-around;
  align-items: center;

  img,
  i,
  button {
    animation: zoomIn 1s;
  }
  img,
  i {
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }

  img {
    width: 64px;
    height: 36px;
  }

  i {
    min-width: 90px;
  }
}
</style>
