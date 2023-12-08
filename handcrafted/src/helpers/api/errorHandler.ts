import { Response } from 'express'

interface ErrorResponse {
  message: string
}

export default function errorHandler(err: any, res: Response): Response {
  if (typeof err === 'string') {
    // Custom application error
    const is404 = err.toLowerCase().endsWith('not found')
    const statusCode = is404 ? 404 : 400
    return res.status(statusCode).json({ message: err } as ErrorResponse)
  }

  if (err.name === 'UnauthorizedError') {
    // JWT authentication error
    return res.status(401).json({ message: 'Invalid Token' } as ErrorResponse)
  }

  // Default to 500 server error
  console.error(err)
  return res.status(500).json({ message: err.message } as ErrorResponse)
}
