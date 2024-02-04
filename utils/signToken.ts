import jwt from 'jsonwebtoken'
import { TUser } from '../types'
import { JWT_EXPIRES_IN, JWT_SECRET } from '../dotenvConfig'

export const signToken = (user: TUser) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      domain: user.domain,
    },
    JWT_SECRET!,
    {
      expiresIn: JWT_EXPIRES_IN,
    },
  )
}
