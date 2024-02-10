import mongoose from 'mongoose'

export type TUser = {
  _id?: string
  name: string
  email: string
  password: string
  role?: string
  domain?: mongoose.Schema.Types.ObjectId
  updatedAt?: string
  createdAt?: string
}

// type for user save method
export type TUserAdd = {
  save(): TUserAdd | PromiseLike<TUserAdd>
  name: string
  email: string
  password: string
  role?: string
  domain?: mongoose.Schema.Types.ObjectId
}
