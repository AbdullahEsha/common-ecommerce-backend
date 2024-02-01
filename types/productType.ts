import { TReview } from './reviewType'
import { TVariant } from './variantType'

export type TProduct = {
  _id?: string
  title: string
  slug: string
  description: string
  price: number
  review?: TReview[]
  category?: string
  status?: string
  domain?: string
  variant?: TVariant[]
  createdAt?: Date
  updatedAt?: Date
}
