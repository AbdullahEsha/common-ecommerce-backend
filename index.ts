import { Request, Response } from 'express'
import dotenv from 'dotenv'
import { dbConnect } from './utils'
import app from './app'

//env config
dotenv.config()

//port config
const port = Number(process.env.PORT) || 8000

//route config
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running good... ✨🐱‍🏍🔧🚀⚡🔥')
})

//server config
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
  dbConnect()
})
