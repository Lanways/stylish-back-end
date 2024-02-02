import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import db from '../db/models'
import { Request } from 'express'
import bcrypt from 'bcryptjs'
import { callbackType } from '../helpers/Helpers'
import { UserOutput } from '../db/models/user';
import { CustomError } from '../middleware/error-handler';
import { secrets } from '../secret-manager';

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  async (req: Request, email: string, password: string, cb: callbackType<UserOutput>) => {
    try {
      const user = await db.User.findOne({ where: { email: email } })
      if (!user) return cb(new CustomError('That account is not registered!', 401))
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return cb(new CustomError('Email or Password incorrect.', 401))
      return cb(null, user)
    } catch (error) {
      if (error instanceof Error)
        return cb(error)
    }
  }
))

let JWT_SECRET: string
if (process.env.NODE_ENV === "production") {
  JWT_SECRET = secrets.JWT_SECRET
} else {
  JWT_SECRET = process.env.JWT_SECRET as string
}

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET
};

passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
  try {
    const user = await db.User.findByPk(jwt_payload.id)
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}));

export default passport

