import dotenv from 'dotenv'
import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

//import routes
import { userRouter } from './routes'
import { notFound, errorHandler, processRequest } from './middlewares'
import { catchAsync } from './utils'
import { dbConnect, limiter } from './config'

//env config
dotenv.config()

//app config
const app: Application = express()

//rate limiter
app.use('/api', limiter)

//routes
app.use('/api/v1/user', userRouter)

// test route
app.get(
  '/',
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.send('Server is running good... ✨🐱‍🏍🔧🚀⚡🔥')
  }),
)

// db config
dbConnect()

//static files
app.use(express.static('public')) // to serve static files

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
