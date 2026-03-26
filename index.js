
const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
const middleware = require('./util/middleware')
const app = express()

const Blog = require('./models/blog')
const User = require('./models/user')

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorRouter = require('./controllers/authors')
const dbRouter = require('./controllers/db')

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorRouter)
app.use('/api/reset', dbRouter)

app.get('/', (req, res) => {
  res.status(200).end()
})

app.use(middleware.errorHandler)

const start = async () => {
  await connectToDatabase()
  await User.sync({ alter: true })
  await Blog.sync({ alter: true })
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()

