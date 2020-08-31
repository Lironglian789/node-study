// cookie 原理 不安全，存储量小
const http = require('http')
// const {listen} = require('socket.io')

http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    res.end('...')
    return 
  }
  // 观察cookie
  console.log('cookie', req.headers.cookie);

  // 设置coolie， 浏览器首次请求时拿到cookie会进行缓存，下一次访问同源的页面时，求取接口时会自动在header带上
  res.setHeader('Set-Cookie','cookie1=abc;')
  res.end('hello cookie')
})
.listen(3000)