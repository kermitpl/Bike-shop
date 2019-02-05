const { success, notFound } = require('../../services/response/')
const Manufacturer = require('./model').model

const create = ({ body }, res, next) =>
  Manufacturer.create(body)
    .then((manufacturer) => manufacturer.view(true))
    .then(success(res, 201))
    .catch(next)

const index = ({ query }, res, next) =>
  Manufacturer.find()
    .then((manufacturers) => manufacturers.map((manufacturer) => manufacturer.view()))
    .then(success(res))
    .catch(next)

const show = ({ params }, res, next) =>
  Manufacturer.findById(params.id)
    .then(notFound(res))
    .then((manufacturer) => manufacturer ? manufacturer.view(true) : null)
    .then(success(res))
    .catch(next)

const update = ({ body, params }, res, next) =>
  Manufacturer.findById(params.id)
    .then(notFound(res))
    .then((manufacturer) => manufacturer ? Object.assign(manufacturer, body).save() : null)
    .then((manufacturer) => manufacturer ? manufacturer.view(true) : null)
    .then(success(res))
    .catch(next)

const destroy = ({ params }, res, next) =>
  Manufacturer.findById(params.id)
    .then(notFound(res))
    .then((manufacturer) => manufacturer ? manufacturer.remove() : null)
    .then(success(res, 204))
    .catch(next)

module.exports = {
    create, index, show, update, destroy
}
