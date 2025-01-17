import { Router } from 'express'
import { userControlloer } from './user.controller'
import zodValidator from '../../middleware/validator'
import { authValidation } from './user.validation'

const userRouter = Router()

userRouter.post(
  '/register',
  zodValidator(authValidation.userValidationSchema),
  userControlloer.createUser
)
userRouter.post(
  '/login',
  zodValidator(authValidation.loginUserVaidation),
  userControlloer.loginUser
)

export default userRouter
