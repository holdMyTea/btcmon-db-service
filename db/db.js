import mongoose from 'mongoose'

import vars from '../config/variables.js'

mongoose.Promise = global.Promise

mongoose.connect(
  'mongodb://' + vars.DB_HOST + '/' + vars.DB_NAME,
  {useMongoClient: true}
)

const db = mongoose.connection

db.on('error', () => { throw new Error('db connection failed') })
db.once('open', () => console.log('db connection established'))

const entrySchema = mongoose.Schema({
  timestamp: Date,
  value: Number
}, {collection: vars.DB_COLLECTION})

const EntryModel = mongoose.model('Entry', entrySchema)

function addEntry (timestamp, value) {
  const entry = new EntryModel({
    timestamp: timestamp,
    value: value
  })

  entry.markModified('timestamp')

  entry.save((err) => {
    if (err) throw new Error('Unable to save entry')
    else console.log('Entry has been saved')
  })
}

function getEntries () {
  EntryModel.find((err, results) => {
    if (err) {
      throw new Error('Unable to retrieve entries')
    }
    console.log(results)
  })
}

export default {addEntry, getEntries}
