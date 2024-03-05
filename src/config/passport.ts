import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import db from '../db/models'
import { Request } from 'express'
import bcrypt from 'bcryptjs'
import { callbackType } from '../helpers/Helpers'
import { UserOutput } from '../db/models/user';
import { CustomError } from '../middleware/error-handler';
import { secrets, googleAuthSecrets } from '../secret-manager';

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

const env = process.env.NODE_ENV

let JWT_SECRET = env === "production" ? secrets.JWT_SECRET : process.env.JWT_SECRET as string

if (env !== "production" && (!process.env.JWT_SECRET)) {
  throw new CustomError('Can not found JWT Secret', 404)
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

let GOOGLE_CLIENT_ID = env === "production" ? googleAuthSecrets.clientID : process.env.clientID as string
let GOOGLE_CLIENT_SECRET = env === "production" ? googleAuthSecrets.clientSecret : process.env.clientSecret as string
let GOOGLE_CALLBACK_URL = env === "production" ? googleAuthSecrets.callbackURL : process.env.callbackURL as string

if (env !== "production" && (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_CALLBACK_URL)) {
  throw new CustomError('Google OAuth ENV Not Found', 404)
}

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_CALLBACK_URL
},
  async (accessToken, refreshToken, profile, cb) => {
    try {
      const { name, email } = profile._json
      const existUser = await db.User.findOne({ where: { email: email } })
      if (existUser) return cb(null, existUser)
      const randomPassword = Math.random().toString(36).slice(-8)
      const hashed = await bcrypt.hash(randomPassword, 10)
      const phone = '12345678'
      const user = await db.User.create({ name, account: email, phone, email, password: hashed })
      return cb(null, user)
    } catch (err) {
      if (err instanceof Error)
        return cb(err, undefined)
    }
  }
))

export default passport

