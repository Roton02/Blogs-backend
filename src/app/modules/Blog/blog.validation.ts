import { z } from 'zod'

const blogCreateValidation = z.object({
  title: z
    .string({
      required_error: 'title is required',
      invalid_type_error: 'title must be a string',
    })
    .trim(),
  content: z
    .string({
      required_error: 'content is required',
    })
    .trim(),
  author: z.string({
    required_error: 'author is required',
  }),
  isPublished: z.boolean().optional(),
})

export const BlogValidation = {
  blogCreateValidation,
}
