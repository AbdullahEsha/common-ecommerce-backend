import mongoose from 'mongoose'
import { TVariant } from '../types'

const { Schema, model } = mongoose

const variantSchema = new Schema<TVariant>(
  {
    product: {
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
    },
    size: [
      {
        type: String,
        trim: true,
      },
    ],
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
