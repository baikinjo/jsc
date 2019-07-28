/**
 * ./server
 *
 *  Injo Baik, baikinjo.28@gmail.com
 */

/* Imports ======================================================================================= */
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import path from 'path'

/* Routes ======================================================================================== */
import routes from './backend/src/routes'

/** Environment config */
dotenv.config()

/** Middlewares */
const app = express()
app.use(express.json())

app.use(cors())

/** MLAB db uri */
const uri = process.env.MLAB_URI

/** Mongoose db connection to MLAB uri */
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })
const connection = mongoose.connection
connection
  .once('open', () => {
    console.log('MongoDB database connection established successfully')
  })
  .catch(err => console.log(err))

/** Routes */
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
