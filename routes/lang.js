const express = require('express');
const router = express.Router()
const lang = require('../controllers/lang')

router.get('/', lang.getItems)


module.exports = router