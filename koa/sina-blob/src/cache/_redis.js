/**
 * @description 连接 redis 的方法 get set
 * @author volcano
 */

const redis = require('redis')
const { REDIS_CONF } = require('../conf/_redis')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redisClient.on('error', err => {
  console.log('redis err', err)
})

/**
 * @description redis set 方法
 * @param {string} key key
 * @param {string} val val
 * @param {number} timeout 过期时间， 单位 ms
 */
function set(key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
  redisClient.expire(key, timeout)
}

/**
 * @description redis get
 * @param {string} key
 */
function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val === null) {
        resolve(null)
        return
      }

      try {
        resolve(
          JSON.parse(val)
        )
      } catch (e) {
        resolve(val)
      }
    })
  })
  return promise
}

module.exports = {
  set,
  get
}
