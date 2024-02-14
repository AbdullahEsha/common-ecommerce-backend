import { Product } from '../models'
import { Request, Response, NextFunction } from 'express'
import { TProduct } from '../types'
import { catchAsync, AppError, generateSKU } from '../utils'
import slugify from 'slugify'

// Create Product
const createProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const title = req.body.title

    const sku = generateSKU(6)
    const slug = slugify(title, { lower: true }) + '-' + sku

    const productData: TProduct = {
      ...req.body,
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
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit)

    // Parse and split parameters into arrays
    const parseQueryParamArray = (param: string) => {
      if (req.query[param]) {
        return (req.query[param] as string).split(',')
      }
    }
    // http://localhost:8000/api/v1/product?color=Black,Red&category=SAREE,PARTY%20GOWN&size=XL,L&price=1000,2000&limit=10&page=1&sortBy=desc

    const queryFields = ['category', 'size', 'color', 'minPrice', 'maxPrice']

    const filter = queryFields.reduce((result: any, field: string) => {
      if (field === 'category' && req.query.category) {
        return {
          ...result,
          category: { $in: parseQueryParamArray('category') },
        }
      }
      if (field === 'size' && req.query.size) {
        return {
          ...result,
          'variant.size': { $in: parseQueryParamArray('size') },
        }
      }
      if (field === 'color' && req.query.color) {
        return {
          ...result,
          'variant.color': { $in: parseQueryParamArray('color') },
        }
      }
      // price filter based on ragularPrice max and min
      if (req.query.minPrice && req.query.maxPrice) {
        return {
          ...result,
          ragularPrice: {
            $gte: Number(req.query.minPrice),
            $lte: Number(req.query.maxPrice),
          },
        }
      }

      return result
    }, {})

    const sortDirection = req.query.sort === 'asc' ? 1 : -1
    const sortBy = req.query.sortBy || 'createdAt' || 'updatedAt'

    const sortOptions = { [sortBy as 'createdAt' | 'updatedAt']: sortDirection }

    const products = await Product.find(filter)
      .sort(sortOptions as {})
      .limit(limit)
      .skip(limit * (page - 1))
      .populate(['category', 'domain'])

    const count = await Product.find(filter).countDocuments()

    res.status(200).json({
      status: 'success',
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      previousPage: page - 1 > 0 ? page - 1 : null,
      nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
      products,
    })
  },
)

export { createProduct, allProducts }
