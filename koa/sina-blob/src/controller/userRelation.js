/**
 * @description 用户关系 controller
 * @author volcano
 */

const { getUserByFollower } = require('../services/userRelation')
const { SuccessModel } = require('../models/ResModels')

/**
 * 根据 userid 获取粉丝列表
 * @param {number} userId 用户 id
 */
async function getFans (userId) {
  // service
  const { count, userList } = await getUserByFollower(userId)
  return new SuccessModel({
    count,
    userList
  })
}

module.exports = {
  getFans
}
