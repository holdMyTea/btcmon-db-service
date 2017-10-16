import express from 'express'

import controllerGenerator from '../controllers/controllerGenerator.js'

function generateRoute (collection) {
  const router = express.Router()
  const controller = controllerGenerator(collection)

  router.route('/')
    .get(controller.getAllDocumnets)
    .put(controller.insertDocument)

  return {
    collection: collection,
    router: router
  }
}

export default (collections) => {
  let routes = []

  collections.forEach((collection) => routes.push(generateRoute(collection)))

  return routes
}
