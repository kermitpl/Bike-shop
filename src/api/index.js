const { Router } = require('express')
const bikemodel = require('./bikemodel')
const manufacturer = require('./manufacturer')
const user = require('./user')
const transaction = require('./transactions')
const _ = require('lodash')

const router = new Router()

router.use('/bikemodels', bikemodel)
router.use('/manufacturers', manufacturer)
router.use('/users', user)
router.use('/transaction', transaction)

// 404 Error handler
router.use((req, res, next) =>  res.status(404).send({errors: ['Routing not found']}))

// Error handler
router.use((err, req, res, next) =>  {
    if(err.name === 'ValidationError'){
        const errors = _.map(err.errors, (v) => v.message )
        return res.status(400).send({errors})
    }

    console.error(err)
    res.status(500).send({errors: ['Application error']})
})


module.exports = router
