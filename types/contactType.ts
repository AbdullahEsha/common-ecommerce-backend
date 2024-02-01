import mongoose from 'mongoose'

export type TContact = {
  _id?: string
  email: string
  subject: string
  message: string
  status: string
  domain: mongoose.Schema.Types.ObjectId
  createdAt?: Date
  updatedAt?: Date
}
