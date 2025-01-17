interface IUser {
  name: string
  email: string
  password: string
  role: 'admin' | 'user'
  isBlocked: boolean
}

export default IUser

export interface IloginUser {
  email: string
  password: string
}
