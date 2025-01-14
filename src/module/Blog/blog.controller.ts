import { Request, Response } from 'express'
import { blogServices } from './blog.services'

const createBlog = (req:Request, res:Response) => {
  const blogData = req.body
  const result = blogServices.createBlogIntroDB(blogData)
  return result
}

export const blogControllers = {
  createBlog,
}
