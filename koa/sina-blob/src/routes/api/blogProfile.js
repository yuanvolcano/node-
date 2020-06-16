/**
 * @description 个人主页 api 路由
 * @author volcano
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blogProfile')
const { getBlogListStr } = require('../../utils/blog')
const { follow, unfollow } = require('../../controller/userRelation')

router.prefix('/api/profile')

// 加载更多
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
  let { userName, pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const result = await getProfileBlogList(userName, pageIndex)

  // 渲染为模板字符串
  result.data.blogListTpl = getBlogListStr(result.data.blogList)

  ctx.body = result
})

// 关注
router.post('/follow', loginCheck, async (ctx, next) => {
  const { id: myUserId } = ctx.session.userInfo
  const { userId: curUserId } = ctx.request.body
  console.log('myUserId', myUserId)
  console.log('curUserId', curUserId)
  ctx.body = await follow(myUserId, curUserId)
})

// 取消关注
router.post('/unfollow', loginCheck, async (ctx, next) => {
  const { id: myUserId } = ctx.session.userInfo
  const { userId: curUserId } = ctx.request.body
  ctx.body = await unfollow(myUserId, curUserId)
})

module.exports = router