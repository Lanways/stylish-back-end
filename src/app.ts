import { getSecrets, getGoogleAuthSecrets } from './secret-manager'
import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { existsSync } from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
if (process.env.NODE_ENV !== "production") {
  dotenv.config()
}

let swaggerDoc: any
const swaggerDocPath = path.join(__dirname, 'swagger-output.json')

if (existsSync(swaggerDocPath)) {
  swaggerDoc = require(swaggerDocPath)
}
const app = express()
const PORT = process.env.PORT || 80
const corsOptions = {
  origin: ['https://stylish-test.netlify.app', 'https://app.ezstylish.com'],
  credentials: true
}

export async function initApp() {
  try {
    if (process.env.NODE_ENV === 'production') {
      await getSecrets()
      await getGoogleAuthSecrets()
    }
    app.use(cookieParser())
    const router = (await import('./routes')).default
    const passport = (await import('./config/passport')).default
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }))
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
    app.use(cors(corsOptions))
    app.use(passport.initialize())
    app.use(router)
  } catch (error) {
    console.error('Failed to initialize app', error)
    throw error
  }
}
async function startServer() {
  try {
    await initApp()
    app.listen(PORT, () => {
      console.log(`App is running on http://localhost:${PORT}`)
    })
  } catch (error) {
    throw error
  }
}

if (process.env.NODE_ENV !== 'test') {
  startServer()
}

export default app