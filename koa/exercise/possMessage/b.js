const koa = require('koa');
const render = require('./render')
const app = new koa();

app.use(async ctx => {
  let url = ctx.request.url;
  let html = await render(url);
  ctx.response.type = 'html';
  ctx.response.body = html;
  // ctx.body = html;
})

app.listen(4000);