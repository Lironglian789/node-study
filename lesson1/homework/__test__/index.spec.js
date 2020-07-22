test('测试练习01自动生成路由配置', () => {
  const {getRouter} = require('../index')
  const ret = getRouter(__dirname + '/data')
  // console.log(ret)
  expect(getRouter(__dirname + '/data')).toBe(
  `export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/about',
        name: 'about',
        component: () => import('./views/about.vue')
      },
      {
        path: '/index',
        name: 'index',
        component: () => import('./views/index.vue')
      },
    ]
  })`)
}) 