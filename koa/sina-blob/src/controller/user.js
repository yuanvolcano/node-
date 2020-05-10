/**
 * @description user controller
 * @author volcano
 */

const { getUserInfo } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../models/ResModels')
const { registerUserNameNotExistInfo } = require('../models/ErrorInfo')

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

module.exports = {
  isExist
}