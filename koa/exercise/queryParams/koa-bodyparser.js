const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.use(bodyParser());

app.use(async ctx => {
  if (ctx.url === '/' && ctx.method === 'GET') {
    let html = `
      <form method="POST" action="/">
        <p>userName</p>
        <input type="text" name="username" />
        <p>password</p>
        <input type="password" name="password"/>
        <p>email</p>
        <input type="email" name="email"/><br/>
        <button type="submit">submit</button> 
      </form>
    `;
    ctx.body = html;
  } else if (ctx.url === '/' && ctx.method === 'POST') {
    let postData = ctx.request.body;
    console.log(postData);
    ctx.body = postData;
  } else {
    ctx.body = "404 page!!!"
  }
})

app.listen(300);