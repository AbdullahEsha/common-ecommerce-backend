export type TUser = {
  save(): TUser | PromiseLike<TUser>
  name: string
  email: string
  password: string
  userType: string
}
