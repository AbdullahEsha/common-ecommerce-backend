import { Color } from '../models'
import { Request, Response, NextFunction } from 'express'
import { TColor } from '../types'
import { catchAsync, AppError } from '../utils'

// get all colors
const allColors = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const colors: TColor[] = await Color.find().populate('domain')
    if (!colors) {
      return next(new AppError('No colors found', 404))
    }
    res.status(200).json({
      status: 'success',
      message: 'All colors',
      data: colors,
    })
  },
)

// create color
const createColor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const color: TColor = await Color.create(req.body)

    if (!color) {
      return next(new AppError('Color not created', 400))
    }

    res.status(201).json({
      status: 'success',
      message: 'Color created',
      data: color,
    })
  },
)

export { allColors, createColor }
