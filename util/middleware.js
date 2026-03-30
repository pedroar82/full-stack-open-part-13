const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const Session = require('../models/session')
const User = require('../models/user')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7)
    req.token = token
    try {
      req.decodedToken = jwt.verify(token, SECRET)
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

const sessionValidator = async (req, res, next) => {
  try {
    const session = await Session.findOne({ where: { sid: req.token } })
    if (!session) {
      return res.status(401).json({ error: 'session expired' })
    }

    const user = await User.findByPk(req.decodedToken.id)
    if (!user || user.disable) {
      return res.status(404).json({ error: 'user disabled' })
    }
  } catch (error) {
    next(error)
  }
  next()
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'SequelizeValidationError') {
    const messages = error.errors.map(e => e.message).join(', ')
    return response
      .status(400)
      .send({ error: messages })
  } else {
    return response.status(400).json({ error: error.message })
  }
}

module.exports = {
  errorHandler,
  tokenExtractor,
  sessionValidator
}