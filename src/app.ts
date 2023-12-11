import express, { Request, Response } from 'express'
import router from './routes'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000
const corsOptions = {
  origin: ['http://localhost:3001'],
  credentials: true,
}

app.use(cors(corsOptions))
app.use(router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World')
})

app.listen(PORT, () => {
  console.log(`App is running on http://locahost${PORT}`)
})

export default app