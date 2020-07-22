/**
 * @description 数据格式化
 * @author volcano
 */

const { DEFAULT_PICTURE } = require('../conf/constant')
const { timeFormat } = require('../utils/dt')
const { REG_FOR_AT_WHO } = require('../conf/constant')

/**
 * 用户默认头像
 * @param {Object} obj 用户对象
 */
function _formatUserPicture (obj) {
  if (!obj.picture) {
    obj.picture = DEFAULT_PICTURE
  }

  return obj
}

/**
 * 格式化用户信息
 * @param {Array|Object} list 用户列表或用户对象
 */
function formatUser (list) {
  if (list === null) return list

  if (Array.isArray(list)) {
    // 数组 用户列表
    return list.map(_formatUserPicture)
  }
  // 单个用户对象
  return _formatUserPicture(list)
}

/**
 * 格式化数据的时间
 * @param {Obejct} obj 数据
 */
function _formatDBTime (obj) {
  obj.createdAtFormat = timeFormat(obj.createdAt)
  obj.updatedAtFormat = timeFormat(obj.updatedAt)
  return obj
}

/**
 * 格式化微博内容
 * @param {Object} obj 微博数据对象
 */
function _formatContent (obj) {
  obj.contentFormat = obj.content
  // 格式化 @
  obj.contentFormat = obj.contentFormat.replace(
    REG_FOR_AT_WHO,
    (matchStr, nickName, userName) => {
      return `<a href="profile/${userName}">@${nickName}</a>`
    }
  )
  return obj
}

/**
 * 格式化博客信息
 * @param {Array|Object} list 微博列表或单个微博对象
 */
function formatBlog (list) {
  if (list === null) {
    return list
  }

  if (Array.isArray(list)) {
    // 数组
    return list.map(_formatDBTime).map(_formatContent)
  }

  // 单个用户对象
  let result = list
  result = _formatDBTime(result)
  result = _formatContent(result)
  return result
}

module.exports = {
  formatUser,
  formatBlog
}