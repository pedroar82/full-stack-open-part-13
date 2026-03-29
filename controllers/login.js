const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/user')
const Session = require('../models/session')
const { SECRET } = require('../util/config')

loginRouter.post('/', async (request, response, next) => {
  const { username, password } = request.body

  try {
    const user = await User.findOne({
      where: {
        username,
      },
    })

    if (!(user && password)) {
      return response.status(401).json({
        error: 'invalid username or password',
      })
    }

    const userForToken = {
      username: user.username,
      id: user.id,
    }

    const token = jwt.sign(userForToken, SECRET, { expiresIn: 60 * 60 })

    await Session.create({
      sid: token,
      userId: user.id,
    })

    user.disable=false
    await user.save() 

    response
      .status(200)
      .send({ token, username: user.username, name: user.name })
  } catch (error) {
    next(error)
  }
})

module.exports = loginRouter