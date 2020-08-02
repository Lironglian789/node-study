/**
 * ES2017写法
 */
( async () => {
  // get the client
  const mysql = require('mysql2/promise')
  const config = {
    host: 'localhost',
    user: 'developer',
    password: '123456789',
    database: 'kkb'
  }
  // create the connection
  const connection = await mysql.createConnection(config)
  const CREATE_SQL = `CREATE TABLE IF NOT EXISTS test(
    id INT NOT NULL AUTO_INCREMENT,
    message VARCHAR(45) NULL,
    PRIMARY KEY (id))`
  const INSERT_SQL = `INSERT INTO test(message) VALUES(?)`
  const SELECT_SQL = `SELECT * FROM test`

  // query database
  let ret = await connection.execute(CREATE_SQL)
  console.log('create', ret)
  ret = await connection.execute(INSERT_SQL, ['abc'])
  console.log('insert', ret)
  const [rows, fields] = await connection.execute(SELECT_SQL)
  console.log('select', rows)
})()