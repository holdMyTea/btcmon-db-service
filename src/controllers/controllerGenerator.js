import DBmodel from '../models/model.js'

function insert (Model, request, response) {
  const body = request.body

  if (body.value && body.timestamp) {
    const entry = new Model({
      timestamp: body.timestamp,
      value: body.value
    })

    entry.markModified('timestamp')

    entry.save().then((result) => response.send(result))
  } else {
    response.status(400).send('Bad arguments')
  }
}

function getAll (model, request, response) {
  model.find().exec((err, result) => {
    if (err) throw err

    response.send(result)
  })
}

function getInRange (model, request, response) {
  console.log(request.params)
  model.find()
    .where('timestamp')
      .gte(new Date(Number(request.params.startDate)))
      .lte(new Date(Number(request.params.endDate)))
  .exec((err, result) => {
    if (err) throw err

    response.send(result)
  })
}

function getLastInsert (model, request, response) {
  model.find().sort({timestamp: -1}).limit(1).exec((err, result) => {
    if (err) throw err

    response.send(new Date(result[0].timestamp))
  })
}

export default (collection) => {
  const model = DBmodel(collection)
  return {
    insert: (request, response) => insert(model, request, response),
    getAll: (request, response) => getAll(model, request, response),
    getInRange: (request, response) => getInRange(model, request, response),
    getLastInsert: (request, response) => getLastInsert(model, request, response)
  }
}
