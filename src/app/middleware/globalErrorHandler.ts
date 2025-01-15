/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { TErrorSources } from '../error/Error.interface'
import config from '../config'

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode
  let message = err.message || 'something went wrong'

  let ErrorSources: TErrorSources = [
    { path: '', message: 'something went wrong' },
  ]
  const ZodErrorHandler = (err: ZodError) => {
    const statusCode = 400
    const message = 'Validation Error '

    const ErrorSources: TErrorSources = err.issues.map((issue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      }
    })

    return {
      statusCode,
      message,
      ErrorSources,
    }
  }

  if (err instanceof ZodError) {
    const simplifiedError = ZodErrorHandler(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    ErrorSources = simplifiedError.ErrorSources
  }

  res.status(statusCode).json({
    success: false,
    message,
    error: ErrorSources,
    stack: config.NODE_ENV === 'development' ? err.stack : null,
  })
}

export default globalErrorHandler
