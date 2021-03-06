const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  else request.token = null

  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = await jwt.verify(request.token, process.env.SECRET)

  if (decodedToken.id) {
    request.user = await User.findById(decodedToken.id)
  }
  else {
    request.user = null
  }
  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return response(401).json({ error: 'token expired' })
  } else if (error.name === 'CastError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = { errorHandler, tokenExtractor, userExtractor }
