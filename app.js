const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')

const db = require('models')
const errorHandler = require('middleware/error')
const { requireLogin, checkAuthorization } = require('middleware/auth')

const app = express()

// middleware
app.use(helmet())
app.use(helmet.hidePoweredBy({ setTo: 'Coffee' }))
app.use(cors())
app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

// routes
app.use('/api/auth', require('routes/authRoutes'))

app.use(
  '/api/players/:id',
  requireLogin,
  checkAuthorization,
  require('routes/playerRoutes')
)

// 404 errors
app.use((req, res, next) => {
  let err = new Error('Not Found')

  err.status = 404
  next(err)
})

// display errors
app.use(errorHandler)

module.exports = app
