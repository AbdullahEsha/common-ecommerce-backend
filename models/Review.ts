import mongoose from 'mongoose'
import { TReview } from '../types'
const { Schema, model } = mongoose

const reviewSchema = new Schema<TReview>(
  {
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    rating: {
      type: Number,
      required: [true, 'Please add a rating'],
      default: 0,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Please add a product'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please add a user'],
    },
  },
  {
    timestamps: true,
  },
)

export const Review = model<TReview>('Review', reviewSchema)
