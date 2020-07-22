// 内置模块
const os = require('os')
const men = os.freemem() / os.totalmem()
console.log(`内存占用率${men.toFixed(2)}`)

// 第三方模块
const repo = 'github:su37josephxia/vue-template' // 下载的地址
const desc = '../test' // 输出的文件路径
const {clone} = require('./download')
clone(repo, desc)
