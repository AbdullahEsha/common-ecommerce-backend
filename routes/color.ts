import express from 'express'

const router = express.Router()

//import controllers
import { allColors, createColor } from '../controllers'

//routes
router.route('/').get(allColors).post(createColor)

export { router as colorRouter }
