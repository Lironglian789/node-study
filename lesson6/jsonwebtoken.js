// jsonwebtoken.js

const jsonwebtoken = require('jsonwebtoken')
const secret = '123456789'
const opt = {
  secret: 'jwt_secret', // 加密规则
  key: 'user'
}
const user = {
  username: 'abc',
  pawqord: '123456'
}

const token = jsonwebtoken.sign({
  data: user,
  // 设置token 过期时间
  exp: Math.floor(Date.now() / 1000) + (60 * 60)
}, secret)

console.log('生成token：', token);
// 生成token： eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiYWJjIiwicGF3cW9yZCI6IjEyMzQ1NiJ9LCJleHAiOjE1OTYzNzkxNjksImlhdCI6MTU5NjM3NTU2OX0.MLX927lKGg5jQEL1iBpG9bKWCyT9ckl8no0BpKJy6_E
console.log('解码：', jsonwebtoken.verify(token, secret, opt));
// 解码： {
//   data: { username: 'abc', pawqord: '123456' },
//   exp: 1596379169,
//   iat: 1596375569
// }
