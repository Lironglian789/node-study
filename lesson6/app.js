// koa 中的session使用
const koa = require('koa')
const app = new koa()
const session = require('koa-session')
// koa-redis
const redisStore = require('koa-redis')
const redis = require('redis')
const redisClient = redis.createClient(6379, 'localhost')
const wrapper = require('co-redis')
const client = wrapper(redisClient)

// 签名key keys作用 用来对cookie进行签名
app.keys = ['some secret']

// session 配置
const SESS_CONGIG = {
  key: 'kkb:sess', // cookie键名
  maxAge: 86400000, // 有效期，默认一天
  httpOnly: true, // 仅服务器修改
  signed: true, // 签名设置
  store: redisStore({client})
}

// 注册
app.use(session(SESS_CONGIG, app))

// 查看redis
// app.use(async (ctx, next) => {
//   const keys = await client.keys('*')
//   keys.forEach(async key => {
//     console.log(await client.get(key))
//     await next()
//   })
// })

// 测试
app.use(ctx => {
  // 查看redis
  redisClient.keys('*',(err,keys) => {
    console.log('keys:',keys)
    keys.forEach(key => {
      redisClient.get(key, (err,val) => {
        console.log(val)
      })
    })
  })

  if (ctx.path === '/favicon.ico') return
  // 获取
  let n = ctx.session.count || 0
  // 设置
  ctx.session.count = ++n
  ctx.body = `第${n}次`
})
app.listen(3000)