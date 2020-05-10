/**
 * @description 错误页
 * @author volcano
 */

const router = require('koa-router')()

// 错误页
router.get('/error', async (ctx, next) => {
  await ctx.render('error')
})

// 404
router.get('*', async (ctx, next) => {
  await ctx.render('404')
})

module.exports = router