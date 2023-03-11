<template>
  <div>
    <!-- 二级评论组件 -->
    <el-dialog
      title="楼层详情"
      width="640px"
      :visible.sync="showCrad"
      top="10px"
      class="dialog"
      center
    >
      <div class="main">
        <!-- 头像 昵称 性别 -->
        <div class="logleft">
          <div><img :src="acciptInfo.lztx" alt="" /></div>
          <ul>
            <i class="fs">{{ acciptInfo.lzname }}</i
            ><i class="fs">{{ acciptInfo.lzsex }}</i>
          </ul>
        </div>

        <!-- 右边栏1 -->
        <div class="right1">
          {{ acciptInfo.abpl }}
        </div>
        <div class="right2">
          <!-- 右边栏2 -->
          <div class="allpl">
            <!-- 单个二级评论 -->
            <div class="oneejpl" v-for="i in erjiInfo" :key="i.i">
              <div>
                <img :src="i.avatarurl" alt="" />
                <i class="name fs">{{ i.uname }}:</i>
                <i class="x2pl fs">
                  <i v-if="i.x3" class="fs" style="color: blue"
                    >回复 {{ i.x3 }} </i
                  >{{ i.bcontent }}</i
                >
              </div>
              <ul class="fs">
                <i class="fs">{{ i.btime | changeTime('llll') }}</i>
                <i class="fs" @click="toEjPl(i.breplyid, i.uname)">回复</i>
              </ul>
            </div>
          </div>
          <!-- 发言栏 -->
          <div class="fayan">
            <i class="hfText fs" v-bind:class="{ fadeIn: dhua }"
              >回复--<i class="fs">{{ callBackObj }}</i></i
            >
            <el-input
              v-model="logInput"
              style="width: 64%"
              placeholder="请输入内容"
              @keyup.enter.native="fbEjPl()"
            >
            </el-input>
            <el-button type="primary" @click="fbEjPl()">发表</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    getInfo: {
      default: {},
      type: Object,
    },
  },
  data() {
    return {
      // 从父组件获得的信息
      acciptInfo: this.getInfo,
      // 控制模态对话框是否显示
      showCrad: false,
      logInput: '',
      // 二级评论信息
      erjiInfo: [],
      // 回复对象
      callBackObj: '楼主',
      // 判断是回复楼主的一级评论，还是回复二级评论  true为回复一级评论， flase为回复二级评论
      whatType: true,
      // 当前登录用户id
      nowUid: '',
      // 被回复人id
      bffId: '',
      // 控制动画效果
      dhua: true,
    }
  },

  mounted() {
    console.log('从父组件获得信息', this.acciptInfo)
    this.nowUid = sessionStorage.getItem('clsUser')
      ? JSON.parse(sessionStorage.getItem('clsUser')).userid
      : ''
  },

  methods: {
    //1.打开发帖
    createNew() {
      this.showCrad = true
    },
    //2. 加载二级评论信息
    getTwoPlInfo(x) {
      // 一级评论的Id
      this.acciptInfo.oneId = x

      this.$https.camcomInfo.oneAllTwoPl({ oneId: x }).then(res => {
        console.log('一级评论下所有的二级评论信息', res.data.data)
        this.erjiInfo = res.data.data
      })
    },
    // 3.发评论方法
    fbEjPl() {
      // 如果whatType为true则发布对一级评论的二级评论  为flase则发布对二级评论的二级评论
      // 对二级评论的被回复人id
      // bacancomid:该条一级评论的id  breplyid:回复人id  bereplyid:二级评论被回复人id  bcontent:回复内容
      this.$https.camcomInfo
        .addEjPl({
          bacancomid: this.acciptInfo.oneId,
          breplyid: this.nowUid,
          bereplyid: this.bffId,
          bcontent: this.logInput,
        })
        .then(res => {
          console.log('添加二级评论：', res.data.data)
        })
      this.getTwoPlInfo(this.acciptInfo.oneId)
      this.bffId = ''
      this.callBackObj = '楼主'
      this.logInput = ''
    },
    // 4.有被回复人的恢复
    toEjPl(x, y) {
      this.bffId = x
      this.callBackObj = y
    },
  },
}
</script>

<style lang="scss" scoped>
.fs {
  font-size: 12px !important;
  font-style: normal !important;
  font-weight: 600 !important;
  line-height: 24px !important;
  font-family: '宋体';
}
.dialog {
  backdrop-filter: blur(15px);
}
.main {
  margin-top: -12px;
  width: 100%;
  height: 520px;
  background: whitesmoke;
  position: relative;
}

// 左侧
.logleft {
  width: 100px;
  height: 100%;
  background: rgb(233, 230, 230);
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  > div {
    margin-top: 10px;
    width: 64px;
    height: 64px;
    background: white;
    padding: 2px;
    display: flex;
    justify-content: center;
    img {
      width: 60px;
      height: 60px;
    }
  }
  > ul {
    position: absolute;
    width: 64px;
    height: 24px;
    left: 18px;
    top: 80px;
    display: flex;
    justify-content: space-around;
    overflow: hidden;
  }
}

// right1
.right1 {
  position: absolute;
  top: 10px;
  width: 450px;
  height: 160px;
  left: 120px;
  overflow-y: auto;
  cursor: pointer;
}

.right2 {
  position: absolute;
  left: 100px;
  top: 172px;
  width: 490px;
  height: 348px;
}
// 右边栏2
.allpl {
  margin-top: 10px;
  width: 450px;
  height: 260px;
  background: white;
  margin-left: 20px;
  padding-top: 10px;
  overflow-y: auto;

  // 单个二级评论
  .oneejpl {
    cursor: pointer;
    width: 445px;
    margin-left: 5px;
    height: auto;
    color: rgb(94, 93, 93);
    > div {
      height: auto;
      width: 100%;
      display: flex;
      justify-content: start;
      img {
        width: 24px;
        height: 24px;
      }
      .name {
        margin-left: 2px;
        max-width: 80px;
        max-height: 24px;
        color: rgb(47, 47, 205);
      }
      .x2pl {
        text-align: start;
        line-height: 24px;
        min-height: 24px;
        height: auto;
        min-width: 120px;
        max-width: 360px;
      }
    }
    ul {
      width: 100%;
      height: 16px;
      line-height: 16px;
      display: flex;
      justify-content: end;
      :nth-child(2) {
        border: 1px solid rgb(183, 179, 179);
      }
      i {
        display: block;
        height: 100%;
        line-height: 16px !important;
        margin-right: 6px;
      }
    }
  }
}
.hfText {
  width: auto;
  height: 38px;
  border-radius: 4px;
  padding-left: 4px;
  padding-right: 4px;
  line-height: 38px !important;
  border: 1px solid rgb(198, 194, 194);
  opacity: 0.5;
  > i {
    color: blue;
    width: auto;
    height: 100%;
  }
}
.fadeIn {
  animation: flipInX 1s;
}
.fayan {
  width: 450px;
  height: 60px;
  background: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-left: 20px;
}
</style>
