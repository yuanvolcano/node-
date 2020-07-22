/**
 * @description 微博 @ 关系 controller
 * @author volcano
 */

const { getAtRelationCount } = require('../services/atRelation')
const { SuccessModel } = require('../models/ResModels')

/**
 * 获取 @ 我的微博数量
 * @param {*} userId userId
 */
async function getAtMeCount (userId) {
  const count = await getAtRelationCount(userId)
  return new SuccessModel({ count })
}

module.exports = {
  getAtMeCount
}
