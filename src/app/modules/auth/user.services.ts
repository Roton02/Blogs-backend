import AppError from '../../error/AppError'
import IUser, { IloginUser } from './user.interface'
import { user } from './user.model'

const createUserIntroDB = async (payload: IUser) => {
  const result = await user.create(payload)
  return result
}

const loginUserIntroDB = async (payload: IloginUser) => {
  const User = await user.findOne({ email: payload.email })
  if (!user) {
    throw new AppError(404,'Invalid email or password')
  }
  console.log(User)

  return User
}

export const userServcies = {
  createUserIntroDB,
  loginUserIntroDB,
}
