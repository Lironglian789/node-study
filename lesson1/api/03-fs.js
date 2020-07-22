const fs = require('fs')

// 同步
const data = fs.readFileSync('./download.js')
console.log(data, data.toString())

// 异步 data 是二进制数据，可以通过toString()转换成可识别的字符串
fs.readFile('./download.js', (err, data) => {
  if (err) throw err
  console.log(data)
})