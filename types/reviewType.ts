import mongoose from 'mongoose'

export type TReview = {
  _id?: string
  description: string
  rating: number
  productId?: mongoose.Schema.Types.ObjectId
  userId?: mongoose.Schema.Types.ObjectId
}
