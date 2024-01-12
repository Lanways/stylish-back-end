import { Request, Response, NextFunction } from 'express'
import passport from '../config/passport'
import { UserOutput } from '../db/models/user'

const authenticated = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (error: Error | null, user: UserOutput) => {
    if (error) return res.status(500).json({ status: 'error', message: 'Internal server error' })
    if (!user) return res.status(401).json({ status: 'error', message: 'User not authorized' })
    req.user = user
    next()
  })(req, res, next)
}
const authenticatedAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) return next()
  return res.status(403).json({ status: 'error', message: 'permission denied' })
}

export { authenticated, authenticatedAdmin }