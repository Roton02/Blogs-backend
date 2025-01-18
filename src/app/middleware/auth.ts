import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import AppError from '../error/AppError'
import config from '../config'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { user } from '../modules/auth/user.model'

const auth = (...requiredRole: string[]) => {
  console.log('objectaaaaaaaaa');
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if (!token) {
      throw new AppError(400, 'You are not authorized')
    }
    const decode = jwt.verify(token, config.JWT_SECRET as string)
    const { email, role } = decode as JwtPayload
    const User = await user.findOne({ email })
    // console.log({User});
    if (!User) {
      throw new AppError(400, 'User not found')
    }
    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(401, ' Unauthorized  to access')
    }
    req.user = decode as JwtPayload

    next()
  })
}

export default auth
