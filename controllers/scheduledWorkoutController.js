const ScheduledWorkout = require('../models/scheduledWorkoutModel')
const User = require('../models/userModel')
const Trainer = require('../models/trainerModel')

// fetch all scheduled workout sessions
const fetchScheduledSessions = async (req, res) => {
  try {
    const sessions = await ScheduledWorkout.find()
      .populate('userId', 'name email membershipType')
      .populate('trainerId', 'name specialization')

    res.status(200).json(sessions)
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve scheduled workouts' })
  }
}

// schedule a new workout session
const scheduleWorkoutSession = async (req, res) => {
  const {
    userId,
    trainerId,
    workoutType,
    scheduledAt,
    notes
  } = req.body

  try {
    // validate user
    const foundUser = await User.findById(userId)
    if (!foundUser) {
      return res.status(404).json({ error: 'Requested user does not exist' })
    }

    if (foundUser.membershipType === 'basic') {
      return res.status(403).json({
        error: 'Upgrade membership to schedule workouts'
      })
    }

    // validate trainer
    const assignedTrainer = await Trainer.findById(trainerId)
    if (!assignedTrainer) {
      return res.status(404).json({ error: 'Trainer record not found' })
    }

    if (!assignedTrainer.availability) {
      return res.status(400).json({
        error: 'Selected trainer is currently unavailable'
      })
    }

    // create schedule
    const newSession = await ScheduledWorkout.create({
      userId,
      trainerId,
      workoutType,
      scheduledAt,
      notes
    })

    res.status(201).json(newSession)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

module.exports = {
  fetchScheduledSessions,
  scheduleWorkoutSession
}
