const express = require('express')
const {
  fetchAllUsers,
  fetchUserById,
  registerUser,
  removeUser,
  modifyUser
} = require('../controllers/userController')

const router = express.Router()

router.get('/', fetchAllUsers)
router.get('/:id', fetchUserById)
router.post('/', registerUser)
router.delete('/:id', removeUser)
router.patch('/:id', modifyUser)

module.exports = router
