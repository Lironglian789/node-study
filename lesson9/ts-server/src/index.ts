import * as Koa from 'koa'
import * as bodify from 'koa-body'
import * as serve from 'koa-static'
import * as timing from 'koa-xtime'
import * as Router from 'koa-router'
import {load} from './utils/route-decors'
import {resolve} from 'path'

import {Sequelize,SequelizeOptions} from 'sequelize-typescript'

const database = new Sequelize({
  port: 3306,
  database: 'kkb',
  username: 'developer',
  password: '123456789',
  dialect: 'mysql',
  models: [`${__dirname}/model`]
} as SequelizeOptions)
console.log(database);


database.sync({force: true})

const app = new Koa()
app.use(timing())
app.use(serve(`${__dirname}/public`))
app.use(
  bodify({
    multipart: true,
    strict: true // 使用非严格模式，解析 delete 请求的请求体
  })
)

// app.use((ctx: Koa.Context) => {
//   ctx.body = 'hello'
// })
// const router = new Router()
// router.get('/abc', ctx => {
//   ctx.body = 'abc123' 
// })

// 自动加载路由
const router = load(resolve(__dirname, './routes'))

app.use(router.routes())
app.listen(3000, () => {
  console.log('服务器启动成功');
})
