import express from 'express'
import cors from 'cors'
import painting from './routes/painting'
import authRouter from './routes/auth'

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v0/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Return to home page')
})

export default app
