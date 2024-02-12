import express from 'express'

const router = express.Router()

//import controllers
import { loginUser, registerUser, changePassword } from '../controllers'
import { checkAdmin, protect } from '../middlewares'

//routes
router.route('/login').post(loginUser)
router.route('/register').post(registerUser)

// protect the routes below
router.use(protect, checkAdmin)
router.route('/change-password').post(changePassword)

export { router as credentialRouter }
