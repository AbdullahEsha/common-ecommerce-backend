import { Request, Response, NextFunction } from 'express'
import { catchAsync, AppError } from '../utils'
import { User } from '../models'
import { TUser } from '../types'
// import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
// import { promisify } from 'util'
// import crypto from 'crypto'

// use proper types and generics to user authentification middleware using jwt and bcryptjs from headers and compare it with the one in the database
export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token // declare token variable

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1] // get token from headers
    }

    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access', 401),
      )
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TUser

    if (!decoded) {
      return next(
        new AppError('Invalid token! Please log in to get access', 401),
      )
    }

    // check if user still exists
    const user: TUser | null = await User.findById(decoded._id)

    if (!user) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401,
        ),
      )
    }

    // if user.password and decoded.password are not the same, then the user has changed the password after the token was issued
    if (user.password !== decoded.password || user.email !== decoded.email) {
      return next(
        new AppError(
          'User recently changed password! Please log in again.',
          401,
        ),
      )
    }

    // grant access to protected route
    req.user = user
    next()
  },
)
