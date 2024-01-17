import { Request, Response, NextFunction } from 'express'
import { catchAsync, AppError } from '../utils'
import { User } from '../models'
import { TUserProtect } from '../types'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

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
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
    const currentUser: TUserProtect | null = await User.findById(decoded.id)
    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401,
        ),
      )
    }
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError(
          'User recently changed password! Please log in again.',
          401,
        ),
      )
    }
    //req.user = currentUser
    res.locals.user = currentUser
    next()
  },
)
