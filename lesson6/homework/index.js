// 暗号：贪心算法
const crypto = require('crypto')
module.exports.createToken = token => {
    const ary = token.split('.')
    if (ary.length !== 3) {
      return
    }
  return {
    getExp: () => {
      const decrypted = JSON.parse(new Buffer(ary[1], 'base64').toString())
      return decrypted.exp;
    },
    vertfy: key => {
      const hamc = crypto.createHmac('SHA256', key).update(ary[0]+'.' + ary[1]).digest('base64')
      return hamc === ary[2] + '='
    }
  }
}