import config from '../../config'
import AppError from '../../error/AppError'
import IUser from '../auth/user.interface'
import { user } from '../auth/user.model'
import IBlog from './blog.interface'
import { blog } from './blog.model'
import jwt, { JwtPayload } from 'jsonwebtoken'

const createBlogIntroDB = async (payload: IBlog) => {
  const User = await user.findOne({ _id: payload.author })
  if (!User) {
    throw new AppError(400, 'Author not found')
  }
  // Create the blog
  const createdBlog = await blog.create(payload)

  // Populate the 'author' field in the created blog
  const populatedBlog = await blog.findById(createdBlog._id).populate('author')

  return populatedBlog
}
const updateBlogIntroDB = async (
  id: string,
  payload: Partial<IBlog>,
  token: string
) => {
  const Author = await blog
    .findOne({ _id: id })
    .populate<{ author: IUser }>('author')
  if (!Author) {
    throw new AppError(404, 'Author not found')
  }
  const { email } = Author.author

  const verifyAuthor = jwt.verify(
    token,
    config.JWT_SECRET as string
  ) as JwtPayload

  // if (verifyAuthor.email != Author.author.email) {//-
  if (verifyAuthor.email !== email) {
    //+
    throw new AppError(401, 'this is not your blog')
  }

  const result = await blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}
const deleteBlogIntroDB = async (id: string, token: string) => {
  const Author = await blog
    .findOne({ _id: id })
    .populate<{ author: IUser }>('author')
  if (!Author) {
    throw new AppError(404, 'Author not found')
  }
  const { email } = Author.author
  const verifyAuthor = jwt.verify(
    token,
    config.JWT_SECRET as string
  ) as JwtPayload
  if (verifyAuthor.email !== email) {
    throw new AppError(401, 'this is not your blog')
  }
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
  const sortQuery = await filterQuery.sort(sort).populate('author');
  return sortQuery
}

export const blogServices = {
  createBlogIntroDB,
  updateBlogIntroDB,
  deleteBlogIntroDB,
  getAllBlogIntroDB,
}
