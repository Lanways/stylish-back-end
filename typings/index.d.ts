declare namespace Express {
  export interface User {
    id: number
    isAdmin: boolean
  }
}

declare namespace Express {
  interface Request {
    isLocalStrategy: boolean
  }
}
