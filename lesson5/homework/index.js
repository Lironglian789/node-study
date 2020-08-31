// 暗号：搜索算法
const {EventEmitter} = require('events')
module.exports = class Connection {
  constructor() {
    this.eventEmitter = new EventEmitter();
  }
  connection(msg) {
    this.eventEmitter.emit('connection', msg)
  }
  onConn(fn) {
    this.eventEmitter.on('connection', fn)
  }
}
