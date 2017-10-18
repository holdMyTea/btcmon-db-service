import schema from '../services/schema.js'

function insertDocument (s, request, response) {
  const body = request.body

  if (body.value && body.timestamp) {
    s.addEntry(body.timestamp, body.value, (results) => response.send('Inserting: ' + body))
    console.log('Inserting: ' + body)
  } else {
    response.status(400).send('Bad arguments')
  }
}

function getAllDocumnets (s, request, response) {
  s.getEntries((results) => response.send('All: ' + results))
}

export default (collection) => {
  const s = schema(collection)
  return {
    insertDocument: (request, response) => insertDocument(s, request, response),
    getAllDocumnets: (request, response) => getAllDocumnets(s, request, response)
  }
}
