import { User } from '../models'
import { Request, Response, NextFunction } from 'express'
import { TUser, TUserAdd } from '../types'
import { catchAsync, AppError, signToken, comparePassword } from '../utils'

// login user and send jwt token
const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    // check if email and password exist
    if (!email || !password) {
      return next(new AppError('Please provide email and password!', 400))
    }

    // select password field because it is not selected by default in the schema
    const user: TUser = await User.findOne({ email }).select('+password')

    // if user does not exist or password is incorrect, send error
    if (!user || !comparePassword(password, user.password)) {
      return next(new AppError('Incorrect email or password', 401))
    } else {
      // if everything is ok, send token to client
      const token = signToken(user)

      res.status(200).json({
        status: 'success',
        token,
        user,
      })
    }
  },
)

// register user
const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, domain }: TUser = req.body

    const user: TUserAdd = new User({
      name,
      email,
      password,
      domain,
    })

    const newUser: TUserAdd = await user.save()

    if (!newUser) {
      return next(new AppError('No user found', 404))
    }

    res.status(201).json({
      message: 'User added',
      user: newUser,
      success: true,
    })
  },
)

// change password with current password
const changePassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      body: { email, password, newPassword },
    } = req

    const user: TUserAdd = await User.findOne({ email }).select('+password')

    if (!user) {
      return next(new AppError('User not found', 404))
    }

    if (!comparePassword(password, user.password)) {
      return next(new AppError('Incorrect password', 401))
    }

    user.password = newPassword

    const updatedUser: TUserAdd = await user.save()

    res.status(200).json({
      message: 'Password updated',
      user: updatedUser,
      success: true,
    })
  },
)

export { loginUser, registerUser, changePassword }
