const express = require('express');
const router = express.Router()
const chegirma = require('../controllers/chegirmaController')

router.post('/add', chegirma.create)
router.get('/all', chegirma.getAll)
router.delete('/:id', chegirma.deleteOne)
 
module.exports = router 