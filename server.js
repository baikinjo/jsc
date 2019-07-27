import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import path from 'path'
import routes from './backend/routes'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

const uri = process.env.MLAB_URI

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })
const connection = mongoose.connection
connection
  .once('open', () => {
    console.log('MongoDB database connection established successfully')
  })
  .catch(err => console.log(err))

routes(app)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))

export default app
