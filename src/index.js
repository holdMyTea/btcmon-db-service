'use strict'

import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import vars from './config/variables.js'
import config from './config/config.js'
import routeGenerator from './routes/routeGenerator.js'
import connection from './services/connection.js'

const app = express()

app.use(bodyParser.json())
app.use(morgan('common'))

app.get('/', (request, response) => response.send('db-service sends it\'s greetings'))

connection.waitForConnection(async () => {
  for (let route of routeGenerator(await config())) {
    app.use('/' + route.collection, route.router)
  }

  app.listen(vars.DB_SERVICE_PORT, vars.DB_SERVICE_HOST, () => console.log('db-service is listening'))
})

export default app
