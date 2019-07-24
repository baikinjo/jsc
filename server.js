import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import config from 'config'
import mongoose from 'mongoose'
import path from 'path'

import items from './src/routes/api/items'

const app = express()

app.use(bodyParser.json())
app.use(cors())

const db = config.get('db')

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))

app.use('/api/items', items)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))

export default app
