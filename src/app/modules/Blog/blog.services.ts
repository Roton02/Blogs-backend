import IBlog from "./blog.interface"
import { blog } from "./blog.model"

const createBlogIntroDB = async(payload: IBlog) => {
    const result = await blog.create(payload)
    return result
}

export const blogServices = {
  createBlogIntroDB 
}
