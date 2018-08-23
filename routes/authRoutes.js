// routes/authRoutes.js - authentication routes

const express = require('express')

const { signup, signin } = require('controllers/authController')

const router = express.Router()

// /api/auth
router.post('/signup', signup)
router.post('/signin', signin)

module.exports = router
