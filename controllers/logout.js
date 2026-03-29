const router = require('express').Router()

const {tokenExtractor} = require('../util/middleware')
const User = require('../models/user')
const Session = require('../models/session')

router.delete('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const token = req.token

    await Session.destroy({
      where: { sid: token },
    })

    user.disable = true
    await user.save()

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router