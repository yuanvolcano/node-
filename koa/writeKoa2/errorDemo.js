/**
 * @file 错误处理demo
 */

let SimpleKoa = require('./application');

let app = new SimpleKoa();

app.use(async ctx => {
    throw new Error('oooops!');
});

app.on('error', err => {
    console.log('error happends: ', err.stack);
});

app.listen(3000, () => {
    console.log('listenning on 3000')
})