const express = require('express');
const router = express.Router();
const PostModel = require('../models/posts');
const usersModel = require('../models/users');
const CommentModel = require('../models/comments');
const checkLogin = require('../middlewares/check').checkLogin;

// GET /posts 所有用户或者特定用户的文章页
router.get('/', checkLogin, async (req, res, next) => {
  let author = req.query.author;
  // if (author) {
  //   let user = await usersModel.getUserByName(author)
  //   user && (author = user._id)
  // }
  PostModel.getPosts(author)
    .then(function (posts) {
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
        // console.log(result)
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
    CommentModel.getComments(postId), // 通过postId获取文章所有留言
    PostModel.incPv(postId)  // pv 加 1
  ])
  .then(function (result) {
    // console.log(typeof result[0])
    const posts = result[0];
    const comments = result[1];

    if (!posts) {
      throw new Error('该文章不存在');
    }

    // res.send(result)
    res.render('post', {
      post: posts,
      comments: comments
    })
  })
  .catch(next)
})

// GET /posts/:postId/edit 更新一篇文章
router.get('/:postId/edit', (req, res, next) => {
  const postId = req.params.postId;
  const author = req.session.user._id;


  PostModel.getRawPostById(postId)
  .then(function (post) {
    // console.log(post)
    if (!post) {
      throw new Error('改文章不存在');
    }
    if (author.toString() !== post.author._id.toString()) {
      throw new Error('权限不足');
    }
    res.render('edit', {
      post: post
    })
  }).catch(next)
})

// POST /posts/:postId/edit 更新一篇文章
router.post('/:postId/edit', checkLogin, function (req, res, next) {
  const postId = req.params.postId;
  // console.log(req.params)
  const author = req.session.user._id;
  const title = req.fields.title;
  const content = req.fields.content;

  // 校验参数
  try {
    if (!title.length) {
      throw new Error('请填写标题');
    }
    if (!content.length) {
      throw new Error('请填写内容');
    }
  } catch (err) {
    req.flash('error', err.message)
    return res.redirect('back')
  }

  PostModel.getRawPostById(postId)
  .then(function (post) {
    if (!post) {
      throw new Error('文章不存在');
    }
    if (post.author._id.toString() !== author.toString()) {
      throw new Error('没有权限');
    }
    PostModel.updatePostById(postId, { title: title, content: content })
    .then(function () {
      req.flash('success', '编辑文章成功');
      // 编辑成功后跳转到上一页
      res.redirect(`/posts/${postId}`);
    })
    .catch(next);
  })
})

// GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove', checkLogin, function (req, res, next) {
  const postId = req.params.postId;
  const author = req.session.user._id;

  PostModel.getRawPostById(postId)
    .then(function (post) {
      if (!post) {
        throw new Error('文章不存在');
      }
      if (post.author._id.toString() !== author.toString()) {
        throw new Error('没有权限');
      }
      PostModel.delPostById(postId)
        .then(function () {
          req.flash('success', '删除文章成功');
          // 删除成功后跳转到主页
          res.redirect('/posts');
        })
        .catch(next);
    })
})

module.exports = router;


