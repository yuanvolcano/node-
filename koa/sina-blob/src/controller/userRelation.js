/**
 * @description 用户关系 controller
 * @author volcano
 */

const {
  getUserByFollower,
  addFollower,
  deleteFollower,
  getFollowersByUserId
} = require('../services/userRelation')
const { SuccessModel, ErrorModel } = require('../models/ResModels')
const { addFollowerFailInfo, deleteFollowerFailInfo } = require('../models/ErrorInfo')

/**
 * 根据 userid 获取粉丝列表
 * @param {number} userId 用户 id
 */
async function getFans (userId) {
  // service
  const { count, userList } = await getUserByFollower(userId)
  return new SuccessModel({
    count,
    userList
  })
}

/**
 * 关注
 * @param {number} myUserId 当前登录的用户 id
 * @param {number} followerId 要被关注的用户 id
 */
async function follow (myUserId, followerId) {
  try {
    await addFollower(myUserId, followerId)
    return new SuccessModel()
  } catch (error) {
    return new ErrorModel(addFollowerFailInfo)
  }
}

/**
 * 取消关注
 * @param {number} myUserId 当前登录的用户 id
 * @param {number} followerId 要被关注的用户 id
 */
async function unfollow (myUserId, followerId) {
  const result = await deleteFollower(myUserId, followerId)
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(addFollowerFailInfo)
}

/**
 * 获取关注人列表
 * @param {number} userId 用户 id
 */
async function getFollowers (userId) {
  const { count, userList } = await getFollowersByUserId(userId)
  return new SuccessModel({
    count,
    followersList: userList
  })
}

module.exports = {
  getFans,
  follow,
  unfollow,
  getFollowers
}
