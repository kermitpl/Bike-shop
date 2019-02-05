const { success, notFound } = require('../../services/response/')
const Bikemodel = require('./model').model

const create = ({ body }, res, next) =>
  Bikemodel.create(body)
    .then((bikemodel) => bikemodel.view(true))
    .then(success(res, 201))
    .catch(next)

const index = (req, res, next) =>
  Bikemodel.find()
    .then((bikemodels) => bikemodels.map((bikemodel) => bikemodel.view()))
    .then(success(res))
    .catch(next)

const show = ({ params }, res, next) =>
  Bikemodel.findById(params.id)
    .then(notFound(res))
    .then((bikemodel) => bikemodel ? bikemodel.view(true) : null)
    .then(success(res))
    .catch(next)

const update = ({ body , params }, res, next) =>
  Bikemodel.findById(params.id)
    .then(notFound(res))
    .then((bikemodel) => bikemodel ? Object.assign(bikemodel, body).save() : null)
    .then((bikemodel) => bikemodel ? bikemodel.view(true) : null)
    .then(success(res))
    .catch(next)

const destroy = ({ params }, res, next) =>
  Bikemodel.findById(params.id)
    .then(notFound(res))
    .then((bikemodel) => bikemodel ? bikemodel.remove() : null)
    .then(success(res, 204))
    .catch(next)

const search = ({query}, res, next) => {
    let dbquery = []
    for(const key in query){
        switch (key) {
            case 'model':
                dbquery.push({"model": {$regex: new RegExp(`${query['model']}`), $options: 'i'}})
                break;
            case 'yearmin':
                dbquery.push({"year": {$gte: parseInt(query['yearmin']) }})
                break;
            case 'yearmax':
                dbquery.push({"year": {$lte: parseInt(query['yearmax']) }})
                break;
            case 'size':
                dbquery.push({"size": {$eq: parseInt(query['size']) }})
                break;
        }
    }

    if(dbquery.length === 0) return res.json([])

    return Bikemodel.find({$and : dbquery}).sort({year: -1}).limit(10)
        .then(notFound(res))
        .then((bikemodel) => bikemodel ? bikemodel.map(bikemodel => bikemodel.view(true)) : null)
        .then(success(res))
        .catch(next)
    }

module.exports = {
    create, index, show, update, destroy, search
}
