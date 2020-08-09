import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'
import * as  glob from 'glob'

const router = new KoaRouter()
// 变量引用不透明
const method = (router: KoaRouter) => (
  method: 'get' | 'post' | 'delete' | 'put'
) => (
  path: string,
  options?: {
    middlewares: Array<any>
}) => {
  return (target, property) => {
    // 晚一拍执行路由注册：因为需要等类装饰器执行完毕
    process.nextTick(() => {
      console.log(target)
      // 若设置了中间件选项则加入到中间件数组
      const middlewares = []
      // 获取class上定义的中间件
      if (target.middlewares) {
        middlewares.push(...target.middlewares)
      }
      if (options && options.middlewares) {
        middlewares.push(...options.middlewares)
      }
      // 添加路由处理器
      middlewares.push(target[property])
      router[method](path, ...middlewares)
    })
  }
}

const decorate = method(router)
export const get = decorate('get')
export const post = decorate('post')

// 中间件装饰器
export const middlewares = function middlewares (middlewares: Koa.Middleware[]) {
  return function (target) {
    target.prototype.middlewares = middlewares
  }
}


export const load = (folder: string): KoaRouter => {
  /*** 路由文件扩展名，默认值是`.{js,ts}` */
  const extname = '.{js,ts}'
  glob.sync(require('path').join(folder, `./**/*${extname}`))
  .forEach(item => require(item))
  return router
}
