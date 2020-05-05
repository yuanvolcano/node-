const { User, Blog } = require('./models')

!(async function () {
  // 删除一条博客
  // const delBlogRes = await Blog.destroy({
  //   where: {
  //     id: 4
  //   }
  // })
  // console.log('delBlogRes', delBlogRes > 0)

  // 删除一个用户
  const delUserRes = await User.destroy({
    where: {
      id: 3
    }
  })
  console.log('delUserRes', delUserRes > 0)

})()