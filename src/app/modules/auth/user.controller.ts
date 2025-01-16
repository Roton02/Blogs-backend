import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import { userServcies } from './user.services'
import sendResponse from '../../utils/sendResponse'

const createUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body
  const result = await userServcies.createUserIntroDB(payload)
  sendResponse(res, {
    statusCode: 400,
    success: true,
    message: 'User created successfully',
    data: result,
  })
})

export const userControlloer = {
  createUser,
}
