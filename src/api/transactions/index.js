const { Router } = require('express')
const { token } = require('../../services/passport')
const { create, index, show, update, destroy, search, sort} = require('./controller')

const router = new Router()

router.post('/',
    token({ required: true }),
    create)

router.get('/',
    token({ required: true, roles: ['admin'] }),
    index)

router.get('/search/',
    token({ required: true, roles: ['admin'] }),
    search)

router.get('/sort/:key',
    token({ required: true, roles: ['admin'] }),
    sort)

router.get('/:id',
    token({ required: true, roles: ['admin'] }),
    show)

router.put('/:id',
    token({ required: true, roles: ['admin'] }),
    update)

router.delete('/:id',
    token({ required: true, roles: ['admin'] }),
    destroy)

module.exports = router