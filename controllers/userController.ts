import { User } from '../models'
import { Request, Response } from 'express'
import { TUser } from '../types'

// get all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: TUser[] = await User.find()
    res.status(200).json({ users })
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching users',
      success: false,
      error,
    })
  }
}

// get single user
export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: TUser | null = await User.findById(req.params.id)
    res.status(200).json({ user })
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching user',
      success: false,
      error,
    })
  }
}

// add user
export const addUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<TUser, 'name' | 'email' | 'password'>
    const user: TUser = new User({
      name: body.name,
      email: body.email,
      password: body.password,
    })

    const newUser: TUser = await user.save()

    res
      .status(201)
      .json({ message: 'User added', user: newUser, success: true })
  } catch (error) {
    res.status(500).json({
      message: 'Error adding user',
      success: false,
      error,
    })
  }
}

// update user
export const updateUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req
    const updateUser: TUser | null = await User.findByIdAndUpdate(
      { _id: id },
      body,
    )
    res.status(200).json({
      message: 'User updated',
      user: updateUser,
      success: true,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error updating user',
      success: false,
      error,
    })
  }
}

// delete user
export const deleteUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const deleteUser: TUser | null = await User.findByIdAndDelete(req.params.id)
    res.status(200).json({
      message: 'User deleted',
      user: deleteUser,
      success: true,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting user',
      success: false,
      error,
    })
  }
}
