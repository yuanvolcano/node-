module.exports = {
  checkLogin (req, res, next) {
    console.log(req.session);
    if (!req.session.user) {
      req.flash('error', '未登录');
      return res.redirect('/signin');
    }
    next();
  },
  checkNotLogin (req, res, next) {
    if (req.session.user) {
      req.flash('error', '已登录');
      return res.redirect('back'); // 返回之前的
    }
    next();
  }
}
