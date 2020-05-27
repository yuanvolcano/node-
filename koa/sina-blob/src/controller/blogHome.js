/**
 * @description 首页 controller
 * @author volcano
 */

const { creatBlog } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../models/ResModels')
const { createBlogFailInfo } = require('../models/ErrorInfo')

/**
 * 创建微博
 * @param {string} param0 创建微博所需数据 { userId, content, image }
 */
async function createBlog ({ userId, content, image }) {
  try {
    // service
    const blog = await creatBlog({ userId, content, image })
    return new SuccessModel(blog)
  } catch (error) {
    return new ErrorModel(createBlogFailInfo)
  }
}

module.exports = {
  createBlog
}
