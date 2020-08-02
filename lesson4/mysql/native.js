/**
 * node.js原生驱动
 */
const mysql = require('mysql')
// 链接配置
const config = {
  host: 'localhost',
  user:'developer',
  password: '123456789',
  database: 'kkb'
}
// 创建链接对象
const conet = mysql.createConnection(config)

// 链接
conet.connect(err => {
  if (err) {
    throw err
  } else {
    console.log('链接成功')
  }
})

// 创建表
const CREATE_SQL = `CREATE TABLE IF NOT EXISTS test (
    id INT NOT NULL AUTO_INCREMENT,
    message VARCHAR(45) NULL,
    PRIMARY KEY (id))`
const INSERT_SQL = `INSERT INTO test(message) VALUES(?)`
const SELECT_SQL = `SELECT * FROM test`

conet.query(CREATE_SQL, err => {
  if (err) throw err
})
// 插入数据
conet.query(INSERT_SQL, 'hello, world', (err, result) => {
  if (err)  throw err
  console.log(result)
  conet.query(SELECT_SQL, (err, results) => {
    console.log(JSON.stringify(results))
    conet.end()
  })
})