// 暗号： 回溯算法
module.exports.brackets = (target, property) => {
  const old = target.prototype[property]
  target.prototype[property] = msg => {
    msg = `[${msg}]`
    return old(msg)
  }
}

module.exports.sender = name => (target, property) => {
  let log = target.prototype[property]
  target.prototype[property] = msg => {
    msg = `${name} : ${msg}`
    return log(msg)
  }
}
