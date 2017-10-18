import mongoose from 'mongoose'

import vars from '../config/variables.js'

mongoose.Promise = global.Promise

let connection = mongoose.createConnection(vars.DB_HOST, vars.DB_NAME)

function waitForConnection (callback) {
  connection.on('error', () => { throw new Error('db connection failed') })
  connection.once('open', () => {
    console.log('db connection established')
    callback()
  })
}

export default {connection, waitForConnection}
