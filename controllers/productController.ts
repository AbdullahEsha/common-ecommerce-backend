import { Product } from '../models'
import { Request, Response, NextFunction } from 'express'
import { TProduct } from '../types'
import { catchAsync, AppError } from '../utils'

// get all products
const getProducts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const products: TProduct[] = await Product.find().populate([
      { path: 'variant', select: 'title price' },
      { path: 'reviews', select: 'rating comment' },
    ])

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

// get single product
const getProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const product: TProduct | null = await Product.findById(
      req.params.id,
    ).populate([
      { path: 'variant', select: 'title price' },
      { path: 'reviews', select: 'rating comment' },
    ])

    if (!product) {
      return next(new AppError('No product found', 404))
    }
    res
      .status(200)
      .json({ product, success: true, message: 'Product found 🔥' })
  },
)

export { getProducts, getProduct }
