import { Request, Response } from 'express'
import { blogServices } from './blog.services'
import catchAsync from '../utils/catchAsync'
import sendResponse from '../utils/sendResponse'

const createBlog = catchAsync((req: Request, res: Response) => {
  const blogData = req.body
  const result = blogServices.createBlogIntroDB(blogData)
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
