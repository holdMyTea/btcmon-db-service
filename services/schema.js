import mongoose from 'mongoose'

import db from './connection.js'

function addEntry (EntryModel, timestamp, value, callback) {
  const entry = new EntryModel({
    timestamp: timestamp,
    value: value
  })

  entry.markModified('timestamp')

  entry.save((err) => {
    if (err) throw new Error(err)
    else callback()
  })
}

async function getEntries (EntryModel, callback) {
  console.log('Getting docs from ' + EntryModel.collection.collectionName)
  EntryModel.find((err, results) => {
    if (err) {
      throw new Error('Unable to retrieve entries')
    }

    callback(results)
  })
}

export default (collection) => {
  const entrySchema = mongoose.Schema({
    timestamp: Date,
    value: Number
  }, {collection: collection})

  const EntryModel = db.connection.model(collection, entrySchema)

  return {
    addEntry: (timestamp, value, callback) => addEntry(EntryModel, timestamp, value, callback),
    getEntries: (callback) => getEntries(EntryModel, callback)
  }
}
