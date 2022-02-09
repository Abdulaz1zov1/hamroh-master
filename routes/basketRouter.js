const express = require('express');
const router = express.Router()
const { createOne, getItems, deleteOne, basket_of_users
} = require('../controllers/basketController')

router.post('/', createOne)
router.get('/all', getItems)
router.get('/:id', basket_of_users)
router.delete('/:id', deleteOne)


module.exports = router