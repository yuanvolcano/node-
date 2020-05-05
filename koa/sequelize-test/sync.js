const seq = require('./seq')

require('./models')

// 测试连接
seq.authenticate().then(() => {
  console.log('auth ok')
}).catch(err => {
  console.log(err)
  console.log('auth err')
})

// 执行同步
seq.sync({ force: true }).then(() => {
  console.log('sync ok')
  process.exit()
})