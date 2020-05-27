/**
 * @description blog 首页 api
 * @author volcano
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { createBlog } = require('../../controller/blogHome')

router.prefix('/api/blog')

router.post('/create', loginCheck, async (ctx, next) => {
  console.log('create')
  const { content, image } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  // controller
  ctx.body = await createBlog({ userId, content, image })
})

module.exports = router
