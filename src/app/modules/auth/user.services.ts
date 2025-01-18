import config from '../../config'
import AppError from '../../error/AppError'
import IUser, { IloginUser } from './user.interface'
import { user } from './user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createUserIntroDB = async (payload: IUser) => {
  const result = await user.create(payload)
  return result
}

const loginUserIntroDB = async (payload: IloginUser) => {
  const UserData = await user
    .findOne({ email: payload.email })
    .select('+password')
  if (!UserData) {
    throw new AppError(404, 'Invalid credentials')
  }
  // console.log(UserData)
  const verifyPassword = await bcrypt.compare(
    payload.password,
    UserData.password
  )

  if (!verifyPassword) {
    throw new AppError(404, 'Invalid credentials')
  }

  const VerifiedUser = {
    email: UserData.email,
    role: UserData.role,
  }

  const secret = config.JWT_SECRET as string

  const token = jwt.sign(VerifiedUser, secret, { expiresIn: '1h' })

  return { token }
}

export const userServcies = {
  createUserIntroDB,
  loginUserIntroDB,
}
