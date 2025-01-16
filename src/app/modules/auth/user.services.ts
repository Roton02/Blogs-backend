import IUser from './user.interface'
import { user } from './user.model'

const createUserIntroDB = async (payload: IUser) => {
  const result = await user.create(payload)
  return result
}

export const userServcies = {
  createUserIntroDB,
}
