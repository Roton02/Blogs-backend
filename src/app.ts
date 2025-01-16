import express, { Application } from 'express'
import cors from 'cors'
import router from './app/router'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import notFound from './app/error/notFound'
const app: Application = express()

// middleware
app.use(express.json())
app.use(cors())
app.use('/api', router)

app.use(globalErrorHandler)
app.use(notFound)

export default app
