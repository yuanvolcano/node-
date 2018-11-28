module.exports = {
  port: 3000,
  session: {
    secret: 'myblog',
    key: 'myblog',
    maxAge: 604800
  },
  mongodb: 'mongodb://localhost:27017/myblog'
}
