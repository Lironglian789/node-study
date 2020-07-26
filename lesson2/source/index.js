// 封装前
// const http = require('http')
// const server = http.createServer((req, res) => {
//   res.statusCode = 200
//   res.end('hi kai ke ba')
// })
// server.listen(4000, () => {
//   console.log('监听端口4000')
// })

const KKB = require('./kkb')
const app = new KKB()
// 基本方法的封装
// app.use((req, res) => {
//   res.statusCode = 200
//   res.end('hi kai ke ba888')
// })
// 进一步封装
// app.use(ctx => {
//   ctx.body = 'hello world'
// })
// app.listen(4000, () => {
//   console.log('监听端口4000')
// })

// 合成函数的实现
// const delay = () => new Promise(resolve => 
// setTimeout(() => {
//   resolve()
// }, 2000))

// app.use(async (ctx, next) => {
//   ctx.body = '1'
//   await next ()
//   ctx.body += '5'
// })
// app.use(async (ctx, next) => {
//   ctx.body += '2'
//   await next ()
//   ctx.body += '4'
// })
// app.use(async (ctx, next) => {
//   ctx.body += '3'
// })
// app.listen(4000, () => {
//   console.log('监听端口4000')
// })

// 静态文件服务 koa-static
const static = require('./static')
app.use(static(__dirname + '/public')) 
console.log(static)

// 路由：策略模式
const Router = require('./router')
const router = new Router()

// router.get('/index', async ctx => { ctx.body = 'index page'})
// router.post('/post', async ctx => { ctx.body = 'post page'})
// router.get('/list', async ctx => { ctx.body = 'list page'})

// // 路由实例输出父中间件 router.routes()
// app.use(router.routes())
app.listen(4000)