import { Request } from "express";

export type callbackType<T> = (error: Error | null, data?: T) => void

export const ResponseData = <T>(status: string, message: string, data: T) => {
  return {
    status,
    message,
    data,
  };
}

const helpers = {
  getUser: (req: Request) => {
    return req.user
  }

}
export default helpers