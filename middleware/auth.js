// middleware/auth.js - authentication & authorization middleware

const jwt = require('jsonwebtoken')

const db = require('models')
const { SECRET_KEY } = require('config/keys')

// require login - authentication
const requireLogin = (req, res, next) => {
  try {
    // get token off header
    const token = req.headers.authorization.split(' ')[1] // Bearer token

    // decode token & verify it is ours
    jwt.verify(token, SECRET_KEY, (err, payload) => {
      if (err) {
        return next({
          status: 401,
          message: 'Please log in first'
        })
      }
    })

    return next()
  } catch (error) {
    return next({
      status: 401,
      message: 'Please log in first'
    })
  }
}

// get correct user - authorization
// check token's user id & id on the url

const checkAuthorization = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]

    // verify that token is legit & it matches the owner of the data
    jwt.verify(token, SECRET_KEY, (err, payload) => {
      if (err || !payload || payload.id !== req.params.id) {
        return next({ status: 401, message: 'Unauthorized' })
      }
    })

    return next()
  } catch (error) {
    return next({
      status: 401,
      message: 'Unauthorized'
    })
  }
}

const pilotAuthorization = async (req, res, next) => {
  try {
    const playerId = req.params.id
    const pilotId = req.params.pilotId

    const pilot = await db.Pilot.findById(pilotId)

    if (!pilot._owner.equals(playerId)) {
      return next({ status: 401, message: 'Unauthorized pilot' })
    }

    req.pilot = pilot

    return next()
  } catch (error) {
    return next({
      status: 404,
      message: 'Pilot not Found'
    })
  }
}

module.exports = {
  requireLogin,
  checkAuthorization,
  pilotAuthorization
}
