const db = require('models')

// /api/players/:id/ships

// create ships with a limit of 10 per player
// overrides all previous ships
const createShips = async (req, res, next) => {
  try {
    const ownerId = req.params.id
    // array of ship objects - 10 max
    const shipsToAdd = req.body.ships
      .slice(0, 10)
      .map(ship => ({ ...ship, _owner: ownerId }))

    // delete all previous ships by owner
    const oldShips = await db.Ship.deleteMany({ _owner: ownerId })

    // add new ships
    const newShips = await db.Ship.insertMany(shipsToAdd)

    // add ships to owner
    const player = await db.Player.findById(req.params.id)
    player.ships = newShips.map(ship => ship.id)

    const updatedPlayer = await player.save()

    // send back ships & player
    return res.json({ oldShips, newShips, updatedPlayer })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  createShips
}
