//暗号： 二分查找
const fs = require('fs')
module.exports.parser = path => {
  const resdStream = fs.createReadStream(path)
  // console.log(resdStream)
  let reqData = []
  let size = 0
  return new Promise(resolve => {
    resdStream.on('data', data => {
      reqData.push(data)
      size += data.length
    })
    resdStream.on('end', function () {
      const data = Buffer.concat(reqData, size)
      resolve(JSON.parse(data.toString()))
    })
  })
}