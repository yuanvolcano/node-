/**
 * @description 用户关注 数据模型
 * @author volcano
 */

const seq = require('../seq')
const { INTEGER } = require('../types')

const UserRelations = seq.define('userRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户 id'
  },
  followerId: {
    type: INTEGER,
    allowNull: false,
    comment: '被关注用户的 id'
  }
})

module.exports = UserRelations
