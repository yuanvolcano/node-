const Koa = require('koa');
const app = new Koa();

app.use( async ctx => {
  if (ctx.url === '/index') {
    ctx.cookies.set(
      'cid',
      'hello world',
      {
        domain: 'localhost',  // cookie所在的域名
        path: '/index',   // 写cookie所在的路径    
        maxAge: 60 * 10 * 1000, // cookie有效时长
        expires: new Date('2018-08-24'), // cookie实效时间
        httpOnly: false, // 是否只用于http请求中
        overwrite: false // 是否允许重写
      }
    );
    ctx.body = 'cookie is ok';
  } else {
    ctx.body = 'hello world';
  }
})

app.listen(300);