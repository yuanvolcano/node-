/**
 * @description 个人主页 controller
 * @author volcano
 */

const { getBlogListByUser } = require('../services/blog')
const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel, ErrorModel } = require('../models/ResModels')

/**
 * 获取个人微博列表
 * @param {*} userName 用户名
 * @param {*} pageIndex 页数
 */
async function getProfileBlogList (userName, pageIndex = 0) {
  // service
  const result = await getBlogListByUser({
    userName,
    pageIndex,
    pageSize: PAGE_SIZE
  })
  const blogList = result.blogList
  // 拼接返回数据
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: result.count
  })
}

module.exports = {
  getProfileBlogList
}