/**
 * @description utils controller
 * @author volcano
 */

const path = require('path')
const { ErrorModel, SuccessModel } = require('../models/ResModels')
const { uploadFileSizeFailInfo } = require('../models/ErrorInfo')
const fsExtra = require('fs-extra')

// 存储目录
const DIST_FOLDER_PATH = path.resolve(__dirname, '../../uploadFiles')
// 文件最大体积 1M
const MAX_SIZE = 1024 * 1024 * 1024

// 是否需要创建目录
fsExtra.pathExists(DIST_FOLDER_PATH).then(exist => {
  if (!exist) {
    fsExtra.ensureDir(DIST_FOLDER_PATH)
  }
})

/**
 * 保存文件
 * @param {string} name 文件名
 * @param {string} type 文件类型
 * @param {number} size 文件大小
 * @param {string} filePath 文件路径
 */
async function saveFile ({ name, type, size, filePath }) {
  console.log('name', name)
  console.log('size', size)
  if (size > MAX_SIZE) {
    await fsExtra.remove(filePath)
    return new ErrorModel(uploadFileSizeFailInfo)
  }

  // 移动文件
  const fileName = `${Date.now()}.${name}` // 防止重名
  const distFilePath = path.resolve(DIST_FOLDER_PATH, fileName) // 文件存储目的地
  await fsExtra.move(filePath, distFilePath)

  // 返回信息
  return new SuccessModel({
    url: '/' + fileName
  })
}

module.exports = {
  saveFile
}
