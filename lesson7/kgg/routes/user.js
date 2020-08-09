module.exports = {
  // /user/
  'get /': async app => {
    // ctx.body = '用户首页'
    // 抽离通⽤逻辑⾄service⽂件夹
    const name = await app.$service.user.getName()
    app.ctx.body = '用户：' + name
  },
  // /user/info
  'get /info': app => {
    // ctx.body = '用户详情页'
    app.ctx.body = '用户年龄：' + app.$service.user.getAge()
  }
}