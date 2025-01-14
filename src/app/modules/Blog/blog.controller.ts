import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import { blogServices } from './blog.services'
import sendResponse from '../../utils/sendResponse'

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const blogData = req.body
  const result = await blogServices.createBlogIntroDB(blogData)
  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    statusCode: 200,
    data: result,
  })
})

export const blogControllers = {
  createBlog,
}
