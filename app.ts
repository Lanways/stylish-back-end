import express, { Request, Response } from 'express'
const app = express()
const PORT = process.env.PORT || 3002

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World')
})

app.listen(PORT, () => {
  console.log(`App is running on http://locahost${PORT}`)
})

export default app