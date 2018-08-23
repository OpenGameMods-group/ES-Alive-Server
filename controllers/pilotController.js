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

    return res.json({ pilot, updatedPilots: updatedPlayer.pilots })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  newPilot
}
