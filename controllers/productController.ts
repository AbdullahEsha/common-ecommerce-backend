import { Product } from '../models'
import { Request, Response, NextFunction } from 'express'
import { TProduct } from '../types'
import { catchAsync, AppError } from '../utils'

// get all products
const getProducts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit)

    // filter based on color, size, category, ragularPrice, salePrice
    // if selaPrice is not provided, then filter based on ragularPrice and vice versa
    // http://localhost:8000/api/v1/product?color=Black,Red&category=SAREE,PARTY%20GOWN&size=XL,XXL&minPrice=1000&maxPrice=2000

    // Parse and split parameters into arrays
    const parseQueryParamArray = (param: string | undefined) => {
      return param?.split(',').map((item) => item.trim())
    }

    const color = parseQueryParamArray(req.query.color as string) || []
    const size = parseQueryParamArray(req.query.size as string) || []
    const category = parseQueryParamArray(req.query.category as string) || []
    const minPrice = Number(req.query.minPrice) || 0
    const maxPrice = Number(req.query.maxPrice) || 0

    // Create query object
    const query: any = {
      color: { $in: color },
      size: { $in: size },
      category: { $in: category },
      ragularPrice: { $gte: minPrice, $lte: maxPrice },
    }

    // Remove fields with undefined values
    Object.keys(query).forEach(
      (key) => query[key] === undefined && delete query[key],
    )

    // sort based on createdAt, updatedAt, ragularPrice and if salePrice is provided, then sort based on salePrice
    const sortDirection = req.query.sort === 'asc' ? 1 : -1
    const sortBy = req.query.sortBy || 'updatedAt'

    const sort: any = {
      [sortBy as string]: sortDirection,
    }

    const products: TProduct[] = await Product.find(query)
      .populate([
        { path: 'variant', select: 'title price' },
        { path: 'reviews', select: 'rating comment' },
      ])
      .limit(limit)
      .skip(limit * (page - 1))
      .sort(sort)

    if (!products) {
      return next(new AppError('No products found', 404))
    }

    const count = await Product.find(query).countDocuments()

    // success
    // total
    // totalPages
    // currentPage
    // previousPage
    // nextPage
    // product

    res.status(200).json({
      products,
      success: true,
      message: 'Products found 🔥',
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      previousPage: page > 1 ? page - 1 : null,
      nextPage: page < Math.ceil(count / limit) ? page + 1 : null,
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
