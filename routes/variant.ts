import express from 'express'

const router = express.Router()

//import controllers
import { createVariant, allVariants } from '../controllers'

//routes
router.route('/').get(allVariants).post(createVariant)

export { router as variantRouter }
