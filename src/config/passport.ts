import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import db from '../db/models'
import { Request } from 'express'
import bcrypt from 'bcryptjs'
import { callbackType } from '../helpers/Helpers'
import { UserOutput } from '../db/models/user';
import { CustomError } from '../middleware/error-handler';

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  async (req: Request, email: string, password: string, cb: callbackType<UserOutput>) => {
    try {
      const user = await db.User.findOne({ where: { email: email } })
      if (!user) return cb(new CustomError('That account is not registered!', 404))
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return cb(new CustomError('Email or Password incorrect.', 404))
      return cb(null, user)
    } catch (error) {
      if (error instanceof Error)
        return cb(error)
    }
  }
))

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRECT,
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

