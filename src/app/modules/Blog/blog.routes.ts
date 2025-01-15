import { Router } from 'express'
import { blogControllers } from './blog.controller'
import { BlogValidation } from './blog.validation'
import zodValidator from '../../middleware/validator'

const blogRouter = Router()

blogRouter.post(
  '/',
  zodValidator(BlogValidation.blogCreateValidation),
  blogControllers.createBlog
)

export default blogRouter
