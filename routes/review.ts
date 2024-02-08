import express from 'express'

const router = express.Router()

//import controllers
import { createReview, allReviews } from '../controllers'

//routes
router.route('/').get(allReviews).post(createReview)

export { router as reviewRouter }
