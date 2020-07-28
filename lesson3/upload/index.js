const http = require('http')
const fs = require('fs')
const path = require('path')
const chunk = []
let size = 0
const server = http.createServer((req, res) => {
  const {pathname} = require('url').parse(req.url)
  if (pathname === '/upload') {
    console.log('uploading...')
    const fileName = req.headers['file-name'] ? req.headers['file-name'] : 'abc.png'
    const outputFile = path.resolve(__dirname, fileName)
    const fis = fs.createWriteStream(outputFile)
    // Buffer connect
    req.on('data', data => {
      chunk.push(data)
      size += data.length
      console.log('data:', data, size)
    })
    req.on('end', () => {
      console.log('ending...')
      const buffer = Buffer.concat(chunk, size)
      size = 0
      fs.writeFileSync(outputFile, buffer)
      res.end()
    })

    // 流事件写入
    req.on('data', data => {
      console.log('write data:', data);
      fis.write(data)
    })
    req.on('end', () => {
      res.end()
    })
    
    req.pipe(fis)
    res.end()
  } else {
    const filename = pathname === '/' ? 'index.html' : pathname.substring(1)
    let type = (function(_type) {
      switch (_type) { // 文件拓展名
        case 'html':
        case 'htm': return 'text/html charset=UTF-8'
        case 'js': return 'application/javascript charset=UFT-8'
        case 'css': return 'text/css charset=UTF-8'
        case 'txt': return 'text/plain charset=UTF-8'
        case 'manifest': return 'text/ache-manifest charset=UTF-8'
        default: return 'application/octet-stream'
      }
    } (filename.substring(filename.lastIndexOf('.') + 1)))
    // 异步读取文件，并将内容作为单独的数据块传回给回调函数
    // 对于确实很大的文件，使用API fs.createReadStream() 更好
    fs.readFile(filename, (err, content) => {
      if (err) {
        res.writeHead(404, {'Content-type': 'text/plain charset=UTF-8'})
        res.write(content)
      } else {
        res.writeHead(200, {'Content-type': type})
        res.write(content) // 把文件内容作为文件主体
      }
      res.end()
    })
  }
})
server.listen(3000)