/**
 * @description 微博 @ 关系 controller
 * @author volcano
 */

const { getAtRelationCount, getAtUserBlogList } = require('../services/atRelation')
const { SuccessModel } = require('../models/ResModels')
const { PAGE_SIZE } = require('../conf/constant')

/**
 * 获取 @ 我的微博数量
 * @param {*} userId userId
 */
async function getAtMeCount (userId) {
  const count = await getAtRelationCount(userId)
  return new SuccessModel({ count })
}

/**
 * 获取 @ 我的微博
 * @param {number} userId userId
 * @param {number} pageIndex pageIndex
 */
async function getAtMeBlogList (userId, pageIndex = 0) {
  const result = await getAtUserBlogList({
    userId,
    pageIndex,
    pageSize: PAGE_SIZE
  })

  const { count, blogList } = result
  // 返回
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageIndex,
    pageSize: PAGE_SIZE,
    count
  })
}

module.exports = {
  getAtMeCount,
  getAtMeBlogList
}
