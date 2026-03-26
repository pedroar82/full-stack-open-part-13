

const errorHandler = (error, request, response, next) => {
  if (error.name === 'SequelizeValidationError') {
    return response
      .status(400)
      .send({ error: 'username must be a valid email address' })
  } else {
    return response.status(400).json({ error: error.message })
  }
}

module.exports = {
  errorHandler
}