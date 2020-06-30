const EventEmitter = require('events')
const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')

class Application extends EventEmitter {
  constructor () {
    super()
    this.middlewares = []
    this.context = context
    this.request = request
    this.response = response
  }

  use (fn) {
    this.middlewares.push(fn)
  }

  callback () {
    return (req, res) => {
      const ctx = this.createContext(req, res)
      const respond = () => this.responseBody(ctx)
      const onError = (err) => this.onError(err, ctx)
      const fn = this.compose()
      return fn(ctx).then(respond).catch(onError)
    }
  }

  compose () {
    return async ctx => {
      function createNext (middleware, oldNext) {
        return async () => {
          await middleware(ctx, oldNext)
        }
      }
      let len = this.middlewares.length
      let next = async () => {
        return Promise.resolve()
      }

      for (let i = len - 1; i >= 0; i--) {
        const currentMiddleware = this.middlewares[i]
        next = createNext(currentMiddleware, next)
      }

      await next()
    }
  }

  listen (...args) {
    const serve = http.createServer(this.callback())
    serve.listen(...args)
  }

  onError (err, ctx) {
    if (err.code === 'ENOENT') {
      ctx.status = 404
    } else {
      ctx.status = 500
    }

    const msg = err.message || 'Internal error';
    ctx.res.end(msg)
    // 触发error事件
    this.emit('error', err)
  }

  /**
   * 创建ctx
   * @param {Object} req node req 实例
   * @param {Object} res node res 实例
   */
  createContext(req, res) {
    // 针对每个请求，都要创建ctx对象
    const ctx = Object.create(this.context)
    ctx.request = Object.create(this.request)
    ctx.response = Object.create(this.response)
    ctx.req = ctx.request.req = req
    ctx.res = ctx.response.res = res
    return ctx
  }

  /**
   * 对客户端消息进行回复
   * @param {Object} ctx ctx实例
   */
  responseBody(ctx) {
    const content = ctx.body
    if (typeof content === 'string') {
      ctx.res.end(content)
    } else if (typeof content === 'object') {
      ctx.res.end(JSON.stringify(content))
    }
  }
}

module.exports = Application
