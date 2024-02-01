import { Product } from '../models'
import { Request, Response, NextFunction } from 'express'
import { TProduct } from '../types'
import { catchAsync, AppError } from '../utils'

// get all products
const getProducts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const products: TProduct[] = await Product.find().select('variant reviews')
    if (!products) {
      return next(new AppError('No products found', 404))
    }
    res.status(200).json({
      products: products,
      success: true,
      count: products.length,
    })
  },
)

export { getProducts }
