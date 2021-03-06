const db = require('models')

// /api/players/:id/:pilotId/ships

// create ships with a limit of 10 per player
// overrides all previous ships
const createShips = async (req, res, next) => {
  try {
    const ownerId = req.params.id
    const pilotId = req.params.pilotId
    const pilot = req.pilot

    // array of ship objects - 10 max
    const shipsToAdd = req.body.ships
      .slice(0, 10)
      .map(ship => ({ ...ship, _owner: pilotId }))

    // delete all previous ships by owner
    const oldShips = await db.Ship.deleteMany({ _owner: pilotId })

    // add new ships
    const newShips = await Promise.all(shipsToAdd.map(async ship => {
      return new db.Ship(ship).save()
    }))

    // add ships to owner
    pilot.ships = newShips.map(ship => ship.id)

    pilot.fleetLevel = newShips.reduce((a, b) => a + b.level, 0)

    const updatedPilot = await pilot.save()

    // send back ships & pilot
    return res.json(Object.assign(updatedPilot, { ships: newShips }))
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  createShips
}
