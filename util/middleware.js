const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
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
  tokenExtractor
}