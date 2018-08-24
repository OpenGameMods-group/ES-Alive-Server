// routes/playerRoutes.js - pilot routes &

const express = require('express')

const { newPilot, getPilots } = require('controllers/pilotController')
const { createShips } = require('controllers/shipController')

const router = express.Router({ mergeParams: true })

// /api/players/:id
router.post('/:pilotId/ships', createShips)
router.post('/new', newPilot)
router.post('/', getPilots)

// router.route('/:pilotId')
//   .put(updatePilot)
//   .delete(deletePilot)

module.exports = router
