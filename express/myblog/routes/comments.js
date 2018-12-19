const express = require('express');
const router = express.Router();
const checkLogin = require('../middlewares/check').checkLogin;
const CommentModel = require('../models/comments');

// POST /comments 创建一条留言
router.post('/', checkLogin, function (req, res, next) {
  const author = req.session.user._id;
  const postId = req.fields.postId;
  const content = req.fields.content;

  try {
    if (!content.length) {
      throw new Error('请填写留言内容');
    }
  } catch (e) {
    req.flash('error', e.message);
    return res.redirect('back');
  }

  const comment = {
    content: content,
    postId: postId,
    author: author
  }

  CommentModel.create(comment)
    .then(function () {
      req
    })
})

// GET /comments/:commentId/remove 删除一条留言
router.get('/:commentId/remove', checkLogin, function (req, res, next) {
  res.send('删除留言')
})

module.exports = router
