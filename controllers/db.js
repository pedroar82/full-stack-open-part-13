const router = require('express').Router()

const { Blog } = require('../models')
const { User } = require('../models')

router.post('/', async (req, res, next) => {
  try {
    await Blog.truncate({ cascade: true, restartIdentity: true })
    await User.truncate({ cascade: true, restartIdentity: true })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router
