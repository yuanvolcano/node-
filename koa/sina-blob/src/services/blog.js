/**
 * @description blog service
 * @author volcano
 */

const Blog = require('../db/models/Blog')

/**
 * 创建微博
 * @param {*} param0 创建微博数据 { userId, content, image }
 */
async function creatBlog ({ userId, content, image }) {
  const result = await Blog.create({
    userId,
    content,
    image
  })

  return result.dataValues
}

module.exports = {
  creatBlog
}
