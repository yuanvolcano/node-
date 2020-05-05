const Sequelize = require('sequelize')
const seq = require('./seq')

// 创建 User 模型
const User = seq.define('user', {
  // id 会自动创建，并设为主键、自增
  userName: {
    type: Sequelize.STRING, // varchart(255)
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nickName: {
    type: Sequelize.STRING,
    comment: '昵称'
  }
  // 自动创建：createdAt 和 updatedAt
})

// 创建 Blog 模型
const Blog = seq.define('blog', {
  // id 会自动创建，并设为主键、自增
  title: {
    type: Sequelize.STRING, // varchart(255)
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

// 外键关联
Blog.belongsTo(User, {
  // 创建外键 Blog.userId -> User.id
  foreignKey: 'userId'
})
User.hasMany(Blog, {
  // 创建外键 Blog.userId -> User.id
  foreignKey: 'userId'
})

module.exports = {
  User,
  Blog
}

