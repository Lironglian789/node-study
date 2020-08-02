const Sequelize = require('sequelize')
const env = require('dotenv')
const config = require('./config')

env.config()
const sequelize = new Sequelize(config.database, config.username, config.password, {
  dialect: 'mysql',
  host: config.host,
  operatorsAliases: false
})

module.exports = sequelize
