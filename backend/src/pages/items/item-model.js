/**
 * ./backend/src/pages/items/item-model
 *
 *  Injo Baik, baikinjo.28@gmail.com
 */

/* Imports ======================================================================================= */
import mongoose from 'mongoose'

/* Schema ======================================================================================== */
const Schema = mongoose.Schema

const itemSchema = new Schema(
  {
    baseURL: {
      type: String
    },
    category: {
      type: String
    },
    rank: {
      type: String
    },
    dimension: {
      type: String
    },
    asin: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    usePushEach: true
  }
)

export default mongoose.model('item', itemSchema)
