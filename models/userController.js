const User = require('../models/userModel')

// fetch all users
const fetchAllUsers = async (req, res) => {
  try {
    const userList = await User.find().sort({ createdAt: -1 })
    res.status(200).json(userList)
  } catch (err) {
    res.status(500).json({ error: 'Unable to retrieve users' })
  }
}

// fetch single user by id
const fetchUserById = async (req, res) => {
  const userId = req.params.id

  try {
    const userRecord = await User.findById(userId)

    if (!userRecord) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.status(200).json(userRecord)
  } catch (err) {
    res.status(400).json({ error: 'Invalid user identifier' })
  }
}

// create new user
const registerUser = async (req, res) => {
  const { name, email, age, membershipType } = req.body

  try {
    const newUser = await User.create({
      name,
      email,
      age,
      membershipType
    })

    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// remove user
const removeUser = async (req, res) => {
  const userId = req.params.id

  try {
    const deletedUser = await User.findOneAndDelete({ _id: userId })

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found for deletion' })
    }

    res.status(200).json(deletedUser)
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete user' })
  }
}

// update user details
const modifyUser = async (req, res) => {
  const userId = req.params.id

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      req.body,
      { new: true }
    )

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found for update' })
    }

    res.status(200).json(updatedUser)
  } catch (err) {
    res.status(400).json({ error: 'Update operation failed' })
  }
}

module.exports = {
  fetchAllUsers,
  fetchUserById,
  registerUser,
  removeUser,
  modifyUser
}
