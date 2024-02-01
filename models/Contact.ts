import mongoose from 'mongoose'
import { TContact } from '../types'

const { Schema, model } = mongoose

const contactSchema = new Schema<TContact>(
  {
    email: {
      type: String,
      required: [true, 'Please add an email'],
      trim: true,
      lowercase: true,
      maxlength: [50, 'Email cannot be more than 50 characters'],
      minlength: [5, 'Email cannot be less than 5 characters'],
    },
    subject: {
      type: String,
      required: [true, 'Please add a subject'],
      trim: true,
      maxlength: [70, 'Subject cannot be more than 70 characters'],
    },
    message: {
      type: String,
      required: [true, 'Please add a message'],
      trim: true,
      maxlength: [500, 'Message cannot be more than 500 characters'],
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    domain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Domain',
      required: [true, 'Please add a domain'],
    },
  },
  {
    timestamps: true,
  },
)

export const Contact = model<TContact>('Contact', contactSchema)
