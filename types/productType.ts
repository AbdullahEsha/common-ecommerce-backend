import { TReview } from './reviewType'
import { TVariant } from './variantType'

export type TProduct = {
  _id?: string
  sku: string
  title: string
  slug: string
  description: string
  ragularPrice: number
  salePrice?: number
  review?: TReview[]
  category?: string
  status?: string
  domain?: string
  variant?: TVariant[]
  createdAt?: Date
  updatedAt?: Date
}
