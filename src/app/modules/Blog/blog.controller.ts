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
const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const blogData = req.body
  const result = await blogServices.updateBlogIntroDB(id, blogData)
  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    statusCode: 200,
    data: result,
  })
})
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await blogServices.deleteBlogIntroDB(id)
  sendResponse(res, {
    success: true,
    message: 'Blog delete successfully',
    statusCode: 200,
    data: result,
  })
})
const getAllBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await blogServices.getAllBlogIntroDB()
  sendResponse(res, {
    success: true,
    message: 'Blog delete successfully',
    statusCode: 200,
    data: result,
  })
})

export const blogControllers = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlog
}
