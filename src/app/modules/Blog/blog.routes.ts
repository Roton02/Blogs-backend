import { Router } from 'express'
import { blogControllers } from './blog.controller'
import { BlogValidation } from './blog.validation'
import zodValidator from '../../middleware/validator'
import auth from '../../middleware/auth'

const blogRouter = Router()
blogRouter.patch(
  '/:id',
  zodValidator(BlogValidation.blogUpdateValidation),
  blogControllers.updateBlog
)
blogRouter.delete('/:id', blogControllers.deleteBlog)

blogRouter.post(
  '/',
  auth('user'),
  zodValidator(BlogValidation.blogCreateValidation),
  blogControllers.createBlog
)

blogRouter.get('/', blogControllers.getAllBlog)

export default blogRouter
///api/blogs/:id
