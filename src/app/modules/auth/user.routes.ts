import { Router } from 'express'
import { userControlloer } from './user.controller'
import userValidationSchema from './user.validation'
import zodValidator from '../../middleware/validator'

const userRouter = Router()

userRouter.post(
  '/register',
  zodValidator(userValidationSchema),
  userControlloer.createUser
)

export default userRouter
