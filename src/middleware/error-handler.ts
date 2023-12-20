import { Request, Response, NextFunction } from "express"

export class CustomError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
    this.name = 'CustomError'
  }
}

export const apiErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    res.status(err.status || 500).json({
      status: `${err.status}`,
      message: err.message
    })
  } else if (err instanceof Error) {
    res.status(500).json({
      status: 'error',
      message: err.message
    })
  } else {
    res.status(500).json({
      status: 'error',
      message: 'An unknow error occurred'
    })
  }
  next(err)
}