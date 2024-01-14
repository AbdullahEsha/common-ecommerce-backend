// catchAsync is a wrapper function that catches errors and passes them to the next middleware
// It is used in the controllers to catch any errors that are thrown
//
import { Request, Response, NextFunction } from 'express'

type TAsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>

export const catchAsync = (fn: TAsyncFunction) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch(next)
  }
}
