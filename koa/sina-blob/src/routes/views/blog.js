/**
 * @description blog view 路由
 * @author volcano
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')

// 首页
router.get('/', async (ctx, next) => {
  await ctx.render('index', {})
})

module.exports = router
