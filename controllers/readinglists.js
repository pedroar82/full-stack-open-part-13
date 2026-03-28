const router = require('express').Router()
const { sequelize } = require('../util/db')

const { ReadingList, Blog, User } = require('../models')
const {tokenExtractor} = require('../util/middleware')

router.post('/', async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.body.blogId)
    const user = await User.findByPk(req.body.userId)
    const read = req.body.read

    if (!blog || !user) {
      return res.status(404).end()
    }

    const readingList = await ReadingList.create({
      userId: user.id,
      blogId: blog.id,
      read: read ? read : false
    })
    return res.json(readingList)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const readingList = await ReadingList.findOne({
      where: {
        blogId: req.params.id,
        userId: user.id,
      },
    })

    if (!readingList) {
      return res.status(404).end()
    }

    readingList.read = req.body.read
    await readingList.save()
  } catch (error) {
    next(error)
  }
})

module.exports = router