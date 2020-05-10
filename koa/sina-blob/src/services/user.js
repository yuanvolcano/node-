/**
 * @description user service
 * @author volcano
 */

const { User } = require('../db/models/index')
const { formatUser } = require('./_format')

/**
 * 获取用户信息
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo (userName, password) {
  // 查询条件
  const whereOpt = {
    userName
  }
  if (password) {
    Object.assign(whereOpt, { password })
  }

  // 查询
  const res = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt
  })

  if (res === null) {
    // 未找到
    return res
  }
  // 格式化
  return formatUser(res.dataValues)
}

module.exports = {
  getUserInfo
}