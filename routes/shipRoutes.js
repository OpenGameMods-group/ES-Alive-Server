const express = require('express')

const { createShips } = require('controllers/shipController')

const router = express.Router({ mergeParams: true })

// prefix - /api/players/:id/:pilotId/ships
router.route('/')
  .post(createShips)

module.exports = router
