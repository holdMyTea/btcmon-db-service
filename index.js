'use strict'

import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import vars from './config/variables.js'

const app = express()

app.use(bodyParser.json())

app.use(morgan('common'))

app.get('/', (request, response) => response.send('db-service sends it\'s greetings'))

app.listen(vars.APP_PORT, vars.APP_HOST, () => console.log('db-service is listening'))

export default app
