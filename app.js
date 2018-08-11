const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')

const db = require('models')
const errorHandler = require('middleware/error')
const { requireLogin, checkAuthorization } = require('middleware/auth')

const app = express()

// middleware
app.use(helmet())
app.use(helmet.hidePoweredBy({ setTo: 'Coffee' }))
app.use(cors())
app.use(bodyParser.json())

// routes
app.use('/api/auth', require('routes/authRoutes'))
app.use(
  '/api/players/:id/ships',
  requireLogin,
  checkAuthorization,
  require('routes/shipRoutes')
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
