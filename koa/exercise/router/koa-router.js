const koa = require('koa');
const fs = require('fs');
const app = new koa();

async function render(page) {
  return new Promise((resolve, reject) => {
    let path = `./view/${page}`;
    fs.readFile(path, (err, data) => {
      if (err) {
        return reject(err)
      } 
      resolve(data);
    })
  })
}

async function router(url) {
  let view = '404.html';
  switch(url) {
    case '/':
     view = 'index.html';
     break;
    case '/index':
     view = 'index.html';
     break;
    case '/todo':
     view = 'todo.html';
     break;
    case '/404':
     view = '404.html';
     break;
    default:
     break;
  }

  let html = await render(view);
  return html;
}

app.use(async ctx => {
  let url = ctx.request.url;
  let html = await router(url);
  ctx.response.type = 'html';
  ctx.response.body = html;
  // ctx.body = html;
})

app.listen(300);