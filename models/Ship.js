// Ship model

const mongoose = require('mongoose')

const shipSchema = new mongoose.Schema({
  name: String
})

const Ship = mongoose.model('Ship', shipSchema)

module.exports = Ship
