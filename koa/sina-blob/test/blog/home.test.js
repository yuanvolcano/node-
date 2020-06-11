/**
 * @description 首页 test
 * @author volcano
 */

const server = require('../server')
const { COOKIE } = require('../test.userInfo')

let BLOG_ID = ''

test('创建一条微博，应该成功 ', async () => {
  // 定义测试内容
  const content = '单元测试自动创建的微博_' + Date.now()
  const image = '/xxx.png'
  // 开始测试
  const res = await server
    .post('/api/blog/create')
    .send({
      content,
      image
    })
    .set('cookie', COOKIE)

  expect(res.body.errno).toBe(0)
  console.log('创建一条微博', res.body)
  BLOG_ID = res.body.data.id
})
