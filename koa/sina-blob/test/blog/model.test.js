/**
 * @description blog 数据模型测试
 * @author volcano
 */

const { Blog } = require('../../src/db/models/index')

test('blog 模型的各个属性，符合预期', () => {
  // build 会构建一个内存的 User 实例，但不会提交到数据库中
  const blog = Blog.build({
    userId: 1,
    content: '微博内容',
    image: 'test.png'
  })

  expect(blog.userId).toBe(1)
  expect(blog.content).toBe('微博内容')
  expect(blog.image).toBe('test.png')
})
