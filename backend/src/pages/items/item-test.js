/**
 * ./backend/src/pages/items/item-test
 *
 *  Injo Baik, baikinjo.28@gmail.com
 */

/* Imports ======================================================================================= */
import express from 'express'
import mongoose from 'mongoose'
import request from 'supertest'
import dotenv from 'dotenv'

/* Routes ======================================================================================== */
import routes from '../../routes'

/** App Setup */
dotenv.config()
const app = express()
app.use(express.json())
routes(app)

/** Connect to mlab test DB */
mongoose.Promise = global.Promise
mongoose
  .connect(process.env.TEST_URI, {
    useNewUrlParser: true
  })
  .then(console.log('DB Connected'))

let id

describe('/api/items', () => {
  beforeEach(() => {
    jest.setTimeout(20000)
  })

  it('should get list of items', async () => {
    const res = await request(app)
      .get('/api/items')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
    expect(res.status).toBe(200)
  })

  it('should post an item with valid ASIN', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ asin: 'B07RF1XD36' })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
    id = res.body.id
    expect(res.status).toBe(201)
  })

  it('should not post a duplicate ASIN item', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ asin: 'B07RF1XD36' })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
    expect(res.status).toBe(403)
  })

  it('should not post an invalid ASIN', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ asin: 'asdf12' })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
    expect(res.status).toBe(404)
  })
})

describe('/api/items/:itemId', () => {
  it('should delete an item', async () => {
    const res = await request(app).delete(`/api/items/${id}`)
    expect(res.status).toBe(200)
  })
})
