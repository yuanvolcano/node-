const express = require('express');
const router = express.Router();
const PostModel = require('../models/posts')
const checkLogin = require('../middlewares/check').checkLogin;

// GET /posts 所有用户或者特定用户的文章页
router.get('/', (req, res, next) => {
  const author = req.query.author;
  console.log(author);

  PostModel.getPosts(author)
    .then(function (posts) {
      console.log(posts)
      res.render('posts', {
        posts: posts
      })
    })
    .catch(next)
})

// POST /posts/create 发表一篇文章
router.post('/create', checkLogin, (req, res, next) => {
  const author = req.session.user._id;
  const title = req.fields.title;
  const content = req.fields.content;

    // 校验参数
    try {
      if (!title.length) {
        throw new Error('请填写标题')
      }
      if (!content.length) {
        throw new Error('请填写内容')
      }
    } catch (e) {
      req.flash('error', e.message)
      return res.redirect('back')
    }

    let post = {
      author: author,
      title: title,
      content: content
    }

    PostModel.create(post)
      .then(result => {
        console.log(result)
        post = result.ops[0];
        req.flash('success', '发表成功');
        // 发表成功后跳转到该文章页
        res.redirect(`/posts/${post._id}`);
      })
      .catch(next)
})

// GET /posts/create 发表一篇文章
router.get('/create', checkLogin, (req, res, next) => {
  res.render('create')
})

// GET /posts/:postId 单独一篇的文章页
router.get('/:postId', (req, res, next) => {
  const postId = req.params.postId;

  Promise.all([
    PostModel.getPostById(postId),  // 通过postId获取信息
    PostModel.incPv(postId)// pv 加 1
  ])
  .then(function (result) {
    const posts = result[0];
    console.log(posts);
    if (!posts) {
      throw new Error('该文章不存在');
    }

    res.render('posts', {
      posts: [posts]
    })
  })
  .catch(next)
})

// GET /posts/:postId/edit 更新一篇文章
router.get('/:postId/edit', (req, res, next) => {
  res.send('更新文章页');
})

// POST /posts/:postId/edit 更新一篇文章
router.post('/:postId/edit', checkLogin, function (req, res, next) {
  res.send('更新文章')
})

// GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove', checkLogin, function (req, res, next) {
  res.send('删除文章')
})

module.exports = router;


