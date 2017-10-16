// import db from '../services/db.js'

function insertDocument (collection, request, response) {
  const body = request.body

  if (body.value && body.timestamp) {
    response.send('Inserting into ' + collection + ': ' + body)
    console.log('Inserting into ' + collection + ': ' + body)
  } else {
    response.status(400).send('Bad arguments')
  }
}

function getAllDocumnets (collection, request, response) {
  response.send('Listing all docs from: ' + collection)
  console.log('Listing all docs from: ' + collection)
}

export default (collection) => {
  return {
    // TODO: insert some kind of collection-bounded schema
    insertDocument: (request, response) => insertDocument(collection, request, response),
    getAllDocumnets: (request, response) => getAllDocumnets(collection, request, response)
  }
}
