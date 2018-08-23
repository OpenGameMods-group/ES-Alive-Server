// routes/pilotRoutes.js - pilot routes

const express = require('express')

const { newPilot } = require('controllers/pilotController')

const router = express.Router({ mergeParams: true })

// /api/pilots/:id
router.post('/new', newPilot)

module.exports = router
