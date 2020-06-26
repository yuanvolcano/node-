/**
 * @description 数据模型入口文件
 */

const User = require('./User')
const Blog = require('./Blog')
const UserRelations = require('./UserRelations')

Blog.belongsTo(User, {
  foreignKey: 'userId'
})

UserRelations.belongsTo(User, {
  foreignKey: 'followerId'
})

User.hasMany(UserRelations, {
  foreignKey: 'userId'
})

Blog.belongsTo(UserRelations, {
  foreignKey: 'userId',
  targetKey: 'followerId'
})

module.exports = {
  User,
  Blog,
  UserRelations
}
