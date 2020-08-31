// sesson 原理 利用cookie
const http = require('http')
let session = {}

http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    res.end('...')
    return 
  }
  // 观察cookie
  console.log('cookie', req.headers.cookie);

  const sessionKey = 'sid'
  const cookie = req.headers.cookie
  if (cookie && cookie.indexOf(sessionKey) > -1) {
    // 登录过
    res.end('come back')
    // adabbsd=1234;sid=abc;adabbsd=1234
    const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`)
    const sid = pattern.exec(cookie)[1]
    console.log('session:', sid, session[sid])
  } else {
    // 没有登录过
    // 实际项目最好使用uuid，这里使用随机数模拟
    const sid = (Math.random() * 9999999).toFixed()
    // 设置cookie
    res.setHeader('Set-Cookie', `${sessionKey}=${sid};`)
    session[sid] = {
      name: '老王'
    }
    res.end('hello')
  }
})
.listen(3000)