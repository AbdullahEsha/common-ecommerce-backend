import dotenv from 'dotenv'
import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'

//import routes
import routerUser from './routes/user'
import { notFound, errorHandler, processRequest } from './middlewares'
import { dbConnect, catchAsync } from './utils'

//env config
dotenv.config()

//app config
const app: Application = express()

//rate limiter
const limiter = rateLimit({
  max: 100, // 100 requests
  windowMs: 60 * 60 * 1000, // per hour
  message: 'Too many requests from this IP, please try again in an hour!', // message to send
})
app.use('/api', limiter)

//routes
app.use('/api/v1/user', routerUser)

// test route
app.get(
  '/',
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.send('Server is running good... ✨🐱‍🏍🔧🚀⚡🔥')
  }),
)

// db config
dbConnect()

//middlewares
app.use(express.json())
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  }),
)
app.use(cookieParser())

//error handling middleware
app.use(notFound)
app.use(errorHandler)
app.use(processRequest)

//export app
export default app
