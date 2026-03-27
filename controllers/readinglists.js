const router = require('express').Router()
const { sequelize } = require('../util/db')

const { ReadingList, Blog, User } = require('../models')

router.post('/', async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.body.blogId)
    const user = await User.findByPk(req.body.userId)
    console.log('blog user: ', blog, user)
    if (!blog || !user) {
      return res.status(404).end()
    }

    const readingList = await ReadingList.create({
      userId: user.id,
      blogId: blog.id,
    })
    return res.json(readingList)
  } catch (error) {
    next(error)
  }
})

module.exports = router