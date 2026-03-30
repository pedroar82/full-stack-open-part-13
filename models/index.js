const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./reading_list')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, {
  through: ReadingList,
  foreignKey: 'user_id'
})

Blog.belongsToMany(User, {
  through: ReadingList,
  foreignKey: 'blog_id'
})

module.exports = {
  Blog, User, ReadingList
}