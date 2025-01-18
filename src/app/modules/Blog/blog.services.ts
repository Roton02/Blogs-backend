import AppError from '../../error/AppError'
import { user } from '../auth/user.model'
import IBlog from './blog.interface'
import { blog } from './blog.model'

const createBlogIntroDB = async (payload: IBlog) => {
  const User = await user.findOne({ _id: payload.author })
  if (!User) {
    throw new AppError(400, 'Author not found')
  }
  const result = await blog.create(payload)
  return result
}
const updateBlogIntroDB = async (id: string, payload: Partial<IBlog>) => {
  const result = await blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}
const deleteBlogIntroDB = async (id: string) => {
  const result = await blog.findByIdAndDelete(id)
  return result
}
const getAllBlogIntroDB = async (query: Record<string, unknown>) => {
  const searchAbleFields = ['title', 'content']
  let searchTerm = ''
  if (query.search) {
    searchTerm = query.search as string
  }
  const searchQuery = blog.find({
    $or: searchAbleFields.map((search) => ({
      [search]: { $regex: searchTerm, $options: 'i' },
    })),
  })
  let author = {}
  if (query.filter) {
    author = { author: query.filter }
  }
  // console.log(author)
  const filterQuery = searchQuery.find(author)

  let sort = '-createdAt'
  if (query.sortBy) {
    sort = `-${query.sortBy as string}`
  }
  if (query.sortBy && query.sortOrder == 'asc') {
    sort = `${query.sortBy as string}`
  }
  if (query.sortBy && query.sortOrder == 'desc') {
    sort = `-${query.sortBy as string}`
  }
  const sortQuery = await filterQuery.sort(sort)
  return sortQuery
}

export const blogServices = {
  createBlogIntroDB,
  updateBlogIntroDB,
  deleteBlogIntroDB,
  getAllBlogIntroDB,
}
