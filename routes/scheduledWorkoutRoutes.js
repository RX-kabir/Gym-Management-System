const express = require('express')
const {
  fetchScheduledSessions,
  scheduleWorkoutSession
} = require('../controllers/scheduledWorkoutController')

const router = express.Router()

router.get('/', fetchScheduledSessions)
router.post('/', scheduleWorkoutSession)

module.exports = router
