const Koa = require('koa')
const {initRouter, initController, initService, loadConfig, initSchedule} = require('./kkb-loader')

class kkb {
  constructor(config) {
    this.$app = new Koa(config);
    loadConfig(this) // 加载配置项
    this.$service = initService(this)
    this.$ctrl = initController(this)  // 先初始化控制器，路由对它有依赖
    this.$router = initRouter(this);  // 将kkb实例传进去
    this.$app.use(this.$router.routes());

    initSchedule()
  }
  start (port) {
    this.$app.listen(port, () => {
      console.log('服务启动 at port ' + port);
    })
  }
}

module.exports = kkb