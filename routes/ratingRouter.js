const express = require('express');
const router = express.Router()
const rating = require('../controllers/ratingController')

router.post('/add', rating.createOne)
router.get('/:id', rating.getOne)



module.exports = router 