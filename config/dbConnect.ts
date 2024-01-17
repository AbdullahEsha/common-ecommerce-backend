import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { TDBConn } from '../types'

//env config
dotenv.config()

//db config
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD
const MONGO_DB_USER = process.env.MONGO_DB_USER
const MONGO_DB_NAME = process.env.MONGO_DB_NAME
const MONGO_DB_URL = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@cluster0.4w34rds.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`

//db connection
export const dbConnect = async (): Promise<TDBConn> => {
  try {
    const conn = await mongoose.connect(MONGO_DB_URL)
    console.log('MongoDB connection successful: ', conn.connection.host)
    return { isConn: true, conn: conn.connection.host }
  } catch (error) {
    // Catch any potential errors
    const err = error as any
    console.log('MongoDB connection error: ', err.message)
    return { isConn: false, conn: err.message }
  }
}
