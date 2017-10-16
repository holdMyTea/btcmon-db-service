import mongoose from 'mongoose'

export default (collection) => {
  return mongoose.Schema({
    timestamp: Date,
    value: Number
  }, {collection: collection})
}
