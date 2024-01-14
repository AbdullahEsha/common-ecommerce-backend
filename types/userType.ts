export type TUser = {
  name: string
  email: string
  password: string
  userType?: string
}

// type for user save method
export type TUserAdd = {
  save(): TUserAdd | PromiseLike<TUserAdd>
  name: string
  email: string
  password: string
}
