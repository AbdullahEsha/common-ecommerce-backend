import express from 'express'

const router = express.Router()

//import controllers
import {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} from '../controllers/userController'

//routes
router.route('/').get(getUsers).post(addUser)
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser)

export default router
