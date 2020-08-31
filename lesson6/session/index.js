// session-cookie方式
const Koa = require('koa')
const router = require('koa-router')()
const session = require('koa-session')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const app = new Koa()

// 配置session 的中间件
app.use(cors({
  credentials: true
}))
app.keys = ['some secret']

app.use(static(__dirname + '/'))
app.use(bodyParser())
app.use(session(app))

// 鉴权
app.use((ctx, next) => {
  if (ctx.url.indexOf('login') > -1) {
    next()
  } else {
    if (!ctx.session.userinfo) {
      ctx.body = {
        message: '登录失败'
      }
    } else {
      next()
    }
  }
})

// 登录
// router.post('/user/login', async ctx => {
//   const {body} = ctx.request
//   // 校验
//   ctx.session.userinfo = body.username
//   ctx.body = {
//     message: '登录成功'
//   }
// })
router.post('/users/login', async (ctx) => {
  const { body } = ctx.request
  console.log('body',body)
  //设置session 
  ctx.session.userinfo = body.username
  ctx.body = { message: "登录成功" } 
})

// 退出登录
router.post('/users/logout', async ctx => {
  delete ctx.session.userinfo
  ctx.body = {
    message: '登出成功'
  }
})

// 获取用户信息
router.get('/users/getUser', async ctx => {
  ctx.body = {
    message: 'OK',
    userinfo: ctx.session.userinfo
  }
})

app.use(router.routes())
app.listen(3000)

