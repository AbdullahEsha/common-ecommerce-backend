import mongoose from 'mongoose'

export type TVariant = {
  _id?: string
  product: mongoose.Schema.Types.ObjectId
  quantity: number
  color?: string
  size?: string[]
  images?: string[]
  createdAt?: Date
  updatedAt?: Date
}
