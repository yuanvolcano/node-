/**
 * @description 存储配置
 * @author volcano
 */

let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}

let MYSQL_CONF = {
  host: '127.0.0.1',
  user: 'root',
  password: 'yuan930905can',
  port: 3306,
  database: 'sinaBlog'
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}