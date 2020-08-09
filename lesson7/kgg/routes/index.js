// module.exports = {
//   'get /': async ctx => {
//     ctx.body = '首页'
//   },
//   'get /detail': async ctx => {
//     ctx.body = '详情页'
//   }
// }

// 抽取route中业务逻辑⾄controller
// 约定： controller⽂件夹下⾯存放业务逻辑代码，框架⾃动加载并集中暴露
// 实现：函数柯里化==> 对象==》 对象工厂
// 需要传递kkb实例并访问其$ctrl中暴露的控制器
module.exports = app => ({
  'get /': app.$ctrl.home.index,
  'get /detail': app.$ctrl.home.detail
})
  