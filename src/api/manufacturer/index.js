const { Router } = require('express')
const { token } = require('../../services/passport')
const { create, index, show, update, destroy } = require('./controller')

const router = new Router()

router.post('/',
    token({ required: true, roles: ['admin'] }),
  create)

router.get('/',
  index)


router.get('/:id',
  show)

router.put('/:id',
    token({ required: true, roles: ['admin'] }),
  update)

router.delete('/:id',
    token({ required: true, roles: ['admin'] }),
  destroy)

module.exports = router
