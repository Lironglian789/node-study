// 二进制 图片操作
const fs = require('fs')
const rs = fs.createReadStream('./img.png')
const ws = fs.createReadStream('./img2.png')
rs.pipe(ws)