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

module.exports = {
  createAtRelation
}