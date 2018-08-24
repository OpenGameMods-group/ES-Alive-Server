// routes/pilotRoutes.js - pilot routes

const express = require('express')

const { newPilot, getPilots } = require('controllers/pilotController')

const router = express.Router({ mergeParams: true })

// /api/pilots/:id
router.post('/new', newPilot)
router.get('/', getPilots)

module.exports = router
