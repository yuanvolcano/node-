/**
 * @description 首页 controller
 * @author volcano
 */

const xss = require('xss')
const { creatBlog, getFollowersBlogList } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../models/ResModels')
const { createBlogFailInfo } = require('../models/ErrorInfo')
const { PAGE_SIZE, REG_FOR_AT_WHO } = require('../conf/constant')
const { getUserInfo } = require('../services/user')
const { createAtRelation } = require('../services/atRelation')

/**
 * 创建微博
 * @param {string} param0 创建微博所需数据 { userId, content, image }
 */
async function createBlog ({ userId, content, image }) {
  // 分析并收集 content 中的 @ 用户
  // content 格式如 '哈喽 @李四 - lisi 你好 @王五 - wangwu'
  const atUserNameList = []
  content = content.replace(
    REG_FOR_AT_WHO,
    (matchStr, nickName, userName) => {
      // 目的不是替换，而是获取userName
      atUserNameList.push(userName)
      return matchStr // 替换不生效
    }
	)

  // 根据 @ 用户名查询用户信息
  const atUserList = await Promise.all(
    atUserNameList.map( userName => getUserInfo(userName))
	)

	// 根据用户信息，获取用户 id
	const atUsesrIdList = atUserList.map(user => user.id)

  try {
    // 创建微博
    const blog = await creatBlog({
      userId,
      content: xss(content),
      image
		})

		// 创建 @ 关系
		await Promise.all(
			atUsesrIdList.map(userId => createAtRelation(blog.id, userId))
		)

		// 返回
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
