/**
 * @description 广场 controller
 * @author volcano
 */

const { SuccessModel, ErrorModel } = require('../models/ResModels')
const { getSquareCaheList } = require('../cache/blog')
const { PAGE_SIZE } = require('../conf/constant')

async function getSquareBlogList (pageIndex = 0) {
  const result = await getSquareCaheList(pageIndex, PAGE_SIZE)
  const blogList = result.blogList
  // 拼接返回数据
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: result.count
  })
}

module.exports = {
  getSquareBlogList
}
