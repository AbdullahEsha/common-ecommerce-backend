import express from 'express'

const router = express.Router()

//import controllers
import { createProduct } from '../controllers'

//routes
router
  .route('/')
  .post(createProduct)
  .get((req, res) => {
    res.send('Product Route')
  })

export { router as productRouter }
