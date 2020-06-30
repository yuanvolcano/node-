const simpleApp = require('./application')
const app = new simpleApp()

// app.context.echoData = function ({ errno = 0, errmsg = '', data = null }) {
//   this.res.setHeader('Content-Type', 'application/jsoncharset=utf-8')
//   this.body = {
//     errno: errno,
//     data: data,
//     errmsg: errmsg
//   }
// }

// app.use(async ctx => {
//   console.log(ctx.body)
//   ctx.body = 'hello ' + ctx.query.name
// })

// app.use(async ctx => {
//   const data = {
//     name: 'jack',
//     age: 18
//   }
//   ctx.echoData({
//     errmsg: 'success',
//     data
//   })
// })

const responseData = {}

app.use(async (ctx, next) => {
    responseData.name = 'tom'
    await next()
    ctx.body = responseData
})

app.use(async (ctx, next) => {
    responseData.age = 16
    await next()
})

app.use(async ctx => {
    responseData.sex = 'male'

    throw new Error('one error')
})

app.listen(3000, () => {
    console.log('listening on 3000')
})
