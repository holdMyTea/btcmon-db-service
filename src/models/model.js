import mongoose from 'mongoose'

import db from '../services/connection.js'

export default (collection) => {
  const entrySchema = mongoose.Schema({
    timestamp: Date,
    value: Number
  }, {collection: collection})

  return db.connection.model(collection, entrySchema)
}
