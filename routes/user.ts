import express from 'express'

const router = express.Router()

//import controllers
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers'
import { checkAdmin } from '../middlewares'

//routes
router.route('/').get(getAllUsers).post(createUser)

router.route('/:id').get(getUser)

// protect the routes below
router.use(checkAdmin)

router.route('/:id').put(updateUser).delete(deleteUser)

export { router as userRouter }
