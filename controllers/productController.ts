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
      category,
      domain,
      status,
    } = req.body

    const sku = generateSKU(6)
    const slug = slugify(title, { lower: true }) + '-' + sku

    const productData: TProduct = {
      title,
      description,
      ragularPrice,
      salePrice,
      category,
      domain,
      status,
      sku,
      slug,
    }

    // create new product
    const product = await Product.create(productData)

    if (!product) {
      return next(new AppError('Product not created', 400))
    }

    res.status(201).json({
      status: 'success',
      message: 'Product created successfully',
      data: product,
    })
  },
)

const allProducts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find()
      .populate('category')
      .populate('domain')
      .populate('variant')
      .populate('review')

    if (!products) {
      return next(new AppError('No products found', 404))
    }

    res.status(201).json({
      status: 'success',
      results: products.length,
      data: products,
    })
  },
)

export { createProduct, allProducts }
