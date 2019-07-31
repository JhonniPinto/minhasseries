const router = require('express').Router()
const pagesController = require('../controllers/pages')

router.get('/', pagesController.index)
router.get('/sobre', pagesController.sobre)

module.exports = router