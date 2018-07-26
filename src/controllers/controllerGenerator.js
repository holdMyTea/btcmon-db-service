import DBmodel from '../models/model.js'
import moment from 'moment'

function insert (Model, request, response) {
  const body = request.body

  if (body.value && body.timestamp) {
    const entry = new Model({
      timestamp: moment(body.timestamp).toDate(),
      value: body.value
    })

    entry.markModified('timestamp')

    entry.save().then((result) => {
      console.log(result)
      response.send(result)
    })
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
    .gte(moment(Number(request.params.startDate)).toDate()) // casting to js Date, bc Mongo
    .lte(moment(Number(request.params.endDate)).toDate())
    .select({timestamp: 1, value: 1, _id: 0})
    .exec((err, result) => {
      if (err) throw err

      response.send(result)
    })
}

function getLastInsert (model, request, response) {
  model.find().sort({timestamp: -1}).limit(1).exec((err, result) => {
    if (err) throw err

    if (result[0]) {
      response.send(moment(result[0].timestamp).format())
    } else response.send(moment(0).format()) // using format() here, bc otherwise express will parse this as HTTP status and throw error
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
