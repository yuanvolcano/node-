/**
 * @description blog service
 * @author volcano
 */

const { Blog, User, UserRelations } = require('../db/models/index')
const { formatUser, formatBlog } = require('./_format')
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

/**
 * 根据用户获取微博列表
 * @param {*} param0 查询参数 { userName, pageIndex = 0, pageSize = 10 }
 */
async function getBlogListByUser ({ userName, pageIndex = 0, pageSize = 10 }) {
  const userWhereOpts = {}
  if (userName) {
    userWhereOpts.userName = userName
  }
  // 执行查询
  const result = await Blog.findAndCountAll ({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
        where: userWhereOpts
      }
    ]
  })

  // result.count 总数，跟分页无关
  // result.rows 查询结果，数组
  let blogList = result.rows.map(row => row.dataValues)

  blogList = formatBlog(blogList)

  blogList = blogList.map(blogItem => {
    const user = blogItem.user.dataValues
    blogItem.user = formatUser(user)
    return blogItem
  })
  return {
    count: result.count,
    blogList
  }
}

/**
 * 创建微博
 * @param {Object} param0 { userId, pageIndex = 0, pageSize = 10 }
 */
async function getFollowersBlogList ({ userId, pageIndex = 0, pageSize = 10 }) {
  const result = await Blog.findAndCountAll({
    limit: pageSize, // 每页多少条
    offset: pageSize * pageIndex, // 跳过多少条
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture']
      },
      {
        model: UserRelations,
        attributes: ['userId', 'followerId'],
        where: {
          userId
        }
      }
    ]
  })

  // 格式化数据
  let blogList = result.rows.map(row => row.dataValues)
  blogList = formatBlog(blogList)
  blogList = blogList.map(blog => {
    blog.user = formatUser(blog.user.dataValues)
    return blog
  })
  return {
    count: result.count,
    blogList
  }
}

module.exports = {
  creatBlog,
  getBlogListByUser,
  getFollowersBlogList
}
