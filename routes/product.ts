import express from 'express'

const router = express.Router()

//import controllers
import { getProduct, getProducts } from '../controllers'

router.route('/').get(getProducts)

router.route('/:id').get(getProduct)

export { router as productRouter }
