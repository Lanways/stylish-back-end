import express from 'express'
import router from './routes'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { existsSync } from 'fs'
import path from 'path'
import passport from './config/passport'

let swaggerDoc
const swaggerDocPath = path.join(__dirname, 'swagger-output.json')

if (existsSync(swaggerDocPath)) {
  swaggerDoc = require(swaggerDocPath)
}
const app = express()
const PORT = process.env.PORT || 3000
const corsOptions = {
  credentials: true
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(cors(corsOptions))
app.use(passport.initialize())
app.use(router)

app.listen(PORT, () => {
  console.log(`App is running on http://locahost${PORT}`)
})

export default app