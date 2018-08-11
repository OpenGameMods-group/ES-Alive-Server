// controllers/authController.js - authentication methods

const jwt = require('jsonwebtoken')

const { SECRET_KEY } = require('config/keys')
const db = require('models')

// TODO: refactor so that password is never included by mongodb and the res can just be 'player'
const signin = async (req, res, next) => {
  try {
    // find the player
    const player = await db.Player.findOne({ username: req.body.username })
    const { id, username, world, credits, level, fleetLevel, ships, pendingCredits } = player

    // check if password matches
    const isMatch = await player.comparePassword(req.body.password)

    if (isMatch) {
      // login ( using JWT )
      const token = jwt.sign({ id, username, world, credits, level }, SECRET_KEY)

      return res.json({ id, username, world, credits, level, fleetLevel, ships, pendingCredits, token })
    } else {
      // not a match
      return next({ status: 400, message: 'Invalid username / password' })
    }
  } catch (error) {
    // error finding player in DB or other error
    return next({ status: 400, message: 'Invalid username / password' })
  }
}

const signup = async (req, res, next) => {
  try {
    // create a player
    const player = await db.Player.create(req.body)
    const { id, username, world, credits, level, fleetLevel, ships, pendingCredits } = player

    // create a token
    const token = jwt.sign(
      { id, username, world, credits, level },
      SECRET_KEY
    )

    return res.json({ id, username, world, credits, level, fleetLevel, ships, pendingCredits, token })
  } catch (error) {
    // validation fails
    if (error.code === 11000) {
      error.message = 'Sorry, that username/username is taken.'
    }

    return next({
      status: 400,
      message: error.message
    })
  }
}

module.exports = {
  signin,
  signup
}
