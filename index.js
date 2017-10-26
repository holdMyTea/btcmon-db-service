'use strict'

import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import vars from './config/variables.js'
import config from './config/config.js'
import routeGenerator from './routes/routeGenerator.js'
import connection from './services/connection.js'

const app = express()

connection.waitForConnection(() => {
  app.use(bodyParser.json())
  app.use(morgan('common'))

  for (let route of routeGenerator(config)) {
    app.use('/' + route.collection, route.router)
  }

  app.get('/', (request, response) => response.send('db-service sends it\'s greetings'))

  app.listen(vars.APP_PORT, vars.APP_HOST, () => console.log('db-service is listening'))
})

export default app
