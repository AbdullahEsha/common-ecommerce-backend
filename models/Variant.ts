import mongoose from 'mongoose'
import { TVariant } from '../types'

const { Schema, model } = mongoose

const variantSchema = new Schema<TVariant>(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Please add a product'],
    },
    quantity: {
      type: Number,
      required: [true, 'Please add a quantity'],
      default: 0,
    },
    color: {
      type: String,
      trim: true,
      maxlength: [50, 'Color cannot be more than 50 characters'],
    },
    size: {
      type: String,
      trim: true,
      maxlength: [50, 'Size cannot be more than 50 characters'],
    },
    images: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  },
)

export const Variant = model<TVariant>('Variant', variantSchema)
