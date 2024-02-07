import { Product } from '../models'
import { Request, Response, NextFunction } from 'express'
import { TProduct } from '../types'
import { catchAsync, AppError, generateSKU } from '../utils'
import slugify from 'slugify'

// Create Product
const createProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      title,
      description,
      ragularPrice,
      salePrice,
      status,
      category,
      domain,
    } = req.body

    const slug = slugify(title, { lower: true })
    const sku = generateSKU(6)

    const product: TProduct = {
      sku,
      title,
      slug,
      description,
      ragularPrice,
      salePrice,
      status,
      category,
      domain,
    }

    const newProduct = await Product.create(product)

    if (!newProduct) return next(new AppError('Product not created', 400))

    res.status(201).json({
      status: 'success',
      data: newProduct,
    })
  },
)

export { createProduct }
