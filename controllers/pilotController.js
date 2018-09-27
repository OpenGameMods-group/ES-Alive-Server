// controllers/pilotController.js - pilot methods

const _ = require('lodash')

const db = require('models')

// /api/pilots/:id

// create a new pilot
const newPilot = async (req, res, next) => {
  try {
    const ownerId = req.params.id
    const { name, credits, faction } = req.body

    const player = await db.Player.findById(ownerId)
    // const playerPilots = await player.getPilotNames()

    const existingPilot = await db.Pilot.findOne({
      _owner: ownerId,
      name
    })

    if (existingPilot) {
      return res.json(existingPilot)
    } else {
      const pilot = await new db.Pilot({
        name,
        credits,
        faction,
        _owner: ownerId
      }).save()

      // update Player account
      player.pilots.push(pilot.id)

      await player.save()

      return res.json(pilot)
    }
  } catch (error) {
    return next(error)
  }
}

const updatePilot = async (req, res, next) => {
  try {
    if (!req.body.updates) {
      return next(new Error('Please provide updates'))
    }

    const pilot = req.pilot
    // allowed updates
    const updates = _.pick(req.body.updates,
      [ 'name', 'personality', 'phrases',
        'credits', 'pendingCredits', 'faction' ])

    const updated = await Object.assign(pilot, updates).save()

    res.json(updated)
  } catch (error) {
    return next.error
  }
}

const deletePilot = async (req, res, next) => {
  try {
    const removed = await req.pilot.remove()

    return res.json(removed)
  } catch (error) {
    console.log(error)
    return next.error
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
  getPilots,
  updatePilot,
  deletePilot
}
