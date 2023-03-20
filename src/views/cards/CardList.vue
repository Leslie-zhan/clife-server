<template>
  <!-- 个人帖子中心 -->
  <div class="main">
    <div class="cardheader">
      <h2 style="text-align: center">{{ thisUname }} 个人帖子中心</h2>
      <div>
        <div>
          <img :src="thisAvatarurl" alt="" />
        </div>
        <i class="allfont">{{ thisAllCardNum }}个帖子</i>
        <i class="allfont">{{ thisLikes }}个点赞</i>
        <i class="allfont">{{ thisFollowNum }}个订阅</i>
      </div>
    </div>
    <div class="cardmain">
      <div class="mycard" v-for="i in allCardList" :key="i.i">
        <img :src="i.pics" alt="" />
        <i class="allfont text-one">标题：{{ i.camtitle }}</i>
        <i class="allfont">{{ i.camcomtype }}</i>
        <i class="allfont text-one">内容：{{ i.content }}</i>
        <ul>
          <el-button
            type="primary"
            @click="$router.push(`/cls/card-detail/${i.camcomid}|${i.cuserid}`)"
            >详情</el-button
          >
          <el-tooltip
            class="item"
            effect="dark"
            content="非发帖人 无权操作"
            placement="right"
            :disabled="toDelete"
          >
            <el-button type="danger" @click="toDeleteCard(i.camcomid)"
              >删除</el-button
            >
          </el-tooltip>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allCardList: [],
      // 被查看的用户id
      thisUserid: '',
      // 当前登录用户id
      nowUserid: '',
      // 控制是否禁用删除按钮
      toDelete: true,
      // 头像
      thisAvatarurl: '',
      // 用户名
      thisUname: '',
      // 所有帖子量
      thisAllCardNum: '',
      // 获得点赞量
      thisLikes: '',
      // 关注量
      thisFollowNum: '',
    }
  },
  mounted() {
    // 获取页面传参
    let id = this.$route.params.id ? this.$route.params.id : ''
    this.thisUserid = id
    // 获取当前登录用户id
    this.nowUserid = sessionStorage.getItem('clsUser')
      ? JSON.parse(sessionStorage.getItem('clsUser')).userid
      : ''

    this.toDelete = this.nowUserid == this.thisUserid ? true : false

    this.getAllCard()
  },
  methods: {
    // 加载id下所有帖子信息
    getAllCard() {
      this.$https.camcomInfo
        .useridAllCard({ userid: this.thisUserid })
        .then(res => {
          console.log('当前被查看用户所有帖子信息', res.data.data)
          this.allCardList = res.data.data[0]
          this.thisAvatarurl = res.data.data[1][0].avatarurl
          this.thisUname = res.data.data[1][0].uname
          this.thisAllCardNum = res.data.data[2][0].allCardNum
          this.thisLikes = res.data.data[3][0].sumLikes
          this.thisFollowNum = res.data.data[4][0].allfensi
        })
    },
    // 删除帖子
    toDeleteCard(x) {
      if (!this.nowUserid) {
        this.$message({
          message: '请先登录',
          type: 'error',
          center: true,
        })
        this.$router.push('/login')
        return
      }
      // 如果该帖子发帖人不是当前登录用户 则返回
      if (this.nowUserid != this.thisUserid) return
      this.$https.camcomInfo.deleteCard({ camcomid: x }).then(res => {
        console.log('删除帖子', res.data)
        if (res.data.data.affectedRows == 1) {
          this.$message({
            message: '删除成功',
            type: 'success',
            center: true,
          })
          this.getAllCard()
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  filter: blur(0.1px);
}

.cardheader {
  width: 900px;
  height: 160px;
  // background: rgb(239, 247, 247);
  position: relative;
  // animation: fadeInUp 1s;

  h2 {
    margin-top: 12px;
  }
  div,
  h2,
  img,
  i {
    animation: zoomIn 1s;
  }

  > div {
    width: 320px;
    height: 72px;
    margin-top: 12px;
    margin-left: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
      width: 72px;
      height: 72px;
      border-radius: 10px;
      background: white;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 68px;
        height: 68px;
        border-radius: 10px;
      }
    }
    i {
      cursor: col-resize;
      height: 32px;
      display: block;
      border-radius: 6px;
      background: rgb(31, 31, 31);
      line-height: 32px;
      padding: 0 8px;
      &:hover {
        opacity: 0.8;
      }
    }
  }
}
.cardheader::before {
  content: '';
  width: 900px;
  height: 160px;
  position: absolute;
  top: 0;
  left: 0;
  // -webkit-filter: blur(5px);
  // webkit-filter: blur(5px);
  // -moz-filter: blur(5px);
  // -o-filter: blur(5px);
  // -ms-filter: blur(5px);
  // filter: blur(5px);
  // filter: blur(1px);
  // backdrop-filter: 10px;
  z-index: -10;
  background: transparent url(../../../public/img/cards/背景1.jpg) center center
    no-repeat;
  background-size: cover;
}
.cardmain {
  width: 900px;
  height: auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background: whitesmoke;
  padding-bottom: 24px;
  border-radius: 0 0px 12px 12px;
  padding-top: 12px;
  margin-bottom: 24px;
  animation: fadeInUp 1s;

  .mycard {
    margin-top: 12px;
    width: 96%;
    height: 56px;
    background: white;
    border-radius: 8px;
    position: relative;

    > img,
    i,
    ul {
      height: 36px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      line-height: 36px;
      animation: zoomIn 1s;
    }

    img {
      left: 5%;
      width: 48px;
    }
    i {
      cursor: pointer;
      &:hover {
        opacity: 0.5;
      }
    }
    :nth-child(2) {
      left: 20%;
      max-width: 120px;
    }
    :nth-child(3) {
      color: white;
      left: 32%;
      max-width: 300px;
      background: rgb(61, 162, 250);
      height: 18px;
      line-height: 18px;
      padding: 2px;
      border-radius: 6px;
    }
    :nth-child(4) {
      left: 40%;
      max-width: 300px;
    }
    ul {
      left: 80%;
      button {
        height: 100%;
      }
    }
  }
}
</style>
