/**
 * @description utils api 路由
 * @author volcano
 */

const router = require('koa-router')()
const koaForm = require('formidable-upload-koa')
const { loginCheck } = require('../../middlewares/loginChecks')
const { saveFile } = require('../../controller/utils')
router.prefix('/api/utils')

// 上传图片
router.post('/upload', loginCheck, koaForm(), async (ctx, next) => {
  const file = ctx.req.files['file']
  const { size, path, name, type } = file
  // controller
  ctx.body = await saveFile({
    size,
    name,
    type,
    filePath: path
  })
})

module.exports = router