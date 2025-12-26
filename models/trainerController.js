const Trainer = require('../models/trainerModel')

// retrieve all trainers
const fetchAllTrainers = async (req, res) => {
  try {
    const trainerList = await Trainer.find().sort({ createdAt: -1 })
    res.status(200).json(trainerList)
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch trainers' })
  }
}

// retrieve single trainer by id
const fetchTrainerById = async (req, res) => {
  const trainerId = req.params.id

  try {
    const trainerRecord = await Trainer.findById(trainerId)

    if (!trainerRecord) {
      return res.status(404).json({ error: 'Trainer not found' })
    }

    res.status(200).json(trainerRecord)
  } catch (err) {
    res.status(400).json({ error: 'Invalid trainer ID' })
  }
}

// create new trainer profile
const addTrainer = async
