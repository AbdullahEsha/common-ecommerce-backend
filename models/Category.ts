import mongoose from 'mongoose'
import { TCategory } from '../types'
const { Schema, model } = mongoose

const categorySchema = new Schema<TCategory>(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      maxlength: [50, 'Title cannot be more than 50 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Please add a slug'],
      trim: true,
      maxlength: [50, 'Slug cannot be more than 50 characters'],
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

export const Category = model<TCategory>('Category', categorySchema)
