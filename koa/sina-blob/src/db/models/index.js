/**
 * @description 数据模型入口文件
 */

const User = require('./User')
const Blog = require('./Blog')
const UserRelations = require('./UserRelations')
const AtRelation = require('./atRelation')

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

Blog.hasMany(AtRelation, {
  foreignKey: 'blogId'
})

module.exports = {
  User,
  Blog,
  UserRelations,
  AtRelation
}
