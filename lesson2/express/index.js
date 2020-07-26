const express = require('express')
const app = express()
app.listen(5000)
const mid1 = (req, res, next) => {
  console.log(1)
  res.write('a')
  next()
  res.end()
  console.log(2)
}

const mid2 = (req, res, next) => {
  console.log(3)
  res.write('b')
  next()
  res.end()
  console.log(4)
}

const mid3 = (req, res, next) => {
  console.log(5)
  res.write('c')
  next()
  res.end()
  console.log(6)
}

app.use(mid1)
// app.use(mid2)
// app.use(mid3)