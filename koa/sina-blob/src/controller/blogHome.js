/**
 * @description 首页 controller
 * @author volcano
 */

const xss = require('xss')
const { creatBlog, getFollowersBlogList } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../models/ResModels')
const { createBlogFailInfo } = require('../models/ErrorInfo')
const { PAGE_SIZE } = require('../conf/constant')

/**
 * 创建微博
 * @param {string} param0 创建微博所需数据 { userId, content, image }
 */
async function createBlog ({ userId, content, image }) {
  try {
    // service
    const blog = await creatBlog({
      userId,
      content: xss(content),
      image
    })
    return new SuccessModel(blog)
  } catch (error) {
    return new ErrorModel(createBlogFailInfo)
  }
}

/**
 * 获取首页微博列表
 * @param {number} userId userId
 * @param {number} pageIndex page index
 */
async function getHomeBlogList (userId, pageIndex = 0) {
  // service
  const result = await getFollowersBlogList({
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
  createBlog,
  getHomeBlogList
}
