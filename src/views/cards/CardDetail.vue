<template>
  <div>
    <div class="carddetailmain">
      <!-- 顶部栏 -->
      <div class="topnav">
        <!-- 返回上一级按钮 -->
        <div class="goback">
          <i class="el-icon-d-arrow-left" @click="$router.go(-1)"></i>
        </div>
        <!-- 发帖人发帖量，获得点赞量介绍 -->
        <div class="makeCardInfo">
          <!-- 发帖人头像 -->
          <img
            class="makeCTx"
            :src="makecardInfo[0] ? makecardInfo[0][0].avatarurl : ''"
          />
          <!-- 发帖量 -->
          <i class="ftl fontstyles"
            >总帖子量：{{
              makecardInfo[1] ? makecardInfo[1][0].allNumber : ''
            }}</i
          >
          <!-- 获得点赞量 -->
          <i class="zdzl fontstyles"
            >总获点赞：{{
              makecardInfo[2] ? makecardInfo[2][0].sumNumber : ''
            }}</i
          >
          <!-- 获得关注量 -->
          <i class="hdgz fontstyles"
            >总获关注：{{
              makecardInfo[3] ? makecardInfo[3][0].allfensi : ''
            }}</i
          >
        </div>
        <!-- 关注操作 -->
        <div class="guanzu">
          <i>{{ makecardInfo[4] ? makecardInfo[4][0].uname : '' }}</i>
          <el-button type="info" plain v-if="existFollow" @click="follow()"
            >已关注</el-button
          >
          <el-button type="success" plain v-if="!existFollow" @click="follow()"
            >关注</el-button
          >
        </div>
      </div>
      <!-- 中间层导航栏 -->
      <div class="centerNav">
        <button class="fontstyles">当前第{{ nowPage }}页</button>
        <div class="fyq">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="Total"
            :current-page.sync="nowPage"
            @current-change="changePageNum"
          >
          </el-pagination>
        </div>
      </div>
      <!-- 帖子标题栏 -->
      <div class="cardTitle">
        <div class="title fontstyles">{{ mainCardInfo.camtitle }}</div>
        <ul>
          <button class="fontstyles" @click="toBottom()">回复</button>
          <button class="fontstyles">点赞</button>
          <button class="fontstyles">收藏</button>
        </ul>
      </div>
      <!-- 帖子主体 -->
      <div class="cardCenter">
        <div class="info">
          <div>
            <img :src="mainCardInfo.avatarurl" alt="" />
          </div>
          <ul>
            <i class="fontstyles">{{ mainCardInfo.uname }}</i
            ><i class="fontstyles">{{ mainCardInfo.sex }}</i>
          </ul>
        </div>
        <div class="msg">
          <div class="pl fontstyles">楼主：{{ mainCardInfo.content }}</div>
          <div class="pic">
            <img :src="mainCardInfo.pics" alt="" />
          </div>
          <div class="tongji">
            <i class="fontstyles"
              >帖子获赞：{{
                makecardInfo[1] ? makecardInfo[1][0].allNumber : ''
              }}</i
            >
            <i class="fontstyles">帖子回复帖：{{ Total }}</i>
            <i class="fontstyles"
              >发表于 {{ mainCardInfo.camcomtime | changeTime('llll') }}</i
            >
          </div>
        </div>
      </div>

      <!-- 一级评论主体 -->
      <div class="onemain" v-for="(i, x) in onePlList" :key="i.i">
        <div class="left">
          <div>
            <img :src="i.avatarurl" alt="" />
          </div>
          <ul>
            <i class="fontstyles">{{ i.uname }}</i
            ><i class="fontstyles">{{ i.sex }}</i>
          </ul>
        </div>
        <div class="right">
          <div class="pl fontstyles">{{ i.acontent }}</div>
          <!-- 点赞 评论 发表时间 -->
          <div class="tongji">
            <i class="fontstyles">{{ (nowPage - 1) * 5 + x + 1 }}楼</i>
            <i>
              <img src="../../../public/img/cards/警告.svg" alt="" />
              <i class="fontstyles">举报</i>
            </i>
            <i class="fontstyles"
              >评论时间：{{ i.apltime | changeTime('llll') }}</i
            >
            <i
              class="fontstyles"
              @click="
                getejpl(
                  i.avatarurl,
                  i.uname,
                  i.sex,
                  i.acancomid,
                  i.userid,
                  i.acontent
                )
              "
              >回复({{ Total }})</i
            >
          </div>
        </div>
      </div>
      <!-- 发表一级评论 -->
      <div class="fbOnePl">
        <ul>
          <img src="../../../public/img/cards/评论.svg" alt="" />
          <i class="fontstyles">发表评论</i>
        </ul>
        <el-input
          class="one_pl"
          v-model="oneInput"
          style="width: 64%"
          placeholder="请输入内容"
          @keyup.enter.native="fbPl()"
        >
        </el-input>
        <el-button type="primary" @click="fbPl()">发表</el-button>
      </div>
    </div>
    <div>
      <!-- 二级评论展示区 -->
      <Ejpl ref="dialog" :getInfo="goInfo" />
    </div>
  </div>
</template>

<script>
import Ejpl from '../../components/Ejpl.vue'
import BackTop from '@/components/BackTop.vue'
export default {
  components: {
    Ejpl,
    BackTop,
  },
  data() {
    return {
      // 发帖人消息
      makecardInfo: [],
      // 表示当前用户是否关注了该楼主
      existFollow: false,
      // 现在登录用户的用户id
      nowuserid: '',
      // 楼主id
      RUserId: '',
      // 该帖子编号
      RCamcomId: '',
      // 每页的数据量
      pageSize: 5,
      // 数据总量
      Total: 5,
      // 当前页
      nowPage: 1,
      // 该帖子主体内容
      mainCardInfo: {},
      // 一级评论信息
      onePlList: [],
      // 给二级评论传递的值
      goInfo: {
        // 该条一级评论id
        oneId: '',
        lztx: '',
        lzname: '',
        lzsex: '',
        userid: '',
        abpl: '',
      },
      // 输入框绑定
      oneInput: '',
    }
  },
  mounted() {
    // 获取页面传参
    let camcomid = this.$route.params.id
    // 获取当前登录用户id
    this.nowuserid = sessionStorage.getItem('clsUser')
      ? JSON.parse(sessionStorage.getItem('clsUser')).userid
      : ''
    // console.log(this.nowuserid)
    // 传入的帖子编号
    this.RCamcomId = camcomid.split('|')[0] ? camcomid.split('|')[0] : ''
    // 传入的发帖人编号
    this.RUserId = camcomid.split('|')[1] ? camcomid.split('|')[1] : ''
    this.getNavInfo()
    this.onePlTable(1)
    this.howManyhf()
    this.getInfoByCardId()
  },
  methods: {
    // 1.获取nav所有信息方法
    getNavInfo() {
      this.$https.camcomInfo
        .makeCardInfo({
          userid: this.RUserId,
          camcomid: this.RCamcomId,
          nowuserid: this.nowuserid,
        })
        .then(res => {
          this.makecardInfo = res.data.data
          console.log(this.makecardInfo)
          if (this.makecardInfo[5][0]) {
            this.existFollow = true
          } else {
            this.existFollow = false
          }
        })
    },

    // 2.关注，取消关注方法
    follow() {
      if (this.existFollow) {
        // 取消关注
        this.$https.camcomInfo
          .qxFollow({
            id1: this.nowuserid,
            id2: this.RUserId,
          })
          .then(res => {
            if (res.data.code == 201) {
              this.msgbox(res.data.msg, 'warning')
              this.getNavInfo()
            } else {
              this.msg('操作失败', 'danger')
            }
          })
      } else {
        // 关注方法
        if (this.nowuserid == this.RUserId) {
          this.msgbox('不能关注自己', 'error')
          return
        }
        // 没登录则跳转登录
        if (!this.nowuserid) {
          this.msgbox('请先登录', 'danger')
          this.$router.push('/login')
          return
        }
        this.$https.camcomInfo
          .toFollow({
            id1: this.nowuserid,
            id2: this.RUserId,
          })
          .then(res => {
            if (res.data.code == 201) {
              this.msgbox(res.data.msg, 'success')
              this.getNavInfo()
            } else {
              this.msgbox('操作失败', 'error')
            }
          })
      }
    },
    // 3.提示框
    msgbox(x, y) {
      this.$message({
        message: x,
        type: y,
        center: true,
        showClose: true,
        duration: 1600,
      })
    },
    // 4.加载一级评论表数据  x---当前页码
    onePlTable(x) {
      this.$https.camcomInfo
        .onePl({ camcomid: this.RCamcomId, x: x })
        .then(res => {
          // console.log('一级评论表数据', res.data.data)
          this.onePlList = res.data.data
        })
    },
    // 5.加载帖子回复数量
    howManyhf() {
      this.$https.camcomInfo
        .howManyCamcom({ camcomid: this.RCamcomId })
        .then(res => {
          // console.log('帖子回复数量：', res.data.data[0])
          this.Total = res.data.data[0].count
        })
    },
    // 6.切换页码方法
    changePageNum(val) {
      console.log(val)
      this.onePlTable(val)
    },
    // 7.根据帖子id查询帖子内容
    getInfoByCardId() {
      this.$https.camcomInfo.theCardId({ cardid: this.RCamcomId }).then(res => {
        // console.log('帖子详情信息', res.data.data[0])
        this.mainCardInfo = res.data.data[0]
      })
    },
    // 8.二级评论打开以及加载数据
    getejpl(x1, x2, x3, x4, x5, x6) {
      // 子组件Ejpl的自定义数据等于this.getInfo   子组件间接获得传参
      this.goInfo.lztx = x1
      this.goInfo.lzname = x2
      this.goInfo.lzsex = x3
      this.goInfo.oneId = x4
      this.goInfo.userid = x5
      this.goInfo.abpl = x6
      // 调用子组件方法
      // 打开二级评论dialog
      this.$refs.dialog.createNew()
      // 加载二级评论数据
      this.$refs.dialog.getTwoPlInfo(x4)
    },
    // 9.回到底部方法
    toBottom() {
      window.scroll({ top: 1200, left: 0, behavior: 'smooth' })
    },
    // 10.发表评论方法
    fbPl() {
      this.$https.camcomInfo
        .addYjPl({
          areplyid: this.nowuserid,
          aacancomid: this.RCamcomId,
          acontent: this.oneInput,
        })
        .then(res => {
          console.log('添加一级评论', res.data.data)
          this.oneInput = ''
          this.howManyhf()
          let x = Math.ceil(this.Total / 5)
          this.changePageNum(x)
          // this.onePlTable(x)
          this.nowPage = x
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.fontstyles {
  font-weight: 600;
  color: rgb(130, 120, 120);
  font-family: '宋体' !important;
  font-style: normal;
  font-size: 12px !important;
}
// 主体
.carddetailmain {
  font-family: '宋体';
  width: 900px;
  position: absolute;
  top: 72px;
  height: auto;
  left: 50%;
  transform: translateX(-50%);
  // background: lightcyan;

  // <!-- 顶部栏 -->
  .topnav {
    width: 100%;
    background: whitesmoke;
    height: 100px;
    position: relative;

    // 返回上一页
    .goback {
      width: 36px;
      height: 100%;
      background: rgb(208, 204, 204);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    // <!-- 发帖人发帖量，获得点赞量介绍 -->
    .makeCardInfo {
      height: 100%;
      width: 480px;
      // background: lightcoral;
      position: absolute;
      top: 0;
      left: 40%;
      transform: translateX(-50%);
      display: flex;
      justify-content: space-between;
      align-items: center;
      // 发帖人头像
      > .makeCTx {
        width: 64px;
        height: 64px;
        // border: 2px solid lightblue;
      }
      > i {
        width: 108px;
        height: 24px;
        line-height: 24px;
        // background: lightgoldenrodyellow;
      }
    }

    // 关注操作按钮
    .guanzu {
      width: 240px;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      > i {
        display: block;
        width: 64px;
        height: 64px;
        text-align: center;
        border-right: 2px solid rgb(178, 173, 173);
        font-size: 12px;
        font-weight: 600 !important;
        color: rgb(130, 120, 120) !important;
        font-style: normal !important;
        line-height: 64px;
        margin-right: 12px;
      }
    }
  }
}
//中间栏
.centerNav {
  width: 100%;
  height: 64px;
  background: rgba(200, 199, 199, 0.468);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  > button {
    position: absolute;
    left: 13.5%;
    width: 64px;
    height: 28px;
  }

  // > ul {
  //   position: absolute;
  //   top: 50%;
  //   transform: translateY(-50%);
  //   left: 4%;
  //   width: 180px;
  //   height: 32px;
  //   display: flex;
  //   justify-content: space-between;
  //   > i {
  //     height: 100%;
  //     line-height: 32px;
  //     text-align: center;
  //   }
  // }

  // 分页器
  .fyq {
    width: 320px;
    height: 32px;
    position: absolute;
    display: flex;
    justify-content: center;
  }
}
// 帖子标题栏
.cardTitle {
  width: 100%;
  height: 36px;
  background: whitesmoke;
  border-bottom: 1px solid rgb(222, 220, 220);
  position: relative;
  text-align: center;
  line-height: 36px;
  .title {
    width: 84px;
    height: 100%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: black;
  }
  ul {
    width: 180px;
    height: 100%;
    position: absolute;
    right: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    bottom {
      width: 36px;
      height: 24px;
      border: 1px solid rgb(222, 220, 220);
      line-height: 24px;
    }
  }
}
// 帖子内容主体
.cardCenter {
  width: 100%;
  height: 360px;
  max-height: 420px;
  background: whitesmoke;
  position: relative;
  // 左侧栏
  .info {
    width: 188px;
    height: 100%;
    background: rgba(200, 199, 199, 0.468);
    position: relative;

    div {
      width: 120px;
      height: 120px;
      background: white;
      position: absolute;
      left: 50%;
      top: 16px;
      transform: translateX(-50%);
      padding: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 116px;
        height: 116px;
      }
    }
    ul {
      width: 100px;
      height: 24px;
      position: absolute;
      left: 50%;
      top: 140px;
      transform: translateX(-50%);
      display: flex;
      justify-content: space-around;
      > i {
        display: block;
        width: auto;
        line-height: 24px;
        height: 100%;
      }
    }
  }
  // 右侧
  .msg {
    position: absolute;
    width: 560px;
    height: 360px;
    left: 29%;
    top: 0%;
    .pl {
      margin-left: 12px;
      padding-top: 12px;
      width: 360px;
      height: auto;
    }
    .pic {
      width: auto;
      height: auto;
      margin-left: 12px;
      margin-top: 12px;
      img {
        width: auto;
        height: auto;
        max-height: 220px;
        max-width: 512px;
      }
    }

    .tongji {
      position: absolute;
      bottom: 12px;
      margin-left: 12px;
      width: 600px;
      height: 32px;
      display: flex;
      justify-content: space-between !important;
      align-items: center;
      i {
        height: 32px !important;
        line-height: 32px;
      }
    }
  }
}

.clearfix::after {
  content: '';
  display: block;
  clear: both;
}
// 一级评论主体
.onemain {
  width: 100%;
  height: 220px;
  background: whitesmoke;
  border-top: 1px solid rgb(212, 212, 212);
  position: relative;

  > .left {
    position: relative;
    width: 188px;
    height: 100%;
    background: rgba(200, 199, 199, 0.468);
    div {
      width: 120px;
      height: 120px;
      background: white;
      position: absolute;
      left: 50%;
      top: 16px;
      transform: translateX(-50%);
      padding: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 116px;
        height: 116px;
      }
    }
    ul {
      width: 100px;
      height: 24px;
      position: absolute;
      left: 50%;
      top: 140px;
      transform: translateX(-50%);
      display: flex;
      justify-content: space-around;
      > i {
        display: block;
        width: auto;
        line-height: 24px;
        height: 100%;
      }
    }
  }

  > .right {
    position: absolute;
    width: 560px;
    height: auto;
    left: 29%;
    top: 0%;
    .pl {
      margin-left: 12px;
      padding-top: 12px;
      width: 360px;
      height: 180px;
      overflow-y: auto;
      font-size: 14px !important;
    }
    .tongji {
      cursor: pointer;
      margin-left: 256px;
      width: 360px;
      height: 32px;
      display: flex;
      justify-content: end !important;
      align-items: center;

      :nth-child(2),
      :nth-child(4) {
        color: rgb(27, 27, 193);
        &:hover {
          color: red;
        }
      }

      :nth-child(2) {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      > i {
        font-size: 10px !important;
        height: 32px !important;
        line-height: 32px;
        font-weight: 400;
        margin-left: 6px;
      }
    }
  }
}

.fbOnePl {
  border-top: 1px solid rgb(212, 212, 212);
  width: 900px;
  height: 64px;
  background: rgba(231, 230, 230, 0.468);
  display: flex;
  justify-content: space-around;
  align-items: center;
  ul {
    width: 120px;
    height: 32px;
    display: flex;
    justify-content: space-around;
    > i {
      height: 32px;
      line-height: 36px;
      font-size: 16px !important;
    }
  }
}
</style>
