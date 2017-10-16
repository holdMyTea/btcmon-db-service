'use strict'

import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import vars from './config/variables.js'
import config from './config/config.js'
import routeGenerator from './routes/routeGenerator.js'

const app = express()

app.use(bodyParser.json())
app.use(morgan('common'))

for (let route of routeGenerator(config)) {
  app.use('/' + route.collection, route.router)
}

app.get('/', (request, response) => response.send('db-service sends it\'s greetings'))

app.listen(vars.APP_PORT, vars.APP_HOST, () => console.log('db-service is listening'))

export default app

/*
  Grand Battleplan:

  1. this piece (db-service) gets it's part of config from the global one (not a good move, i know)
  2. in it there is a list of all possible resources, we'll be grabbing data from
  3. from this list it generates routes and controllers

  Currently:
  it does it, except there are echo methods instead of real db stuff (soon)

  P.S. stupid file, folder and var names

*/
