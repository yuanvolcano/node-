/**
 * @description user controller
 * @author volcano
 */

const { getUserInfo, createUser, deleteUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../models/ResModels')
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
  deleteUserFailInfo
} = require('../models/ErrorInfo')
const doCrypto = require('../utils/cryp')

 /**
  * @description 用户名是否存在
  * @param {*} userName 用户名
  */
async function isExist (userName) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 存在
    // { errno: 0, data: {...} }
    return new SuccessModel(userInfo)
  } else {
    // 不存在
    // { errno: 10003, message: '...' }
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

/**
 * 注册
 * @param {string} userName 用户名
*  @param {string} password 密码
*  @param {string} userName 性别（1 男，2 女，3 保密）
 */
async function register ({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 用户名已存在
    return new ErrorModel(registerUserNameExistInfo)
  }

  // 注册 service
  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender
    })
    return new SuccessModel()
  } catch (error) {
    console.error(error.message, error.stack)
    return new ErrorModel(registerFailInfo)
  }
}

/**
 * 登录
 * @param {Object} ctx koa2 ctx
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function login (ctx, userName, password) {
  // 登录成功 ctx.session.userInfo = xxx
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if (!userInfo) {
    // 登录失败
    return new ErrorModel(loginFailInfo)
  }
  // 登录成功
  if (!ctx.session.userInfo) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessModel()
}

/**
 * 删除当前用户
 * @param {string} userName 用户名
 */
async function deleteCurUser (userName) {
  // service
  const result = await deleteUser(userName)
  if (userName) {
    // 成功
    return new SuccessModel()
  }
  return new ErrorModel(deleteUserFailInfo)
}

module.exports = {
  isExist,
  register,
  login,
  deleteCurUser
}