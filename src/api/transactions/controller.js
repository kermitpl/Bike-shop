const { success, notFound } = require('../../services/response/')
const Transaction = require('./model').model
const mongoose = require('mongoose');

const create = ({ body }, res, next) =>
    Transaction.create(body)
        .then((transaction) => transaction.view(true))
        .then(success(res, 201))
        .catch(next)

const index = (req, res, next) =>
    Transaction.find().sort({createdAt:-1})
        .then((transactions) => transactions.map((transaction) => transaction.view()))
        .then(success(res))
        .catch(next)

const show = ({ params }, res, next) => {

    if (params.id.length === 24)
    return Transaction.findById(params.id)
        .then(notFound(res))
        .then((transaction) => transaction ? transaction.view(true) : null)
        .then(success(res))
        .catch(next)

    return Transaction.find().sort({createdAt:-1})
        .then((transactions) => transactions.map((transaction) => transaction.view()))
        .then(success(res))
        .catch(next)

}

const sort = ({ params }, res, next) => {
    if (params.key === null)
        return Transaction.find().sort({createdAt:-1})
            .then((transactions) => transactions.map((transaction) => transaction.view()))
            .then(success(res))
            .catch(next)

    switch (params.key){
        case 'createdAt':
            return Transaction.find().sort({createdAt:-1})
                .then((transactions) => transactions.map((transaction) => transaction.view(true)))
                .then(success(res))
                .catch(next)
        case 'quantity':
            return Transaction.find().sort({quantity:-1})
                .then((transactions) => transactions.map((transaction) => transaction.view(true)))
                .then(success(res))
                .catch(next)
        case 'updatedAt':
            return Transaction.find().sort({updatedAt:-1})
                .then((transactions) => transactions.map((transaction) => transaction.view(true)))
                .then(success(res))
                .catch(next)
    }

    Transaction.find().sort({createdAt:-1})
        .then((transactions) => transactions.map((transaction) => transaction.view()))
        .then(success(res))
        .catch(next)
}

const update = ({ body , params }, res, next) =>
    Transaction.findById(params.id)
        .then(notFound(res))
        .then((transaction) => transaction ? Object.assign(transaction, body).save() : null)
        .then((transaction) => transaction ? transaction.view(true) : null)
        .then(success(res))
        .catch(next)

const destroy = ({ params }, res, next) =>
    Transaction.findById(params.id)
        .then(notFound(res))
        .then((transaction) => transaction ? transaction.remove() : null)
        .then(success(res, 204))
        .catch(next)

const search = ({query}, res, next) => {
    let dbquery = []
    for(const key in query){
        switch (key) {
            case 'paymentType':
                dbquery.push({"paymentType": {$regex: new RegExp(`${query['paymentType']}`), $options: 'i'}})
                break;
            case 'quantity':
                dbquery.push({"quantity": {$eq: parseInt(query['quantity']) }})
                break;
            case 'afterDate':
                dbquery.push({"createdAt": {$gte: Date.parse(query['afterDate']) }})
                break;
            case 'beforeDate':
                dbquery.push({"createdAt": {$lte: Date.parse(query['beforeDate']) }})
                break;
            case 'user':
                if (query['user'].length === 24 ) {
                    dbquery.push({"user": {$eq: mongoose.Types.ObjectId(query['user'])}})
                }
                break;
        }
    }

    if(dbquery.length === 0) return res.json([])

    return Transaction.find({$and : dbquery}).sort({createdAt: -1}).limit(10)
        .then(notFound(res))
        .then((transaction) => transaction ? transaction.map(transaction=> transaction.view(true)) : null)
        .then(success(res))
        .catch(next)
}

module.exports = {
    create, index, show, update, destroy, search, sort
}