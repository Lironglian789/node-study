const {resolve} = require('path')
const fs = require('fs')

// 暗号: 发群里 || 递归
module.exports.getRouter = (path = resolve('./')) => {
  const list = fs.readdirSync(path)
  return `export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [${list.map(file =>`
      {
        path: '/${file.replace('.vue', '')}',
        name: '${file.replace('.vue', '')}',
        component: () => import('./views/${file}')
      },`
    ).join('')}
    ]
  })`
}
