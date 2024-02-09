import express from 'express'

const router = express.Router()

//import controllers
import {
  allUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers'

//routes
router.route('/').get(allUsers).post(createUser)

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser)

export { router as userRouter }
