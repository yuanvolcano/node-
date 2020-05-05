const { Blog, User } = require('./models')

!(async function () {
  // insert into (...) values (...)
  const zhangsan = await User.create({
    userName: 'zhangsan',
    password: '123',
    nickName: '张三'
  })
  console.log('zhangsan:', zhangsan.dataValues)
  const zhangsanId = zhangsan.dataValues.id

  const lisi = await User.create({
    userName: 'lisi',
    password: '123',
    nickName: '李四'
  })

  const lisiId = lisi.dataValues.id
  // 创建博客
  const blog1 = await Blog.create({
    title: '标题1',
    content: '内容1',
    userId: zhangsanId
  })

  const blog2 = await Blog.create({
    title: '标题2',
    content: '内容2',
    userId: zhangsanId
  })

  const blog3 = await Blog.create({
    title: '标题3',
    content: '内容3',
    userId: lisiId
  })

  const blog4 = await Blog.create({
    title: '标题4',
    content: '内容4',
    userId: lisiId
  })

})()