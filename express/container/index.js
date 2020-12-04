const express = require('express')
const router = express.Router()
const path = require('path')
const { createProxyMiddleware } = require('http-proxy-middleware')
const compression = require('compression')

const app = express()

app.use(compression())
app.use(express.static(path.join(__dirname, 'public')))

router.get('/', (req, res) => {
  res.render('index')
})

app.use('/', router)
app.use('/go', createProxyMiddleware({ target: 'http://172.20.57.137:5678', changeOrigin: true }))
// app.use('/openapi/rest', proxy({ target: 'retail.jdy.com', changeOrigin: true }))

// 监听端口，启动程序
app.listen(10000, () => {
  console.log(`current program is listening on port 10000`)
})