import mongoose from 'mongoose'

import vars from '../config/variables.js'

mongoose.Promise = global.Promise

const connection = mongoose.createConnection(vars.DB_HOST, vars.DB_NAME)

connection.on('error', () => { throw new Error('db connection failed') })
connection.once('open', () => {
  console.log('db connection established')
  connection.db.listCollections().toArray((err, names) => {
    console.log(names)
  })
})

//const EntryModel = mongoose.model('Entry', entrySchema)

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

function getCollectionsNames () {
  return Object.keys(connection.collections)
}

export default {addEntry, getEntries, getCollectionsNames}
