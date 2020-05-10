const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

const { REDIS_CONF } = require('./conf/db') // redis 配置
const { isProd } = require('./utils/env') // 环境
const { SESSION_SERCET_KEY } = require('./conf/secretKeys') // 秘钥

// api 和 views router 配置
const index = require('./routes/index')
const userViewRouter = require('./routes/views/user')
const userApiRouter = require('./routes/api/user')
const errorViewRouter = require('./routes/views/error')

// error handler
let onerrorConf = {}

if (isProd) {
  onerrorConf = {
    redirect: '/errpr'
  }
}

onerror(app, onerrorConf)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// session 配置
app.keys = [SESSION_SERCET_KEY]
app.use(session({
  key: 'sinablob.sid', // cookie name 默认是 `koa.sid`
  prefix: 'sinablob:sess:', // redis key 的前缀 默认是 `koa:sess:`
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // ms
  },
  ttl: 24 * 60 * 60 * 1000, // ms
  store: redisStore({
    host: REDIS_CONF.host,
    port: REDIS_CONF.port
    // all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(index.routes(), index.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods()) // 用户页 view
app.use(userApiRouter.routes(), userApiRouter.allowedMethods()) // 用户页 api
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) // 错误页 和 404

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
