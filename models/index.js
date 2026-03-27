const Blog = require('./blog')
const User = require('./user')

User.hasMany(Blog)
Blog.belongsTo(User)

const syncModels = async () => {
  User.sync({ alter: true })
  Blog.sync({ alter: true })
}

syncModels()

module.exports = {
  Blog, User
}