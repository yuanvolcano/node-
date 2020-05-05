const Sequelize = require('sequelize')

const conf = {
  host: '127.0.0.1',
  dialect: 'mysql'
}

const seq = new Sequelize('sinaBlog', 'root', 'yuan930905can', conf)

module.exports = seq