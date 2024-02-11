import { Request, Response, NextFunction } from 'express'
import { catchAsync } from '../utils'

const checkAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === 'admin') {
      return next()
    }

    res.status(403).json({
      status: 'failed to access route 🔴',
      message: 'You are not allowed to access this route',
    })
  },
)

const checkSuperAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === 'superadmin') {
      return next()
    }

    res.status(403).json({
      status: 'failed to access route 🔴',
      message: 'You are not allowed to access this route',
    })
  },
)

export { checkAdmin, checkSuperAdmin }
