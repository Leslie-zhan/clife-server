// 用于封装请求路径前缀

// 1.开发环境：DEV
// 2.生产环境：PRO

const URLENV = {
  DEV: {
    // 开发环境
    CLSURL: 'http://localhost:9432/',
    UPLOADURL: 'http://localhost:9000/',
  },
  PRO: {
    // 生产环境
  },
}

export default URLENV.DEV
