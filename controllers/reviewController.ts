import { Review } from '../models'
import { Request, Response, NextFunction } from 'express'
import { TReview } from '../types'
import { catchAsync, AppError } from '../utils'

// Create Review
const createReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // create new review
    const review = await Review.create(req.body as TReview)

    if (!review) {
      return next(new AppError('Review not created', 400))
    }

    res.status(201).json({
      status: 'success',
      message: 'Review created successfully',
      data: review,
    })
  },
)

// get all reviews
const allReviews = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const reviews = await Review.find().populate('product').populate('user')

    if (!reviews) {
      return next(new AppError('No reviews found', 404))
    }

    res.status(200).json({
      status: 'success',
      message: 'All reviews',
      data: reviews,
    })
  },
)

export { createReview, allReviews }
