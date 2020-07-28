const http = require("http");
const fs = require("fs");
http.createServer((req, res) => {
  const { method, url } = req
  console.log('req', method, url)
  console.log('cookie', req.headers.cookie)
  if (method == "GET" && url == "/") {
    fs.readFile("./index.html", (err, data) => {
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    });
  } else if (method == "GET" && url == "/api/users") {
    res.setHeader('Set-Cookie', 'cookie1=123') // 下一次同域请求时，会传过来
    // res.setHeader('Access-Control-Allow-Credentials', 'true')
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')  // CORS(Cross Origin Resource Share) - 跨域资源共享，后端方案，解决跨域
    // res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify([{name: "tom", age: 20}]));
    console.log('ending.....')
  } else if (method == "OPTIONS" && url == "/api/users") {
    // res.setHeader('Access-Control-Allow-Credentials', 'true')
    // res.writeHead(200, {
    //   "Access-Control-Allow-Origin": "http://localhost:3000",
    //   "Access-Control-Allow-Headers": "X-Token,Content-Type",
    //   "Access-Control-Allow-Methods": "PUT"
    // })
    res.end()
  } else if (method === 'POST'  && url === '/api/save') {
    // bodyparser
    let reqData = []
    let size = 0
    req.on('data', data => {
      reqData.push(data)
      size += data.length
    })
    req.on('end', function () {
      console.log('end')
      const data = Buffer.concat(reqData, size)
      console.log('data', data.toString());
      res.end(`formData: ${data.toString()}`)
    })
  }
}).listen(4000, () => {
  console.log('api listen at ' + 4000)
})