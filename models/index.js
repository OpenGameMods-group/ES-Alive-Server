// models/index.js - connect to DB, setup mongoose

const mongoose = require('mongoose')

const { mongoURI } = require('config/keys')

mongoose.Promise = global.Promise

const mongooseConfig = {
  useNewUrlParser: true,
  reconnectTries: 10,
  reconnectInterval: 1000
}

const connection = mongoose.connect(mongoURI, mongooseConfig,
  (err) => {
    if (err) {
      throw new Error(err)
    }
    console.log(`Connected to MongoDB at: ${mongoURI}`)
  }
)

module.exports = {
  Player: require('./Player'),
  Ship: require('./Ship')
}
