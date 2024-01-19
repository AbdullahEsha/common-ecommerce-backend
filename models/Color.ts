import mongoose from 'mongoose'
import { TColor } from '../types'

const { Schema, model } = mongoose

const colorSchema = new Schema<TColor>(
  {
    primary: {
      type: String,
      trim: true,
    },
    secondary: {
      type: String,
      trim: true,
    },
    tertiary: {
      ttype: String,
      trim: true,
    },
    quaternary: {
      type: String,
      trim: true,
    },
    domain: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
)

export const Color = model<TColor>('Color', colorSchema)
