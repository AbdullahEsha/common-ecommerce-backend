import express from 'express'

const router = express.Router()

//import controllers
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers'

//routes
router.route('/').get(getUsers).post(createUser)

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser)

export { router as userRouter }
