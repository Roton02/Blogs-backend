/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/router'
const app: Application = express()

// middleware
app.use(express.json())
app.use(cors())
app.use('/api', router)

// app.use((err: any, req: Request, res: Response) => {
//   // console.error(err.stack);
//   res.status(500).json({
//     success: false,
//     message: err.message,
//     error: err.stack,
//   })
// })

export default app
