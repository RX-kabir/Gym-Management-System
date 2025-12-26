const express = require('express')
const {
  fetchAllTrainers,
  fetchTrainerById,
  addTrainer,
  removeTrainer,
  modifyTrainer
} = require('../controllers/trainerController')

const router = express.Router()

router.get('/', fetchAllTrainers)
router.get('/:id', fetchTrainerById)
router.post('/', addTrainer)
router.delete('/:id', removeTrainer)
router.patch('/:id', modifyTrainer)

module.exports = router
