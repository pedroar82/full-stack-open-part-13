

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
  errorHandler
}