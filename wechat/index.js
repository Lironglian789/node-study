
const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const wechat = require('co-wechat')
const IO = require('koa-socket')
const io = new IO()

const wechtAPI = require('co-wechat-api')
const api = new wechtAPI(config.appid, config.appsecret)

// 实现消息接口
io.attach(app)
app._io.on('connection',socket => {
    console.log('socket connection..')
})
router.all('/wechat', wechat(config).middleware(
  async message => {
     app._io.emit('chat',message)
    return 'Hello Worls!' + message.content
  }
)) 

// 调用一个服务端接口
router.get('/getFollowers', async ctx => {
  let res = await api.getFllowers()
  ctx.body = res
})

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);

