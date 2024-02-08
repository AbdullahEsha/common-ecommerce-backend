import express from 'express'

const router = express.Router()

//import controllers
import { allProducts, createProduct } from '../controllers'

//routes
router.route('/').get(allProducts).post(createProduct)

export { router as productRouter }
