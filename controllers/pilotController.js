// controllers/pilotController.js - pilot methods

const db = require('models')

// /api/pilots/:id

// create a new pilot
const newPilot = async (req, res, next) => {
  try {
    const ownerId = req.params.id
    const pilot = await new db.Pilot({
      ...req.body,
      _owner: ownerId
    })
      .save()

    // update Player account
    const player = await db.Player.findById(ownerId)

    player.pilots.push(pilot.id)
    const updatedPlayer = await player.save()

    return res.json(pilot)
  } catch (error) {
    return next(error)
  }
}

const getPilots = async (req, res, next) => {
  try {
    const playerId = req.params.id
    const levelLimit = req.query.level || Infinity
    const { downloadedPilots } = req.body || {}

    // return pilots and populate with their ships
    // get all pilots that are not the requesting user & within the levelLimit
    const pilots = await db.Pilot.find({
      _owner: { $not: { $eq: playerId } },
      ships: { $not: { $size: 0 } },
      fleetLevel: { $not: { $gt: levelLimit } }
    }, '-credits -pendingCredits')
      .populate('ships')

    const updatedPilots = pilots
      .filter(pilot =>
        pilot.id in downloadedPilots
          ? pilot.updatedAt > downloadedPilots[pilot.id]
          : true)

    res.json(updatedPilots)
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  newPilot,
  getPilots
}
