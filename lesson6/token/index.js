const Koa = require('koa')
const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const jwtAuth = require('koa-jwt')
const secret = "it's a secret"
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const app = new Koa()
app.keys = ['some secret']

app.use(static(__dirname + '/'))
app.use(bodyParser())

// 登录
router.post('/users/login-token', async ctx => {
  const {body} = ctx.request
  const userinfo = body.username
  // 验证 略
  // 赋权
  ctx.body = {
    message: 'login Ok',
    user: userinfo,
    token: jwt.sign({
      data: userinfo,
      exp: Math.floor(Date.now()/1000) + 60 * 60
    }, secret)
  }
})

// 获取用户信息
router.get('/users/getUser-token',
  jwtAuth({
    secret
  }),
  async ctx => {
    console.log(ctx.state.user)
    ctx.body = {
      message: 'user OK',
      userinfo: ctx.state.data
    }
  }
)

// 登出
app.use(router.routes())
app.use(router.allowedMethods());
app.listen(3000)