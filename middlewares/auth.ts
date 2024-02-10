import { Request, Response, NextFunction } from 'express'
import { catchAsync, AppError } from '../utils'
import { User } from '../models'
import { TUser } from '../types'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import crypto from 'crypto'

// use proper types and generics to user authentification middleware using jwt and bcryptjs from headers and compare it with the one in the database
export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access', 401),
      )
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as
      | TUser
      | 'error'

    if (decoded === 'error') {
      return next(
        new AppError('Invalid token! Please log in to get access', 401),
      )
    }

    const user: TUser | null = await User.findById(decoded._id)
    if (!user) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401,
        ),
      )
    }

    console.log(
      "Checking if user's password was changed after the token was issued",
    )
    console.log('user 🚀', user)
    console.log('decoded 🎉', decoded)
    console.log('req.user 🤷‍♀️', (req as any).user)

    //req.user = currentUser
    res.locals.user = user
    next()
  },
)
