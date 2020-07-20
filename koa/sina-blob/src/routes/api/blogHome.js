/**
 * @description blog 首页 api
 * @author volcano
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { createBlog, getHomeBlogList } = require('../../controller/blogHome')
const { genValidator } = require('../../middlewares/validator')
const blogValidate = require('../../validator/blog')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/blog')

router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
  const { content, image } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  // controller
  ctx.body = await createBlog({ userId, content, image })
})

// 广场加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const { id: userId } = ctx.session.userInfo
  const result = await getHomeBlogList(userId, pageIndex)
  // 渲染为模板字符串
  result.data.blogListTpl = getBlogListStr(result.data.blogList)
  ctx.body = result
})

module.exports = router
