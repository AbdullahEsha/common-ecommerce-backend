import express from 'express'

const router = express.Router()

//import controllers
import { getProducts } from '../controllers'

router.route('/').get(getProducts)

export { router as productRouter }
