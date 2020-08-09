// 暗号：分治算法
const fs = require('fs')
module.exports.createLoader = config => {
  const loader = (scanFloader, cb) => {
    const files = fs.readdirSync(scanFloader)
    files.forEach(filename => {
      filename = filename.replace('.js', '')
      const file = require(scanFloader + '/' + filename)
      cb(filename, file)
    })
  }
  return {
    initFunction: scanFloader => {
      const ret = {}
      loader (scanFloader, (filename, file) => {
        ret[filename] = file(config)
      })
      return ret
    }
  }
}