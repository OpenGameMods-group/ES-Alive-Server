const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const db = require('models')
const errorHandler = require('util/error')

const app = express()

// middleware
app.use(helmet())
app.use(helmet.hidePoweredBy({ setTo: 'Coffee' }))
app.use(bodyParser.json())

// routes

// 404 errors
app.use((req, res, next) => {
  let err = new Error('Not Found')

  err.status = 404
  next(err)
})

// display errors
app.use(errorHandler)

module.exports = app
