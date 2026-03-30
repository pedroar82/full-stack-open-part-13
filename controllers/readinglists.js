const router = require('express').Router()
const { sequelize } = require('../util/db')

const { ReadingList, Blog, User } = require('../models')
const {tokenExtractor, sessionValidator} = require('../util/middleware')

router.post('/', async (req, res, next) => {
  try {

     if (!req.body.blogId || !req.body.userId) {
      return res.status(400).end()
    }

    const blog = await Blog.findByPk(req.body.blogId)
    const user = await User.findByPk(req.body.userId)
    const read = req.body.read

    if (!blog || !user) {
      return res.status(404).end()
    }
    const readingList = await ReadingList.create({
      user_id: user.id,
      blog_id: blog.id,
      read: read ? read : false
    })
    return res.json(readingList)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', tokenExtractor, sessionValidator, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const readingList = await ReadingList.findByPk(req.params.id)

    if (!readingList) {
      return res.status(404).json({ error: 'reading list entry not found' })
    }

    if (readingList.user_id !== user.id) {
      return res.status(401).json({ error: 'user not authorized' })
    }

    readingList.read = req.body.read
    await readingList.save()
    res.json(readingList)
  } catch (error) {
    next(error)
  }
})

module.exports = router