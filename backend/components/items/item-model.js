/* Imports ====================================================================================== */
import mongoose from 'mongoose'

/* Schema ======================================================================================= */
const Schema = mongoose.Schema

const itemSchema = new Schema(
  {
    name: {
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
