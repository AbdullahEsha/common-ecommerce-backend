import mongoose from 'mongoose'
import { TDomain } from '../types'

const { Schema, model } = mongoose

const domainSchema = new Schema<TDomain>(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    subDomain: {
      type: String,
      required: [true, 'Please add a subDomain'],
      trim: true,
      maxlength: [50, 'subDomain cannot be more than 50 characters'],
    },
    userLimit: {
      type: Number,
      trim: true,
      default: 100,
    },
    productLimit: {
      type: Number,
      trim: true,
      default: 100,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  },
)

export const Domain = model<TDomain>('Domain', domainSchema)
