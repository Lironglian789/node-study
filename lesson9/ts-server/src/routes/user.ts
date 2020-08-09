import * as Koa from 'koa'
import { get, post, middlewares } from '../utils/route-decors'
import model from '../model/user'

// 类级别路由守卫
// @middlewares([async function guard(ctx, next) {
//   if(ctx.header.token) {
//     await next()
//   } else {
//     throw '请登录'
//   }
// }])

const users = [{
  user: 'Tom'
}]
export default class User {
  @get('/users')
  public async list(ctx: Koa.Context) {
    const users = await model.findAll()
    ctx.body = {ok:1, data: users}
  }

  @post('/users', {
    middlewares: [
      async function validation (ctx: Koa.Context, next: () => Promise<any>) {
        // 用户名必填
        const name = ctx.request.body.name
        if(!name) {
          throw '请输入用户名'
        }
        await next()
      }
    ]
  })
  public add(ctx: Koa.Context) {
    users.push(ctx.request.body)
    ctx.body = {ok: 1}  
  }
}