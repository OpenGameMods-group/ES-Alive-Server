// routes/playerRoutes.js - pilot routes &

const express = require('express')

const { pilotAuthorization } = require('middleware/auth')
const { newPilot, getPilots, updatePilot, deletePilot } = require('controllers/pilotController')
const { createShips } = require('controllers/shipController')

const router = express.Router({ mergeParams: true })

// /api/players/:id
router.post('/:pilotId/ships', pilotAuthorization, createShips)
router.post('/new', newPilot)
router.post('/', getPilots)

router.route('/:pilotId')
  .put(pilotAuthorization, updatePilot)
  .delete(pilotAuthorization, deletePilot)

module.exports = router
