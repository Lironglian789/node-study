const fs = require('fs')
const path = require('path')
const Router = require('koa-router')

// 读取指定⽬录下⽂件
function load (dir, cb) {
  // 获取绝对路径
  const url = path.resolve(__dirname, dir)
  // 读取路径下的⽂件
  const files = fs.readdirSync(url)
  // 遍历路由⽂件，将路由配置解析到路由器中
  files.forEach(filename => {
    // 去掉后缀名
    filename = filename.replace('.js', '')
    // 导⼊⽂件
    const file = require(url + '/' + filename)
    // 处理逻辑
    cb(filename, file)
  })
}

// 实现约定路由
function initRouter (app) {
  const router = new Router()
  load('routes', (filename, routes) => {
    // 若是index⽆前缀，别的⽂件前缀就是⽂件名
    const prefix = filename === 'index' ? '' : `/${filename}`
    // 判断路由类型，若为函数需传递app进去
    routes = typeof routes === 'function' ? routes(app) : routes
    // 遍历路由并添加到路由器
    Object.keys(routes).forEach(key => {
      const [method, path] = key.split(' ')
      console.log(`正在映射地址：${method.toLocaleUpperCase()} ${prefix}${path}`)
      // 执行router.method(path, handler) 注册路由
      // router[method](prefix + path, routes[key])
      // 没有routes中间件了，需要自己加一个
      router[method](prefix + path, async ctx => {
        app.ctx = ctx // 挂载⾄app
        await routes[key](app)  // 路由处理器现在接收到的是app
      })
    })
  })
  return router
}

// 加载控制器
function initController (app) {
  const controllers = {}
  // 读取控制器⽬录
  load('controller', (filename, controller) => {
    // 添加路由
    controllers[filename] = controller(app)
  })
  return controllers
}

function initService (app) {
  const services = {}
  load('service', (filename, service) => {
    services[filename] = service(app)
  })
  return services
}

// 数据库集成
const Sequelize = require('sequelize')
function loadConfig (app) {
  load('config', (filename, config) => {
    if (config.db) {
      console.log('加载数据库');
      app.$db = new Sequelize(config.db)
      // 加载模型
      app.$model = {}
      load('model', (filename, {schema, options}) => {
        app.$model[filename] = app.$db.define(filename, schema, options)
      })
      app.$db.sync()
    }
    // 中间价
    if (config.middleware) {
      config.middleware.forEach(middle => {
        const midPath = path.resolve(__dirname, "middleware", middle)
        app.$app.use(require(midPath))
      })
    }
  })
}


const schedule = require('node-schedule')
function initSchedule () {
  load('schedule', (filename, scheduleConfig) => {
    schedule.scheduleJob(scheduleConfig.interval,
    scheduleConfig.handler)
  })
}


module.exports = {
  initRouter,
  initController,
  initService,
  loadConfig,
  initSchedule
}