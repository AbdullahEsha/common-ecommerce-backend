import { User } from '../models'
import { Request, Response, NextFunction } from 'express'
import { TUser, TUserAdd } from '../types'
import { catchAsync, AppError } from '../utils'

// get all users
const getUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users: TUser[] = await User.find()
    if (!users) {
      return next(new AppError('No users found', 404))
    }
    res.status(200).json({
      users: users,
      success: true,
      count: users.length,
    })
  },
)

// get single user
const getUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user: TUser | null = await User.findById(req.params.id)
    if (!user) {
      return next(new AppError('No user found', 404))
    }
    res.status(200).json({ user, success: true, message: 'User found 🔥' })
  },
)

// add user
const addUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, domain } = req.body

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

// update user
const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      body,
      params: { id },
    } = req
    const user: TUserAdd | null = await User.findById(id)

    if (!user) {
      return next(new AppError('User not found', 404))
    }

    user.name = body.name || user.name
    user.email = body.email || user.email
    user.password = body.password || user.password

    const updatedUser: TUserAdd = await user.save()

    res.status(200).json({
      message: 'User updated',
      user: updatedUser,
      success: true,
    })
  },
)

// delete user
const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const deletedUser: TUser | null = await User.findByIdAndDelete(
      req.params.id,
    )

    if (!deletedUser) {
      return next(new AppError('User not found', 404))
    }

    res.status(200).json({
      message: 'User deleted',
      user: deletedUser,
      success: true,
    })
  },
)

export { getUsers, getUser, addUser, updateUser, deleteUser }
