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

/**
 * 创建用户
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别
 * @param {string} nickName 昵称
 */
async function createUser ({ userName, password, gender = 3, nickName }) {
  const res = User.create({
    userName,
    password,
    gender,
    nickName : nickName ? nickName : userName
  })
  return res.dataValues
}

module.exports = {
  getUserInfo,
  createUser
}