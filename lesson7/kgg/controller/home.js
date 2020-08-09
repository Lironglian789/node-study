// module.exports = {
//   index: async ctx => {
//     ctx.body = '首页CTRL'
//   },
  // detail: async ctx => {
  //   ctx.body = '详情页CTRL'
  // }
// }

// 柯里化
// 抽离通⽤逻辑⾄service⽂件夹
module.exports = app => ({
  index: async ctx => {
    const name = await app.$service.user.getName()
    app.ctx.body = name
  },
  detail: async ctx => {
    app.ctx.body = '详情页CTRL'
  }
})

