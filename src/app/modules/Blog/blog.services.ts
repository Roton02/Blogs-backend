import IBlog from './blog.interface'
import { blog } from './blog.model'

const createBlogIntroDB = async (payload: IBlog) => {
  const result = await blog.create(payload)
  return result
}
const updateBlogIntroDB = async (id: string, payload: Partial<IBlog>) => {
  const result = await blog.findByIdAndUpdate(id, payload)
  return result
}
const deleteBlogIntroDB = async (id: string) => {
  const result = await blog.findByIdAndDelete(id)
  return result
}
const getAllBlogIntroDB = async () => {
  const result = await blog.find()
  return result
}

export const blogServices = {
  createBlogIntroDB,
  updateBlogIntroDB,
  deleteBlogIntroDB,
  getAllBlogIntroDB
}
