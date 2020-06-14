/**
 * @description 个人主页 test
 * @author volcano
 */

const server = require('../server')
const { COOKIE, USER_NAME } = require('../test.userInfo')

test('个人主页，加载第一页数据，应该成功', async () => {
  // 定义测试内容
  const res = await server
    .get(`/api/profile/loadMore/${USER_NAME}/0`)
    .set('cookie', COOKIE)

  const data = res.body.data
  expect(res.body.errno).toBe(0)
  expect(data).toHaveProperty('isEmpty')
  expect(data).toHaveProperty('blogList')
  expect(data).toHaveProperty('pageSize')
  expect(data).toHaveProperty('pageIndex')
  expect(data).toHaveProperty('count')
})