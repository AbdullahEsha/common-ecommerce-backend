import { Request, Response, NextFunction } from 'express'

export type TAsyncFunction = (
    req: Request,
    res: Response,
    next: NextFunction,
    ) => Promise<void>