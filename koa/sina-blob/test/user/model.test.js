/**
 * @description user model
 * @author volcano
 */

const { User } = require('../../src/db/models/index')

test('User 模型的各个属性，符合预期', () => {
  // build 会构建一个内存的 User 实例，但不会提交到数据库中
  const user = User.build({
    userName: 'qiaofeng',
    password: '123456',
    nickName: '乔帮主',
    gender: 1,
    picture: '/xxx.png',
    city: '北京'
  })
  // 验证各个属性
  expect(user.userName).toBe('qiaofeng')
  expect(user.password).toBe('123456')
  expect(user.nickName).toBe('乔帮主')
  expect(user.gender).toBe(1)
  expect(user.picture).toBe('/xxx.png')
  expect(user.city).toBe('北京')
})