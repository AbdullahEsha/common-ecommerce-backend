import express from 'express'

const router = express.Router()

//import controllers
import { createCategory, allCategories } from '../controllers'

//routes
router.route('/').get(allCategories).post(createCategory)

export { router as categoryRouter }
