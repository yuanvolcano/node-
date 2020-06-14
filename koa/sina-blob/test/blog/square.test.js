/**
 * @description 广场 test
 * @author volcano
 */

const server = require('../server')
const { COOKIE } = require('../test.userInfo')

test('广场，加载第一页数据，应该成功', async () => {
  // 定义测试内容
  const res = await server
    .get(`/api/square/loadMore/0`)
    .set('cookie', COOKIE)

  const data = res.body.data
  expect(res.body.errno).toBe(0)
  expect(data).toHaveProperty('isEmpty')
  expect(data).toHaveProperty('blogList')
  expect(data).toHaveProperty('pageSize')
  expect(data).toHaveProperty('pageIndex')
  expect(data).toHaveProperty('count')
})
