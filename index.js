
const express = require('express')
const middleware = require('./util/middleware')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorRouter = require('./controllers/authors')
const dbRouter = require('./controllers/db')
const readinglistsRouter = require('./controllers/readinglists')
const logoutRouter = require('./controllers/logout')

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorRouter)
app.use('/api/reset', dbRouter)
app.use('/api/readinglists', readinglistsRouter)
app.use('/api/logout', logoutRouter)

app.get('/', (req, res) => {
  res.status(200).end()
})

app.use(middleware.errorHandler)

const start = async () => {
  await connectToDatabase()
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()

