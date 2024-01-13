import dotenv from 'dotenv'
import express, { Application } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

//import routes
import routerUser from './routes/user'

//env config
dotenv.config()

//app config
const app: Application = express()

//routes
app.use('/api/v1/user', routerUser)

//middlewares
app.use(express.json())
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  }),
)
app.use(cookieParser())

//export app
export default app
