import { Domain } from '../models'
import { Request, Response, NextFunction } from 'express'
import { TDomain } from '../types'
import { AppError, catchAsync } from '../utils'

// Create Domain
const createDomain = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, subDomain, userLimit, productLimit, status } = req.body

    const domainData: TDomain = {
      name,
      subDomain,
      userLimit,
      productLimit,
      status,
    }

    // create new domain
    const domain = await Domain.create(domainData)

    if (!domain) {
      return next(new AppError('Domain not created', 400))
    }

    res.status(201).json({
      status: 'success',
      message: 'Domain created successfully',
      data: domain,
    })
  },
)

const allDomains = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const domains = await Domain.find()

    if (!domains) {
      return next(new AppError('No domains found', 404))
    }

    res.status(200).json({
      status: 'success',
      results: domains.length,
      data: domains,
    })
  },
)

export { createDomain, allDomains }
