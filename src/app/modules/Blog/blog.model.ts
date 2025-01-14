import { model, Schema } from 'mongoose'
import IBlog from './blog.interface'

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: [true, 'blog title is required '] },
    content: { type: String, required: [true, 'blog content is required'] },
    author: { type: Schema.Types.ObjectId },
    isPublished: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
)

export const blog = model<IBlog>('blog', blogSchema)
