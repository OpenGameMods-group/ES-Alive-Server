// Player model

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const playerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },

  pilots: [ {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pilot'
  } ]
})

playerSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next()

    // hash password and save it
    const hashedPassword = await bcrypt.hash(this.password, 10)
    this.password = hashedPassword

    return next()
  } catch (error) {
    return next(error)
  }
})

playerSchema.methods.comparePassword = async function (candidatePassword, next) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)

    return isMatch
  } catch (error) {
    return next(error)
  }
}

const Player = mongoose.model('Player', playerSchema)

module.exports = Player
