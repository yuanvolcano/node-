/**
 * @description user controller
 * @author volcano
 */

const doCrypto = require('../utils/cryp')
const { SuccessModel, ErrorModel } = require('../models/ResModels')
const {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser
} = require('../services/user')
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
  deleteUserFailInfo,
  changeInfoFailInfo,
  changePasswordFailInfo
} = require('../models/ErrorInfo')

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
 * @param {string} password 密码
 * @param {string} userName 性别（1 男，2 女，3 保密）
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
  if (result) {
    // 成功
    return new SuccessModel()
  }
  return new ErrorModel(deleteUserFailInfo)
}

/**
 * 修改用户信息
 * @param {Object} ctx ctx
 * @param {string} nickName 昵称
 * @param {string} city 城市
 * @param {string} picture 头像
 */
async function changeInfo (ctx, { nickName, city, picture }) {
  const { userName } = ctx.session.userInfo
  if (!nickName) {
    nickName = userName
  }
  // service
  const result =  await updateUser(
    {
      newNickName: nickName,
      newCity: city,
      newPicture: picture
    },
    { userName }
  )
  if (result) {
    Object.assign(ctx.session.userInfo, {
      nickName,
      city,
      picture
    })
    // 返回
    return new SuccessModel()
  }
  // 失败
  return new ErrorModel(changeInfoFailInfo)
}

/**
 * 修改用户密码
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {string} newPassword 新密码
 */
async function changePassword (userName, password, newPassword) {
  const result = await updateUser(
    { newPassword: doCrypto(newPassword) },
    { userName, password: doCrypto(password) }
  )

  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(changePasswordFailInfo)
}

/**
 * 退出登录
 * @param {Object} ctx
 */
async function logout (ctx) {
  delete ctx.session.userInfo
  return new SuccessModel()
}

module.exports = {
  isExist,
  register,
  login,
  deleteCurUser,
  changeInfo,
  changePassword,
  logout
}