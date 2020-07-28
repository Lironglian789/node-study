const express = require('express')
const app = express()
const { createProxyMiddleware } = require('http-proxy-middleware')
app.use(express.static(__dirname + '/'))
app.use('/api', createProxyMiddleware({target: 'http://localhost:4000', changeOrigin: true }));
app.listen(3000) 
