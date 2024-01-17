import exp from 'constants'

export type TUser = {
  _id?: string
  name: string
  email: string
  password: string
  userType?: string
  domain?: string
}

// type for user save method
export type TUserAdd = {
  save(): TUserAdd | PromiseLike<TUserAdd>
  name: string
  email: string
  password: string
  userType?: string
  domain?: string
}

export type TUserProtect = {
  changedPasswordAfter(iat: number): boolean
}
