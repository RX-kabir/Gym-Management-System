const mongoose = require('mongoose')

const trainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  specialization: {
    type: [String],
    enum: ['yoga', 'cardio', 'strength', 'pilates', 'crossfit'],
    required: true
  },
  experienceYears: {
    type: Number,
    min: 0
  },
  availability: {
    type: Boolean,
    default: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Trainer', trainerSchema)
