import { Router } from 'express'
import { blogControllers } from './blog.controller'

const blogRouter = Router()

blogRouter.post('/', blogControllers.createBlog)

export default blogRouter
