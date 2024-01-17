import dotenv from 'dotenv'
import app from './app'

//env config
dotenv.config()

//port config
const port = Number(process.env.PORT) || 5000

//server config
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
