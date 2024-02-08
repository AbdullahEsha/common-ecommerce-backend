import { Variant } from '../models'
import { Request, Response, NextFunction } from 'express'
import { TVariant } from '../types'
import { catchAsync, AppError } from '../utils'

// create variant
const createVariant = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const variant = await Variant.create(req.body as TVariant)

    if (!variant) {
      return next(new AppError('Variant not created', 400))
    }

    res.status(201).json({
      status: 'success',
      message: 'Variant created successfully',
      data: variant,
    })
  },
)

// get all variants
const allVariants = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const variants = await Variant.find().populate('product')

    if (!variants) {
      return next(new AppError('No variants found', 404))
    }

    res.status(200).json({
      status: 'success',
      message: 'All variants',
      data: variants,
    })
  },
)

export { createVariant, allVariants }
