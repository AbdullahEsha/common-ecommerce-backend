import jwt from 'jsonwebtoken'
import { TUser } from '../types'

export const signToken = (user: TUser) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      domain: user.domain,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  )
}
