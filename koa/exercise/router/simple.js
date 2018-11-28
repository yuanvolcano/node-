var koa = require('koa');
var app = new koa();

var main = ctx => {
  var url = ctx.request.url;
  ctx.response.body = url;
}

app.use(main);
app.listen(300)