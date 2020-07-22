/**
 * @description 微博 @ 用户关心 service
 * @author volcano
 */

const { AtRelation } = require('../db/models/index')

/**
 * 创建微博用户关心
 * @param {number} blogId 微博id
 * @param {number} userId 用户id
 */
async function createAtRelation (blogId, userId) {
  const result = await AtRelation.create({
    blogId,
    userId
  })
  return result.dataValues
}

/**
 * 获取 @ 用户的微博数量 (未读的)
 * @param {number} userId userId
 */
async function getAtRelationCount (userId) {
  const result = await AtRelation.findAndCountAll({
    where: {
      userId,
      isRead: false
    }
  })
  return result.count
}

module.exports = {
  createAtRelation,
  getAtRelationCount
}