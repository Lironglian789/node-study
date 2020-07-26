// 知识储备 getter setter方法
const kaikeba = {
  info: {
    name: '开课吧'
  },
  get name () {
    return this.info.name
  },
  set name (val) {
    this.info.name = val
  }
}
console.log(kaikeba.name)
kaikeba.name = 'kai ke ba'
console.log(kaikeba.name)


// vue 属性多，不确定 规则固定：加入劫持，实现数据响应
// koa 属性少，规则不固定，只能一个一个的写