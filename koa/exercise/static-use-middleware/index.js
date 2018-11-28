const Koa = require('koa');
const path = require('path');
const server = require('koa-static');

const app = new Koa();

console.log(path.join(__dirname, '/static'));
app.use(server(path.join(__dirname, '/static')));

app.use(async ctx => {
  ctx.body = 'hello world';
})

app.listen(300);

// localhost:300 会默认显示index.html中的内容  等同localhost:300/index.html
// localhost:300/css/index.css