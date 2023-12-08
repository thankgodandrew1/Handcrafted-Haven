import errorHandler from './errorHandler'
import jwtMiddleware from './jwtMiddleware'
import { Request, Response, NextFunction } from 'express'

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'

interface ApiHandler {
  get?: (req: Request, res: Response) => void
  post?: (req: Request, res: Response) => void
  put?: (req: Request, res: Response) => void
  patch?: (req: Request, res: Response) => void
  delete?: (req: Request, res: Response) => void
}

export default function apiHandler(handler: ApiHandler) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const method = req.method.toLowerCase() as HttpMethod

    // check handler supports HTTP method
    if (!handler[method]) {
      return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    try {
      // global middleware
      await jwtMiddleware(req, res)

      // route handler
      const routeHandler = handler[method]
      if (routeHandler) {
        await routeHandler(req, res)
      } else {
        return res.status(405).end(`Method ${req.method} Not Allowed`)
      }
    } catch (err) {
      // global error handler
      errorHandler(err, res)
    }
  }
}
